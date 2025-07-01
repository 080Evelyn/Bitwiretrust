import axios from "axios";
import { getToken, clearAuth } from "@/utils/AuthStorage";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

// Attach Bearer token to all requests
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = new axios.AxiosHeaders();
      }
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//Interceptor to Handle 401 errors and also avoid infinite loop
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config._retry &&
      !error.config.url.includes("/auth/refresh-token")
    ) {
      clearAuth();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
