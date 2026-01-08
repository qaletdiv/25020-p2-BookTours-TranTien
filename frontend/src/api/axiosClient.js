import axios from "axios";
import { logout } from '../redux/slices/authSlice';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://backend-luaviet.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupInterceptors = (store) => {
  axiosClient.interceptors.request.use(
    (config) => {
      const accessToken = store.getState().auth.accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response, config: originalRequest } = error;
      if (
        response &&
        (response.status === 401 || response.status === 403) &&
        originalRequest.url !== "/login"
      ) {
        store.dispatch(logout());
      }
      return Promise.reject(error);
    }
  );
};

export default axiosClient;