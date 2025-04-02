import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";  
import  loginReducer  from "../../redux/reducers/LoginReducer";
import registerReducer from "../reducers/RegisterReducer";
import profileReducer from "../reducers/ProfileReducer";
import { productReducer } from "../reducers/ProductReducer";
import orderReducer from "../reducers/OrderReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  profile: profileReducer,
  product: productReducer,
  orders: orderReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };