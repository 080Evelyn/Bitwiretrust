import { countriesGiftCard, giftcardCountries } from "@/api/giftcard";
import Currency from "@/Components/GiftCard/Buy-gift-card/Currency";
import GiftCardBuyAmount from "@/Components/GiftCard/Buy-gift-card/GiftCardBuyAmount";
import SelectGiftCards from "@/Components/GiftCard/SelectGiftCards";
import BalanceOverview from "@/Components/HomeDashboard/BalanceOverview";
import BackArrowButton from "@/Components/ui/back-arrow-button";
import { CountryGiftCardListProps } from "@/types/gift-card";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const BuyGiftCard = () => {
  const [selectedCard, setSelectedCard] = useState<CountryGiftCardListProps>();
  const [mobileStep, setMobileStep] = useState<1 | 2 | 3>(1);
  const [checked, setChecked] = useState<string | undefined>(undefined);

  const {
    isError,
    isPending,
    data: giftCardCountriesResponse,
  } = useQuery({
    queryKey: ["giftCardCountries"],
    queryFn: () => giftcardCountries(),
  });
  const giftCardsCountriesList = giftCardCountriesResponse?.data;

  const { isPending: cardListIsLoading, data: CountriesCardResponse } =
    useQuery({
      queryKey: ["countriesGiftCard", checked],
      queryFn: () => countriesGiftCard(checked!),
      enabled: !!checked,
    });
  const CountriesCardList = CountriesCardResponse?.data;

  useEffect(() => {
    if (giftCardsCountriesList?.length > 0 && !checked) {
      setChecked(giftCardsCountriesList[0].isoName);
    }
  }, [giftCardsCountriesList, checked]);

  return (
    <div>
      <div className="hidden md:block">
        <BalanceOverview pathName="Trade Gift Cards" />
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-3 gap-3 w-full">
        <Currency
          checked={checked}
          setChecked={setChecked}
          isError={isError}
          isPending={isPending}
          giftCardsCountriesList={giftCardsCountriesList}
        />
        <SelectGiftCards
          title="Buy Gift Card"
          onSelect={setSelectedCard}
          CountriesCardList={CountriesCardList}
          cardListIsLoading={cardListIsLoading}
        />
        <GiftCardBuyAmount selectedCard={selectedCard} />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {mobileStep === 1 && (
          <>
            <BackArrowButton pathName="/dashboard" />
            <Currency
              checked={checked}
              setChecked={setChecked}
              isError={isError}
              isPending={isPending}
              giftCardsCountriesList={giftCardsCountriesList}
              onProceed={() => setMobileStep(2)}
            />
          </>
        )}
        {mobileStep === 2 && (
          <>
            <BackArrowButton onClick={() => setMobileStep(1)} />
            <SelectGiftCards
              title="Buy Gift Card"
              cardListIsLoading={cardListIsLoading}
              onSelect={(card) => {
                setSelectedCard(card);
                setMobileStep(3);
              }}
              CountriesCardList={CountriesCardList}
            />
          </>
        )}
        {mobileStep === 3 && (
          <>
            <BackArrowButton onClick={() => setMobileStep(2)} />
            <GiftCardBuyAmount selectedCard={selectedCard} />
          </>
        )}
      </div>
    </div>
  );
};

export default BuyGiftCard;
