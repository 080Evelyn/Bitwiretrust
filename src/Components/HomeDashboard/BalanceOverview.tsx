import { useState } from "react";
import "./styles.css";
import { help_circle, password } from "../../assets";
import { FaEye } from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";

const BalanceOverview = ({ pathName }: { pathName?: string }) => {
  const [hideBalance, setHideBalance] = useState(false);
  const isLoading = false;

  return (
    <div>
      <div className="total-balance">
        <div>
          <p>Total Balance</p>
          <img src={help_circle} alt="" />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <h2>
              ₦
              {hideBalance ? (
                "******"
              ) : !isLoading ? (
                <>
                  {(() => {
                    return (
                      <>
                        0.
                        <span className="decimal">00</span>
                      </>
                    );
                  })()}
                </>
              ) : (
                <>
                  <Skeleton className="inline-block ml-1 h-5 w-16" />
                </>
              )}
            </h2>

            {hideBalance ? (
              <FaEye
                className="size-8 cursor-pointer"
                onClick={() => setHideBalance(!hideBalance)}
              />
            ) : (
              <img
                src={password}
                onClick={() => setHideBalance(!hideBalance)}
                alt=""
              />
            )}
          </div>
          <span className="text-[20px] pt-8 pr-3 text-white tracking-[-0.17px]">
            {!pathName ? "" : pathName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BalanceOverview;
