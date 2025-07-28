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
import {
  Biller,
  CableSubscriptionProps,
  variations,
} from "@/types/utility-payment";
import {
  useBillerVerificationCode,
  useServiceIdentifiers,
} from "@/hooks/utility-payments/useServiceIdentifiers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cableSubscription } from "@/api/micro-transaction";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?\d{10,13}$/, "Enter a valid phone number"),
  package: z.string().min(1, "Please select a package"),
  serviceID: z.string().min(1, "Service ID is required"),
  saveBeneficiary: z.boolean().optional(),
});

const MediaSubscriptions = () => {
  const [selectedBiller, setSelectedBiller] = useState<Biller | null>(null);
  const { data: billers = [] } = useServiceIdentifiers("tv-subscription");
  const { openPinModal } = usePinModal();
  const [selectedVariation, setSelectedVariation] = useState<variations | null>(
    null
  );
  const { data: tvSubscriptionDetails } = useBillerVerificationCode(
    selectedBiller?.serviceID
  );

  const cableSubscriptionMutation = useMutation({
    mutationFn: (data: CableSubscriptionProps) => cableSubscription(data),
  });
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      phone: "",
      package: "",
      saveBeneficiary: false,
    },
  });

  useEffect(() => {
    if (billers.length && !selectedBiller) {
      const first = billers[0];
      setSelectedBiller(first);
      form.setValue("serviceID", first.serviceID);
    }
  }, [billers, selectedBiller, form]);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    if (!data.package) {
      return;
    }
    openPinModal(() => {
      cableSubscriptionMutation.mutate(
        {
          requestId: "",
          serviceID: data.serviceID,
          billersCode: data.phone,
          variation_code: data.package,
          amount: Number(selectedVariation?.variation_amount || 0),
          phone: "08012345678",
          identifier:
            selectedBiller?.serviceID === "dstv" ||
            selectedBiller?.serviceID === "gotv"
              ? "renew-bouquet"
              : selectedBiller?.serviceID || "",
        },
        {
          onSuccess: (response) => {
            toast.success("Subscription successful:", response);
            queryClient.invalidateQueries({ queryKey: ["dvaInfo"] });
            // Handle success, e.g., show a success message or redirect
          },
          onError: (error) => {
            console.error("Subscription failed:", error);
            // Handle error, e.g., show an error message
          },
        }
      );
    });
  };

  const isLoading = cableSubscriptionMutation.isPending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-3"
      >
        <Select
          onValueChange={(value) => {
            const found = billers.find(
              (biller: Biller) => biller.serviceID === value
            );
            if (found) setSelectedBiller(found);
            form.setValue("serviceID", found.serviceID);
            form.setValue("package", "");
            setSelectedVariation(null);
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
              {billers.map((biller: Biller) => (
                <SelectItem key={biller.serviceID} value={biller.serviceID}>
                  <div className="flex items-center gap-2">
                    <img
                      src={biller.image}
                      alt={biller.name}
                      className="size-7 rounded-[3px]"
                    />
                    <span>{biller.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex w-full gap-2">
          <div className="flex bg-[#ECC6FF] items-center text-[#7910B1] rounded-sm font-semibold text-[13.31px] h-11.25 justify-between w-full px-2">
            {/* <span>Subscription Period</span> */}
            {selectedVariation?.name ? (
              <span className="text-wrap">{selectedVariation?.name}</span>
            ) : (
              <span>Subscription Package</span>
            )}
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
                  className="md:placeholder:!text-xs tracking-tight"
                  placeholder="Enter phone number or cable number"
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
                  onValueChange={(value) => {
                    const found =
                      tvSubscriptionDetails?.content.variations.find(
                        (variation: variations) =>
                          variation.variation_code === value
                      );
                    if (found) {
                      setSelectedVariation(found);
                      form.setValue("package", value);
                    }
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="text-[#000] text-base md:text-xs lg:text-sm md:tracking-[-0.60px] lg:tracking-normal bg-[#F9EDFF] w-full !h-11.5 rounded-[4.91px]">
                    <div className="flex items-center max-w-full">
                      {selectedVariation ? (
                        <span className="w-full text-wrap max-md:tracking-[-0.13px] max-md:text-xs font-medium">
                          {selectedVariation.name}
                        </span>
                      ) : (
                        <span>Select Package</span>
                      )}
                    </div>
                  </SelectTrigger>

                  {tvSubscriptionDetails?.content?.variations && (
                    <SelectContent>
                      <SelectGroup>
                        {tvSubscriptionDetails.content.variations.map(
                          (variation: variations) => (
                            <SelectItem
                              key={variation.variation_code}
                              value={variation.variation_code}
                            >
                              {variation.name}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  )}
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
            "Pay Bill"
          )}
        </button>
      </form>
    </Form>
  );
};

export default MediaSubscriptions;
