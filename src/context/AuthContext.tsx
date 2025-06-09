import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  isPasscodeSet: boolean;
  ContextLogin: (token: string, isPasscodeSet: boolean) => void;
  logout: () => void;
  isLoading: boolean;
  updatePasscodeStatus: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPasscodeSet, setIsPasscodeSet] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedPasscode = localStorage.getItem("isPasscodeSet") === "true";
    setToken(savedToken);
    setIsPasscodeSet(savedPasscode);
    setIsLoading(false);
  }, []);

  const ContextLogin = (newToken: string, passcodeStatus: boolean) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("isPasscodeSet", String(passcodeStatus));
    setToken(newToken);
    setIsPasscodeSet(passcodeStatus);
  };

  const updatePasscodeStatus = () => {
    localStorage.setItem("isPasscodeSet", "true");
    setIsPasscodeSet(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isPasscodeSet,
        ContextLogin,
        logout,
        isLoading,
        updatePasscodeStatus,
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
