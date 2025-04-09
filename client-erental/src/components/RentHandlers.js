import { Toast } from "antd-mobile";
import dayjs from "dayjs";
import { addNotification } from "../redux/actions/NotificationActions";

export const handleRent = async ({ userId, product, startDate, endDate, navigate,quantity, dispatch }) => {
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
    Toast.show({ content: "Ngày kết thúc phải sau ngày bắt đầu!", duration: 2000 });
    return;
  }

  const totalPrice = days * product.price;

  const orderData = {
    createdAt: new Date().toISOString(),
    orderProducts: [
      {
        productId: product.productId,
        quantity: quantity
      }
    ]
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
      status: "Pending"
    };

    const rentalRes = await fetch("https://localhost:5001/api/rentals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rentalData),
    });

    if (!rentalRes.ok) throw new Error("Không thể tạo rental!");
    console.log("Rental đã tạo:", rentalData);

    const newNotification = {
      action: "New",
      message: `Bạn đã thuê thành công ${product.name}.`,
      id: new Date().getTime().toString(),
      time: dayjs().format("hh:mm A"),
      date: dayjs().format("DD MMM YYYY"),
    };

    dispatch(addNotification(newNotification));

    console.log("Đã thêm thông báo:", newNotification);

    Toast.show({ content: "Thuê thành công!", duration: 2000 });
    navigate("/availability");

  } catch (error) {
    console.error("Lỗi khi thuê sản phẩm:", error);
    Toast.show({ content: "Thuê thất bại!", duration: 2000 });
  }
};
