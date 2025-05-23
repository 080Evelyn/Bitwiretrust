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
import { billers } from "@/constants/billers-option";
import { usePinModal } from "@/context/PinModalContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAmount from "@/hooks/amountUpdate";
import { amountSchema, phoneNumberSchema } from "@/lib/validationSchema";

const formSchema = z.object({
  phone: phoneNumberSchema,
  amount: amountSchema,
  saveBeneficiary: z.boolean().optional(),
});

const Betting = () => {
  const { openPinModal } = usePinModal();
  const { amount, setAmount } = useAmount();
  const [selectedBiller, setSelectedBiller] = useState(billers[2]);
  const amounts: number[] = [50, 100, 200, 500, 1000];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      amount: amount ? amount.toString() : "",
      saveBeneficiary: false,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    openPinModal((pin) => {
      console.log("PIN entered:", pin);
      console.log("Form data:", data);
      // Call API here
    });
  };

  const handleAmountClick = (val: number) => {
    setAmount(val);
    form.setValue("amount", val.toString());
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
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
            const isSelected = Number(form.watch("amount")) === a;
            return (
              <button
                type="button"
                key={a}
                onClick={() => handleAmountClick(a)}
                className={`w-1/2 size-11.25 cursor-pointer rounded-[4.75px] border text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-[#28003E] text-white"
                    : "bg-[#F9EDFF] text-[#000000]/45 border-[#F9EDFF]"
                }`}
              >
                {a}
              </button>
            );
          })}
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Enter Sportybet phone Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="tel" placeholder="Enter Amount" {...field} />
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
          Pay Bill
        </button>
      </form>
    </Form>
  );
};

export default Betting;
