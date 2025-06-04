import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const isAuthenticated = useState(true);
  return isAuthenticated ? <Outlet /> : <Navigate to="/register" />;
}

export function PublicRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
}
