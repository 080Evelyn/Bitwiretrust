import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { amountRanges, currencyList } from "@/constants/giftcards";
import { GiftCardDetailsProps } from "@/types";
import { Input } from "@/Components/ui/input";

const GiftCardDetails = ({
  selectedCard,
  amount,
  setAmount,
}: GiftCardDetailsProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencyList[0]);
  const [selectedRangeId, setSelectedRangeId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState("Physical");
  const [error, setError] = useState("");

  type CurrencyCode = keyof typeof amountRanges;

  const handleCurrencyChange = (value: string) => {
    const found = currencyList.find((c) => c.code === value);
    if (found) {
      setSelectedCurrency(found);
      const newRanges = amountRanges[found.code as CurrencyCode];
      setSelectedRangeId(newRanges?.length ? 0 : null);
      setAmount(null);
      setError("");
    }
  };

  const handleSubCategoryChange = (value: string) => {
    const id = parseInt(value.split("-")[1], 10);
    setSelectedRangeId(id);
    setAmount(null);
    setError("");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numericValue = parseFloat(input.replace(/[^\d]/g, "")) || 0;

    if (selectedRangeId === null) {
      setError("Please select a Sub Category first");
      setAmount(numericValue);
      return;
    }

    const ranges = amountRanges[selectedCurrency.code as CurrencyCode];
    const selectedRange = ranges[selectedRangeId];

    if (!selectedRange) {
      setError("Invalid Sub Category selected");
    } else if (
      numericValue < selectedRange.min ||
      (numericValue > selectedRange.max && selectedRange.max !== Infinity)
    ) {
      setError(
        `Amount must be between ${selectedCurrency.symbol}${
          selectedRange.min
        } - ${
          selectedRange.max === Infinity
            ? "∞"
            : selectedCurrency.symbol + selectedRange.max
        }`
      );
    } else {
      setError("");
    }

    setAmount(numericValue);
  };

  const ranges = amountRanges[selectedCurrency.code as CurrencyCode] || [];

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-medium hidden md:block card-container rounded-[4px] py-1.75">
        Details
      </div>
      <div className="md:hidden absolute top-3 left-1/2 transform -translate-x-1/2 pt-6.5 flex font-semibold ">
        {selectedCard?.tittle}
      </div>
      <div className="flex flex-col gap-2 card-container rounded-md md:p-2 py-2">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-sm md:text-xs tracking-[-0.13px]">
            Select Currency
          </span>
          <Select
            value={selectedCurrency.code}
            onValueChange={handleCurrencyChange}
          >
            <SelectTrigger className="text-[#000] font-medium bg-[#FCF6FF] w-full !h-11 rounded-[4.91px]">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {currencyList.map((currency) => (
                  <SelectItem key={currency.id} value={currency.code}>
                    {currency.code}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-medium text-sm md:text-xs tracking-[-0.13px]">
            Select Giftcard Type
          </span>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="text-[#000] font-medium bg-[#FCF6FF] w-full !h-11 rounded-[4.91px]">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Physical">Physical</SelectItem>
                <SelectItem value="E-Code">E-Code</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-medium text-sm md:text-xs tracking-[-0.13px]">
            Select Sub Category
          </span>
          <Select
            value={`range-${selectedRangeId}`}
            onValueChange={handleSubCategoryChange}
          >
            <SelectTrigger className="text-[#000] font-medium bg-[#FCF6FF] w-full !h-11 rounded-[4.91px]">
              <SelectValue placeholder="Select Sub Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {ranges.map((range, idx) => (
                  <SelectItem key={idx} value={`range-${idx}`}>
                    {selectedCard.tittle} ({selectedCurrency.symbol}
                    {range.min} -{" "}
                    {range.max === Infinity
                      ? "∞"
                      : selectedCurrency.symbol + range.max}
                    )
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1 relative">
          <span className="font-medium text-sm md:text-xs tracking-[-0.13px]">
            Enter Amount
          </span>
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none select-none">
              {selectedCurrency.symbol}
            </span>
            <Input
              type="tel"
              value={amount !== null ? amount : ""}
              onChange={handleAmountChange}
              className={`h-11 w-full !pl-7 !bg-[#FCF6FF] !rounded-[4.91px] outline-none ${
                error ? "border border-red-500" : ""
              }`}
            />
          </div>
          {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default GiftCardDetails;
