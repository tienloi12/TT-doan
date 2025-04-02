import { Toast } from "antd-mobile";
import { loginSuccess, loginFailure } from "../redux/actions/LoginActions";

export const handleLogin = async (credentials, dispatch, navigate) => {
  try {
    const response = await fetch("http://localhost:5000/api/Logins/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    console.log("API Response:", data); 
    if (!response.ok) {
      throw new Error(data.message || "Sai tài khoản hoặc mật khẩu!");
    }

     dispatch(loginSuccess({ token: data.token, user: data.user }));

     localStorage.setItem("token", data.token);
     localStorage.setItem("user", JSON.stringify(data.user));

    dispatch(loginSuccess(data)); 

    navigate("/dashboard");
  } catch (error) {
    dispatch(loginFailure(error.message));

    Toast.show({
      content: error.message,
      duration: 2000,
    });
  }
};
