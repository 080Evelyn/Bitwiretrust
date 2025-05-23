import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import useAmount from "@/hooks/amountUpdate";
import { networkProviders } from "@/constants/billers-option";
import { usePhoneNumber } from "./PhoneNumber-context";
import { usePinModal } from "@/context/PinModalContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneNumberSchema, amountSchema } from "@/lib/validationSchema";

const formSchema = z.object({
  phone: phoneNumberSchema,
  amount: amountSchema,
  saveBeneficiary: z.boolean().optional(),
});

const Airtime = () => {
  const { openPinModal } = usePinModal();
  const { amount, setAmount } = useAmount();
  const { beneficiaryNumber } = usePhoneNumber();
  const [selectedBiller, setSelectedBiller] = useState(networkProviders[0]);
  const amounts: number[] = [50, 100, 200, 500, 1000];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      amount: amount ? amount.toString() : "",
      saveBeneficiary: false,
    },
  });

  // Sync phone number from context
  useEffect(() => {
    form.setValue("phone", beneficiaryNumber);
  }, [beneficiaryNumber, form]);

  const handleAmountClick = (val: number) => {
    setAmount(val);
    form.setValue("amount", val.toString());
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    openPinModal((pin) => {
      console.log("PIN entered:", pin);
      console.log("Form data:", data);
      // Call your API here
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="text-center font-medium hidden md:block card-container rounded-[4px] py-1.75">
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
              const isSelected = Number(form.watch("amount")) === a;

              return (
                <button
                  type="button"
                  key={a}
                  onClick={() => handleAmountClick(a)}
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

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter Amount"
                    {...field}
                    className="font-semibold tracking-[-0.13px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter Phone Number"
                    {...field}
                    className="font-semibold tracking-[-0.13px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="saveBeneficiary"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center">
                <FormLabel className="text-[13px] font-medium">
                  Save as beneficiary
                </FormLabel>
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
            Buy Now
          </button>
        </div>
      </form>
    </Form>
  );
};

export default Airtime;
