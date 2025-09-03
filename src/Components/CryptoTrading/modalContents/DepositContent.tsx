import { QrCode, solar_copy } from "@/assets";
import ButtonLoading from "@/Components/common/ButtonLoading";
import { Button } from "@/Components/ui/button";
import { Check, Loader } from "lucide-react";
import { useState } from "react";

type DepositProps = {
  coinWalletAddress?: string;
  network: { id: string; name: string };
  isFetching: boolean;
  isPendingNetwork?: boolean;
  isGenerating?: boolean;
  onGenerateWallet: (networkId: string) => void;
};

const DepositContent = ({
  coinWalletAddress,
  network,
  isFetching,
  isPendingNetwork = false,
  isGenerating = false,
  onGenerateWallet,
}: DepositProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!coinWalletAddress) return;
    navigator.clipboard.writeText(coinWalletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const showSpinner = isFetching || isPendingNetwork;

  return (
    <div className="flex flex-col gap-2 items-center">
      <img src={QrCode} alt="qr code" className="max-w-40 max-md:my-4" />

      <div className="text-foreground flex flex-col items-center gap-2 mb-4">
        <span className="text-sm text-center capitalize font-medium">
          To ensure your deposit is received, please use the right network
          selected.
        </span>
      </div>

      {showSpinner ? (
        <div className="flex flex-col items-center gap-2">
          <Loader className="animate-spin size-8 text-[#7910B1]" />
          {isPendingNetwork && (
            <p className="text-sm text-muted-foreground">Generating...</p>
          )}
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center w-full">
            <span className="font-semibold tracking-[-0.17px]">
              Wallet Address
            </span>

            {coinWalletAddress ? (
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
            ) : (
              <Button
                onClick={() => onGenerateWallet(network.id)}
                disabled={isGenerating}
              >
                {isGenerating ? <ButtonLoading /> : "Generate Address"}
              </Button>
            )}
          </div>

          <div
            id="wallet-address"
            className="bg-[#F9EDFF] w-full px-2 py-4 rounded-md text-sm md:text-[15px] text-center font-medium tracking-[-0.17px] break-words"
          >
            {coinWalletAddress || "Click the button above to generate address"}
          </div>
        </>
      )}
    </div>
  );
};

export default DepositContent;
