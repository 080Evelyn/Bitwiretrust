import {
  NativeSelect,
  NativeSelectOption,
} from "@/Components/ui/native-select";
import { WalletProps } from "@/types/crypto";
import { Repeat } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";

interface SwapFormProps {
  wallets: WalletProps[];
  selectedWallet: WalletProps | null;
  setSelectedWallet: (wallet: WalletProps) => void;
  coin: WalletProps | null;
  amount: string;
  form: UseFormReturn<{ amount: string }>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  convertedAmount: number;
  isPreviewLoading: boolean;
  previewError?: unknown;
  isWalletsLoading: boolean;
  walletsError?: unknown;
  isQuotationLoading: boolean;
}

export default function SwapForm({
  wallets,
  selectedWallet,
  setSelectedWallet,
  coin,
  amount,
  form,
  handleSubmit,
  convertedAmount,
  isPreviewLoading,
  previewError,
  isWalletsLoading,
  walletsError,
  isQuotationLoading,
}: SwapFormProps) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center bg-[#f9edff] border rounded-md overflow-hidden">
        <span className="px-3 font-medium uppercase">{coin?.currency}</span>
        <span className="border-r border-1 h-11 border-[#7910B1]" />
        <input
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(e) =>
            form.setValue("amount", e.target.value, {
              shouldValidate: true,
            })
          }
          className="flex-1 h-11.5 px-3"
        />
      </div>
      <p className="text-xs font-medium">Available: {coin?.balance}</p>
      {form.formState.errors.amount && (
        <p className="text-red-500 text-xs -mt-2 ml-auto">
          {form.formState.errors?.amount.message}
        </p>
      )}

      <div className="flex self-center items-center justify-center w-12.5 h-12 rounded-md shadow-md">
        <Repeat className="size-6 text-[#7910B1]" />
      </div>

      <div className="flex items-stretch border bg-[#F9EDFF] rounded-md overflow-hidden">
        {isWalletsLoading ? (
          <NativeSelect
            disabled
            aria-label="Wallets loading"
            className="rounded-r-none w-32 uppercase !h-11.5 font-semibold text-[#7910B1] bg-transparent border-0 outline-none ring-0 focus:ring-0"
          >
            <NativeSelectOption value="">Loading...</NativeSelectOption>
          </NativeSelect>
        ) : walletsError ? (
          <NativeSelect
            disabled
            aria-label="Wallets failed"
            className="rounded-r-none w-32 uppercase !h-11.5 font-semibold text-[#7910B1] bg-transparent border-0 outline-none ring-0 focus:ring-0"
          >
            <NativeSelectOption value="">Failed to load</NativeSelectOption>
          </NativeSelect>
        ) : (
          <NativeSelect
            value={selectedWallet?.id || ""}
            onChange={(e) => {
              const value = (e.target as HTMLSelectElement).value;
              const wallet = wallets.find((w: WalletProps) => w?.id === value);
              if (wallet) setSelectedWallet(wallet);
            }}
            aria-label="Select currency"
            className="rounded-r-none w-32 uppercase !h-11.5 font-semibold text-[#7910B1] bg-transparent border-0 outline-none ring-0 focus:ring-0"
          >
            {wallets
              .filter(
                (wallet: WalletProps) => wallet.currency !== coin?.currency,
              )
              .map((wallet: WalletProps) => (
                <NativeSelectOption
                  key={wallet?.id}
                  value={wallet?.id}
                  className="hover:bg-[#7910B1]/10 rounded-md uppercase"
                >
                  {wallet?.currency}
                </NativeSelectOption>
              ))}
          </NativeSelect>
        )}

        <span className=" border-r border-[#7910B1]" />

        <div className="w-full border-0 bg-transparent flex items-center px-3">
          {convertedAmount}
        </div>
      </div>

      {selectedWallet &&
        (isPreviewLoading || previewError || convertedAmount > 0) && (
          <div className="text-right text-sm text-[#7910B1] font-medium">
            <div>
              {amount} {coin?.currency} ≈{" "}
              {isPreviewLoading ? (
                <span className="inline-flex items-center gap-2">
                  <FaSpinner className="animate-spin" />
                  <span>Calculating...</span>
                </span>
              ) : previewError ? (
                <span className="text-xs text-red-500">Rate unavailable</span>
              ) : (
                <>
                  {convertedAmount} {selectedWallet?.currency}
                </>
              )}
            </div>
          </div>
        )}

      <button
        type="submit"
        className={`btn-primary w-full flex items-center justify-center gap-2 ${
          convertedAmount <= 0 ||
          isPreviewLoading ||
          isWalletsLoading ||
          isQuotationLoading
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        disabled={
          convertedAmount <= 0 ||
          isPreviewLoading ||
          isWalletsLoading ||
          isQuotationLoading
        }
      >
        {isQuotationLoading ? (
          <>
            <FaSpinner className="animate-spin" />
            Processing...
          </>
        ) : (
          "Proceed"
        )}
      </button>
    </form>
  );
}
