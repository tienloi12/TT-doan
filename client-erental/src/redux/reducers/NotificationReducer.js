const initialState = {
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications], // thêm mới lên đầu
      };
    default:
      return state;
  }
};

export default notificationReducer;
