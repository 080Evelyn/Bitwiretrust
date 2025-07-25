import { createContext, useContext, useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "@/api/axiosConfig";
import { clearAuth, setMemoryToken } from "@/utils/AuthStorage";

interface AuthContextValue {
  isAuthenticated: boolean;
  isPinSet: boolean;
  ContextLogin: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
  updatePinStatus: () => void;
  isLoggingOut: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isPinSet, setIsPinSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const refreshTimer = useRef<NodeJS.Timeout | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Try to refresh token on page load
  useEffect(() => {
    refreshToken().finally(() => {
      setIsLoading(false);
    });

    return () => {
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
    };
  }, []);

  useEffect(() => {
    setMemoryToken(token);
  }, [token]);

  // Passing the token from login to the context login here
  const ContextLogin = (newToken: string) => {
    setToken(newToken);
    scheduleRefresh(newToken);
  };

  // Auto-refresh 30s before token expiry
  const scheduleRefresh = (token: string) => {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      const delay = exp * 1000 - Date.now() - 30_000;
      if (delay > 0) {
        if (refreshTimer.current) clearTimeout(refreshTimer.current);
        refreshTimer.current = setTimeout(refreshToken, delay);
      }
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  };

  // Refresh token from backend cookie
  const refreshToken = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/v1/auth/refresh-token`,
        {},
        {
          withCredentials: true,
        }
      );

      const newToken = res.data.data.jwt;
      setToken(newToken);
      setMemoryToken(newToken);
      scheduleRefresh(newToken);
    } catch (err) {
      console.error("Token refresh failed:", err);
      refreshTokenLogout();
    }
  };

  const refreshTokenLogout = async () => {
    const isOffline = !window.navigator.onLine;

    if (isOffline) {
      console.warn("Offline — Waiting for reconnection.");
    } else {
      try {
        await axios.post(
          `${API_URL}/v1/auth/logout`,
          {},
          { withCredentials: true }
        );
      } catch (error) {
        console.warn("Logout failed, proceeding anyway:", error);
      }
    }

    setToken(null);
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
  };

  // Logout
  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await axios.post(
        `${API_URL}/v1/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.warn("Logout failed, proceeding anyway:", error);
    } finally {
      setToken(null);
      clearAuth();
      setIsPinSet(false);
      localStorage.removeItem("isPinSet");
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
      setIsLoggingOut(false);
    }
  };

  const updatePinStatus = () => {
    localStorage.setItem("isPinSet", "true");
    setIsPinSet(true);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isPinSet,
        ContextLogin,
        logout,
        isLoading,
        updatePinStatus,
        isLoggingOut,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
