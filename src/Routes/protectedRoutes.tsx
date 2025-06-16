import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getToken, getUserId } from "@/utils/AuthStorage";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading, isPinSet, isLoggingOut } = useAuth();

  const token = getToken();
  const userId = getUserId();

  const {
    data: user,
    isPending: isUserLoading,
    isError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/v1/user/wallet-service/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    },
    enabled: !!token && !!userId && isAuthenticated && isPinSet,
    staleTime: Infinity,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isLoggingOut)
    return (
      <div className="fixed inset-0 z-[4000] bg-black/50 backdrop-blur-xs flex items-center justify-center">
        <div className="bg-white px-6 py-4 rounded-md shadow-lg flex items-center gap-2">
          <span className="text-sm font-medium">Logging out...</span>
          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );

  if (!isAuthenticated || !token || !userId) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && isPinSet && user && !isUserLoading && !isError) {
    return <Outlet context={{ user }} />;
  }

  return <div>Loading...</div>;
}

export function PublicRoute() {
  const { isAuthenticated, isPinSet, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated && isPinSet) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
