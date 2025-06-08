import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null; // todo: loader here
  return isAuthenticated ? <Outlet /> : <Navigate to="/get-started" />;
}

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null; //todo: loader here

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
}
