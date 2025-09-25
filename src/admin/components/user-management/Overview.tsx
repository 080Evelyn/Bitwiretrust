import { totalUnverifiedKyc } from "@/admin/api/kyc";
import { totalKycVerified } from "@/admin/api/user-managment";
import { useTotalUserCount } from "@/admin/hooks/getAllUsers";
import { MultipleUser, UserNotVerified, UserVerified } from "@/assets";
import { Skeleton } from "@/Components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

const Overview = () => {
  const {
    data: totalUserCountResponse,
    isPending: totalUserCountPending,
    error: totalUserCountError,
    isError: totalUserCountIsError,
  } = useTotalUserCount();

  const totalUsers = totalUserCountResponse?.data?.totalCount ?? 0;

  const {
    data: totalKycVerifiedResponse,
    isPending: totalKycVerifiedPending,
    error: totalKycVerifiedError,
    isError: totalKycVerifiedIsError,
  } = useQuery({
    queryKey: ["totalKycVerified"],
    queryFn: totalKycVerified,
    staleTime: Infinity,
  });
  const totalKycVerifiedUsers = totalKycVerifiedResponse?.data?.count ?? 0;

  const {
    data: totalKycUnverifiedResponse,
    isPending: totalKycUnverifiedPending,
    error: totalKycUnverifiedError,
    isError: totalKycUnverifiedIsError,
  } = useQuery({
    queryKey: ["totalKycUnverified"],
    queryFn: totalUnverifiedKyc,
    staleTime: Infinity,
  });
  const totalKycUnverified = totalKycUnverifiedResponse?.data ?? 0;

  return (
    <div className="py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-white rounded-lg py-4 px-2.5">
          <div className="flex items-center gap-2">
            <img src={MultipleUser} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Total Users</span>
              <span className="font-light text-[10px]">
                The Total number of registered users
              </span>
            </div>
          </div>
          <div className="flex font-semibold items-baseline">
            <span className="text-2xl">
              {totalUserCountPending ? (
                <Skeleton className="h-6 w-15 pt-1" />
              ) : totalUserCountIsError ? (
                totalUserCountError
              ) : (
                totalUsers
              )}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg py-4 px-2.5">
          <div className="flex items-center gap-2">
            <img src={UserVerified} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Verified Users</span>
              <span className="font-light text-[10px]">
                Total number of users with completed KYC verification
              </span>
            </div>
          </div>
          <div className="flex font-semibold items-baseline">
            <span className="text-2xl">
              {totalKycVerifiedPending ? (
                <Skeleton className="h-6 w-15 pt-1" />
              ) : totalKycVerifiedIsError ? (
                totalKycVerifiedError
              ) : (
                totalKycVerifiedUsers
              )}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg py-4 px-2.5">
          <div className="flex items-center gap-2">
            <img src={UserNotVerified} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Unverified Users</span>
              <span className="font-light text-[10px]">
                Total number of users yet to complete KYC verification
              </span>
            </div>
          </div>
          <div className="flex font-semibold items-baseline">
            <span className="text-2xl">
              {totalKycUnverifiedPending ? (
                <Skeleton className="h-6 w-15 pt-1" />
              ) : totalKycUnverifiedIsError ? (
                totalKycUnverifiedError
              ) : (
                totalKycUnverified
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
