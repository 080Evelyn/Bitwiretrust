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
import { BankList } from "@/types/dashboard";
import { toast } from "sonner";
import { Step1Values } from "./transfer/Step1";
import { initiateTransaction } from "@/api/wallet-service";
import { Step2Form, Step2Values } from "./transfer/Step2";
import axios from "axios";
import TransferConfirmation from "./transfer/TransferConfirmation";
import { usePinModal } from "@/context/PinModalContext";
import TransferSuccess from "./transfer/TransferSuccess";

const step2Schema = z.object({
  amount: z.number().min(1, "Please enter a valid amount"),
  remark: z.string().optional(),
});

export default function WithdrawalDialog({
  isWithdrawalOpen,
  setIsWithdrawalOpen,
}: {
  isWithdrawalOpen: boolean;
  setIsWithdrawalOpen: (open: boolean) => void;
}) {
  const [step, setStep] = useState<number>(2);
  const [accountDetails, setAccountDetails] = useState<Step2Values | null>(
    null
  );
  const [selectedBank, setSelectedBank] = useState<BankList | null>(null);
  const [accountName, setAccountName] = useState<string | null>(null);
  const { openPinModal } = usePinModal();

  const step2Form = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: { amount: undefined },
  });

  const [payload, setPayload] = useState<{
    amount: number;
    remark?: string;
    accountDetails: Step1Values;
    selectedBank: BankList;
    accountName: string;
  } | null>(null);

  // Step2 submit: set payload and go to step 3
  const handleStep2Submit = (values: Step2Values) => {
    if (accountDetails && selectedBank && accountName) {
      setPayload({
        amount: values.amount,
        accountDetails,
        selectedBank,
        accountName,
      });
      setStep(3);
    } else {
      toast.error("Missing data from previous steps");
    }
  };

  // Final confirmation submit
  const initiateTransaferMutation = useMutation({
    mutationFn: (data: { source: string; amount: number; reason: string }) =>
      initiateTransaction(data),
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
    if (!payload) {
      toast.error("No data to submit");
      return;
    }
    openPinModal((pin) => {
      if (pin) {
        initiateTransaferMutation.mutate(
          {
            amount: payload.amount,
            source: "",
            reason: payload.remark || "",
          },
          {
            onSuccess: () => {
              setStep(4);
              setAccountDetails(null);
              setSelectedBank(null);
              setPayload(null);
              step2Form.reset();
            },
          }
        );
      } else {
        toast.error("PIN is required to proceed");
      }
    });
  };

  const closeDialog = () => {
    setIsWithdrawalOpen(false);
    setStep(1);
    setAccountDetails(null);
    setSelectedBank(null);
    setPayload(null);
    step2Form.reset();
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
            <DialogTitle>Trnasfer Modal</DialogTitle>
          </DialogHeader>
          <div
            className="relative bg-[#F9F9F9] pb-8"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {/* Header */}
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
              {step > 1 ? (
                <button
                  className="absolute left-4 cursor-pointer"
                  onClick={() => {
                    if (step === 4) setStep(3);
                    else if (step === 3) setStep(2);
                    else if (step === 2) setStep(1);
                  }}
                >
                  <ArrowLeft />
                </button>
              ) : (
                <DialogClose className="absolute left-4 cursor-pointer">
                  <ArrowLeft />
                </DialogClose>
              )}
              <div className="font-medium text-xl">Withdrawal</div>
            </div>

            {/* Step 2 */}
            {step === 2 && (
              <Step2Form
                form={step2Form}
                accountDetails={accountDetails}
                onSubmit={handleStep2Submit}
                accountName={accountName}
                selectedBank={selectedBank}
              />
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && payload && (
              <TransferConfirmation
                payload={payload}
                handleSubmit={handleConfirmationSubmit}
                onBack={() => {
                  setStep(2);
                  step2Form.reset();
                }}
                initiateTransaferMutationPending={
                  initiateTransaferMutation.isPending
                }
              />
            )}
            {/* step 4: display success message */}
            {step === 4 && <TransferSuccess onClose={closeDialog} />}
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
