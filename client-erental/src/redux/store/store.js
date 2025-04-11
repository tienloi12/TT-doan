import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";  

import loginReducer from "../reducers/LoginReducer"; // Import reducer gốc
import registerReducer from "../reducers/RegisterReducer";
import profileReducer from "../reducers/ProfileReducer";
import { productReducer } from "../reducers/ProductReducer";
import orderReducer from "../reducers/OrderReducer";
import notificationReducer from "../reducers/NotificationReducer";
import rentalReducer from "../reducers/RentalReducer";

// 🔥 Tạo cấu hình persist riêng cho login
const loginPersistConfig = {
  key: "login",
  storage,
  whitelist: ["user", "token"],
};

// ✅ Bọc login reducer sau khi loginReducer đã import xong
const persistedLoginReducer = persistReducer(loginPersistConfig, loginReducer);

const rootReducer = combineReducers({
  login: persistedLoginReducer, // login đã được persist
  register: registerReducer,
  profile: profileReducer,
  product: productReducer,
  orders: orderReducer,
  notifications: notificationReducer,
  rentalStatus: rentalReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };
