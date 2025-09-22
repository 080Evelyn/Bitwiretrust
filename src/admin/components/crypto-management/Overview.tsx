import { AdminCheckMark, AdminThumbdown, MultipleUser } from "@/assets";

const Overview = () => {
  return (
    <div className="py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-white rounded-lg py-4 px-2.5">
          <div className="flex items-center gap-2">
            <img src={MultipleUser} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Crypto Volume</span>
              <span className="font-light text-[10px]">
                The Total number of crypto transacted
              </span>
            </div>
          </div>
          <div className="flex font-semibold items-baseline">
            <span className="text-2xl"> 12300</span>
          </div>
        </div>
        <div className="bg-white rounded-lg py-4 px-2.5">
          <div className="flex items-center gap-2">
            <img src={AdminCheckMark} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Crypto Deposit</span>
              <span className="font-light text-[10px]">
                Total number of users with completed crypto deposit
              </span>
            </div>
          </div>
          <div className="flex font-semibold items-baseline">
            <span className="text-2xl"> 12000</span>
          </div>
        </div>
        <div className="bg-white rounded-lg py-4 px-2.5">
          <div className="flex items-center gap-2">
            <img src={AdminThumbdown} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Crypto Withdrawal</span>
              <span className="font-light text-[10px]">
                Total number of users with completed crypto withdrawal
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
