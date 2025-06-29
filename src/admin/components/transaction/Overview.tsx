import { AdminTrendingUp, DoubleTick } from "@/assets";

const Overview = () => {
  return (
    <div className="py-2">
      <div className="grid grid-cols-3 gap-2">
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
            <span className="text-2xl"> 120,000,000</span>
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
            <span className="text-2xl"> 4,000</span>
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
            <span className="text-2xl"> 12300</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
