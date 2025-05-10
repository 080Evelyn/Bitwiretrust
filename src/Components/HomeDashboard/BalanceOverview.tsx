import { useState } from "react";
import "./styles.css";
import { help_circle, password } from "../../assets";
import { FaEye } from "react-icons/fa";

const BalanceOverview = ({ pathName }: { pathName?: string }) => {
  const [hideBalance, setHideBalance] = useState(false);

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
              ) : (
                <>
                  152,000.<span className="decimal">00</span>
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
