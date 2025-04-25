import { Toast } from "antd-mobile";
import dayjs from "dayjs";
import { addNotification } from "../redux/actions/NotificationActions";
import { clearCart } from "../redux/actions/RentalActions";

const generateTransactionId = () => {
  const timestamp = Date.now(); // Lấy thời gian hiện tại
  const randomValue = Math.floor(Math.random() * 1000); // Lấy một số ngẫu nhiên từ 0 đến 999
  return `${timestamp}-${randomValue}`;
};

export const handlePayment = async ({
  totalPrice,
  products,
  navigate,
  user,
  quantityMap,
  dispatch,
  rentalId,
  fetchedProducts,
}) => {
  try {
    const transactionId = generateTransactionId();
    const totalQuantity = Object.values(quantityMap).reduce(
      (sum, q) => sum + q,
      0
    );
    const paymentData = {
      rentalId: rentalId, // Sử dụng rentalId từ rental vừa tạo
      voucherId: 1,
      amount: totalQuantity,
      paymentMethod: "Credit-Card",
      status: "completed",
      transactionId,
    };

    console.log("Payment data:", paymentData);
    const paymentRes = await fetch("https://localhost:5001/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });

    if (!paymentRes.ok) {
      const errorResponse = await paymentRes.text();
      console.error("Lỗi khi tạo payment:", errorResponse);
      throw new Error("Không thể tạo payment!");
    }
    const paymentResponse = await paymentRes.json(); 
    const paymentId = paymentResponse.paymentId; 
    // 4. Cập nhật trạng thái sản phẩm
    const productIds = products.map((p) => p.productId);

    await fetch("https://localhost:5001/api/rentals/update-status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productIds),
    });

    // 5. Thêm thông báo và xóa giỏ hàng
    dispatch(clearCart());

    const newNotification = {
      action: "New",
      message: `Bạn đã thuê thành công!`,
      id: new Date().getTime().toString(),
      time: dayjs().format("hh:mm A"),
      date: dayjs().format("DD MMM YYYY"),
    };
    dispatch(addNotification(newNotification));
    navigate("/bill", {
      state: {
        userName: user.user.username,
        paymentId: paymentId,
        totalPrice,
        quantityMap,
        fetchedProducts,
        products: products.map((p) => ({
          name: p.name,
          quantity: quantityMap[p.productId] || 1,
          price: p.price,
        })),
      },
    });
  } catch (error) {
    console.error("Lỗi khi thanh toán hoặc tạo đơn hàng:", error);
    Toast.show({
      content: `Thanh toán thất bại: ${error.message}`,
      duration: 2000,
    });
  }
};
export const handlePaymentWithMomo = async ({
  totalPrice,
  orderId,
  rentalId,
}) => {
  try {
    const response = await fetch(
      "https://localhost:5001/api/momopayment/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi khi gọi API MoMo");
    }

    const responseData = await response.json();

    if (!responseData || !responseData.payUrl) {
      throw new Error("Không nhận được URL thanh toán từ MoMo");
    }
    localStorage.setItem("orderId", orderId);
    localStorage.setItem("rentalId", rentalId);

    window.location.href = responseData.payUrl;
  } catch (error) {
    console.error("Error in MoMo payment:", error.message);
    Toast.show({
      content: `Thanh toán thất bại: ${error.message}`,
      duration: 2000,
    });
  }
};

export const handleMoMoReturn = (resultCode, orderId, navigate) => {
  if (resultCode === "0") {
    // Thanh toán thành công, có thể chuyển đến trang thành công
    navigate("/bill");
  } else {
    // Thanh toán thất bại, quay lại trang thanh toán
    navigate("/payment", { state: { orderId } });
  }
};
