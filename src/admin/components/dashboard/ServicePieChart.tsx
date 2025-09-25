import { serviceStatsFn } from "@/admin/api/dashboard";
import { serviceConfig } from "@/admin/constant";
import { ServiceStatsIcon } from "@/assets";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface ServiceItem {
  serviceName: string;
  engagedUsers: number;
  engagementRate: number;
}

interface ChartDataItem {
  name: string;
  serviceName: string;
  engagementRate: number;
  color: string;
  engagedUsers?: number;
}

const ServicePieChart = () => {
  const { data: serviceStatResponse } = useQuery({
    queryKey: ["serviceStats"],
    queryFn: () => serviceStatsFn({ year: 2025 }),
  });

  const serviceStat = serviceStatResponse?.data ?? [];

  // merge API data with config to make name & color available since API doesn't provide it
  const mergedData = serviceStat.map((item: ServiceItem) => {
    const config = serviceConfig.find(
      (c) => c.serviceName === item.serviceName
    );

    return {
      ...item,
      name: config?.name || item.serviceName,
      color: config?.color || "#ccc",
    };
  });

  return (
    <div className="p-4 rounded-2xl bg-white size-full">
      <div className="flex items-center gap-2 py-2">
        <span className="font-semibold text-xs text-[#7901b1]">
          Services Stats
        </span>
        <img src={ServiceStatsIcon} alt="service icon" />
      </div>
      <div className="grid grid-cols-1 relative">
        <div className="relative h-[150px] w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center font-semibold text-sm text-center w-[80px] pointer-events-none">
            <span className="text-[8.6px] font-semibold leading-none">
              User Engagement
              <br />
              Percentage
            </span>
            <span className="font-semibold text-[17px] text-[#7901b1]">
              100%
            </span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mergedData}
                dataKey="engagementRate"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={65}
                innerRadius={52}
                stroke="none"
                paddingAngle={4}
                cornerRadius={3}
                startAngle={90}
                endAngle={480}
              >
                {mergedData.map((entry: ChartDataItem) => (
                  <Cell key={`cell-${entry.serviceName}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(engagementRate) =>
                  `${Number(engagementRate).toFixed(2)}%`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center gap-1">
          {mergedData.map((item: ChartDataItem) => (
            <div
              className="flex justify-between items-center text-[10px] font-semibold w-full lg:ml-2"
              key={item.serviceName}
            >
              <span className="flex items-center">
                <span
                  className="inline-block w-2 h-2 mr-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </span>
              <span>{item.engagementRate.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePieChart;
