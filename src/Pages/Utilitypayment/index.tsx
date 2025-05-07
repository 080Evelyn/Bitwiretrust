import BalanceOverview from "@/Components/HomeDashboard/BalanceOverview";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useState } from "react";

const Utilitypayment = () => {
  const [selected, setSelected] = useState<"prepaid" | "postpaid">("prepaid");

  return (
    <div className="mx-4">
      <BalanceOverview />
      <div className="grid grid-cols-3 gap-5 w-full">
        <div className="flex flex-col gap-3">
          <Select>
            <SelectTrigger className="!text-white bg-[#7910B1] w-full">
              <SelectValue placeholder="Ikeja Disco" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex w-full gap-2">
            {["prepaid", "postpaid"].map((type) => (
              <button
                key={type}
                onClick={() => setSelected(type as "prepaid" | "postpaid")}
                className={`px-4 py-2 w-1/2 rounded-md text-sm font-medium border transition-colors ${
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
            <label htmlFor="saveAccount"> Save Account</label>
            <input type="checkbox" id="saveAccount" />
          </div>
        </div>
        <div className="flex">body-2</div>
        <div className="flex">body-3</div>
      </div>
    </div>
  );
};

export default Utilitypayment;
