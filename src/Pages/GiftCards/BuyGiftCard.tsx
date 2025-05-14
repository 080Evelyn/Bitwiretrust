import Currency from "@/Components/GiftCard/Buy-gift-card/Currency";
import GiftCardBuyAmount from "@/Components/GiftCard/Buy-gift-card/GiftCardBuyAmount";
import SelectGiftCards from "@/Components/GiftCard/SelectGiftCards";
import BalanceOverview from "@/Components/HomeDashboard/BalanceOverview";
import { giftCards } from "@/constants/giftcards";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BuyGiftCard = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(giftCards[0]);
  const [mobileStep, setMobileStep] = useState<1 | 2 | 3>(1);

  return (
    <div>
      <div className="hidden md:block">
        <BalanceOverview pathName="Trade Gift Cards" />
      </div>

      <div className="hidden md:grid grid-cols-3 gap-3 w-full">
        <Currency />
        <SelectGiftCards title="Buy Gift Card" onSelect={setSelectedCard} />
        <GiftCardBuyAmount amount={null} selectedCard={selectedCard} />
      </div>

      <div className="md:hidden">
        {mobileStep === 1 && (
          <>
            <button
              className="absolute cursor-pointer pt-7 px-5 top-3 left-3 text-sm z-10"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="size-5" />
            </button>
            <Currency onProceed={() => setMobileStep(2)} />
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
            <SelectGiftCards
              title="Buy Gift Card"
              onSelect={(card) => {
                setSelectedCard(card);
                setMobileStep(3);
              }}
            />
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
            <GiftCardBuyAmount amount={null} selectedCard={selectedCard} />
          </>
        )}
      </div>
    </div>
  );
};

export default BuyGiftCard;
