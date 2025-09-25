import { useState, useMemo } from "react";
import { totalRevenue, totalTransactionCount } from "@/admin/api/dashboard";
import { AdminTotalUsers, AdminTrendingUp } from "@/assets";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/Components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/Components/ui/skeleton";
import { useTotalUserCount } from "@/admin/hooks/getAllUsers";

type MonthOption = {
  label: string;
  month: number;
  year: number;
};

const Overview = () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // this create options for only past & current month, no future month
  const monthOptions: MonthOption[] = useMemo(() => {
    const options: MonthOption[] = [];
    for (let m = 1; m <= currentMonth; m++) {
      const date = new Date(currentYear, m - 1);
      options.unshift({
        label:
          date.toLocaleString("default", { month: "short" }) +
          ` ${currentYear}`,
        month: m,
        year: currentYear,
      });
    }
    return options;
  }, [currentMonth, currentYear]);

  // const monthOptions: MonthOption[] = useMemo(() => {
  //   const options: MonthOption[] = [];
  //   for (let m = 1; m <= currentMonth; m++) {
  //     const date = new Date(currentYear, m - 1);
  //     const prevDate = new Date(currentYear, m - 2);
  //     const prevMonthLabel = prevDate.toLocaleString("default", {
  //       month: "short",
  //     });
  //     const currMonthLabel = date.toLocaleString("default", {
  //       month: "short",
  //     });
  //     options.unshift({
  //       label: `${prevMonthLabel}-${currMonthLabel} ${currentYear}`,
  //       month: m,
  //       year: currentYear,
  //     });
  //   }
  //   return options;
  // }, [currentMonth, currentYear]);

  const [selectedMonth, setSelectedMonth] = useState<MonthOption>(
    monthOptions[0]
  );

  const {
    data: totalUserCountResponse,
    isPending: totalUserCountPending,
    error: totalUserCountError,
    isError: totalUserCountIsError,
  } = useTotalUserCount();

  const totalUsers = totalUserCountResponse?.data?.totalCount ?? 0;

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

  const { isFetching: revenueIsFetching, data: totalRevenueResponse } =
    useQuery({
      queryKey: ["totalRevenue", selectedMonth.month, selectedMonth.year],
      queryFn: () =>
        totalRevenue({
          month: selectedMonth.month ?? currentMonth,
          year: selectedMonth.year ?? currentYear,
        }),
      staleTime: Infinity,
    });
  const totalRevenueGenerated = totalRevenueResponse?.data?.totalRevenue ?? 0;

  return (
    <div className="py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
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
            {revenueIsFetching ? (
              <Skeleton className="w-10 h-6 ml-1" />
            ) : (
              <>
                <span className="text-sm mr-1">N</span>
                <span className="text-2xl">
                  {new Intl.NumberFormat("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(totalRevenueGenerated)}
                </span>
              </>
            )}
          </div>
          <div className="flex justify-end items-baseline">
            <Select
              onValueChange={(value) => {
                const selected = monthOptions.find(
                  (opt) => `${opt.month}-${opt.year}` === value
                );
                if (selected) setSelectedMonth(selected);
              }}
            >
              <SelectTrigger className="self-end border-none outline-none !text-[#7901b1] !h-auto m-0 p-[1.5px] shadow-none">
                <span className="text-[10px]">{selectedMonth.label}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <div className="flex flex-col gap-1.5 mt-1">
                    <SelectLabel>Month</SelectLabel>
                    {monthOptions.map((opt) => (
                      <SelectItem
                        key={`${opt.month}-${opt.year}`}
                        value={`${opt.month}-${opt.year}`}
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </div>
                </SelectGroup>
              </SelectContent>
            </Select>
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
            <span className="text-2xl">
              {totalTransactionPending ? (
                <Skeleton className="h-6 w-15 pt-1" />
              ) : totalTransactionIsError ? (
                totalTransactionError
              ) : (
                totalTransactions
              )}
            </span>
          </div>
          <div className="flex justify-end items-baseline gap-1">
            <span className="text-[10px]">{selectedMonth.label}</span>
          </div>
        </div>

        {/* <div className="bg-white rounded-lg py-2 px-2.5">
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
            <span className="text-[10px]">{selectedMonth.label}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Overview;
