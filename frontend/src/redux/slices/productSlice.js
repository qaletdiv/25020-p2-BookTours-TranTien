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

// Thunk gọi API filter sản phẩm
export const fetchFilterProducts = createAsyncThunk(
  "products/fetchFilterProducts",
  async (filterParams, thunkAPI) => {
    //thunkAPI là 1 cái “hộp dụng cụ” Redux đưa cho bạn, bên trong có mấy thứ hữu ích như:
    //dispatch → để dispatch action khác nếu muốn
    //getState → xem state hiện tại
    //rejectWithValue → trả về lỗi tuỳ chỉnh
    //fulfillWithValue → trả về dữ liệu tuỳ chỉnh
    try {
      // filterParams = { id: "1" } hoặc { category: "domestic" }
      const query = new URLSearchParams(filterParams).toString();
      //Nó biến cái object của bạn thành query string để gắn lên URL.
      //VD: filterParams = { id: 3, category: "foreign" } => Biến thành: "id=3&category=foreign"
      const response = await axiosClient.get(`/products?${query}`);
      // -> gọi tới: /api/products?id=3
      //Dấu hỏi “?” chính là nơi để truyền query lên server
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Lỗi server" }
      );
      //Nếu server trả lỗi (ví dụ 404, 500, timeout):
      //→ lấy thông báo lỗi ở err.response.data
      //Nếu không có gì (server chết, mất mạng, lỗi bất ngờ):
      //→ trả về { message: "Lỗi server" }
      //Sau đó gửi lỗi này về slice bằng rejectWithValue
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
        //biến lựa chọn “Tour trong / ngoài nước” thành điều kiện lọc API => /products?categoryId=1
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
        //action.error.message là nó lấy lỗi mặc định Redux tự tạo, ví dụ như:"Request failed with status code 404"
        //Nếu bạn muốn lấy lỗi từ rejectWithValue. Phải viết state.error = action.payload?.message;
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
