import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice.js";
import customerReducer from "./reducers/customerSlice.js";
import userReducer from "./reducers/userSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    customers: customerReducer,
  },
  devTools: true,
});

export default store;
