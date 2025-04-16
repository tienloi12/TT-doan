
import { Toast } from "antd-mobile";
import dayjs from "dayjs";
import { addNotification } from "../redux/actions/NotificationActions";
import { clearCart } from "../redux/actions/RentalActions";


export const handlePayment = async ({
    totalPrice, userId, products, startDate, endDate,
    navigate, quantity, quantityMap, dispatch
  }) => {
    const orderProducts = products.map((product) => ({
      productId: product.productId,
      quantity: quantityMap[product.productId] || 1,
    }));
  
    const orderData = {
      createdAt: new Date().toISOString(),
      userId: userId,
      orderProducts,
    };
    
    console.log("Order data:", orderData);
    const transactionId = `${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;
    try {
      // 1. Tạo payment trước
      const totalQuantity = Object.values(quantityMap).reduce((sum, q) => sum + q, 0);
      const paymentData = {
        rentalId: 0, // Sẽ cập nhật rentalId sau
        voucherId: 1,
        amount: totalQuantity,
        paymentMethod: "CreditCard",
        status: "completed", // status cần là hợp lệ theo constraint DB
        transactionId:transactionId,
      }
        console.log("Payment data:", paymentData);
      const paymentRes = await fetch("https://localhost:5001/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });
  
      if (!paymentRes.ok) {
        const errorResponse = await paymentRes.json();
        console.error("Lỗi khi tạo payment:", errorResponse);
        throw new Error("Không thể tạo payment!");
      }
      const createdPayment = await paymentRes.json();
      console.log("Payment đã tạo:", createdPayment);
  
      // 2. Tạo đơn hàng sau khi thanh toán thành công
      const orderRes = await fetch("https://localhost:5001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
  
      if (!orderRes.ok) throw new Error("Không thể tạo đơn hàng!");
  
      const createdOrder = await orderRes.json();
      console.log("Đơn hàng đã tạo:", createdOrder);
  
      // 3. Tạo rental gắn với orderId vừa tạo
      const rentalData = {
        orderId: createdOrder.orderId,
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
  
      // 4. Cập nhật payment với rentalId sau khi rental tạo thành công
      const updatedPaymentData = { 
        ...createdPayment,
        rentalId: createdRental.rentalId,
      };
  
      const updatePaymentRes = await fetch(`https://localhost:5001/api/payments/${createdPayment.paymentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPaymentData),
      });
  
      if (!updatePaymentRes.ok) {
        const errorResponse = await updatePaymentRes.json();
        console.error("Lỗi khi tạo payment:", errorResponse);
        throw new Error("Không thể tạo payment!");
      }
  
      console.log("Payment đã được cập nhật với rentalId:", updatedPaymentData);
  
      // 5. Cập nhật trạng thái sản phẩm
      const productIds = products.map(p => p.productId);
  
      await fetch("https://localhost:5001/api/rentals/update-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productIds),
      });
  
      // 6. Thêm thông báo và xóa giỏ hàng
      dispatch(clearCart());
  
      const newNotification = {
        action: "New",
        message: `Bạn đã thuê thành công`,
        id: new Date().getTime().toString(),
        time: dayjs().format("hh:mm A"),
        date: dayjs().format("DD MMM YYYY"),
      };
  
      dispatch(addNotification(newNotification));
  
      Toast.show({ content: "Thuê thành công!", duration: 2000 });
  
      // Chuyển hướng về trang dashboard
      navigate("/dashboard");
  
    } catch (error) {
      console.error("Lỗi khi thanh toán hoặc tạo đơn hàng:", error);
      Toast.show({ content: "Thanh toán thất bại!", duration: 2000 });
    }
  };
  