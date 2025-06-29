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
import { ChevronDown, UserPlus } from "lucide-react";

const data = [
  { name: "Jan", value: 60, color: "#DADADA" },
  { name: "Feb", value: 74, color: "#DADADA" },
  { name: "Mar", value: 11, color: "#DADADA" },
  { name: "Apr", value: 34, color: "#DADADA" },
  { name: "May", value: 98, color: "#DADADA" },
  { name: "Jun", value: 60, color: "#DADADA" },
  { name: "Jul", value: 44, color: "#DADADA" },
  { name: "Aug", value: 9, color: "#DADADA" },
  { name: "Sep", value: 88, color: "#DADADA" },
  { name: "Oct", value: 68, color: "#DADADA" },
  { name: "Nov", value: 25, color: "#DADADA" },
  { name: "Dec", value: 52, color: "#DADADA" },
];

const EngagementBarChart = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
        <div className="flex text-xs font-semibold items-center text-[#7901b1] gap-2">
          <span>Jan-Dec 2025</span>
          <ChevronDown className="size-4.5" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200} className="mt-3">
        <BarChart
          data={data}
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
            {data.map((entry, index) => (
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
