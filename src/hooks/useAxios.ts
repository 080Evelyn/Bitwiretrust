import { useMemo } from "react";
import { createApiClient } from "@/lib/apiClient";
import { useAuth } from "@/context/AuthContext";

export function useAxios() {
  const { token, ContextLogin, logout } = useAuth();

  return useMemo(() => {
    return createApiClient(token, ContextLogin, logout);
  }, [token, ContextLogin, logout]);
}
