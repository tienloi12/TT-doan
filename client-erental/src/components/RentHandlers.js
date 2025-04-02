// handlers/rentHandlers.js
import { Toast } from "antd-mobile";

export const handleRent = async ({ userId, product, navigate }) => {
  const orderData = {
    ownerId: userId, 
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    status: "Đang thuê",
    imageUrl: product.imageUrl,
    // createdAt: new Date().toISOString(),
  };

  try {
    const response = await fetch("https://localhost:5001/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Lỗi khi tạo đơn thuê!");
    }

    Toast.show({ content: "Thuê thành công!", duration: 2000 });
    navigate("/availability");
  } catch (error) {
    console.error("Lỗi khi thuê sản phẩm:", error);
    Toast.show({ content: "Thuê thất bại!", duration: 2000 });
  }
};
