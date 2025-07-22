import { giftcardCountries } from "@/api/giftcard";
import { SearchIcon } from "@/assets";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import { GiftCardCountriesProps } from "@/types/gift-card";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface CurrencyProps {
  onProceed?: () => void;
}

const Currency = ({ onProceed }: CurrencyProps) => {
  const {
    isError,
    isPending,
    data: giftCardCountriesResponse,
  } = useQuery({
    queryKey: ["giftCardCountries"],
    queryFn: () => giftcardCountries(),
  });

  const giftCardsCountriesList = giftCardCountriesResponse?.data;

  const [checked, setChecked] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (giftCardsCountriesList?.length > 0 && !checked) {
      setChecked(giftCardsCountriesList[0].isoName);
    }
  }, [giftCardsCountriesList, checked]);

  const filteredCountries = giftCardsCountriesList
    ? giftCardsCountriesList.filter(
        (country: GiftCardCountriesProps) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.currencyCode.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-medium hidden md:block card-container rounded-[4px] py-1.75">
        Select Currency
      </div>
      <div className="md:hidden absolute top-3 left-1/2 transform -translate-x-1/2 pt-6.5 flex font-semibold">
        Sell Gift Card
      </div>

      <div className="flex flex-col gap-2 card-container rounded-md p-2 md:max-h-74 h-[80vh]">
        <div className="flex gap-2 w-full">
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

        <div className="flex flex-col gap-4 md:gap-2 w-full overflow-y-auto">
          {isPending ? (
            <p>Loading...</p>
          ) : isError ? (
            <p> Oops! Something went wrong.</p>
          ) : filteredCountries.length === 0 ? (
            <p>No results found.</p>
          ) : (
            filteredCountries.map((currency: GiftCardCountriesProps) => (
              <div
                key={currency.isoName}
                onClick={() => setChecked(currency.isoName)}
                className="rounded-[9.5px] px-4 py-5.5 text-sm md:text-[11px] font-medium text-[#7910B1] shadow-xs border border-[#7910B1] md:border-[#f1f1f1] flex justify-between items-center cursor-pointer"
              >
                {currency.name} ({currency.currencyCode})
                <Checkbox
                  checked={checked === currency.isoName}
                  onClick={(e) => e.stopPropagation()}
                  onCheckedChange={() => setChecked(currency.isoName)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="fixed bottom-2 md:hidden w-full right-0 px-4">
        <button onClick={onProceed} className="btn-primary w-full">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Currency;
