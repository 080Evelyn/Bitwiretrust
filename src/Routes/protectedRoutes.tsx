import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "@/api/axiosConfig";
import { getToken, getUserId, getUserRole } from "@/utils/AuthStorage";
import MainLoader from "@/Components/seketon-loader/MainLoader";
// import { logo } from "@/assets";

export function UserProtectedRoute() {
  const { isLoading, isPinSet, isLoggingOut } = useAuth();
  const token = getToken();
  const userId = getUserId();
  const userRole = getUserRole();

  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/v1/user/wallet-service/profile/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data.data;
    },
    enabled: !!token && !!userId && isPinSet,
    staleTime: Infinity,
  });

  if (isLoggingOut) {
    return (
      <div className="fixed inset-0 z-[4000] bg-black/50 backdrop-blur-xs flex items-center justify-center">
        <div className="bg-white px-6 py-4 rounded-md shadow-lg flex items-center gap-2">
          <span className="text-sm font-medium">Logging out...</span>
          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (isLoading || isPending) {
    return <MainLoader />;
  }

  if (!token || !userId) {
    return <Navigate to="/login" replace />;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet context={{ user }} />;
}

export function AdminProtectedRoute() {
  const { isLoading } = useAuth();
  const userId = getUserId();
  const token = getToken();
  const userRole = getUserRole();

  if (isLoading) return <MainLoader />;

  if (!token || !userId) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export function PublicRoute() {
  const { isPinSet, isLoading } = useAuth();
  const userRole = getUserRole();
  const token = getToken();

  if (isLoading)
    return (
      <MainLoader />
      // <div className="flex gap-2 h-screen items-center justify-center">
      //   <div className="flex animate-pulse items-center">
      //     <img src={logo} alt="bitwire logo" className="h-5.5" />
      //     <span className="text-xl font-semibold">itwire</span>
      //   </div>
      //   <div className="size-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      // </div>
    );

  if (!!token && isPinSet) {
    if (userRole === "ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
