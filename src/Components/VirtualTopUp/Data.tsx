import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
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
import { usePinModal } from "@/context/PinModalContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneNumberSchema } from "@/lib/validationSchema";

const schema = z.object({
  phone: phoneNumberSchema,
  planId: z.string().min(1, "Select a data plan"),
  saveBeneficiary: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const Data = () => {
  const { beneficiaryNumber } = usePhoneNumber();
  const { openPinModal } = usePinModal();

  const [selectedProvider, setSelectedProvider] = useState<{
    id: NetworkProviderKey;
    name: string;
    image: string;
  }>(networkProviders[0]);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: beneficiaryNumber || "",
      planId: "",
      saveBeneficiary: false,
    },
  });

  const [selectedPlan, setSelectedPlan] = useState<null | {
    id: number;
    label: string;
    price: number;
  }>(null);

  useEffect(() => {
    form.setValue("phone", beneficiaryNumber);
  }, [beneficiaryNumber, form]);

  const onSubmit = (data: FormData) => {
    openPinModal((pin) => {
      console.log("PIN entered:", pin);
      console.log("Form Data:", data);
      // trigger your API here
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-medium hidden md:block card-container rounded-[4px] py-1.75">
        Data
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col card-container gap-2 p-4 rounded-md"
        >
          <Select
            onValueChange={(value) => {
              const found = networkProviders.find((p) => p.id === value)!;
              setSelectedProvider(found);
              setSelectedPlan(null);
              form.setValue("planId", "");
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
              </SelectGroup>
            </SelectContent>
          </Select>

          <FormField
            control={form.control}
            name="planId"
            render={({ field }) => (
              <FormItem>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    const foundPlan = dataPlans[selectedProvider.id].find(
                      (p) => String(p.id) === value
                    );
                    if (foundPlan) setSelectedPlan(foundPlan);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="text-[#000] bg-[#F9EDFF] w-full !h-11 rounded-[4.91px]">
                      <SelectValue placeholder="Select Data Plan" />
                    </SelectTrigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <Input
            type="tel"
            placeholder="Amount"
            value={selectedPlan?.price ?? ""}
            className="font-semibold tracking-[-0.13px]"
            readOnly
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="Enter phone number"
                    className="font-semibold tracking-[-0.13px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Save Beneficiary */}
          <FormField
            control={form.control}
            name="saveBeneficiary"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-[1.25px] border-[#1B1C1E]"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <button type="submit" className="btn-primary w-full">
            Pay Now
          </button>
        </form>
      </Form>
    </div>
  );
};

export default Data;
