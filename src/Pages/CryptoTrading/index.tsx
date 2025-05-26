import SelectWallet from "@/Components/CryptoTrading/SelectWallet";
import TransactionHistory from "@/Components/CryptoTrading/TransactionHistory";
import Wallet from "@/Components/CryptoTrading/Wallet";
import BalanceOverview from "@/Components/HomeDashboard/BalanceOverview";
import { useState } from "react";
import { Coin } from "@/types";
import { coinAssets } from "@/constants/coins";
import BackArrowButton from "@/Components/ui/back-arrow-button";

const CryptoTrading = () => {
  const [mobileStep, setMobileStep] = useState<1 | 2>(1);
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
            <BackArrowButton pathName="/dashboard" />
            <SelectWallet title="Select Wallet" onSelect={handleSelectCoin} />
          </>
        )}
        {mobileStep === 2 && (
          <>
            <BackArrowButton onClick={() => setMobileStep(1)} />
            <Wallet coin={selectedCoin} />
            <TransactionHistory coin={selectedCoin} />
          </>
        )}
      </div>
    </div>
  );
};

export default CryptoTrading;
