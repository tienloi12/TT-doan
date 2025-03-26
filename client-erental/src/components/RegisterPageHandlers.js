import { message } from "antd";

export const handleRegister = async (userData,dispatch,navigate) => {
    try {
      console.log("Dữ liệu gửi đi:", userData);
      const requestData = {
        ...userData,
      };
  
      const response = await fetch("https://localhost:5001/api/Users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      message.success("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...");
      setTimeout(() => navigate("/"), 1500); 
    } catch (error) {
      dispatch({ type: "REGISTER_FAILURE", payload: error.message });
      message.error(`Lỗi đăng ký: ${error.message}`);
    }
  };
  