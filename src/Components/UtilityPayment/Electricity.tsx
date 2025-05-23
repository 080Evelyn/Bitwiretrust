import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import { billers } from "@/constants/billers-option";
import { usePinModal } from "@/context/PinModalContext";
import { amountSchema } from "@/lib/validationSchema";

const formSchema = z.object({
  meterNumber: z
    .string()
    .length(11, "Meter number must be exactly 11 digits")
    .regex(/^\d+$/, "Meter number must contain only digits"),
  amount: amountSchema,
  billerId: z.string().min(1, "Select a biller"),
  saveAccount: z.boolean().optional(),
});

const Electricity = () => {
  const [selected, setSelected] = useState<"Prepaid" | "Postpaid">("Prepaid");
  const [selectedBiller, setSelectedBiller] = useState(billers[0]);
  const { openPinModal } = usePinModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meterNumber: "",
      amount: "",
      billerId: selectedBiller.id,
      saveAccount: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    openPinModal((pin) => {
      console.log("PIN entered:", pin);
      console.log("Form Data:", { ...values, type: selected });
      // API call goes here
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="billerId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => {
                    const found = billers.find((b) => b.id === value);
                    if (found) setSelectedBiller(found);
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
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
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="meterNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter Meter Number" {...field} />
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
            name="saveAccount"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between space-y-0">
                <FormLabel className="text-[13px] font-medium">
                  Save Account
                </FormLabel>
                <FormControl>
                  <Checkbox
                    className="border-[1.25px] border-[#1B1C1E]"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <button className="btn-primary w-full" type="submit">
            Pay Now
          </button>
        </form>
      </Form>
    </div>
  );
};

export default Electricity;
