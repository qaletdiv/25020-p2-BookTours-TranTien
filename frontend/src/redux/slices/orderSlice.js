import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const res = await axiosClient.get("/orders");
  return res.data;
});

export const fetchOrderId = createAsyncThunk(
  "orders/fetchOrderId",
  async (orderData) => {
    const res = await axiosClient.post("/orders", orderData);
    return res.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    orderByUser: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderId.fulfilled, (state, action) => {
        state.loading = false;
        state.orderByUser = action.payload;
      })
      .addCase(fetchOrderId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
