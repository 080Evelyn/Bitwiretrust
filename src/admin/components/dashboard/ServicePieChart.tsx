import { ServiceStatsIcon } from "@/assets";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Gift Cards", value: 52.1, color: "red" },
  { name: "Airtime/Data", value: 22.8, color: "#0038FF" },
  { name: "Utility bills", value: 13.9, color: "#16D005" },
  { name: "Coins", value: 11.2, color: "#FFBC03" },
];

const ServicePieChart = () => {
  return (
    <div className="p-4 rounded-2xl bg-white w-full">
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
                data={data}
                dataKey="value"
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
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || "#ccc"} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center gap-1">
          {data.map((item) => (
            <div
              className="flex justify-between items-center text-[10px] font-semibold w-full lg:ml-2"
              key={item.name}
            >
              <span className="flex items-center">
                <span
                  className="inline-block w-2 h-2 mr-2 rounded-full"
                  style={{ backgroundColor: item.color || "#ccc" }}
                />

                {item.name}
              </span>
              <span>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePieChart;
