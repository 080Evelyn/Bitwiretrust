import { useState } from "react";
import { SearchIcon } from "@/assets";
import { Input } from "../ui/input";
import { CountryGiftCardListProps } from "@/types/gift-card";

type SelectGiftCardsProps = {
  onSelect: (card: CountryGiftCardListProps) => void;
  title: string;
  CountriesCardList: CountryGiftCardListProps[];
  cardListIsLoading: boolean;
};

const SelectGiftCards = ({
  onSelect,
  title,
  CountriesCardList,
  cardListIsLoading,
}: SelectGiftCardsProps) => {
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = CountriesCardList
    ? CountriesCardList.filter((card: CountryGiftCardListProps) =>
        card.productName?.toLowerCase().includes(searchTerm?.toLowerCase())
      )
    : [];

  const handleSelect = (card: CountryGiftCardListProps) => {
    setSelectedCard(card.productName);
    onSelect(card);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-medium hidden md:block card-container rounded-[4px] py-1.75">
        Select Card
      </div>
      <div className="md:hidden absolute top-1 left-1/2 transform -translate-x-1/2 pt-6.5 flex font-semibold ">
        {title}
      </div>

      <div className="flex flex-col gap-2 desktop-card-container rounded-md p-2 md:max-h-86 h-[80vh]">
        <div className="w-full">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 w-full !pl-9 !rounded-[4.7px]"
            />
            <img src={SearchIcon} className="absolute size-4 top-3 left-3" />
          </div>
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto">
          {cardListIsLoading && <div>Loading...</div>}
          {filteredCountries.length === 0 && !cardListIsLoading ? (
            <div className="text-center font-medium text-sm pt-5">
              No Card Found
            </div>
          ) : (
            filteredCountries?.map((card: CountryGiftCardListProps) => (
              <div
                key={card.productId}
                onClick={() => handleSelect(card)}
                className={`font-medium py-4 md:py-3 px-1 md:px-2.5 rounded-sm cursor-pointer ${
                  selectedCard === card.productName
                    ? "bg-[#28003E] text-white"
                    : "bg-[#FCF6FF] "
                }`}
              >
                <div className="flex gap-2 items-center">
                  <div className="size-8.25 flex justify-center items-center rounded-xs bg-white">
                    <img
                      src={card.logoUrls[0]}
                      alt={card.productName}
                      className="size-6.75  rounded-[3px]"
                    />
                  </div>
                  <span className="text-sm">{card.productName}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectGiftCards;
