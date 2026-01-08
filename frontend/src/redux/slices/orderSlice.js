import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// Danh sách hoàn tất đơn hàng
export const fetchCart = createAsyncThunk("orders/fetchCart", async () => {
  const res = await axiosClient.get("/orders");
  return res.data;
});

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (orderData) => {
    const res = await axiosClient.post("/orders", orderData);
    return res.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    cart: [],
    currentNewOrderInCart: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNewOrderInCart = action.payload;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
