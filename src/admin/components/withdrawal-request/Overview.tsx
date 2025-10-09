import { useWithdrawalRequestCount } from "@/admin/hooks/getWithdrawalRequestCount";
import { DoubleTick, MultipleUser, UserNotVerified } from "@/assets";
import { Skeleton } from "@/Components/ui/skeleton";

const WithdrawalRequestOverview = () => {
  const {
    data: pendingWithdrawalRequest,
    isPending: pendingWithdrawalRequestIsPending,
    error: pendingWithdrawalRequestError,
    isError: pendingWithdrawalRequestIsError,
  } = useWithdrawalRequestCount("pending");

  const totalPendingWithdrawalRequest =
    pendingWithdrawalRequest?.data?.count ?? 0;

  const {
    data: successfulWithdrawalRequest,
    isPending: successfulWithdrawalRequestIsPending,
    error: successfulWithdrawalRequestError,
    isError: successfulWithdrawalRequestIsError,
  } = useWithdrawalRequestCount("success");

  const totalSuccessfulWithdrawalRequest =
    successfulWithdrawalRequest?.data?.count ?? 0;

  const totalWithdrawalRequest =
    totalPendingWithdrawalRequest + totalSuccessfulWithdrawalRequest || 0;

  return (
    <div className="py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-white rounded-lg py-4 px-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <img src={MultipleUser} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">
                Total Withdrawal Requests
              </span>
              <span className="font-light text-[10px]">
                The Total number of withdrawal requests
              </span>
            </div>
          </div>
          <div className="flex font-semibold items-baseline px-1">
            <span className="text-2xl">
              {pendingWithdrawalRequestIsPending ||
              successfulWithdrawalRequestIsPending ? (
                <Skeleton className="h-6 w-15 pt-1" />
              ) : pendingWithdrawalRequestIsError ? (
                pendingWithdrawalRequestError
              ) : (
                totalWithdrawalRequest
              )}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg py-4 px-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <img src={DoubleTick} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">
                Successful Withdrawal Requests
              </span>
              <span className="font-light text-[10px]">
                Total number of successful withdrawal requests
              </span>
            </div>
          </div>
          <div className="flex font-semibold justify-baseline items-baseline px-1">
            <span className="text-2xl">
              {successfulWithdrawalRequestIsPending ? (
                <Skeleton className="h-6 w-15 pt-1" />
              ) : successfulWithdrawalRequestIsError ? (
                successfulWithdrawalRequestError
              ) : (
                totalSuccessfulWithdrawalRequest
              )}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg py-4 px-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <img src={UserNotVerified} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">
                Pending Withdrawal Requests
              </span>
              <span className="font-light text-[10px]">
                Total number of pending withdrawal requests
              </span>
            </div>
          </div>
          <div className="flex font-semibold justify-baseline items-baseline px-1">
            <span className="text-2xl">
              {pendingWithdrawalRequestIsPending ? (
                <Skeleton className="h-6 w-15 pt-1" />
              ) : pendingWithdrawalRequestIsError ? (
                pendingWithdrawalRequestError
              ) : (
                totalPendingWithdrawalRequest
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalRequestOverview;
