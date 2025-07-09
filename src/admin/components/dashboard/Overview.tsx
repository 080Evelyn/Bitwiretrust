import { totalTransactionCount, totalUsersCount } from "@/admin/api/dashboard";
import { AdminTotalUsers, AdminTrendingUp } from "@/assets";
import { useQuery } from "@tanstack/react-query";

const Overview = () => {
  const { data: totalUsersResponse } = useQuery({
    queryKey: ["totalUsersCount"],
    queryFn: totalUsersCount,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const totalNumberOfUsers = totalUsersResponse?.userTotalcount;

  const { data: totalTransactionResponse } = useQuery({
    queryKey: ["totalTransaction"],
    queryFn: totalTransactionCount,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const totalTransactions = totalTransactionResponse?.CREDIT;

  return (
    <div className="py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-white rounded-lg py-2 px-2.5">
          <div className="flex items-center gap-2">
            <img src={AdminTrendingUp} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Revenue generated</span>
              <span className="font-light text-[10px]">
                Total amount generated
              </span>
            </div>
          </div>
          <div className="flex font-semibold items-baseline">
            <span className="text-sm">N</span>
            <span className="text-2xl"> 120,000,000</span>
          </div>
          <div className="flex justify-end items-baseline gap-1">
            <span className="text-[10px]">Jan-Feb</span>
            <span className="text-[#7901b1] text-sm font-semibold">2025 </span>
          </div>
        </div>
        <div className="bg-white rounded-lg py-2 px-2.5">
          <div className="flex items-center gap-2">
            <img src={AdminTotalUsers} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Total Users</span>
              <span className="font-light text-[10px]">
                Total users generated
              </span>
            </div>
          </div>
          <div className="flex font-semibold items-baseline">
            <span className="text-2xl">{totalNumberOfUsers}</span>
          </div>
        </div>
        <div className="bg-white rounded-lg py-2 px-2.5">
          <div className="flex items-center gap-2">
            <img src={AdminTrendingUp} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Total Transaction</span>
              <span className="font-light text-[10px]">
                Total transaction made
              </span>
            </div>
          </div>
          <div className="flex font-semibold items-baseline">
            <span className="text-2xl">{totalTransactions}</span>
          </div>
          <div className="flex justify-end items-baseline gap-1">
            <span className="text-[10px]">Jan-Feb</span>
            <span className="text-[#7901b1] text-sm font-semibold">2025 </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
