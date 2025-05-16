import { usePinModal } from "@/context/PinModalContext";
import { GiftCardAmountProps } from "@/types";

const GiftCardBuyAmount = ({ selectedCard }: GiftCardAmountProps) => {
  const { openPinModal } = usePinModal();

  const handleSubmit = () => {
    openPinModal((pin) => {
      console.log("PIN entered:", pin);
      // we call the api here
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-medium hidden md:block desktop-card-container rounded-[4px] py-1.75">
        Enter Amount
      </div>
      <div className="md:hidden absolute top-3 left-1/2 transform -translate-x-1/2 pt-6.5 flex font-semibold">
        Buy {selectedCard.tittle} Gift Card
      </div>
      <div className="flex flex-col gap-5 md:gap-2 desktop-card-container rounded-md p-2 py-2">
        <div className="flex flex-col gap-1.5 relative">
          <span className="font-medium text-xs tracking-[-0.13px]">
            Enter Receipient Email Address
          </span>
          <div className="w-full">
            <input
              type="email"
              className="h-11 w-full !bg-[#FCF6FF] !rounded-[4.91px] outline-none "
            />
          </div>
        </div>
        <div className="flex md:hidden flex-col gap-1.5 relative">
          <span className="font-medium text-xs tracking-[-0.13px]">
            Enter Amount
          </span>
          <div className="w-full">
            <input
              type="tel"
              className="h-11 w-full !bg-[#FCF6FF] !rounded-[4.91px] outline-none "
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5 relative">
          <span className="font-medium text-xs tracking-[-0.13px]">
            No. of cards
          </span>
          <div className="w-full">
            <input
              type="tel"
              placeholder="1"
              className="h-11 w-full !bg-[#FCF6FF] !rounded-[4.91px] outline-none "
            />
          </div>
        </div>
        <div className="flex flex-col py-2.5 md:py-1 shadow-xs gap-[3px] bg-[#FCF6FF] items-center justify-center rounded-2xl font-medium text-sm md:text-[11px]">
          <span className="tracking-[-0.13px]"> You are paying</span>
          <h2 className="text-3xl md:text-xl text-[#7910B1] font-semibold">
            ₦70,000
          </h2>
          <span className="tracking-[-0.13px]">rate = ₦700</span>
        </div>

        <button
          className="btn-primary w-full max-md:mt-20"
          onClick={handleSubmit}
        >
          Buy Gift Card
        </button>
      </div>
    </div>
  );
};

export default GiftCardBuyAmount;
