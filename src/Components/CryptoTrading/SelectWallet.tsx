import { useEffect, useState } from "react";
import { SearchIcon } from "@/assets";
import { Input } from "../ui/input";
import { coinAssets } from "@/constants/coins";
import { Coin, SelectWalletProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { fetchWallets } from "@/api/crypto";

const SelectWallet = ({
  title = "Select Wallet",
  onSelect,
}: SelectWalletProps) => {
  const [selectedCardId, setSelectedCardId] = useState<string>(
    coinAssets[0].id
  );

  const mutateWallets = useMutation({
    mutationFn: fetchWallets,
  });

  useEffect(() => {
    mutateWallets.mutate();
    console.log(mutateWallets.data);
  }, []);

  const handleSelect = (coin: Coin) => {
    setSelectedCardId(coin.id);
    if (onSelect) {
      onSelect(coin);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-medium hidden md:block desktop-card-container rounded-[4px] py-1.75">
        Select Wallet
      </div>
      <div className="md:hidden absolute top-3 left-1/2 transform -translate-x-1/2 pt-6.5 flex font-semibold">
        {title}
      </div>

      <div className="flex flex-col gap-2 desktop-card-container rounded-md p-2 md:max-h-[14.4rem]">
        <div className="w-full relative">
          <Input
            type="search"
            placeholder="Search..."
            className="h-9 w-full !pl-9 !rounded-[4.7px]"
          />
          <img src={SearchIcon} className="absolute size-4 top-3 left-3" />
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto">
          {coinAssets.map((coin) => (
            <div
              key={coin.id}
              onClick={() => handleSelect(coin)}
              className={`flex font-medium justify-between py-4 md:py-1.5 px-1.5 md:px-2.5 rounded-sm cursor-pointer ${
                selectedCardId === coin.id
                  ? "md:bg-[#28003E] md:text-white bg-[#F8F8F8]"
                  : "bg-[#F8F8F8] "
              }`}
            >
              <div className="flex gap-2 items-center">
                <img src={coin.image} alt={coin.name} className="size-8" />
                <span className="text-sm">{coin.name}</span>
              </div>
              <div
                className="flex flex-col items-end gap-1 tracking-[-0.12px]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <span className="text-xs font-medium ">
                  {coin.amount} {coin.symbol}
                </span>
                <span className="text-[10px]">{coin.value} NGN</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectWallet;
