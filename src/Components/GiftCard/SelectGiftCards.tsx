import { useState } from "react";
import { SearchIcon } from "@/assets";
import { giftCards } from "@/constants/giftcards";
import { ChevronRightIcon } from "lucide-react";
import { Input } from "../ui/input";

type SelectGiftCardsProps = {
  onSelect: (card: (typeof giftCards)[0]) => void;
  title: string;
};

const SelectGiftCards = ({ onSelect, title }: SelectGiftCardsProps) => {
  const [selectedCard, setSelectedCard] = useState<string>("");

  const handleSelect = (card: (typeof giftCards)[0]) => {
    setSelectedCard(card.tittle);
    onSelect(card);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-medium hidden md:block card-container rounded-[4px] py-1.75">
        Select Card
      </div>
      <div className="md:hidden absolute top-3 left-1/2 transform -translate-x-1/2 pt-6.5 flex font-semibold ">
        {title}
      </div>

      <div className="flex flex-col gap-2 card-container rounded-md p-2 md:max-h-74">
        <div className="flex gap-2 w-full">
          <div className="relative flex-1">
            <Input
              type="search"
              className="h-9 w-full !pl-9 !rounded-[4.7px]"
            />
            <img src={SearchIcon} className="absolute size-4 top-3 left-3" />
          </div>
          <button className="btn-primary w-2/6 text-xs">Filter</button>
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto">
          {giftCards.map((card) => (
            <div
              key={card.image}
              onClick={() => handleSelect(card)}
              className={`flex font-medium justify-between py-4 md:py-3 px-1 md:px-2.5 rounded-sm cursor-pointer ${
                selectedCard === card.tittle
                  ? "bg-[#28003E] text-white"
                  : "bg-[#FCF6FF] "
              }`}
            >
              <div className="flex gap-2 items-center">
                <div className="size-8.25 flex justify-center items-center rounded-xs bg-white">
                  <img
                    src={card.image}
                    alt={card.tittle}
                    className="size-6.75  rounded-[3px]"
                  />
                </div>
                <span className="text-sm">{card.tittle}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>₦{card.rate}</span>
                <ChevronRightIcon className="size-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectGiftCards;
