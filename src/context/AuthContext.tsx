import { clearAuth, getToken } from "@/utils/AuthStorage";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface AuthContextValue {
  isAuthenticated: boolean;
  isPinSet: boolean;
  ContextLogin: (token: string, isPinSet: boolean) => void;
  logout: () => void;
  isLoading: boolean;
  updatePinStatus: () => void;
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPinSet, setIsPinSet] = useState(false);
  const logoutTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const savedToken = getToken();
    const savedPasscode = localStorage.getItem("isPinSet") === "true";

    if (savedToken) {
      const isExpired = isTokenExpired(savedToken);
      if (isExpired) {
        clearAuth();
      } else {
        setToken(savedToken);
        setIsPinSet(savedPasscode);
        setLogoutTimer(savedToken);
      }
    }

    setIsLoading(false);
  }, []);

  const ContextLogin = (newToken: string, passcodeStatus: boolean) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("isPinSet", String(passcodeStatus));
    setToken(newToken);
    setIsPinSet(passcodeStatus);
    setLogoutTimer(newToken);
  };

  const updatePinStatus = () => {
    localStorage.setItem("isPinSet", "true");
    setIsPinSet(true);
  };

  const logout = async () => {
    setIsLoggingOut(true);

    const token = getToken();

    try {
      if (token) {
        await axios.post(
          `${url}/v1/auth/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      clearAuth();
      setToken(null);
      localStorage.removeItem("isPinSet");
      setIsPinSet(false);
      setIsLoggingOut(false);
    }
  };

  const isAuthenticated = !!token;

  function setLogoutTimer(token: string) {
    const decoded: { exp: number } = jwtDecode(token);
    const expiryTime = decoded.exp * 1000;
    const now = Date.now();
    const timeUntilExpiry = expiryTime - now;

    if (timeUntilExpiry > 0) {
      logoutTimeout.current = setTimeout(() => {
        logout();
        console.warn("Token expired — logged out automatically.");
      }, timeUntilExpiry);
    } else {
      logout();
    }
  }

  function isTokenExpired(token: string): boolean {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      console.error(error);
      return true;
    }
  }

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
