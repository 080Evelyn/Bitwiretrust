import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import GiftCardAmount from "@/Components/GiftCard/GiftCardAmount";
import SelectGiftCards from "@/Components/GiftCard/SelectGiftCards";
import Disclaimer from "@/Components/GiftCard/Sell-gift-card/Disclaimer";
import GiftCardDetails from "@/Components/GiftCard/Sell-gift-card/GiftCardDetails";
import BalanceOverview from "@/Components/HomeDashboard/BalanceOverview";
import { giftCards } from "@/constants/giftcards";

const SellGiftCards = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(giftCards[0]);
  const [amount, setAmount] = useState<number | null>(null);
  const [mobileStep, setMobileStep] = useState<1 | 2>(1);

  return (
    <div>
      <Disclaimer />

      <div className="hidden md:block">
        <BalanceOverview pathName="Trade Gift Cards" />
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-3 gap-5 w-full">
        <SelectGiftCards onSelect={setSelectedCard} />
        <GiftCardDetails
          selectedCard={selectedCard}
          amount={amount}
          setAmount={setAmount}
        />
        <GiftCardAmount selectedCard={selectedCard} amount={amount} />
      </div>

      {/* Mobile View */}
      <div className="md:hidden ">
        {mobileStep === 1 && (
          <>
            <button
              className="absolute pt-7 px-5 top-3 left-3 text-sm z-10"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="size-5" />
            </button>

            <SelectGiftCards
              onSelect={(card) => {
                setSelectedCard(card);
                setMobileStep(2);
              }}
            />
          </>
        )}

        {mobileStep === 2 && (
          <>
            <button
              className="absolute pt-7 px-5 top-3 left-3 text-sm z-10"
              onClick={() => setMobileStep(1)}
            >
              <ArrowLeft className="size-5" />
            </button>

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
      </div>
    </div>
  );
};

export default SellGiftCards;
