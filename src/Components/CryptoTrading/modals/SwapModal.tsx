import { Input } from "@/Components/ui/input";
import { Coin } from "@/types";
import { Repeat } from "lucide-react";
import { coinAssets } from "@/constants/coins";
import { useState } from "react";
import SwapDone from "../SwapDone";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface SwapModalProps {
  coin: Coin | null;
  closeModal: () => void;
}

// Validation schema
const formSchema = z.object({
  amount: z
    .string()
    .refine((val) => val.trim() !== "", { message: "Amount is required" })
    .refine((val) => !isNaN(Number(val)), { message: "Enter a valid number" })
    .refine((val) => parseFloat(val) > 0, {
      message: "Amount must be greater than zero",
    }),
});

const SwapModal = ({ coin }: SwapModalProps) => {
  const defaultFrom = coin || coinAssets[0];
  const defaultTo = coinAssets.find((c) => c.symbol === "NGN") ?? coinAssets[0];
  const [showDone, setShowDone] = useState(false);
  const [fromCoin, setFromCoin] = useState<Coin>(defaultFrom);
  const [toCoin, setToCoin] = useState<Coin>(defaultTo);

  const form = useForm<{ amount: string }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  const amount = form.watch("amount");
  const parsedAmount = parseFloat(amount);
  const fromRate = parseFloat(fromCoin?.value?.replace(/,/g, "") || "0");
  const toRate = parseFloat(toCoin?.value?.replace(/,/g, "") || "0");

  const converted =
    fromRate && toRate && !isNaN(parsedAmount)
      ? parsedAmount * (fromRate / toRate)
      : 0;

  const handleSubmit = form.handleSubmit((values) => {
    const numericAmount = parseFloat(values.amount);
    console.log(
      `Swapping ${numericAmount} ${fromCoin.symbol} → ${converted.toFixed(6)} ${
        toCoin.symbol
      }`
    );
    setShowDone(true);
  });

  return (
    <div className="pt-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex bg-[#f9edff] items-stretch border rounded-md overflow-hidden">
          <select
            value={fromCoin.id}
            onChange={(e) => {
              const sel = coinAssets.find((c) => c.id === e.target.value);
              if (sel) setFromCoin(sel);
            }}
            className="px-2 font-semibold text-[#7910B1] bg-[#F9EDFF] outline-none"
          >
            {coinAssets.map((c) => (
              <option key={c.id} value={c.id}>
                {c.symbol}
              </option>
            ))}
          </select>
          <span className="px-1 border-r border-[#7910B1]"></span>
          <Input
            type="text"
            placeholder="0.00"
            value={amount}
            onChange={(e) =>
              form.setValue("amount", e.target.value, { shouldValidate: true })
            }
            className="flex-1"
          />
        </div>
        {form.formState.errors.amount && (
          <p className="text-red-500 text-xs -mt-2 ml-auto">
            {form.formState.errors.amount.message}
          </p>
        )}

        <div className="flex self-center items-center justify-center w-12.5 h-12 rounded-md shadow-md">
          <Repeat className="size-6 text-[#7910B1]" />
        </div>

        <div className="flex items-stretch border bg-[#F9EDFF] rounded-md overflow-hidden">
          <select
            value={toCoin.id}
            onChange={(e) => {
              const sel = coinAssets.find((c) => c.id === e.target.value);
              if (sel) setToCoin(sel);
            }}
            className="px-2 font-semibold text-[#7910B1] bg-[#F9EDFF] outline-none "
          >
            {coinAssets
              .filter((c) => c.id !== fromCoin.id)
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.symbol}
                </option>
              ))}
          </select>
          <span className="px-1 border-r border-[#7910B1]"></span>
          <Input
            type="text"
            readOnly
            value={
              toCoin.symbol === "NGN"
                ? converted.toFixed(2)
                : converted.toFixed(6)
            }
            placeholder="0.00"
            className="flex-1"
          />
        </div>

        <div className="text-right text-sm text-[#7910B1] font-medium">
          {amount} {fromCoin.symbol} ≈{" "}
          {toCoin.symbol === "NGN"
            ? converted.toFixed(2)
            : converted.toFixed(6)}{" "}
          {toCoin.symbol}
        </div>

        <button type="submit" className="btn-primary w-full">
          Proceed
        </button>
      </form>
      {showDone && <SwapDone onClose={() => setShowDone(false)} />}
    </div>
  );
};

export default SwapModal;
