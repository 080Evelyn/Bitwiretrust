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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?\d{10,13}$/, "Enter a valid phone number"),
  package: z.string().min(1, "Please select a package"),
  saveBeneficiary: z.boolean().optional(),
});

const MediaSubscriptions = () => {
  const [selectedBiller, setSelectedBiller] = useState(billers[1]);
  const { openPinModal } = usePinModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      package: "",
      saveBeneficiary: false,
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    openPinModal((pin) => {
      console.log("PIN entered:", pin);
      console.log("Form data:", data);
      // Call API here
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
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

        <div className="flex w-full gap-2">
          <div className="flex bg-[#ECC6FF] items-center text-[#7910B1] rounded-sm font-semibold text-[13.31px] h-11.25 justify-between w-full px-2">
            <span>Subscription Period</span>
            <span className="text-wrap">30 days - N12,000</span>
          </div>
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="package"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="text-[#000] bg-[#F9EDFF] w-full !h-11.5 rounded-[4.91px]">
                    <SelectValue placeholder="Select Package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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

export default MediaSubscriptions;
