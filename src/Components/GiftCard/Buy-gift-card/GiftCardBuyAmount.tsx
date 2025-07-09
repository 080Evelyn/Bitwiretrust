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
import { GiftCardAmountProps } from "@/types";
import {
  amountSchema,
  emailSchema,
  quantitySchema,
} from "@/lib/validationSchema";
import { Label } from "@/Components/ui/label";

const schema = z.object({
  email: emailSchema,
  amount: amountSchema,
  quantity: quantitySchema,
});

type FormData = z.infer<typeof schema>;

const GiftCardBuyAmount = ({ selectedCard }: GiftCardAmountProps) => {
  const { openPinModal } = usePinModal();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      amount: "1",
      quantity: "",
    },
  });

  const handleSubmit = (values: FormData) => {
    openPinModal((pin) => {
      console.log("PIN entered:", pin);
      console.log("Submitted Gift Card Form:", values);
      // Trigger API call here
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-medium hidden md:block card-container rounded-[4px] py-1.75">
        Enter Amount
      </div>
      <div className="md:hidden absolute top-3 left-1/2 transform -translate-x-1/2 pt-6.5 flex font-semibold">
        Buy {selectedCard.tittle} Gift Card
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5 md:gap-2 card-container rounded-md p-2 py-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label className="font-medium text-xs tracking-[-0.13px]">
                  Enter Recipient Email Address
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="h-11 w-full !bg-[#FCF6FF]"
                    placeholder="someone@email.com"
                  />
                </FormControl>
                <FormMessage className="mb-2" />
              </FormItem>
            )}
          />

          <div className="flex md:hidden flex-col gap-1.5 relative">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <Label className="font-medium text-xs tracking-[-0.13px]">
                    Enter Amount
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      className="h-11 w-full !bg-[#FCF6FF]"
                      placeholder="e.g. 70000"
                    />
                  </FormControl>
                  <FormMessage className="mb-2" />
                </FormItem>
              )}
            />
          </div>

          {/* Number of Cards */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <Label className="font-medium text-xs tracking-[-0.13px]">
                  No. of cards
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    className="h-11 w-full !bg-[#FCF6FF]"
                    placeholder="1"
                  />
                </FormControl>
                <FormMessage className="mb-2" />
              </FormItem>
            )}
          />

          {/* Display Summary */}
          <div className="flex flex-col py-2.5 md:py-1 shadow-xs gap-[3px] bg-[#FCF6FF] items-center justify-center rounded-2xl font-medium text-sm md:text-[11px]">
            <span className="tracking-[-0.13px]">You are paying</span>
            <h2 className="text-3xl md:text-xl text-[#7910B1] font-semibold">
              ₦70,000
            </h2>
            <span className="tracking-[-0.13px]">rate = ₦700</span>
          </div>

          <button type="submit" className="btn-primary w-full max-md:mt-20">
            Buy Gift Card
          </button>
        </form>
      </Form>
    </div>
  );
};

export default GiftCardBuyAmount;
