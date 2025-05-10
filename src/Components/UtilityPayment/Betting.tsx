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

const Betting = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [selectedBiller, setSelectedBiller] = useState(billers[2]);
  const amounts: number[] = [50, 100, 200, 500, 1000];

  function AmountUpdate(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value;
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setAmount(num);
    } else if (val === "") {
      setAmount(null);
    }
  }

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
                  ? "bg-[#7910B1] text-white border-[#7910B1]"
                  : "bg-[#F9EDFF] text-[#000000]/45 border-[#F9EDFF]"
              }`}
            >
              {a}
            </button>
          );
        })}
      </div>

      <Input type="tel" placeholder="Enter Sportybet phone Number" />
      <Input
        type="tel"
        placeholder="Enter Amount"
        value={amount !== null ? amount : ""}
        onChange={(event) => AmountUpdate(event)}
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

      <button className="btn-primary w-full">Pay Bill</button>
    </div>
  );
};

export default Betting;
