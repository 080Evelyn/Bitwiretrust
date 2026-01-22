import { confirmSwapQuotation } from "@/api/crypto";
import { Button } from "@/Components/ui/button";
import { useQueryInvalidation } from "@/hooks/useQueryInvalidation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

type CreatedSwapQuote = {
  id: string;
  from_amount?: number;
  to_amount?: number;
  from_currency?: string;
  to_currency?: string;
  expires_at?: string;
};

const SwapConfirmation = ({
  setStep,
  swapQuote,
  onRefreshQuote,
  isRefreshingQuote,
}: {
  setStep: (step: number) => void;
  swapQuote: CreatedSwapQuote | null;
  onRefreshQuote: () => void;
  isRefreshingQuote: boolean;
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(15);
  const intervalRef = useRef<number | null>(null);
  const queryClient = useQueryClient();
  const { invalidateAfterTransaction } = useQueryInvalidation();

  const mutateSwapConfirmation = useMutation({
    mutationFn: () =>
      confirmSwapQuotation(swapQuote?.id || "", {
        requestId: "",
        commissionFee: 0,
      }),
    onSuccess: () => {
      invalidateAfterTransaction();
      queryClient.invalidateQueries({
        queryKey: ["all-wallets"],
      });
      setStep(3);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.responseDesc || "Something went wrong");
      } else {
        toast.error("Unexpected error occurred");
      }
    },
  });

  const handleConfirmSwap = () => {
    mutateSwapConfirmation.mutate();
  };
  const isPending = mutateSwapConfirmation.isPending;

  // Reset timer whenever we receive a new quote
  useEffect(() => {
    setSecondsLeft(10);
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [swapQuote]);

  const formattedFromAmount = swapQuote?.from_amount
    ? Number(swapQuote.from_amount).toString()
    : "";
  const formattedToAmount = swapQuote?.to_amount
    ? Number(swapQuote.to_amount).toLocaleString()
    : "";

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-8">
        <div className="bg-primary/15 font-medium text-xl py-5  px-8 rounded-md">
          {swapQuote ? (
            <>
              {formattedFromAmount} {swapQuote?.from_currency} ={" "}
              {formattedToAmount} {swapQuote?.to_currency}
            </>
          ) : (
            "Preparing quote..."
          )}
        </div>

        <Button
          className="w-full"
          onClick={() => {
            if (secondsLeft <= 0) {
              onRefreshQuote();
            } else {
              handleConfirmSwap();
            }
          }}
          disabled={isRefreshingQuote || isPending}
        >
          {isRefreshingQuote ? (
            <>
              <FaSpinner className="animate-spin" /> Refreshing...
            </>
          ) : isPending ? (
            <>
              <FaSpinner className="animate-spin" /> Confirming...
            </>
          ) : secondsLeft > 0 ? (
            `Confirm (${secondsLeft} sec)`
          ) : (
            "Get new quotation"
          )}
        </Button>
      </div>

      <div className="flex justify-center">
        <Button
          className="w-1/2 mt-4"
          variant={"link"}
          onClick={() => {
            setStep(1);
          }}
        >
          <ArrowLeft className="mr-2" /> Back to Swap
        </Button>
      </div>
    </div>
  );
};

export default SwapConfirmation;
