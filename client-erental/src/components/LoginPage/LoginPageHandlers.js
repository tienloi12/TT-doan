import { Toast } from "antd-mobile";
import { loginSuccess, loginFailure } from "../../redux/actions/LoginActions";

export const handleLogin = async (credentials, dispatch, navigate) => {
  try {
    const response = await fetch("https://localhost:5001/api/Logins/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Sai tài khoản hoặc mật khẩu!");
    }

    dispatch(loginSuccess(data)); // Đăng nhập thành công

    // 👉 Chỉ chuyển trang nếu đăng nhập thành công
    navigate("/dashboard");
  } catch (error) {
    dispatch(loginFailure(error.message));

    // Hiển thị thông báo lỗi
    Toast.show({
      content: error.message,
      duration: 2000,
    });
  }
};
