import { SET_RENTAL_STATUS } from "../actions/RentalActions";

const initialState = {
  rentalStatus: [],
  rentItems: JSON.parse(localStorage.getItem("rentItems")) || [],
};

const rentalReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case SET_RENTAL_STATUS:
      return {
        ...state,
        rentalStatus: action.payload,
      };
    case "SET_RENT_ITEMS":
      return {
        ...state,
        rentItems: action.payload,
      };
    case "ADD_TO_CART":
      const existingItem = state.rentItems.find(
        (i) => i.productId === action.payload.productId
      );
      let updatedItems;
      if (existingItem) {
        updatedItems = state.rentItems.map((i) =>
          i.productId === action.payload.productId
            ? { ...i, quantity: i.quantity + action.payload.quantity }
            : i
        );
      } else {
        updatedItems = [...state.rentItems, action.payload];
      }

      localStorage.setItem("rentItems", JSON.stringify(updatedItems));
      return {
        ...state,
        rentItems: updatedItems,
      };

    case "REMOVE_FROM_CART":
      const filteredItems = state.rentItems.filter(
        (i) => i.productId !== action.payload
      );
      localStorage.setItem("rentItems", JSON.stringify(filteredItems));
      return {
        ...state,
        rentItems: filteredItems,
      };
    case "CLEAR_CART":
      localStorage.removeItem("rentItems");
      return {
        ...state,
        rentItems: [],
      };
    default:
      return state;
  }
};

export default rentalReducer;
