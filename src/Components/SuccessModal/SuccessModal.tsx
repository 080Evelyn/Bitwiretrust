import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  transactionId?: string;
  amount?: number;
  electricityToken?: string;
  electricityMeterNumber?: string;
  electricityUnit?: string;
  mobileMaxWidth?: string;
}

const SuccessModal = ({
  isOpen,
  onClose,
  title = "Transaction Successful!",
  description,
  transactionId,
  amount,
  electricityToken,
  electricityMeterNumber,
  electricityUnit,
  mobileMaxWidth,
}: SuccessModalProps) => {
  const formatElectricityToken = (token?: string) => {
    if (!token) return "";
    return String(token)
      .replace(/(.{4})/g, "$1-")
      .replace(/-$/, "");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          mobileMaxWidth ? mobileMaxWidth : "max-w-xs",
          "data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-md"
        )}
      >
        <DialogHeader>
          <div className="flex items-center justify-center my-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {transactionId && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Transaction ID:</span>
              <span className="text-sm text-muted-foreground font-bold">
                {transactionId}
              </span>
            </div>
          )}

          {electricityToken && (
            <div className="flex justify-between gap-10 items-start">
              <span className="text-sm font-medium flex-shrink-0">Token:</span>
              <span className="text-sm text-muted-foreground font-bold break-words text-right">
                {formatElectricityToken(electricityToken)}
              </span>
            </div>
          )}

          {amount !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Amount:</span>
              <span className="text-sm text-muted-foreground font-bold">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(amount)}
              </span>
            </div>
          )}

          {electricityUnit && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Unit:</span>
              <span className="text-sm text-muted-foreground font-bold">
                {electricityUnit}
              </span>
            </div>
          )}
          {electricityMeterNumber && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Meter Number:</span>
              <span className="text-sm text-muted-foreground font-bold">
                {electricityMeterNumber}
              </span>
            </div>
          )}

          {/* <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Status:</span>
            <span className="text-sm text-green-600 font-bold">Completed</span>
          </div> */}
        </div>

        <div className="flex justify-center mt-2">
          <Button onClick={onClose} className="px-8">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
