import { Checkbox } from "@/Components/ui/checkbox";

interface CurrencyProps {
  onProceed?: () => void;
}

const Currency = ({ onProceed }: CurrencyProps) => {
  const Currency = [
    { id: 1, country: "Nigeria (NG)" },
    { id: 2, country: "United Kingdom (UK)" },
    { id: 3, country: "United States (US)" },
    { id: 4, country: "Canada (CA)" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-medium hidden md:block desktop-card-container rounded-[4px] py-1.75">
        Select Card
      </div>
      <div className="md:hidden absolute top-3 left-1/2 transform -translate-x-1/2 pt-6.5 flex font-semibold">
        Sell Gift Card
      </div>

      <div className="desktop-card-container rounded-md p-2 lg:max-h-74">
        <div className="flex flex-col gap-4 md:gap-2 w-full">
          {Currency.map((currency) => (
            <div
              key={currency.id}
              className="rounded-[9.5px] px-4 py-5.5 text-sm md:text-[11px] font-medium text-[#7910B1] shadow-xs border border-[#7910B1] md:border-[#f1f1f1] flex justify-between cursor-pointer"
            >
              {currency.country}
              <Checkbox className="border-[#7910B1]" />
            </div>
          ))}
        </div>
      </div>
      <div className="block md:hidden mt-20">
        <button onClick={onProceed} className="btn-primary w-full">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Currency;
