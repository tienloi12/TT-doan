import { handleRegister } from "../../components/RegisterPageHandlers";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerUser = (userData, navigate) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  const result = await handleRegister(userData);

  if (result.success) {
    dispatch({ type: REGISTER_SUCCESS, payload: result.data });
  } else {
    dispatch({ type: REGISTER_FAILURE, payload: result.message });
  }
};
