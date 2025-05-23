import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/Components/ui/input";
import { usePinModal } from "@/context/PinModalContext";
import { Coin } from "@/types";

interface BuyModalProps {
  coin: Coin | null;
  closeModal: () => void;
}

const formSchema = z.object({
  amount: z
    .string()
    .refine((val) => val.trim() !== "", {
      message: "Amount is required",
    })
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a valid number",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Amount must be greater than zero",
    }),
});

const BuyModal = ({ closeModal, coin }: BuyModalProps) => {
  const { openPinModal } = usePinModal();

  const form = useForm<{ amount: string }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  const amountStr = form.watch("amount");
  const ngnValue = parseFloat(coin?.value?.replace(/,/g, "") || "0");
  const converted =
    ngnValue && !isNaN(parseFloat(amountStr))
      ? parseFloat(amountStr) / ngnValue
      : 0;

  const handleSubmit = form.handleSubmit((values) => {
    const parsedAmount = parseFloat(values.amount);
    openPinModal((pin) => {
      console.log("PIN entered:", pin);
      console.log("Amount:", parsedAmount);
      // API call here
    });
    closeModal();
  });

  return (
    <div className="pt-3">
      <span className="flex py-2 justify-center font-medium tracking-[-0.17px]">
        {coin?.amount} {coin?.symbol} = {coin?.value} NGN
      </span>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <span className="absolute top-3 left-3 font-semibold text-[#7910B1] tracking-[-0.17px]">
            NGN
          </span>
          <Input
            type="text"
            className="!pl-15"
            value={amountStr}
            onChange={(e) =>
              form.setValue("amount", e.target.value, { shouldValidate: true })
            }
          />
          {form.formState.errors.amount && (
            <p className="text-red-500 text-xs mt-1">
              {form.formState.errors.amount.message}
            </p>
          )}
        </div>

        <div className="relative">
          <span className="absolute top-3 left-3 font-semibold text-[#7910B1] tracking-[-0.17px]">
            {coin?.symbol}
          </span>
          <Input
            type="text"
            readOnly
            value={converted ? converted.toFixed(6) : ""}
            className="!pl-15 bg-[#F9F9F9]"
          />
        </div>

        <button className="btn-primary w-full" type="submit">
          Proceed
        </button>
      </form>
    </div>
  );
};

export default BuyModal;
