import { useState } from "react";
import "./styles.css";
import { help_circle, password } from "../../assets";
import { FaEye } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { dvaInfo } from "@/api/wallet-service";

const BalanceOverview = ({ pathName }: { pathName?: string }) => {
  const [hideBalance, setHideBalance] = useState(false);
  const { data: dvaData } = useQuery({
    queryKey: ["dvaInfo"],
    queryFn: dvaInfo,
  });

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
              ) : dvaData ? (
                <>
                  {(() => {
                    const balance = Number(dvaData.data.walletBalance).toFixed(
                      2
                    );
                    const [intPart, decPart] = balance.split(".");
                    const formattedInt = Number(intPart).toLocaleString();
                    return (
                      <>
                        {formattedInt}.
                        <span className="decimal">{decPart}</span>
                      </>
                    );
                  })()}
                </>
              ) : (
                <>
                  0.<span className="decimal">00</span>
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
