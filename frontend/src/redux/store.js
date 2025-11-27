import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
// import { setupInterceptors } from "../api/axiosClient";
import productSlice from "./slices/productSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
  },
});
// setupInterceptors(store);

export default store;
