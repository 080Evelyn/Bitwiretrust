import { totalTransactionCount } from "@/admin/api/transactions";
import { AdminTrendingUp, DoubleTick } from "@/assets";
import { Skeleton } from "@/Components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

type StatCardProps = {
  icon: string;
  title: string;
  subtitle: string;
  value: number | string | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
};

const StatCard = ({
  icon,
  title,
  subtitle,
  value,
  isLoading,
  isError,
  error,
}: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg py-4 px-2.5">
      <div className="flex items-center gap-2">
        <img src={icon} alt="icon" className="size-[30px]" />
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{title}</span>
          <span className="font-light text-[10px]">{subtitle}</span>
        </div>
      </div>
      <div className="flex font-semibold items-baseline">
        <span className="text-2xl">
          {isLoading ? (
            <Skeleton className="h-6 w-15 pt-1" />
          ) : isError ? (
            String(error)
          ) : (
            value
          )}
        </span>
      </div>
    </div>
  );
};

const Overview = () => {
  const {
    data: totalTransactionResponse,
    isPending,
    error,
    isError,
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

  const stats = [
    {
      icon: AdminTrendingUp,
      title: "Total Transaction Made",
      subtitle: "The total transaction made",
      value: totalTransactions,
    },
    {
      icon: DoubleTick,
      title: "Successful Transaction",
      subtitle: "Total successful transaction made",
      value: counts.SUCCESS ?? 0,
    },
    {
      icon: AdminTrendingUp,
      title: "Failed Transaction",
      subtitle: "Total unsuccessful transaction made",
      value: counts.FAILED ?? 0,
    },
  ];

  return (
    <div className="py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            icon={stat.icon}
            title={stat.title}
            subtitle={stat.subtitle}
            value={stat.value}
            isLoading={isPending}
            isError={isError}
            error={error}
          />
        ))}
      </div>
    </div>
  );
};

export default Overview;
