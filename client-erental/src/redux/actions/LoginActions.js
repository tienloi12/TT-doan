import { loginUser } from "../../components/LoginPage/LoginPageHandlers";

export const loginRequest = () => ({
  type: "LOGIN_REQUEST",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());  // Gửi action "LOGIN_REQUEST" khi bắt đầu login
    try {
      const token = await loginUser(email, password);  // Gọi hàm loginUser để đăng nhập
      const user = { email }; // Đây là ví dụ đơn giản, bạn có thể lấy thêm thông tin user nếu cần từ response
      dispatch(loginSuccess(user, token));  // Dispatch "LOGIN_SUCCESS" nếu đăng nhập thành công
    } catch (error) {
      dispatch(loginFailure(error.message));  // Dispatch "LOGIN_FAILURE" nếu có lỗi
    }
  };
};
