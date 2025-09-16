import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { WalletProps } from "@/types/crypto";
import { Repeat } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface SwapFormProps {
  wallets: WalletProps[];
  selectedWallet: WalletProps | null;
  formattedConvertedAmount: string;
  setSelectedWallet: (wallet: WalletProps) => void;
  coin: WalletProps | null;
  amount: string;
  form: UseFormReturn<{ amount: string }>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  convertedAmount: number;
}

export default function SwapForm({
  wallets,
  selectedWallet,
  formattedConvertedAmount,
  setSelectedWallet,
  coin,
  amount,
  form,
  handleSubmit,
  convertedAmount,
}: SwapFormProps) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center bg-[#f9edff] border rounded-md overflow-hidden">
        <span className="px-3 font-medium uppercase">{coin?.currency}</span>
        <span className="border-r border-1 h-11 border-[#7910B1]" />
        <Input
          type="text"
          inputMode="numeric"
          placeholder="0.00"
          value={amount}
          onChange={(e) =>
            form.setValue("amount", e.target.value, {
              shouldValidate: true,
            })
          }
          className="flex-1"
        />
      </div>
      {form.formState.errors.amount && (
        <p className="text-red-500 text-xs -mt-2 ml-auto">
          {form.formState.errors?.amount.message}
        </p>
      )}

      <div className="flex self-center items-center justify-center w-12.5 h-12 rounded-md shadow-md">
        <Repeat className="size-6 text-[#7910B1]" />
      </div>

      <div className="flex items-stretch border bg-[#F9EDFF] rounded-md overflow-hidden">
        <Select
          value={selectedWallet?.id || ""}
          onValueChange={(value) => {
            const wallet = wallets.find((w: WalletProps) => w?.id === value);
            if (wallet) setSelectedWallet(wallet);
          }}
        >
          <SelectTrigger className="rounded-r-none uppercase !h-11.5 font-semibold text-[#7910B1] bg-transparent border-0 outline-none ring-0 focus:ring-0">
            <SelectValue placeholder="Select wallet" />
          </SelectTrigger>
          <SelectContent>
            {wallets
              .filter(
                (wallet: WalletProps) => wallet.currency !== coin?.currency
              )
              .map((wallet: WalletProps) => (
                <SelectItem
                  key={wallet?.id}
                  value={wallet?.id}
                  className="hover:bg-[#7910B1]/10 rounded-md"
                >
                  <span className="font-semibold uppercase">
                    {wallet?.currency}
                  </span>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <span className=" border-r border-[#7910B1]" />

        <Input
          type="text"
          readOnly
          value={formattedConvertedAmount}
          placeholder="0.00"
          className="flex-1 border-0 bg-transparent focus-visible:ring-0"
        />
      </div>

      {convertedAmount > 0 && selectedWallet && (
        <div className="text-right text-sm text-[#7910B1] font-medium">
          <div>
            {amount} {coin?.currency} ≈ {formattedConvertedAmount}{" "}
            {selectedWallet?.currency}
          </div>
        </div>
      )}

      <button
        type="submit"
        className="btn-primary w-full"
        disabled={convertedAmount <= 0}
      >
        Proceed
      </button>
    </form>
  );
}
