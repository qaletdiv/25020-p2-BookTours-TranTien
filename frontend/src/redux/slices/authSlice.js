import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, name, phone }) => {
    const response = await axiosClient.post("/signup", { email, password, name, phone });
    return response.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await axiosClient.post("/login", { email, password });
    return response.data;
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: [],
    loading: false,
    error: null,
    accessToken: localStorage.getItem("accessToken") || null,
    user: localStorage.getItem("user") || null,
    //localstorage sản phẩm
  },
  reducers: {
    logout: (state) => {
        state.accessToken = null;
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Đăng ký thất bại";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.loading = false;
        state.error = null;
        state.accessToken = action.payload.accessToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = "Đăng nhập thất bại";
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;