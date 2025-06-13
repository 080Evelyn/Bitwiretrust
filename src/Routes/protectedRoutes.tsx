import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading, isPasscodeSet, isLoggingOut } = useAuth();
  if (isLoading) return null; // todo: loader here

  if (isLoggingOut)
    return (
      <div className="fixed inset-0 z-[4000] bg-black/50 backdrop-blur-xs flex items-center justify-center">
        <div className="bg-white px-6 py-4 rounded-md shadow-lg flex items-center gap-2">
          <span className="text-sm font-medium">Logging out...</span>
          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );

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
