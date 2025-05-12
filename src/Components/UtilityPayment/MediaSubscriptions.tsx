import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { billers } from "@/constants/billers-option";
import { usePinModal } from "@/context/PinModalContext";

const MediaSubscriptions = () => {
  const [selectedBiller, setSelectedBiller] = useState(billers[1]);
  const { openPinModal } = usePinModal();

  const handleSubmit = () => {
    openPinModal((pin) => {
      console.log("PIN entered:", pin);
      // we call the api here
    });
  };
  function changeValue(value: string) {
    const found = billers.find((b) => b.id === value);
    if (found) setSelectedBiller(found);
  }

  return (
    <div className="flex flex-col gap-3">
      <Select onValueChange={(value) => changeValue(value)}>
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
                <div className="flex items-center gap-2">
                  <img
                    src={biller.image}
                    alt={biller.title}
                    className="size-7 rounded-[3px]"
                  />
                  <span>{biller.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex w-full gap-2">
        <div className="flex bg-[#ECC6FF] items-center text-[#7910B1] rounded-sm font-semibold text-[13.31px] h-11.25 justify-between w-full px-2">
          <span>Subscription Period</span>
          <span className="text-wrap">30 days-N12,000</span>
        </div>
      </div>
      <Input type="tel" placeholder="Enter Mobile Number" />
      <Select>
        <SelectTrigger className="text-[#000] bg-[#F9EDFF] w-full !h-11.5 rounded-[4.91px] ">
          <SelectValue placeholder="Select Package" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
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
        Pay Bill
      </button>
    </div>
  );
};

export default MediaSubscriptions;
