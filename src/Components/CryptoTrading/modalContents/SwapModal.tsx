import { useState, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CoinWalletProps,
  CreateSwapQuotationProps,
  WalletProps,
} from "@/types/crypto";
import {
  fetchWallets,
  createSwapQuotation,
  refreshSwapQuotation,
} from "@/api/crypto";
import { useMutation, useQuery } from "@tanstack/react-query";
import SwapForm from "./SwapForm";
import SwapConfirmation from "./SwapConfirmation";
import SwapDone from "./SwapDone";

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

type CreatedSwapQuote = {
  id: string;
  confirmed: boolean;
  from_currency: string;
  to_currency: string;
  quoted_price: number;
  quoted_currency: string;
  from_amount: number;
  to_amount: number;
  expires_at?: string;
  created_at?: string;
  updated_at?: string;
};

const getInitialWallet = (wallets: WalletProps[]): WalletProps | null => {
  return wallets.length > 0 ? wallets[1] : null;
};

const SwapModal = ({ coin }: CoinWalletProps) => {
  const [step, setStep] = useState(1);

  const {
    data: walletsResponse,
    isFetching: isWalletsFetching,
    error: walletsError,
  } = useQuery({
    queryKey: ["all-wallets"],
    queryFn: fetchWallets,
    staleTime: 5 * 60 * 1000,
  });
  const wallets = walletsResponse?.data.data ?? [];

  // Preview quotation mutation used to fetch live quote when user types an amount
  type PreviewQuote = { to_amount?: number; quoted_currency?: string };
  const [previewQuote, setPreviewQuote] = useState<PreviewQuote | null>(null);

  const previewQuotationMutation = useMutation({
    mutationFn: (data: CreateSwapQuotationProps) => createSwapQuotation(data),
    onSuccess: (res) => setPreviewQuote(res?.data?.data?.data ?? null),
  });

  const isPreviewLoading = previewQuotationMutation.isPending;
  const previewError = previewQuotationMutation.error;

  // track last requested key to avoid duplicate requests
  const lastPreviewRequestRef = useRef<string>("");

  // Tracks the live quotation created when user submits the form

  const [swapQuote, setSwapQuote] = useState<CreatedSwapQuote | null>(null);
  const lastQuotationRequestRef = useRef<CreateSwapQuotationProps | null>(null);

  const GetQuotationMutation = useMutation({
    mutationFn: (data: CreateSwapQuotationProps) => createSwapQuotation(data),
    onSuccess: (res) => {
      const quote = res?.data?.data?.data ?? null;
      setSwapQuote(quote);
      setStep(2);
    },
  });

  const isQuotationLoading = GetQuotationMutation.isPending;

  // Mutation to refresh an existing swap quotation
  const refreshQuotationMutation = useMutation({
    mutationFn: ({
      swapQuoteId,
      data,
    }: {
      swapQuoteId: string;
      data: CreateSwapQuotationProps;
    }) => refreshSwapQuotation(swapQuoteId, data),
    onSuccess: (res) => {
      const q = res?.data?.data?.data ?? null;
      setSwapQuote(q);
    },
  });

  const isRefreshingQuote = refreshQuotationMutation.isPending;

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

  // Fetch a preview quotation when user types an amount (debounced)
  useEffect(() => {
    // reset preview when dependencies change
    setPreviewQuote(null);

    if (!amount || !selectedWallet) return;

    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) return;

    const key = `${selectedWallet.id}:${amount}`;

    const timer = window.setTimeout(() => {
      // avoid re-requesting identical payloads
      if (lastPreviewRequestRef.current === key) return;
      lastPreviewRequestRef.current = key;

      previewQuotationMutation.mutate({
        from_currency: coin?.currency,
        to_currency: selectedWallet.currency,
        from_amount: amount,
        requestId: "",
      });
    }, 500);

    return () => clearTimeout(timer);
    // intentionally exclude the mutation object to avoid re-triggering effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, selectedWallet, coin]);

  const convertedAmount = previewQuote?.to_amount ?? 0;

  const handleSubmit = form.handleSubmit((values) => {
    const payload: CreateSwapQuotationProps = {
      from_currency: coin?.currency,
      to_currency: selectedWallet?.currency,
      from_amount: values.amount,
      requestId: "",
    };

    // store the request so we can reuse it on refresh
    lastQuotationRequestRef.current = payload;

    GetQuotationMutation.mutate(payload);
  });

  // Format the converted amount based on preview quote (if available)
  const formattedConvertedAmount = useMemo(() => {
    if (!selectedWallet) return "0.00";

    if (previewQuote && previewQuote.to_amount != null) {
      const quotedCurrency =
        previewQuote.quoted_currency ?? selectedWallet.currency;
      const isFiat = ["USD", "NGN", "USDT"].includes(
        String(quotedCurrency).toUpperCase()
      );
      return isFiat
        ? Number(previewQuote.to_amount).toFixed(2)
        : Number(previewQuote.to_amount).toFixed(6);
    }

    return "0.00";
  }, [previewQuote, selectedWallet]);

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
          isPreviewLoading={isPreviewLoading}
          previewError={previewError}
          isWalletsLoading={isWalletsFetching}
          walletsError={walletsError}
          isQuotationLoading={isQuotationLoading}
        />
      )}

      {step === 2 && (
        <SwapConfirmation
          setStep={setStep}
          swapQuote={swapQuote}
          onRefreshQuote={() => {
            if (!swapQuote?.id || !lastQuotationRequestRef.current) return;
            refreshQuotationMutation.mutate({
              swapQuoteId: swapQuote.id,
              data: lastQuotationRequestRef.current,
            });
          }}
          isRefreshingQuote={isRefreshingQuote}
        />
      )}

      {step === 3 && <SwapDone setStep={setStep} />}
    </div>
  );
};

export default SwapModal;
