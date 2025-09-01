import { QrCode, solar_copy } from "@/assets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { CoinWalletProps } from "@/types/crypto";
import { Check } from "lucide-react";
import { useState } from "react";

const Deposit = ({ coinWalletAddress }: { coinWalletAddress: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const walletAddress = document.getElementById("wallet-address");
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress.textContent || "");
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <img src={QrCode} alt="qr code" className="max-w-[14.2rem] max-md:my-4" />
      <div className="flex justify-between items-center w-full">
        <span className="font-semibold tracking-[-0.17px]">Wallet Address</span>
        <div className="flex items-center gap-1.5 font-medium text-sm tracking-[-0.17px]">
          {copied ? (
            <>
              <span>Copied</span>
              <Check className="size-5 text-[#7910B1]" />
            </>
          ) : (
            <div
              className="flex items-center gap-1.5 cursor-pointer"
              onClick={handleCopy}
            >
              <span>Copy Address</span>
              <img
                src={solar_copy}
                alt="copy icon"
                className="size-5 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
      <div
        id="wallet-address"
        className="bg-[#F9EDFF] w-full py-4 rounded-md text-[15px] text-center font-medium tracking-[-0.17px]"
      >
        {coinWalletAddress}
      </div>
    </div>
  );
};

const Withdraw = () => {
  return <div>Comming soon</div>;
};

const DepositModal = ({ coin }: CoinWalletProps) => {
  const coinWalletAddress = coin?.deposit_address || "";

  return (
    <div>
      <Tabs defaultValue="deposit">
        <TabsList className="flex gap-2 w-full mt-5">
          <TabsTrigger
            value="deposit"
            className="bg-[#F9EDFF]  cursor-pointer text-foreground px-4 py-5.5 rounded-[6px] text-sm data-[state=active]:bg-[#7910B1] data-[state=active]:text-white"
          >
            Deposit
          </TabsTrigger>
          <TabsTrigger
            value="withdraw"
            className="bg-[#F9EDFF] cursor-pointer text-foreground px-4 py-5.5 rounded-[6px] text-sm data-[state=active]:bg-[#7910B1]  data-[state=active]:text-white"
          >
            Withdraw
          </TabsTrigger>
        </TabsList>
        <div className="mt-2">
          <TabsContent value="deposit">
            <Deposit coinWalletAddress={coinWalletAddress} />
          </TabsContent>
          <TabsContent value="withdraw">
            <Withdraw />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DepositModal;
