import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "@/api/axiosConfig";
import { getToken, getUserId, getUserRole } from "@/utils/AuthStorage";
import MainLoader from "@/Components/seketon-loader/MainLoader";

// authentication check hook
function useAuthCheck() {
  const { isLoggingOut, isLoading } = useAuth();
  const token = getToken();
  const userId = getUserId();

  return {
    isLoggingOut,
    isAuthLoading: isLoading,
    isAuthenticated: !!token && !!userId,
    userRole: getUserRole(),
    userId,
  };
}

export function UserProtectedRoute() {
  const { isLoggingOut, isAuthLoading, isAuthenticated, userRole, userId } =
    useAuthCheck();
  const token = getToken();
  console.log("this is working");

  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/users/profile/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data;
    },
    enabled: isAuthenticated && userRole !== "ADMIN",
    staleTime: Infinity,
    retry: false,
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

  // Handle initial auth loading
  if (isAuthLoading) {
    return <MainLoader />;
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect admins to admin dashboard and prevent them from accessing users dashboard
  if (userRole === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Handle user data loading if everything checks
  if (isPending) {
    return <MainLoader />;
  }

  // Handle API errors and redirect to login
  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={{ user }} />;
}

export function AdminProtectedRoute() {
  const { isLoggingOut, isAuthLoading, isAuthenticated, userRole } =
    useAuthCheck();

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

  if (isAuthLoading) {
    return <MainLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect non-admins to user dashboard.
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
