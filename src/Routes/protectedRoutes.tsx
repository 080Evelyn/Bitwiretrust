import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/register" />;
}

export function PublicRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
}
