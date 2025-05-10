import { useState } from "react";
import { usePhoneNumber } from "./PhoneNumber-context";

const Beneficiary = () => {
  const beneficiaries: string[] = [
    "08012345678",
    "08087654321",
    "08123456789",
    "09011223344",
    "09122334455",
  ];
  const [selected, setSelected] = useState<string | null>(null);
  const { setBeneficiaryNumber } = usePhoneNumber();

  const handleClick = (number: string) => {
    setSelected(number);
    setBeneficiaryNumber(number);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center hidden md:block card-container rounded-[4px] py-1.75">
        Beneficiary
      </div>

      {beneficiaries.length > 0 && (
        <div className="flex flex-col gap-2.5 card-container rounded-md p-3 md:p-4 h-full max-h-[125px] md:max-h-[312px] overflow-y-auto">
          {beneficiaries.map((number) => (
            <div
              key={number}
              onClick={() => handleClick(number)}
              className={`card-container cursor-pointer font-medium text-center text-sm md:text-xl rounded-[6.63px] py-2 md:py-4 ${
                selected === number
                  ? "bg-[#28003E] text-white"
                  : "text-[#8C8C8C]"
              }`}
            >
              {number}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Beneficiary;
