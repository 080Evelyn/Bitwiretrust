import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosError,
} from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface RefreshResponse {
  jwt: string;
}

export function createApiClient(
  token: string | null,
  ContextLogin: (t: string, b: boolean) => void,
  logout: () => void
): AxiosInstance {
  const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      if (token) {
        if (config.headers) {
          (config.headers as Record<string, string>)[
            "Authorization"
          ] = `Bearer ${token}`;
        } else {
          config.headers = {} as import("axios").AxiosRequestHeaders;
        }
        (config.headers as Record<string, string>)[
          "Authorization"
        ] = `Bearer ${token}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshRes = await axios.post<RefreshResponse>(
            `${API_URL}/v1/auth/refresh-token`,
            {},
            { withCredentials: true }
          );
          const newToken = refreshRes.data.jwt;
          ContextLogin(newToken, true);
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };
          return instance(originalRequest);
        } catch {
          logout();
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
}
