import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../../redux/actions/RegisterActions";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case REGISTER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default registerReducer;
