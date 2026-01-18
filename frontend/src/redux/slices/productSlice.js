import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const res = await axiosClient.get("/products");
    return res.data;
  }
);

export const fetchRelatedProducts = createAsyncThunk(
  "products/fetchRelatedProducts",
  async (slug) => {
    const res = await axiosClient.get(`/products/relatedproducts/${slug}`);
    return res.data;
  }
);

export const fetchFilterProducts = createAsyncThunk(
  "products/fetchFilterProducts",
  async (filterParams, thunkAPI) => {
    try {
      const query = new URLSearchParams(filterParams).toString();
      const response = await axiosClient.get(`/products?${query}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Lỗi server" }
      );
    }
  }
);

export const fetchProductId = createAsyncThunk(
  "products/fetchProductId",
  async (slug) => {
    const res = await axiosClient.get(`/products/${slug}`);
    return res.data;
  }
);

//Filter ở home
export const fetchProductsFilter = createAsyncThunk(
  "products/fetchProductsFilter",
  async (filterHome, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      if (filterHome.idTour) {
        params.append("categoryId", filterHome.idTour);
      }
      if (filterHome.departure) {
        params.append("departure", filterHome.departure);
      }
      if (filterHome.destination) {
        params.append("destination", filterHome.destination);
      }
      if (filterHome.date) {
        params.append("startDate", filterHome.date.toISOString().split("T")[0]);
      }
      if (filterHome.duration) {
        params.append("durationRange", filterHome.duration);
      }

      const res = await axiosClient.get(`/toursFilter?${params.toString()}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filterProducts: [],
    filterHome: [],
    totalFilterHome: [],
    relatedProducts: [],
    currentProduct: null,
    filter: "All",
    loading: false,
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFilterProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilterProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filterProducts = action.payload;
      })
      .addCase(fetchFilterProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductId.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductsFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.filterHome = action.payload.data;
        state.totalFilterHome = action.payload.total;
      })
      .addCase(fetchProductsFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilter } = productSlice.actions;
export default productSlice.reducer;
