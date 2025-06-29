import { MultipleUser, UserNotVerified, UserVerified } from "@/assets";

const Overview = () => {
  return (
    <div className="py-2">
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white rounded-lg py-4 px-2.5">
          <div className="flex items-center gap-2">
            <img src={MultipleUser} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Total Users</span>
              <span className="font-light text-[10px]">
                The Total number of registered users
              </span>
            </div>
          </div>
          <div className="flex font-semibold items-baseline">
            <span className="text-2xl"> 12300</span>
          </div>
        </div>
        <div className="bg-white rounded-lg py-4 px-2.5">
          <div className="flex items-center gap-2">
            <img src={UserVerified} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Verified Users</span>
              <span className="font-light text-[10px]">
                Total number of users with completed KYC verification
              </span>
            </div>
          </div>
          <div className="flex font-semibold items-baseline">
            <span className="text-2xl"> 12000</span>
          </div>
        </div>
        <div className="bg-white rounded-lg py-4 px-2.5">
          <div className="flex items-center gap-2">
            <img src={UserNotVerified} alt="icon" className="size-[30px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Unverified Users</span>
              <span className="font-light text-[10px]">
                Total number of users yet to complete KYC verification
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
