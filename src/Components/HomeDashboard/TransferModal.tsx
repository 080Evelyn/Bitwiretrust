import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { WithrawalImage } from "@/assets";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { withdrawalRequest } from "@/api/wallet-service";
import axios from "axios";
import { usePinModal } from "@/context/PinModalContext";
import TransferSuccess from "./transfer/TransferSuccess";
import { Step1Form } from "./transfer/Step1";
import { WalletRequestProps } from "@/types";
import { getUserId } from "@/utils/AuthStorage";

const step1Schema = z.object({
  amount: z.coerce
    .number({
      invalid_type_error: "Please enter a valid number",
      required_error: "Amount is required",
    })
    .min(50, "Minimum amount is ₦50")
    .positive("Please enter a positive amount"),
});
export interface Step1Values {
  amount: number;
}

export default function WithdrawalDialog({
  isWithdrawalOpen,
  setIsWithdrawalOpen,
}: {
  isWithdrawalOpen: boolean;
  setIsWithdrawalOpen: (open: boolean) => void;
}) {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const { openPinModal } = usePinModal();

  const form = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: { amount: undefined },
  });

  const initiateTransferMutation = useMutation({
    mutationFn: (data: WalletRequestProps) => withdrawalRequest(data),
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const responseDesc =
          error.response?.data?.responseDesc || "Something went wrong";
        toast.error(responseDesc, { duration: 8000 });
      } else {
        toast.error("Unexpected error occurred");
      }
    },
  });

  const handleConfirmationSubmit = () => {
    const amount = form.getValues("amount");
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    openPinModal((pin) => {
      if (!pin) {
        toast.error("PIN is required to proceed");
        return;
      }

      initiateTransferMutation.mutate(
        {
          userId: getUserId() ?? "",
          currency: "NGN",
          amount: amount,
          narration: "Withdrawal",
          commissionWithdrawal: true,
        },
        {
          onSuccess: () => {
            setShowSuccess(true);
            form.reset();
          },
        }
      );
    });
  };

  const isLoading = initiateTransferMutation.isPending;

  const closeDialog = () => {
    setIsWithdrawalOpen(false);
    setShowSuccess(false);
    form.reset();
  };

  return (
    <Dialog
      open={isWithdrawalOpen}
      onOpenChange={(open) => {
        setIsWithdrawalOpen(open);
        if (!open) {
          closeDialog();
        }
      }}
    >
      <DialogOverlay>
        <DialogContent className="m-0 p-0 max-sm:top-0 transform max-sm:translate-y-0 sm:px-0 sm:pb-[5px] sm:pt-2 max-sm:rounded-none max-sm:h-screen max-sm:max-w-screen z-50 [&>button.absolute]:hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Transfer Modal</DialogTitle>
          </DialogHeader>

          <div
            className="relative bg-[#F9F9F9] pb-8"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {/* Desktop header */}
            <div className="hidden sm:flex pl-35 py-3 justify-around items-center bg-white w-full px-3">
              <img
                src={WithrawalImage}
                className="size-[85px] rounded-full absolute top-12 left-20 transform -translate-x-1/2 -translate-y-1/2"
                alt="withdrawal icon"
              />
              <h4 className="font-medium text-[#221D7A]">Withdraw</h4>
              <span className="size-[17px] bg-[#221d7a] rounded-full text-end" />
            </div>

            {/* Mobile header */}
            <div className="relative sm:hidden flex items-center justify-center pt-8 pb-4">
              <DialogClose className="absolute left-4 cursor-pointer">
                <ArrowLeft />
              </DialogClose>
              <div className="font-medium text-xl">Withdrawal</div>
            </div>

            {/* Main content: either form or success */}
            {!showSuccess ? (
              <Step1Form
                form={form}
                isLoading={isLoading}
                onSubmit={handleConfirmationSubmit}
              />
            ) : (
              <TransferSuccess onClose={closeDialog} />
            )}
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
