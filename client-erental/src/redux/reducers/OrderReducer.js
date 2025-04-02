import { SET_ORDERS, ADD_ORDER, REMOVE_ORDER, SET_ORDER_DETAIL } from '../actions/OrderActions';

const initialState = {
  orders: [],
  orderDetail: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    case REMOVE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order.orderId !== action.payload),
      };
    case SET_ORDER_DETAIL:
      return {
        ...state,
        orderDetail: action.payload,
      };

    default:
      return state;
  }

};

export default orderReducer;
