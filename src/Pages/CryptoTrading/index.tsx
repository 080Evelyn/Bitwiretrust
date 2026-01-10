import SelectWallet from "@/Components/CryptoTrading/SelectWallet";
import TransactionHistory from "@/Components/CryptoTrading/TransactionHistory";
import Wallet from "@/Components/CryptoTrading/Wallet";
import BalanceOverview from "@/Components/HomeDashboard/BalanceOverview";
import { useState } from "react";

import BackArrowButton from "@/Components/ui/back-arrow-button";
import { useQuery } from "@tanstack/react-query";
import { fetchWallets } from "@/api/crypto";
import { WalletProps } from "@/types/crypto";

const CryptoTrading = () => {
  const [mobileStep, setMobileStep] = useState<1 | 2>(1);

  const {
    isPending: selectedWalletsPending,
    data: walletsResponse,
    error: selectedWalletsError,
  } = useQuery({
    queryFn: fetchWallets,
    queryKey: ["all-wallets"],
    staleTime: 5 * 60 * 1000,
  });

  const wallets = walletsResponse?.data.data ?? [];

  const [selectedCoin, setSelectedCoin] = useState<WalletProps>(wallets[0]);
  const handleSelectCoin = (wallet: WalletProps) => {
    setSelectedCoin(wallet);
    setMobileStep(2);
  };

  return (
    <>
      <div className="hidden md:block">
        <BalanceOverview pathName="Trade Crypto" />
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-3 gap-3 w-full">
        <SelectWallet
          title="Select Wallet"
          onSelect={handleSelectCoin}
          wallets={wallets}
          isPending={selectedWalletsPending}
          error={selectedWalletsError}
        />
        <Wallet coin={selectedCoin} />
        <TransactionHistory coin={selectedCoin} />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {mobileStep === 1 && (
          <>
            <BackArrowButton pathName="/dashboard" />
            <SelectWallet
              title="Select Wallet"
              onSelect={handleSelectCoin}
              wallets={wallets}
              isPending={selectedWalletsPending}
              error={selectedWalletsError}
            />
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
    </>
  );
};

export default CryptoTrading;
