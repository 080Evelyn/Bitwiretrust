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
import { useEffect, useState } from "react";
import { dataPlans, networkProviders } from "@/constants/billers-option";
import { NetworkProviderKey } from "@/types";
import { usePhoneNumber } from "./PhoneNumber-context";

const Data = () => {
  const { beneficiaryNumber } = usePhoneNumber();
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    setPhoneNumber(beneficiaryNumber);
  }, [beneficiaryNumber]);

  const [selectedProvider, setSelectedProvider] = useState<{
    id: NetworkProviderKey;
    name: string;
    image: string;
  }>(networkProviders[0]);

  const [selectedPlan, setSelectedPlan] = useState<null | {
    id: number;
    label: string;
    price: number;
  }>(null);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center hidden md:block card-container rounded-[4px] py-1.75">
        Data
      </div>

      <div className="flex flex-col card-container gap-2 p-4 rounded-md">
        {/*Network Provider Selection */}
        <Select
          onValueChange={(value) => {
            const found = networkProviders.find(
              (p) => p.id === value
            ) as (typeof networkProviders)[number];
            if (found) {
              setSelectedProvider(found);
              setSelectedPlan(null);
            }
          }}
        >
          <SelectTrigger className="!text-white bg-[#7910B1] w-full rounded-[4.91px] py-5">
            <div className="flex items-center gap-2">
              <img
                src={selectedProvider.image}
                alt={selectedProvider.name}
                className="size-7 rounded-[3px]"
              />
              <span>{selectedProvider.name}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {networkProviders.map((provider) => (
                <SelectItem key={provider.id} value={provider.id}>
                  <div className="flex items-center gap-2 rounded-[3px]">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="size-7"
                    />
                    <span>{provider.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Data Plan Selection  */}
        <Select
          key={selectedProvider.id}
          value={selectedPlan ? String(selectedPlan.id) : undefined}
          onValueChange={(value) => {
            const planList = dataPlans[selectedProvider.id];
            const foundPlan = planList.find((p) => String(p.id) === value);
            if (foundPlan) {
              setSelectedPlan(foundPlan);
            }
          }}
        >
          <SelectTrigger className="text-[#000] bg-[#F9EDFF] w-full !h-11 rounded-[4.91px]">
            <SelectValue
              placeholder={selectedPlan?.label ?? "Select Data Plan"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dataPlans[selectedProvider.id].map((plan) => (
                <SelectItem key={plan.id} value={String(plan.id)}>
                  {plan.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          type="tel"
          placeholder="Amount"
          value={selectedPlan ? selectedPlan.price : ""}
          className="font-semibold tracking-[-0.13px]"
          readOnly
        />
        <Input
          type="tel"
          id="data-phoneNumber"
          placeholder="Enter Phone Number"
          className="font-semibold tracking-[-0.13px]"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <div className="flex justify-between">
          <label htmlFor="saveAccount" className="text-[13px] font-medium">
            Save Account
          </label>
          <Checkbox
            className="border-[1.25px] border-[#1B1C1E]"
            id="saveAccount"
          />
        </div>

        <button className="btn-primary w-full">Pay Now</button>
      </div>
    </div>
  );
};

export default Data;
