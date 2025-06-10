import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading, isPasscodeSet } = useAuth();
  if (isLoading) return null; // todo: loader here
  if (isAuthenticated && isPasscodeSet) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
}

export function PublicRoute() {
  const { isAuthenticated, isPasscodeSet, isLoading } = useAuth();

  if (isLoading) return null; // todo: loader here

  if (isAuthenticated && isPasscodeSet) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
