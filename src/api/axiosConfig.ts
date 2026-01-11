import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getToken, setMemoryToken, clearAuth } from "@/utils/AuthStorage";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (
    error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } }
  ) => {
    const originalRequest = error.config!;
    const status = error.response?.status;

    //  intercept 401/403, skip refresh-token endpoint itself, and only once per request
    if (
      (status === 401 || status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post<{ data: { accessToken: string } }>(
          "/v1/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        const newToken = refreshRes.data.data.accessToken;

        setMemoryToken(newToken);

        originalRequest.headers!["Authorization"] = `Bearer ${newToken}`;

        return axios(originalRequest);
      } catch (refreshErr) {
        clearAuth();
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
