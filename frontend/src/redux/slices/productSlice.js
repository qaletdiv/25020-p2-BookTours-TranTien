import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const res = await axiosClient.get("/products");
    return res.data;
  }
);

// Thunk gọi API filter sản phẩm
export const fetchFilterProducts = createAsyncThunk(
  "products/fetchProducts",
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

export const fetchProjectId = createAsyncThunk(
  "products/fetchProjectId",
  async (projectId) => {
    const res = await axiosClient.get(`/products/${projectId}`);
    return res.data;
  }
)

export const addProject = createAsyncThunk(
  "products/addProject",
  async (title) => {
    const res = await axiosClient.post("/products", { title });
    return res.data;
  }
);

export const updateProjectId = createAsyncThunk(
  "products/updateProjectId",
  async ({id, status, user}) => {
    const res = await axiosClient.patch(`/products/${id}`, {status, leadId: user});
    return res.data;
  }
)

export const deleteProject = createAsyncThunk(
  "products/deleteProject",
  async (projectId) => {
    await axiosClient.delete(`/products/${projectId}`);
    return projectId;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filterProducts: [],
    currentProject: null,
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
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.lists.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectId.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        const index = state.lists.findIndex(l => l.id === id);
        if (index > -1) {
          state.lists[index] = action.payload;
        }
        state.currentProject = action.payload;
      })
      .addCase(updateProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = state.lists.filter((l) => l.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilter } = productSlice.actions;
export default productSlice.reducer;