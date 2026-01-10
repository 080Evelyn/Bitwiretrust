import hexToRgba from "@/lib/hexToRgba";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { actions } from "@/constants/coins";
import BuyModal from "./modalContents/BuyModal";
import SendModal from "./modalContents/SendModal";
import DepositModal from "./modalContents/DepositModal";
import SwapModal from "./modalContents/SwapModal";
import { CoinWalletProps } from "@/types/crypto";
const Wallet = ({ coin }: CoinWalletProps) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleActionClick = (actionTitle: string) => {
    setSelectedAction(actionTitle);
    setIsDialogOpen(true);
  };

  const closeModal = () => {
    setSelectedAction(null);
    setIsDialogOpen(false);
  };

  const renderDialogContent = () => {
    switch (selectedAction) {
      case "Buy":
        return (
          <BuyModal
          // closeModal={closeModal} coin={coin}
          />
        );
      case "Send":
        return <SendModal closeModal={closeModal} coin={coin} />;
      case "Deposit":
        return <DepositModal coin={coin} />;
      case "Swap":
        return <SwapModal coin={coin} />;
      default:
        return null;
    }
  };

  let bgColor;

  switch (coin?.currency?.toLowerCase()) {
    case "btc":
      bgColor = "#F7AE02";
      break;
    case "eth":
      bgColor = "#3C3C3D";
      break;
    case "usdt":
      bgColor = "#26A17B";
      break;
    case "aave":
      bgColor = "#2EBAC6";
      break;
    case "busd":
      bgColor = "#F7AE02";
      break;
    case "ngn":
      bgColor = "#0FA301";
      break;
    default:
      bgColor = "#2EBAC6";
      break;
  }

  return (
    <div
      className="
      flex flex-col gap-3
      md:mx-0 md:w-auto
      relative
      max-md:mx-[-4vw] max-md:w-[calc(100%+8vw)] max-md:mt-[-5.45rem]
    "
    >
      <div className="text-center font-medium hidden md:block desktop-card-container rounded-[4px] py-1.75">
        Wallet
      </div>

      <div
        className="flex flex-col items-center text-white gap-6 md:gap-4 rounded-md max-md:rounded-none px-3 pt-11 pb-8 md:py-15 h-full md:max-h-86"
        style={{ backgroundColor: bgColor }}
      >
        {coin ? (
          <>
            <h3 className="font-semibold capitalize text-xl md:text-[15px]">
              {coin.currency} Wallet
            </h3>
            <div className="flex flex-col items-center">
              <span className="md:text-xs">Balance</span>
              <h1 className="font-bold text-[34px] md:text-[1.6rem] tracking-[-0.13px]">
                ₦{coin?.converted_balance}
              </h1>
            </div>
          </>
        ) : (
          <h3>No Wallet Selected</h3>
        )}

        <div className="flex justify-center max-md:gap-5 md:justify-between w-full px-2">
          {actions.map((action) => (
            <div
              key={action.title}
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => handleActionClick(action.title)}
            >
              <div
                className="size-13 md:size-10 xl:size-13 rounded-[4.5px] drop-shadow-lg flex items-center justify-center"
                style={{
                  backgroundColor: coin ? hexToRgba(bgColor, 0.5) : undefined,
                  mixBlendMode: "screen",
                }}
              >
                <img
                  src={action.img}
                  className="size-6 md:size-4.5"
                  alt={action.title}
                />
              </div>
              <span className="font-semibold text-sm md:text-[10px] tracking-[-0.17px] md:tracking-[-0.13px]">
                {action.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="flex flex-col max-md:min-w-full max-w-full h-full md:h-auto md:max-w-[28.7rem] max-md:rounded-none [&>button.absolute]:hidden">
          <DialogHeader className="relative">
            <span
              onClick={() => setIsDialogOpen(false)}
              className="cursor-pointer absolute left-1 top-1/2 -translate-y-1/2 text-sm text-[#7910B1] font-semibold z-10"
            >
              Back
            </span>

            <DialogTitle className="text-center font-semibold max-md:mt-4 capitalize">
              {(selectedAction === "Buy" || selectedAction === "Send") && coin
                ? `${selectedAction} ${coin.currency}`
                : selectedAction}
            </DialogTitle>
          </DialogHeader>

          {renderDialogContent()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wallet;
