import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice.js";
import customerReducer from "./reducers/customerSlice.js";
import userReducer from "./reducers/userSlice.js";
import statusReducer from "./reducers/statusSlice.js";
import productReducer from "./reducers/productSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    customers: customerReducer,
    statuses: statusReducer,
    products: productReducer,
  },
  devTools: true,
});

export default store;
