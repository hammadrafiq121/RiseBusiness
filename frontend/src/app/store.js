import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice.js";
import customerReducer from "./reducers/customerSlice.js";
import userReducer from "./reducers/userSlice.js";
import statusReducer from "./reducers/statusSlice.js";
import taskCategoryReducer from "./reducers/taskCategorySlice.js";
import productReducer from "./reducers/productSlice.js";
import taskReducer from "./reducers/taskSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    customers: customerReducer,
    statuses: statusReducer,
    products: productReducer,
    tasks: taskReducer,
    taskCategories: taskCategoryReducer,
  },
  devTools: true,
});

export default store;
