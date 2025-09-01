import { useState } from "react";
import { SearchIcon } from "@/assets";
import { Input } from "../ui/input";
import { SelectWalletProps, WalletProps } from "@/types/crypto";

const SelectWallet = ({
  title = "Select Wallet",
  onSelect,
  wallets,
  isPending,
  error,
}: SelectWalletProps) => {
  const [selectedCardId, setSelectedCardId] = useState<string>(
    wallets[0]?.name
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (wallet: WalletProps) => {
    setSelectedCardId(wallet?.name);
    onSelect?.(wallet);
  };

  const filteredWallets = wallets
    ? wallets.filter(
        (wallet: WalletProps) =>
          wallet.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          wallet.currency?.toLowerCase().includes(searchTerm?.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-medium hidden md:block desktop-card-container rounded-[4px] py-1.75">
        Select Wallet
      </div>
      <div className="md:hidden absolute top-3 left-1/2 transform -translate-x-1/2 pt-6.5 flex font-semibold">
        {title}
      </div>

      <div className="flex flex-col gap-2 desktop-card-container rounded-md p-2 h-[80vh] md:max-h-[14.4rem]">
        <div className="w-full relative">
          <Input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-full !pl-9 !rounded-[4.7px]"
          />
          <img
            src={SearchIcon}
            className="absolute size-4 top-3 left-3"
            alt="Search"
          />
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto">
          {isPending ? (
            <span className="text-sm text-center">Loading...</span>
          ) : error ? (
            <span className="text-sm text-center text-red-500">
              Error loading wallets
            </span>
          ) : filteredWallets.length > 0 ? (
            filteredWallets.map((wallet: WalletProps) => (
              <div
                key={wallet.name}
                onClick={() => handleSelect(wallet)}
                className={`flex font-medium justify-between py-4 md:py-1.5 px-1.5 md:px-2.5 rounded-sm cursor-pointer ${
                  selectedCardId === wallet?.name
                    ? "md:bg-[#28003E] md:text-white bg-[#F8F8F8]"
                    : "bg-[#F8F8F8]"
                }`}
              >
                <div className="flex gap-2 items-center">
                  <span className="text-sm">{wallet?.name}</span>
                </div>
                <div
                  className="flex flex-col items-end gap-1 tracking-[-0.12px]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <span className="text-xs font-medium">{wallet?.balance}</span>
                  <span className="text-[10px]">
                    {wallet?.converted_balance} NGN
                  </span>
                </div>
              </div>
            ))
          ) : (
            <span className="text-sm text-center">No Wallets Found</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectWallet;
