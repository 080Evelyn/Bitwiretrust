import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePinModal } from "@/context/PinModalContext";
import { emailSchema, quantitySchema } from "@/lib/validationSchema";
import { Label } from "@/Components/ui/label";
import {
  CountryGiftCardListProps,
  OrderGiftCardProps,
} from "@/types/gift-card";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { useEffect, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { orderGiftCard } from "@/api/giftcard";
import { getUserId } from "@/utils/AuthStorage";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/types/user";
import { toast } from "sonner";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useQueryInvalidation } from "@/hooks/useQueryInvalidation";

interface FormValues {
  email: string;
  amount: string;
  quantity: string;
}

interface GiftCardBuyAmountProps {
  selectedCard?: CountryGiftCardListProps;
}

const GiftCardBuyAmount = ({ selectedCard }: GiftCardBuyAmountProps) => {
  const { openPinModal } = usePinModal();
  const { user } = useOutletContext<UserContext>();

  const { invalidateAfterTransaction } = useQueryInvalidation();

  // Prepare fixed options. with type of strings
  const fixedOptions = useMemo(() => {
    const rawFixed = selectedCard?.fixedRecipientDenominations ?? [];
    return rawFixed.map((n) => (Number.isInteger(n) ? `${n}.0` : n.toString()));
  }, [selectedCard?.fixedRecipientDenominations]);

  // Build schema once per selection
  const schema = useMemo(() => {
    if (fixedOptions.length) {
      return z.object({
        email: emailSchema,
        quantity: quantitySchema,
        amount: z
          .string({ required_error: "Please select an amount" })
          .refine((val) => fixedOptions.includes(val), {
            message: "Please select a valid denomination",
          }),
      });
    }
    const min = selectedCard?.minRecipientDenomination ?? 0;
    const max = selectedCard?.maxRecipientDenomination ?? Infinity;
    return z.object({
      email: emailSchema,
      quantity: quantitySchema,
      amount: z
        .string({ required_error: "Amount is required" })
        .regex(/^\d+(\.\d+)?$/, "Amount must be a valid number")
        .refine((val) => {
          const n = Number(val);
          return !isNaN(n) && n >= min && n <= max;
        }, `Amount must be between ${min} and ${max}`),
    });
  }, [fixedOptions, selectedCard]);

  // React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", amount: "", quantity: "" },
  });

  // Reset on card change
  useEffect(() => {
    form.reset({ email: "", amount: "", quantity: "" });
  }, [selectedCard, form]);

  // Select a fixed denomination
  const handleFixedClick = (val: string) => {
    form.setValue("amount", val, { shouldValidate: true });
  };

  // Compute display in Naira
  const amt = form.watch("amount");
  const map = selectedCard?.fixedRecipientToSenderDenominationsMap ?? {};
  const rate =
    selectedCard?.minSenderDenomination &&
    selectedCard?.minRecipientDenomination
      ? selectedCard.minSenderDenomination /
        selectedCard.minRecipientDenomination
      : 0;
  const rateAmount =
    amt in map ? parseFloat(map[amt]) : Number(amt) * rate || 0;
  const quantity = parseFloat(form.watch("quantity"));
  const totalAmount = rateAmount * quantity || 0;

  // Mutation
  const orderMutation = useMutation({
    mutationFn: (data: OrderGiftCardProps) => orderGiftCard(data),
  });

  // submit
  const onSubmit = form.handleSubmit((data) => {
    openPinModal(() => {
      const payload: OrderGiftCardProps = {
        customIdentifier: "",
        preOrder: selectedCard?.supportsPreOrder ?? true,
        productId: selectedCard?.productId ?? 0,
        quantity: parseFloat(data.quantity),
        recipientEmail: data.email,
        senderName: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
        unitPrice: parseFloat(data.amount),
        productAdditionalRequirements: { userId: getUserId()! },
        totalPrice: totalAmount,
        requestId: "",
      };

      orderMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Purchase successful");
          invalidateAfterTransaction();
          form.reset({ email: "", amount: "", quantity: "" });
        },
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            toast.error(
              err.response?.data?.responseDesc || "Something went wrong"
            );
          } else {
            toast.error("Unexpected error occurred");
          }
        },
      });
    });
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="hidden md:block text-center font-medium card-container rounded-[4px] py-1.75">
        Enter Amount
      </div>
      <div className="md:hidden absolute text-center top-1 left-1/2 transform -translate-x-1/2 pt-6.5 font-semibold">
        Buy {selectedCard?.productName} Gift Card
      </div>

      <Form {...form}>
        <ScrollArea className="desktop-card-container p-2 rounded-md md:max-h-86 h-full overflow-y-auto">
          <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full p-2">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label className="font-medium text-sm md:text-xs">
                    Recipient Email
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="someone@email.com"
                      className="h-11 w-full !bg-[#FCF6FF]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <Label className="font-medium text-sm md:text-xs">
                    No. of cards
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="1, 2, 3..."
                      className="h-11 w-full !bg-[#FCF6FF]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount */}
            {fixedOptions.length > 0 && (
              <FormItem>
                <Label className="font-medium text-sm md:text-xs">
                  Select Amount
                </Label>
                <div className="flex flex-wrap gap-2.5">
                  {fixedOptions.map((opt) => {
                    const sel = form.watch("amount") === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleFixedClick(opt)}
                        className={`px-2 py-1 rounded border md:text-sm font-medium transition-colors ${
                          sel
                            ? "bg-[#28003E] text-white"
                            : "bg-[#F9EDFF] text-black/45 border-[#F9EDFF]"
                        }`}
                      >
                        {Number(opt) % 1 === 0 ? Number(opt) : opt}
                      </button>
                    );
                  })}
                </div>
                {form.formState.errors.amount && (
                  <p className="text-[0.8rem] text-destructive">
                    {form.formState.errors.amount.message}
                  </p>
                )}
              </FormItem>
            )}

            {selectedCard?.denominationType === "RANGE" && (
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <Label className="font-medium text-sm md:text-xs">
                      Enter Amount ({selectedCard?.minRecipientDenomination} -{" "}
                      {selectedCard?.maxRecipientDenomination}{" "}
                      {selectedCard?.recipientCurrencyCode})
                    </Label>

                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder={`Amount in ${
                          selectedCard?.recipientCurrencyCode || "USD"
                        }`}
                        className="h-9 w-full !bg-[#FCF6FF]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Summary */}
            <div className="flex flex-col items-center py-2.5 bg-[#FCF6FF] shadow-xs rounded-2xl gap-[3px] text-sm">
              <span>You are paying</span>
              <h2 className="text-3xl md:text-xl text-[#7910B1] font-semibold">
                ₦{totalAmount.toLocaleString()}
              </h2>
              <span>
                Fee = ₦{selectedCard?.senderFee.toLocaleString() || "0"}
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={orderMutation.isPending || !selectedCard?.productId}
              className={cn("btn-primary w-full max-md:mt-20", {
                "cursor-not-allowed":
                  orderMutation.isPending || !selectedCard?.productId,
              })}
            >
              {orderMutation.isPending ? "Processing..." : "Buy Gift Card"}
            </button>
          </form>
        </ScrollArea>
      </Form>
    </div>
  );
};

export default GiftCardBuyAmount;
