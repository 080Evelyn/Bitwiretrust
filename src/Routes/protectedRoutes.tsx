import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getUserId } from "@/utils/AuthStorage";
import MainLoader from "@/Components/seketon-loader/MainLoader";
// import { logo } from "@/assets";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading, isPinSet, isLoggingOut, token } =
    useAuth();

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

  if (isLoading) return <MainLoader />;

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

  return <MainLoader />;
}

export function PublicRoute() {
  const { isAuthenticated, isPinSet, isLoading } = useAuth();

  if (isLoading)
    return (
      <MainLoader />
      // <div className="flex gap-2 h-screen items-center justify-center">
      //   <div className="flex animate-pulse items-center">
      //     <img src={logo} alt="bitwire logo" className="h-5.5" />
      //     <span className="text-2xl font-semibold">itwire</span>
      //   </div>
      //   <div className="size-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      // </div>
    );

  if (isAuthenticated && isPinSet) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
