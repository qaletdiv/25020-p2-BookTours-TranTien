import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await axiosClient.get("/cart");
  return res.data;
});

export const addCart = createAsyncThunk(
  "orders/addCart",
  async (cartOrder) => {
    const res = await axiosClient.post("/cart", cartOrder);
    return res.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
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
      .addCase(addCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNewOrderInCart = action.payload;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
