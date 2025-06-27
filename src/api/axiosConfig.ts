import axios from "axios";
import { clearAuth, getToken, setMemoryToken } from "@/utils/AuthStorage";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

// Attach Bearer token
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = new axios.AxiosHeaders();
      }
      (config.headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh token on 401
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post("/v1/auth/refresh-token", {
          withCredentials: true,
        });

        const newToken = refreshResponse.data.jwt;
        setMemoryToken(newToken);

        // Update the failed request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Clear user auth state if refresh fails
        clearAuth();
        window.location.href = "/login"; // or use your router
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
