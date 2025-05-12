import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { useState } from "react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { billers } from "@/constants/billers-option";
import { usePinModal } from "@/context/PinModalContext";

const Electricity = () => {
  const [selected, setSelected] = useState<"Prepaid" | "Postpaid">("Prepaid");
  const [selectedBiller, setSelectedBiller] = useState(billers[0]);
  const { openPinModal } = usePinModal();

  const handleSubmit = () => {
    openPinModal((pin) => {
      console.log("PIN entered:", pin);
      // we call the api here
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Select
        onValueChange={(value) => {
          const found = billers.find((b) => b.id === value);
          if (found) setSelectedBiller(found);
        }}
      >
        <SelectTrigger className="!text-white bg-[#7910B1] w-full rounded-[4.91px] py-5">
          <div className="flex items-center gap-2">
            <img
              src={selectedBiller.image}
              alt={selectedBiller.title}
              className="size-7 rounded-[3px]"
            />
            <span>{selectedBiller.title}</span>
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {billers.map((biller) => (
              <SelectItem key={biller.id} value={biller.id}>
                <div className="flex items-center gap-2 rounded-[3px]">
                  <img
                    src={biller.image}
                    alt={biller.title}
                    className="size-7"
                  />
                  <span>{biller.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex w-full gap-2">
        {["Prepaid", "Postpaid"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setSelected(type as "Prepaid" | "Postpaid")}
            className={`cursor-pointer px-4 h-11.25 w-1/2 rounded-[4.75px] text-sm font-medium border transition-colors ${
              selected === type
                ? "bg-[#7910B1] text-white border-[#7910B1]"
                : "bg-[#F9EDFF] text-black border-[#F9EDFF]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <Input type="tel" placeholder="Enter Meter Number" />
      <Input type="tel" placeholder="Enter Amount" />
      <div className="flex justify-between">
        <label htmlFor="saveAccount" className="text-[13px] font-medium">
          Save Account
        </label>
        <Checkbox
          className="border-[1.25px] border-[#1B1C1E]"
          id="saveAccount"
        />
      </div>

      <button className="btn-primary w-full" onClick={handleSubmit}>
        Pay Now
      </button>
    </div>
  );
};

export default Electricity;
