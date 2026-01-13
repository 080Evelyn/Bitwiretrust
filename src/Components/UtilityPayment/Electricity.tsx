import { useEffect, useState, useMemo } from "react";
import { z, ZodType } from "zod";
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

import { usePinModal } from "@/context/PinModalContext";
import { useServiceIdentifiers } from "@/hooks/utility-payments/useServiceIdentifiers";
import { ikejaDisco } from "@/assets";
import { Biller } from "@/types/utility-payment";
import { useMutation } from "@tanstack/react-query";
import {
  electricityPurchase,
  verifyMeterNumber,
} from "@/api/micro-transaction";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { cn } from "@/lib/utils";
import { useQueryInvalidation } from "@/hooks/useQueryInvalidation";
import SuccessModal from "../SuccessModal/SuccessModal";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/types/user";

type FormData = {
  meterNumber: string;
  amount: string | number;
  serviceID: string;
  saveAccount?: boolean;
};

const Electricity = () => {
  const [selected, setSelected] = useState<"Prepaid" | "Postpaid">("Prepaid");
  const { openPinModal } = usePinModal();
  const [selectedBiller, setSelectedBiller] = useState<Biller | null>(null);
  const { data: billers = [] } = useServiceIdentifiers("electricity-bill");
  const [isMeterVerifying, setIsMeterVerifying] = useState(false);
  const [meterName, setMeterName] = useState("");
  const [meterError, setMeterError] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [debouncedMeterNumber] = useDebounce(meterNumber, 700);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState({
    title: "",
    amount: 0,
    meterNumber: "",
    electricityToken: "",
    electricityUnit: "",
  });
  const { user } = useOutletContext<UserContext>();

  const { invalidateAfterTransaction } = useQueryInvalidation();

  const VerifyMeterNumberMutation = useMutation({
    mutationFn: (data: {
      billersCode: string;
      serviceID: string;
      type: string;
    }) => {
      return verifyMeterNumber(data);
    },
  });

  const BuyElectricityMutation = useMutation({
    mutationFn: (data: {
      requestId: string;
      serviceID: string;
      variation_code: string;
      billersCode: string;
      phone: string;
      amount: number;
    }) => {
      const type = selected.toLowerCase();
      return electricityPurchase(data, type);
    },
  });

  const formSchema = useMemo(() => {
    const min = Number(selectedBiller?.minimium_amount) || 100;
    const max = Number(selectedBiller?.maximum_amount) || 100000;

    return z.object({
      meterNumber: z
        .string()
        .min(11, "Meter number must not less than 11 digits")
        .max(13, "Meter number must not be more than 13 digits")
        .regex(/^\d+$/, "Must be digits"),
      amount: z.preprocess(
        (val) => (val === "" ? undefined : Number(val)),
        z
          .number({
            required_error: "Amount is required",
            invalid_type_error: "Amount must be a number",
          })
          .min(min, `Amount must be at least ${min}`)
          .max(max, `Amount must be at most ${max}`)
      ),
      serviceID: z.string().min(1, "Select a provider"),
      saveAccount: z.boolean().optional(),
    }) as ZodType<FormData>;
  }, [selectedBiller]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meterNumber: "",
      amount: undefined,
      serviceID: "",
      saveAccount: false,
    },
  });

  // set meter number
  useEffect(() => {
    const subscription = form.watch((value) => {
      setMeterNumber(value.meterNumber || "");
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // check if meter number is valid and display name
  useEffect(() => {
    if (
      !selectedBiller ||
      !debouncedMeterNumber ||
      (debouncedMeterNumber.length !== 11 && debouncedMeterNumber.length !== 13)
    ) {
      return;
    }

    setIsMeterVerifying(true);
    setMeterError("");
    setMeterName("");

    VerifyMeterNumberMutation.mutate(
      {
        billersCode: debouncedMeterNumber,
        serviceID: selectedBiller.serviceID,
        type: selected,
      },
      {
        onSuccess: (data) => {
          setIsMeterVerifying(false);
          setMeterError("");
          setMeterName(data.data.content.Customer_Name);
        },
        onError: () => {
          setIsMeterVerifying(false);
          setMeterName("");
          setMeterError("Account does not exist. Please check and re-enter");
        },
      }
    );
  }, [debouncedMeterNumber, selectedBiller?.serviceID, selected]);

  // set initial biller
  useEffect(() => {
    if (billers.length && !selectedBiller) {
      const first = billers[0];
      setSelectedBiller(first);
      form.setValue("serviceID", first.serviceID);
    }
  }, [billers, selectedBiller, form]);

  const onSubmit = (values: FormData) => {
    if (!meterName) {
      console.error("No user found for the provided meter number");
      return;
    }
    openPinModal(() => {
      BuyElectricityMutation.mutate(
        {
          requestId: "",
          serviceID: values.serviceID,
          variation_code: selected.toLowerCase(),
          billersCode: values.meterNumber,
          phone: user.phone,
          amount: Number(values.amount),
        },
        {
          onSuccess: (response: any) => {
            setTransactionData({
              title: "Electricity Purchase Successful!",
              amount: Number(values.amount),
              electricityToken: response.data?.token,
              electricityUnit: response.data?.units,
              meterNumber: values.meterNumber,
            });
            setIsSuccessModalOpen(true);
            form.reset();
            setMeterName("");
            setMeterError("");
            invalidateAfterTransaction();
          },
          onError: (error: any) => {
            toast.error("Purchase failed:" + error.message);
          },
        }
      );
    });
  };

  const isLoading =
    isMeterVerifying ||
    !!meterError ||
    BuyElectricityMutation.isPending ||
    !meterName;

  const providerOptions = useMemo(() => {
    return billers.map((biller: Biller) => (
      <SelectItem key={biller.serviceID} value={biller.serviceID}>
        <div className="flex items-center gap-2">
          <img src={biller.image} alt={biller.name} className="size-7" />
          <span>{biller.name}</span>
        </div>
      </SelectItem>
    ));
  }, [billers]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          {/* ServiceID */}
          <FormField
            control={form.control}
            name="serviceID"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => {
                    const biller = billers.find(
                      (biller: Biller) => biller.serviceID === value
                    );
                    setSelectedBiller(biller || null);
                    field.onChange(value);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="!text-white bg-[#7910B1] w-full rounded-[4.91px] py-5 px-1">
                      <div className="flex items-center gap-2.5 md:gap-1.5 lg:gap-2">
                        <img
                          src={selectedBiller?.image || ikejaDisco}
                          alt={selectedBiller?.name || ""}
                          className="size-7 rounded-[3px]"
                        />
                        <span className="w-full text-wrap max-md:tracking-[-0.13px] text-sm sm:text-xs lg:text-sm font-medium">
                          {selectedBiller?.name || "Select Provider"}
                        </span>
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>{providerOptions}</SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Prepaid/Postpaid */}
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

          {/* Meter Number */}
          <FormField
            control={form.control}
            name="meterNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter Meter Number"
                    maxLength={13}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isMeterVerifying && (
            <div className="flex items-center gap-2">
              <p className="text-xs ">verifying meter number...</p>
              <FaSpinner className="size-4 text-[#7901b1] animate-spin" />
            </div>
          )}
          {meterError && (
            <p className="text-xs text-red-500">
              <span className="font-semibold">{meterError}</span>
            </p>
          )}
          {meterName && !meterError && (
            <p className="text-sm text-[#1B1C1E]">
              <span className="font-semibold">{meterName}</span>
            </p>
          )}

          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter Amount"
                    {...field}
                    value={field.value ?? ""}
                    min={selectedBiller?.minimium_amount}
                    max={selectedBiller?.maximum_amount}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Save Account */}
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

          <button
            className={cn("btn-primary w-full", {
              "opacity-50 cursor-not-allowed": isLoading,
            })}
            type="submit"
            disabled={isLoading}
          >
            {BuyElectricityMutation.isPending ? (
              <span className="inline-flex items-center">
                Buying...
                <FaSpinner className="animate-spin ml-1" />
              </span>
            ) : (
              "Buy Now"
            )}
          </button>
        </form>
      </Form>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title={transactionData.title}
        electricityMeterNumber={transactionData.meterNumber}
        electricityUnit={transactionData.electricityUnit}
        electricityToken={transactionData.electricityToken}
        amount={transactionData.amount}
        mobileMaxWidth="max-w-[calc(100%-2rem)]"
      />
    </div>
  );
};

export default Electricity;
