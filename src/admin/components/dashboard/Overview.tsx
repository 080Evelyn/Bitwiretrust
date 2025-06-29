import { AdminTotalUsers, AdminTrendingUp } from "@/assets";

const Overview = () => {
  return (
    <div className="py-2">
      <div className="grid grid-cols-3 gap-2">
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
            <span className="text-2xl"> 4,000</span>
          </div>
          <div className="flex justify-end items-baseline gap-1">
            <span className="text-[10px]">Jan-Feb</span>
            <span className="text-[#7901b1] text-sm font-semibold">2025 </span>
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
            <span className="text-2xl"> 12300</span>
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
