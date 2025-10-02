import { totalTransactionCount } from "@/admin/api/transactions";
import { AdminTrendingUp, DoubleTick } from "@/assets";
import { Skeleton } from "@/Components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

const Overview = () => {
  const {
    data: totalTransactionResponse,
    isPending: totalTransactionPending,
    error: totalTransactionError,
    isError: totalTransactionIsError,
  } = useQuery({
    queryKey: ["totalTransaction"],
    queryFn: totalTransactionCount,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const counts = totalTransactionResponse?.data?.counts ?? {};
  const totalTransactions =
    (counts.SUCCESS ?? 0) + (counts.PENDING ?? 0) + (counts.FAILED ?? 0);

  return (
    <div className="py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-white rounded-lg py-4 px-2.5">
          <div className="flex items-center gap-2">
            <img src={AdminTrendingUp} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">
                Total Transaction Made
              </span>
              <span className="font-light text-[10px]">
                The Total transaction made
              </span>
            </div>
          </div>
          <div className="flex font-semibold items-baseline">
            <span className="text-2xl">
              {" "}
              <span className="text-2xl">
                {totalTransactionPending ? (
                  <Skeleton className="h-6 w-15 pt-1" />
                ) : totalTransactionIsError ? (
                  totalTransactionError
                ) : (
                  totalTransactions
                )}
              </span>{" "}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg py-4 px-2.5">
          <div className="flex items-center gap-2">
            <img src={DoubleTick} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">
                Successful Transaction
              </span>
              <span className="font-light text-[10px]">
                Total successful transaction made
              </span>
            </div>
          </div>
          <div className="flex font-semibold items-baseline">
            <span className="text-2xl">
              <span className="text-2xl">
                {totalTransactionPending ? (
                  <Skeleton className="h-6 w-15 pt-1" />
                ) : totalTransactionIsError ? (
                  totalTransactionError
                ) : (
                  counts.SUCCESS
                )}
              </span>
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg py-4 px-2.5">
          <div className="flex items-center gap-2">
            <img src={AdminTrendingUp} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Failed Transaction</span>
              <span className="font-light text-[10px]">
                Total unsuccessful transaction made
              </span>
            </div>
          </div>
          <div className="flex font-semibold items-baseline">
            <span className="text-2xl">
              <span className="text-2xl">
                {totalTransactionPending ? (
                  <Skeleton className="h-6 w-15 pt-1" />
                ) : totalTransactionIsError ? (
                  totalTransactionError
                ) : (
                  counts.FAILED
                )}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
