import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// Thêm thông tin đặt ngay vào cart
export const addCart = createAsyncThunk("cart/addCart", async (orderData) => {
  const res = await axiosClient.post("/cart", orderData);
  return res.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    orderByUser: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;
        state.orderByUser = action.payload;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
