export const SET_RENTAL_STATUS = "SET_RENTAL_STATUS";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// Action để set trạng thái thuê (nếu có dùng trong tương lai)
export const setRentalStatus = (status) => ({
  type: SET_RENTAL_STATUS,
  payload: status,
});
export const setRentItems = (items) => ({
  type: "SET_RENT_ITEMS",
  payload: items,
});
// Thêm sản phẩm vào giỏ hàng
export const addToCart = ({ productId, quantity, startDate, endDate }) => ({
  type: ADD_TO_CART,
  payload: { productId, quantity, startDate, endDate },
});

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});
