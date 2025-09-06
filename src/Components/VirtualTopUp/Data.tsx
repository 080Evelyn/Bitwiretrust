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
import { useEffect, useState } from "react";
import { usePhoneNumber } from "./PhoneNumber-context";
import { usePinModal } from "@/context/PinModalContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneNumberSchema } from "@/lib/validationSchema";
import { Biller, variations } from "@/types/utility-payment";
import {
  useBillerVerificationCode,
  useServiceIdentifiers,
} from "@/hooks/utility-payments/useServiceIdentifiers";
import { useMutation } from "@tanstack/react-query";
import { purchaseData } from "@/api/micro-transaction";
import { toast } from "sonner";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useQueryInvalidation } from "@/hooks/useQueryInvalidation";

const schema = z.object({
  phone: phoneNumberSchema,
  planId: z.string().min(1, "Select a data plan"),
  saveBeneficiary: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const Data = () => {
  const { beneficiaryNumber } = usePhoneNumber();
  const { openPinModal } = usePinModal();
  const [selectedBiller, setSelectedBiller] = useState<Biller | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<variations | null>(null);
  const { data: dataProviders = [] } = useServiceIdentifiers("data");
  const { isPending, data: dataPlans } = useBillerVerificationCode(
    selectedBiller?.serviceID
  );
  const { invalidateAfterTransaction } = useQueryInvalidation();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: beneficiaryNumber || "",
      planId: "",
      saveBeneficiary: false,
    },
  });

  const buyDataMutation = useMutation({
    mutationFn: (data: {
      requestId: string;
      serviceID: string;
      billersCode: string;
      variation_code: string;
      amount: number;
      phone: string;
    }) => purchaseData(data),
  });

  useEffect(() => {
    form.setValue("phone", beneficiaryNumber);
  }, [beneficiaryNumber, form]);

  // Set default biller on mount
  useEffect(() => {
    if (dataProviders?.length && !selectedBiller) {
      const first = dataProviders[0];
      setSelectedBiller(first);
    }
  }, [dataProviders, selectedBiller]);

  // Reset planId and selectedPlan when biller changes
  useEffect(() => {
    form.setValue("planId", "");
    setSelectedPlan(null);
  }, [selectedBiller, form]);

  const onSubmit = (data: FormData) => {
    if (!data.planId) return;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomNumber = Array(3)
      .fill("")
      .map(() =>
        characters.charAt(Math.floor(Math.random() * characters.length))
      )
      .join("");

    const numberAmount = Number(selectedPlan?.variation_amount || 0);

    const requestData = {
      requestId: "202506241343b012a" + randomNumber,
      serviceID: selectedBiller?.serviceID || "",
      amount: numberAmount,
      billersCode: data.phone,
      variation_code: data.planId,
      phone: data.phone,
    };

    openPinModal(() => {
      buyDataMutation.mutate(requestData, {
        onSuccess: (response) => {
          toast.success(response.data.response_description);
          invalidateAfterTransaction();
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

  const isLoading = buyDataMutation.isPending;

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-medium hidden md:block card-container rounded-[4px] py-1.75">
        Data
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col card-container gap-2 py-4 px-2 rounded-md"
        >
          <Select
            onValueChange={(value) => {
              const found = dataProviders.find(
                (provider: Biller) => provider.serviceID === value
              );
              if (found) setSelectedBiller(found);
            }}
            value={selectedBiller?.serviceID}
          >
            <SelectTrigger className="!text-white bg-[#7910B1] w-full rounded-[4.91px] py-5">
              <div className="flex items-center gap-2">
                <img
                  src={selectedBiller?.image}
                  alt={selectedBiller?.name}
                  className="size-7 rounded-[3px]"
                />
                <span>{selectedBiller?.name || "Select Provider"}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <div className="flex flex-col gap-1.5 mt-1">
                  {dataProviders.map((provider: Biller) => (
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
          <FormField
            control={form.control}
            name="planId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      const found =
                        dataPlans?.content.variations.find(
                          (plan: variations) => plan.variation_code === value
                        ) || null;
                      setSelectedPlan(found);
                    }}
                  >
                    <SelectTrigger className="text-foreground bg-[#F9EDFF] px-1 max-w-full w-full !h-11 rounded-[4.91px]">
                      <div className="flex items-center max-w-full">
                        {selectedPlan ? (
                          <span className="w-full text-wrap max-md:tracking-[-0.13px] text-xs lg:text-sm font-medium">
                            {selectedPlan.name}
                          </span>
                        ) : (
                          <span>Select a plan</span>
                        )}
                      </div>
                    </SelectTrigger>
                    <SelectContent className="text-xs max-sm:max-w-[300px]">
                      {isPending ? (
                        <div className="p-5">Loading data plans...</div>
                      ) : (
                        <SelectGroup className="max-sm:max-w-[290px]">
                          {dataPlans?.content.variations.map(
                            (plan: variations) => (
                              <SelectItem
                                key={plan.variation_code}
                                value={String(plan.variation_code)}
                                className="pe-2"
                              >
                                {plan.name}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Input
            type="tel"
            placeholder="Amount"
            value={selectedPlan?.variation_amount ?? ""}
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
            {isLoading ? (
              <span className="inline-flex items-center">
                Processing...
                <FaSpinner className="animate-spin ml-1" />
              </span>
            ) : (
              "Buy Now"
            )}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default Data;
