import { Toast } from "antd-mobile";

// Kiểm tra email hợp lệ
export const handleCheckEmail = async (email, setLoading, setIsEmailVerified, setToken) => {
    if (!email) {
      Toast.show({ content: "Please enter your email!", position: "top" });
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch("https://localhost:5001/api/Users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to verify email");
      }
  
      Toast.show({ content: "Email verified! Enter new password", position: "top" });
  
      // Lưu token để sử dụng khi đặt lại mật khẩu
      setToken(data.token);
      setIsEmailVerified(true);
    } catch (error) {
      Toast.show({ content: error.message, position: "top" });
    }
    setLoading(false);
  };

// Đổi mật khẩu mới
export const handleResetPassword = async (token, newPassword, confirmPassword, setLoading, navigate) => {
    if (!token) {
      Toast.show({ content: "Missing token!", position: "top" });
      return;
    }
    if (!newPassword || !confirmPassword) {
      Toast.show({ content: "Please enter a new password!", position: "top" });
      return;
    }
    if (newPassword !== confirmPassword) {
      Toast.show({ content: "Passwords do not match!", position: "top" });
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch("https://localhost:5001/api/Users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }
  
      Toast.show({ content: "Password reset successful!", position: "top" });
  
      navigate("/"); // Chuyển về trang login sau khi đổi mật khẩu thành công
    } catch (error) {
      Toast.show({ content: error.message, position: "top" });
    }
    setLoading(false);
  };
  