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
import { usePhoneNumber } from "./PhoneNumber-context";
import { usePinModal } from "@/context/PinModalContext";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneNumberSchema } from "@/lib/validationSchema";
import { Biller } from "@/types/utility-payment";
import { useServiceIdentifiers } from "@/hooks/utility-payments/useServiceIdentifiers";
import { purchaseAirtime } from "@/api/micro-transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { cn } from "@/lib/utils";
import ButtonLoading from "../common/ButtonLoading";

interface FormData {
  phone: string;
  amount: number;
  saveBeneficiary: boolean;
}

const Airtime = () => {
  const { openPinModal } = usePinModal();
  const { amount, setAmount } = useAmount();
  const { beneficiaryNumber } = usePhoneNumber();
  const [selectedBiller, setSelectedBiller] = useState<Biller | null>(null);
  const amounts: number[] = [50, 100, 200, 500, 1000];
  const { data: networkProviders = [] } = useServiceIdentifiers("airtime");
  const queryClient = useQueryClient();

  const formSchema = useMemo(() => {
    const min = Number(selectedBiller?.minimium_amount) || 100;
    const max = Number(selectedBiller?.maximum_amount) || 100000;

    return z.object({
      phone: phoneNumberSchema,
      amount: z.preprocess(
        (val) => Number(val),
        z
          .number({
            required_error: "Amount is required",
            invalid_type_error: "Amount must be a number",
          })
          .min(min, `Amount must be at least ${min}`)
          .max(max, `Amount must be at most ${max}`)
      ),
      saveBeneficiary: z.boolean().optional(),
    }) as ZodType<FormData>;
  }, [selectedBiller]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      amount: amount || undefined,
      saveBeneficiary: false,
    },
  });

  const buyAirtimeMutation = useMutation({
    mutationFn: (data: {
      request_id: string;
      serviceID: string;
      amount: number;
      phone: string;
    }) => purchaseAirtime(data),
  });

  // Set initial selected biller if available
  useEffect(() => {
    if (networkProviders.length > 0) {
      const initialBiller = networkProviders[0];
      setSelectedBiller(initialBiller);
      form.setValue("phone", beneficiaryNumber || "");
    }
  }, [networkProviders, beneficiaryNumber, form]);

  // Sync phone number from context
  useEffect(() => {
    form.setValue("phone", beneficiaryNumber);
  }, [beneficiaryNumber, form]);

  const handleAmountClick = (val: number) => {
    setAmount(val);
    form.setValue("amount", val);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    openPinModal(() => {
      if (!selectedBiller) {
        toast.error("No biller selected");
        return;
      }

      const requestData = {
        request_id: "",
        serviceID: selectedBiller.serviceID,
        amount: data.amount,
        phone: data.phone,
      };

      buyAirtimeMutation.mutate(requestData, {
        onSuccess: (response) => {
          toast.success(response.data.response_description);
          queryClient.invalidateQueries({ queryKey: ["dvaInfo"] });
          form.reset();
        },

        onError: (error: unknown) => {
          if (axios.isAxiosError(error)) {
            const responseDesc =
              error.response?.data?.responseDesc || "Something went wrong";
            toast.error(responseDesc);
          } else {
            toast.error("Unexpected error occurred");
          }
        },
      });
    });
  };

  const isLoading = buyAirtimeMutation.isPending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="text-center font-medium hidden md:block card-container rounded-[4px] py-1.75">
          Airtime
        </div>

        <div className="flex flex-col gap-2 card-container rounded-md py-4 px-2">
          <Select
            onValueChange={(value) => {
              const found = networkProviders.find(
                (biller: Biller) => biller.serviceID === value
              );
              if (found) setSelectedBiller(found);
            }}
          >
            <SelectTrigger className="!text-white bg-[#7910B1] w-full rounded-[4.91px] py-5">
              <div className="flex items-center gap-2">
                <img
                  src={selectedBiller?.image}
                  alt={selectedBiller?.name}
                  className="size-7 rounded-[3px]"
                />
                <span>{selectedBiller?.name}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <div className="flex flex-col gap-1.5 mt-1">
                  {networkProviders.map((provider: Biller) => (
                    <SelectItem
                      key={provider.serviceID}
                      value={provider.serviceID}
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
                    min={selectedBiller?.minimium_amount || 10}
                    max={selectedBiller?.maximum_amount || 1000000}
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

          <button
            className={cn("btn-primary w-full", {
              "opacity-50 cursor-not-allowed": isLoading,
            })}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoading /> : "Buy Now"}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default Airtime;
