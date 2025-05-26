import Currency from "@/Components/GiftCard/Buy-gift-card/Currency";
import GiftCardBuyAmount from "@/Components/GiftCard/Buy-gift-card/GiftCardBuyAmount";
import SelectGiftCards from "@/Components/GiftCard/SelectGiftCards";
import BalanceOverview from "@/Components/HomeDashboard/BalanceOverview";
import BackArrowButton from "@/Components/ui/back-arrow-button";
import { giftCards } from "@/constants/giftcards";
import { useState } from "react";

const BuyGiftCard = () => {
  const [selectedCard, setSelectedCard] = useState(giftCards[0]);
  const [mobileStep, setMobileStep] = useState<1 | 2 | 3>(1);

  return (
    <div>
      <div className="hidden md:block">
        <BalanceOverview pathName="Trade Gift Cards" />
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-3 gap-3 w-full">
        <Currency />
        <SelectGiftCards title="Buy Gift Card" onSelect={setSelectedCard} />
        <GiftCardBuyAmount amount={null} selectedCard={selectedCard} />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {mobileStep === 1 && (
          <>
            <BackArrowButton pathName="/dashboard" />
            <Currency onProceed={() => setMobileStep(2)} />
          </>
        )}
        {mobileStep === 2 && (
          <>
            <BackArrowButton onClick={() => setMobileStep(1)} />
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
            <BackArrowButton onClick={() => setMobileStep(2)} />
            <GiftCardBuyAmount amount={null} selectedCard={selectedCard} />
          </>
        )}
      </div>
    </div>
  );
};

export default BuyGiftCard;
