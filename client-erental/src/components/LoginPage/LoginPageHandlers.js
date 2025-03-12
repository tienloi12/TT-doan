export const loginUser = (email, password) => async (dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const response = await fetch("https://localhost:5001/api/Logins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || "Login failed");
  
      // Lưu JWT vào localStorage
      localStorage.setItem("token", data.token);
  
      // Lưu thông tin người dùng vào Redux store
      dispatch({ type: "LOGIN_SUCCESS", payload: data.token });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message }); // Lưu lỗi vào Redux
    }
  };
  