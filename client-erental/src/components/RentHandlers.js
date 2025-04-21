import { Toast } from "antd-mobile";

import dayjs from "dayjs";
import { addNotification } from "../redux/actions/NotificationActions";

export const handleRent = async ({
  totalPrice,
  userId,
  products,
  startDate,
  endDate,
  navigate,
  quantity,
  quantityMap,
  dispatch,
}) => {
  console.log("Sản phẩm:", products);

  if (products.length === 0) {
    Toast.show({ content: "Vui lòng chọn sản phẩm", duration: 2000 });
    return;
  }
  if (!startDate || !endDate) {
    Toast.show({ content: "Vui lòng chọn ngày thuê!", duration: 2000 });
    return;
  }
  if (quantity <= 0) {
    Toast.show({ content: "Số lượng phải lớn hơn 0!", duration: 2000 });
    return;
  }

  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  if (days <= 0) {
    Toast.show({
      content: "Ngày kết thúc phải sau ngày bắt đầu!",
      duration: 2000,
    });
    return;
  }

  // Lưu các sản phẩm vào localStorage
  const orderProducts = products.map((product) => ({
    productId: product.productId,
    quantity: quantityMap[product.productId] || 1,
  }));
  
  localStorage.setItem('cartProducts', JSON.stringify(orderProducts));
  localStorage.setItem('rentalDates', JSON.stringify({ startDate, endDate }));
  const orderData = {
    createdAt: new Date().toISOString(),
    userId: userId,
    orderProducts,
  };
  console.log("Order data:", orderData);

  try {
    // 1. Tạo đơn hàng
    const orderRes = await fetch("https://localhost:5001/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!orderRes.ok) throw new Error("Không thể tạo đơn hàng!");

    const createdOrder = await orderRes.json(); // giả sử trả về { orderId: 123 }
    console.log("Đơn hàng đã tạo:", createdOrder);

    // 2. Tạo rental gắn với orderId vừa tạo
    const rentalData = {
      orderId: createdOrder.orderId, // hoặc createdOrder.id tùy backend trả về
      customerId: userId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalPrice: totalPrice,
      status: "Pending",
    };

    const rentalRes = await fetch("https://localhost:5001/api/rentals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rentalData),
    });

    if (!rentalRes.ok) throw new Error("Không thể tạo rental!");
    const createdRental = await rentalRes.json();
    console.log("Rental đã tạo:", rentalData);

    // Thêm thông báo
    const newNotification = {
      action: "New",
      message: `Bạn đã thuê thành công`,
      id: new Date().getTime().toString(),
      time: dayjs().format("hh:mm A"),
      date: dayjs().format("DD MMM YYYY"),
    };

    dispatch(addNotification(newNotification));

    console.log("Đã thêm thông báo:", newNotification);

    Toast.show({ content: "Thuê thành công!", duration: 2000 });

    // Chuyển hướng đến trang thanh toán với thông tin đơn hàng
    navigate("/payment", {
      state: {
        totalPrice,
        orderProducts,
        startDate,
        endDate,
        quantityMap,
        orderId: createdOrder.orderId,
        rentalId: createdRental.rentalId,
      },
    });
  } catch (error) {
    console.error("Lỗi khi thuê sản phẩm:", error);
    Toast.show({ content: "Thuê thất bại!", duration: 2000 });
  }
};
