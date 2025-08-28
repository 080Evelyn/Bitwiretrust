import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CoinWalletProps,
  SwapQuotationProps,
  TickersProps,
  WalletProps,
} from "@/types/crypto";
import { fetchWallets, tickers, ticker, swapQuotation } from "@/api/crypto";
import { useMutation, useQuery } from "@tanstack/react-query";
import SwapForm from "./SwapForm";
import SwapConfirmation from "./SwapConfirmation";
import { getUserId } from "@/utils/AuthStorage";

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

const getInitialWallet = (wallets: WalletProps[]): WalletProps | null => {
  return wallets.length > 0 ? wallets[1] : null;
};

const SwapModal = ({ coin }: CoinWalletProps) => {
  const [step, setStep] = useState(2);
  const [marketPair, setMarketPair] = useState("");

  const { data: walletsResponse } = useQuery({
    queryKey: ["all-wallets"],
    queryFn: fetchWallets,
    staleTime: 5 * 60 * 1000,
  });
  const wallets = walletsResponse?.data ?? [];

  const { data: tickersPrice } = useQuery({
    queryKey: ["tickers"],
    queryFn: tickers,
  });

  // Fetch specific ticker data when marketPair changes
  const { data: specificTicker } = useQuery({
    queryKey: ["ticker", marketPair],
    queryFn: () => ticker(marketPair),
    enabled: !!marketPair,
  });

  const GetQuotationMutation = useMutation({
    mutationFn: (data: SwapQuotationProps) => swapQuotation(data),
  });

  const AllMarketPrice = tickersPrice?.data;
  const [selectedWallet, setSelectedWallet] = useState<WalletProps | null>(() =>
    getInitialWallet(wallets)
  );

  const form = useForm<{ amount: string }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  const amount = form.watch("amount");

  // Determine market pair when wallet selection changes
  useEffect(() => {
    if (selectedWallet && coin) {
      const pair = `${coin.currency}${selectedWallet.currency}`.toLowerCase();
      setMarketPair(pair);
    }
  }, [selectedWallet, coin]);

  // Calculate conversion when amount or ticker data changes
  const convertedAmount = useMemo(() => {
    if (!amount || !selectedWallet) return 0;

    let rate = 0;

    // Try specific ticker first
    if (specificTicker?.data?.ticker?.last) {
      rate = parseFloat(specificTicker.data.ticker.last);
    }
    // Fallback to tickers list
    else if (AllMarketPrice) {
      const marketData = AllMarketPrice.find(
        (m: TickersProps) => m.market === marketPair
      );
      if (marketData) {
        rate = parseFloat(marketData.last);
      } else {
        // Try inverse pair
        const inversePair =
          `${selectedWallet.currency}${coin?.currency}`.toLowerCase();
        const inverseMarketData = AllMarketPrice.find(
          (m: TickersProps) => m.market === inversePair
        );
        if (inverseMarketData) {
          const invRate = parseFloat(inverseMarketData.last);
          if (invRate > 0) rate = 1 / invRate;
        }
      }
    }

    if (rate > 0) {
      const amountNum = parseFloat(amount);
      return amountNum * rate;
    }

    return 0;
  }, [
    amount,
    selectedWallet,
    specificTicker,
    AllMarketPrice,
    marketPair,
    coin,
  ]);

  const handleSubmit = form.handleSubmit((values) => {
    GetQuotationMutation.mutate(
      {
        from_currency: coin?.currency,
        to_currency: selectedWallet?.currency,
        from_amount: values.amount,
        to_amount: String(convertedAmount),
        dbUserId: getUserId(),
        requestId: "",
      },
      {
        onSuccess: () => {
          setStep(2);
        },
      }
    );
  });

  // Format the converted amount based on currency type
  const formattedConvertedAmount = useMemo(() => {
    if (!selectedWallet || convertedAmount <= 0) return "0.00";

    // For fiat currencies, show 2 decimal places, for crypto show more
    const isFiat = ["USD", "NGN", "USDT"].includes(
      selectedWallet.currency.toUpperCase()
    );

    return isFiat ? convertedAmount.toFixed(2) : convertedAmount.toFixed(6);
  }, [convertedAmount, selectedWallet]);

  return (
    <div className="pt-3">
      {step === 1 && (
        <SwapForm
          wallets={wallets}
          selectedWallet={selectedWallet}
          formattedConvertedAmount={formattedConvertedAmount}
          setSelectedWallet={setSelectedWallet}
          coin={coin}
          amount={amount}
          form={form}
          handleSubmit={handleSubmit}
          convertedAmount={convertedAmount}
        />
      )}

      {step === 2 && <SwapConfirmation />}
    </div>
  );
};

export default SwapModal;
