import SelectWallet from "@/Components/CryptoTrading/SelectWallet";
import TransactionHistory from "@/Components/CryptoTrading/TransactionHistory";
import Wallet from "@/Components/CryptoTrading/Wallet";
import BalanceOverview from "@/Components/HomeDashboard/BalanceOverview";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coin } from "@/types";
import { coinAssets } from "@/constants/coins";

const CryptoTrading = () => {
  const navigate = useNavigate();
  const [mobileStep, setMobileStep] = useState<1 | 2 | 3>(1);
  const [selectedCoin, setSelectedCoin] = useState<Coin>(coinAssets[0]);

  const handleSelectCoin = (coin: Coin) => {
    setSelectedCoin(coin);
    setMobileStep(2);
  };

  return (
    <div>
      <div className="hidden md:block">
        <BalanceOverview pathName="Trade Crypto" />
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-3 gap-3 w-full">
        <SelectWallet title="Select Wallet" onSelect={handleSelectCoin} />
        <Wallet coin={selectedCoin} />
        <TransactionHistory coin={selectedCoin} />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {mobileStep === 1 && (
          <>
            <button
              className="absolute cursor-pointer pt-7 px-5 top-3 left-3 text-sm z-10"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="size-5" />
            </button>
            <SelectWallet title="Select Wallet" onSelect={handleSelectCoin} />
          </>
        )}
        {mobileStep === 2 && (
          <>
            <button
              className="absolute cursor-pointer pt-7 px-5 top-3 left-3 text-sm z-10"
              onClick={() => setMobileStep(1)}
            >
              <ArrowLeft className="size-5" />
            </button>
            <Wallet coin={selectedCoin} />
            <TransactionHistory coin={selectedCoin} />
          </>
        )}
        {mobileStep === 3 && (
          <>
            <button
              className="absolute cursor-pointer pt-7 px-5 top-3 left-3 text-sm z-10"
              onClick={() => setMobileStep(2)}
            >
              <ArrowLeft className="size-5" />
            </button>
            <TransactionHistory coin={selectedCoin} />
          </>
        )}
      </div>
    </div>
  );
};

export default CryptoTrading;
