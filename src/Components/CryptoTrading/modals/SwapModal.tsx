import { Input } from "@/Components/ui/input";
import { Coin } from "@/types";
import { Repeat } from "lucide-react";
import { coinAssets } from "@/constants/coins";
import { useState, useEffect } from "react";
import SwapDone from "../SwapDone";

interface SwapModalProps {
  coin: Coin | null;
  closeModal: () => void;
}

const SwapModal = ({ coin }: SwapModalProps) => {
  const defaultFrom = coin || coinAssets[0];
  const defaultTo = coinAssets.find((c) => c.symbol === "NGN") ?? coinAssets[0];
  const [showDone, setShowDone] = useState(false);

  const [fromCoin, setFromCoin] = useState<Coin>(defaultFrom);
  const [toCoin, setToCoin] = useState<Coin>(defaultTo);
  const [amount, setAmount] = useState<number>(0);
  const [converted, setConverted] = useState<number>(0);

  useEffect(() => {
    const fromRate = parseFloat(fromCoin?.value?.replace(/,/g, "") || "0");
    const toRate = parseFloat(toCoin?.value?.replace(/,/g, "") || "0");

    if (fromRate && toRate) {
      const result = amount * (fromRate / toRate);
      setConverted(result);
    } else {
      setConverted(0);
    }
  }, [amount, fromCoin, toCoin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      `Swapping ${amount} ${fromCoin.symbol} → ${converted.toFixed(6)} ${
        toCoin.symbol
      }`
    );
    setShowDone(true);
  };

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
            type="tel"
            min="0"
            step="any"
            placeholder="0.00"
            value={amount || ""}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="flex-1"
          />
        </div>

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
