// import { useState } from "react";
// import GiftCardAmount from "@/Components/GiftCard/Sell-gift-card/GiftCardAmount";
// import SelectGiftCards from "@/Components/GiftCard/SelectGiftCards";
// import Disclaimer from "@/Components/GiftCard/Sell-gift-card/Disclaimer";
// import GiftCardDetails from "@/Components/GiftCard/Sell-gift-card/GiftCardDetails";
import BalanceOverview from "@/Components/HomeDashboard/BalanceOverview";
// import { giftCards } from "@/constants/giftcards";
// import BackArrowButton from "@/Components/ui/back-arrow-button";
import ComingSoon from "@/Components/GiftCard/Sell-gift-card/ComingSoon";

const SellGiftCards = () => {
  // const [selectedCard, setSelectedCard] = useState(giftCards[0]);
  // const [amount, setAmount] = useState<number | null>(null);
  // const [mobileStep, setMobileStep] = useState<1 | 2>(1);

  return (
    <div>
      {/* <Disclaimer /> */}
      <ComingSoon />

      <div className="hidden md:block">
        <BalanceOverview pathName="Trade Gift Cards" />
      </div>

      {/* Desktop View */}
      {/* <div className="hidden md:grid grid-cols-3 gap-3 w-full">
        <SelectGiftCards title="Sell Gift Card" onSelect={setSelectedCard} />
        <GiftCardDetails
          selectedCard={selectedCard}
          amount={amount}
          setAmount={setAmount}
        />
        <GiftCardAmount selectedCard={selectedCard} amount={amount} />
      </div> */}

      {/* Mobile View */}
      {/* <div className="md:hidden ">
        {mobileStep === 1 && (
          <>
            <BackArrowButton pathName="/dashboard" />

            <SelectGiftCards
              title="Sell Gift Card"
              onSelect={(card) => {
                setSelectedCard(card);
                setMobileStep(2);
              }}
            />
          </>
        )}

        {mobileStep === 2 && (
          <>
            <BackArrowButton onClick={() => setMobileStep(1)} />
            <div className="flex flex-col gap-5">
              <GiftCardDetails
                selectedCard={selectedCard}
                amount={amount}
                setAmount={setAmount}
              />
              <GiftCardAmount selectedCard={selectedCard} amount={amount} />
            </div>
          </>
        )}
      </div> */}
    </div>
  );
};

export default SellGiftCards;
