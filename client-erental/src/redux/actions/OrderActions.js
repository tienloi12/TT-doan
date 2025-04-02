// action type
export const SET_ORDERS = 'SET_ORDERS';
export const ADD_ORDER = 'ADD_ORDER';
export const REMOVE_ORDER = 'REMOVE_ORDER';
export const SET_ORDER_DETAIL = 'SET_ORDER_DETAIL';

// Action creators
export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
});

export const addOrder = (order) => ({
  type: ADD_ORDER,
  payload: order,
});

export const removeOrder = (orderId) => ({
  type: REMOVE_ORDER,
  payload: orderId,
});

export const setOrderDetail = (orderDetail) => {
  return {
    type: SET_ORDER_DETAIL,
    payload: orderDetail,
  };
};
