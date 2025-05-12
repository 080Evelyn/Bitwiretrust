import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import useAmount from "@/hooks/amountUpdate";
import { networkProviders } from "@/constants/billers-option";
import { usePhoneNumber } from "./PhoneNumber-context";
import { usePinModal } from "@/context/PinModalContext";

const Airtime = () => {
  const { amount, setAmount, handleAmountChange } = useAmount();
  const [selectedBiller, setSelectedBiller] = useState(networkProviders[0]);
  const amounts: number[] = [50, 100, 200, 500, 1000];
  const { beneficiaryNumber } = usePhoneNumber();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { openPinModal } = usePinModal();

  const handleSubmit = () => {
    openPinModal((pin) => {
      console.log("PIN entered:", pin);
      // we call the api here
    });
  };

  useEffect(() => {
    setPhoneNumber(beneficiaryNumber);
  }, [beneficiaryNumber]);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center hidden md:block card-container rounded-[4px] py-1.75">
        Airtime
      </div>

      <div className="flex flex-col gap-2 card-container rounded-md p-4">
        <Select
          onValueChange={(value) => {
            const found = networkProviders.find((b) => b.id === value);
            if (found) setSelectedBiller(found);
          }}
        >
          <SelectTrigger className="!text-white bg-[#7910B1] w-full rounded-[4.91px] py-5">
            <div className="flex items-center gap-2">
              <img
                src={selectedBiller.image}
                alt={selectedBiller.name}
                className="size-7 rounded-[3px]"
              />
              <span>{selectedBiller.name}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <div className="flex flex-col gap-2 mt-1">
                {networkProviders.map((provider) => (
                  <SelectItem
                    key={provider.id}
                    value={provider.id}
                    className="w-full rounded-sm bg-[#E9A9FF] text-white"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={provider.image}
                        alt={provider.name}
                        className="size-7 rounded-[3px]"
                      />
                      <span>{provider.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex w-full gap-2.5">
          {amounts.map((a) => {
            const isSelected = amount === a;

            return (
              <button
                type="button"
                key={a}
                onClick={() => setAmount(a)}
                className={`w-1/2 size-11.25 cursor-pointer rounded-[4.75px] border text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-[#28003E] text-white"
                    : "bg-[#F9EDFF] text-black/45 border-[#F9EDFF]"
                }`}
              >
                {a}
              </button>
            );
          })}
        </div>

        <Input
          type="tel"
          placeholder="Enter Amount"
          value={amount !== null ? amount : ""}
          onChange={(event) => handleAmountChange(event)}
          className="font-semibold tracking-[-0.13px]"
        />
        <Input
          type="tel"
          id="airtime-phoneNumber"
          className="font-semibold tracking-[-0.13px]"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <div className="flex justify-between">
          <label htmlFor="saveBeneficiary" className="text-[13px] font-medium">
            Save as beneficiary
          </label>
          <Checkbox
            id="saveBeneficiary"
            className="border-[1.25px] border-[#1B1C1E]"
          />
        </div>

        <button className="btn-primary w-full" onClick={handleSubmit}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Airtime;
