import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { userEngagement } from "@/admin/api/dashboard";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/Components/ui/select";
import { MONTHS } from "@/admin/constant";

const EngagementBarChart = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const currentYear = new Date().getFullYear();
  const { data: userEngagementResponse } = useQuery({
    queryKey: ["userEngagement"],
    queryFn: () => userEngagement({ year: currentYear }),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const chartData = userEngagementResponse?.data.monthlyEngagement ?? [];

  const formattedChartData = MONTHS.map((month, index) => ({
    name: month,
    value: Number(chartData[index + 1] || 0),
    color: "#DADADA",
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;

      return (
        <div
          className="text-center"
          style={{
            backgroundColor: "#7901b1",
            borderRadius: "8px",
            padding: "6px 10px",
            color: "white",
            fontSize: "10px",
          }}
        >
          <div>User Engagement</div>
          <div style={{ fontWeight: 600, fontSize: "18px" }}>{value}%</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-4 rounded-2xl bg-white w-full">
      <div className="pb-5 pt-2 flex justify-between items-center">
        <div className="flex gap-1 font-semibold text-xs text-[#7901b1]">
          <UserPlus className="size-4 fill-[#7901b1]" />
          <span>Users Engagement</span>
        </div>
        <Select>
          <SelectTrigger className="self-end border-none outline-none !text-[#7901b1] !h-auto m-0 p-[1.5px] shadow-none">
            <span className="text-xs font-semibold">Jan-Dec {currentYear}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <div className="flex flex-col gap-1.5 mt-1">
                <SelectLabel>Year</SelectLabel>
                <SelectItem value="2025">2025</SelectItem>
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={200} className="mt-3">
        <BarChart
          data={formattedChartData}
          margin={{
            top: 20,
            right: 15,
            left: -25,
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fontWeight: 700, fill: "#7901b1" }}
            className="text-sm text-black/40"
            padding={{ left: 10 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[0, 25, 50, 75, 100]}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            tick={{ fontSize: 10, fontWeight: 600, fill: "#7901b1" }}
          />

          <Tooltip content={<CustomTooltip />} cursor={false} />

          <Bar
            dataKey="value"
            barSize={10}
            radius={[8, 8, 0, 0]}
            onMouseOver={(_, index) => setActiveIndex(index)}
          >
            {formattedChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  activeIndex === index
                    ? "rgba(183, 31, 255, 0.4)"
                    : entry.color
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementBarChart;
