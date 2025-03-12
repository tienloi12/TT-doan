const initialState = {
    user: null,
    loading: false,
    error: null,
  };
  
  export default function loginReducer(state = initialState, action) {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return { ...state, user: action.payload, loading: false, error: null };
      case "LOGIN_FAILURE":
        return { ...state, loading: false, error: action.payload };
      case "LOGIN_REQUEST":
        return { ...state, loading: true, error: null };
      default:
        return state;
    }
  }
  
  