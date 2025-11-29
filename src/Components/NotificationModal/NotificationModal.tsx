import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from "../ui/dialog";
import { format } from "date-fns";
import { TransactionData } from "@/types";
import { naira } from "@/assets";
import { AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
interface NotificationModalProps {
  notification: TransactionData | null;
  onClose: () => void;
}

const NotificationModal = ({
  notification,
  onClose,
}: NotificationModalProps) => {
  return (
    <Dialog open={!!notification} onOpenChange={onClose}>
      <DialogOverlay className="z-58">
        <DialogContent className="z-60 w-full md:w-[398px] md:left-[48%] py-6.5 bg-[#FCF6FF]">
          <DialogTitle className="sr-only">Notification</DialogTitle>
          <DialogHeader className="flex items-center">
            {notification?.status &&
            notification?.status?.toLowerCase() === "success" ? (
              <div className="bg-[#11C600]/50 rounded-full size-19 flex items-center justify-center">
                <div className="bg-[#0FA301] size-15.5 rounded-full flex items-center justify-center">
                  <img src={naira} alt="naira" className="h-[25.54px]" />
                </div>
              </div>
            ) : notification?.status &&
              notification?.status?.toLowerCase() === "failed" ? (
              <div className="bg-[#FF0000]/50 rounded-full size-19 flex items-center justify-center">
                <div className="bg-[#FF0000] size-15.5 rounded-full flex items-center justify-center">
                  <X className="size-[42px] text-white" />
                </div>
              </div>
            ) : (
              <div className="bg-yellow-400/50 rounded-full size-19 flex items-center justify-center">
                <div className="bg-yellow-400 size-15.5 rounded-full flex items-center justify-center">
                  <AlertTriangle className="size-[42px] text-white" />
                </div>
              </div>
            )}
            <div className="font-medium">
              {notification?.title}{" "}
              {notification?.status &&
              notification?.status.toLowerCase() === "success"
                ? "Successful"
                : notification?.status &&
                  notification?.status.toLowerCase() === "failed"
                ? "Failed"
                : "Pending"}
            </div>
            <h3 className="font-bold text-2xl">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(notification?.amount || 0)}
            </h3>
          </DialogHeader>
          <span className="border-2 border-[#7910B1] rounded-xs px-3 my-1.5" />
          <div className="flex flex-col gap-2 text-sm font-medium">
            <div className="flex justify-between">
              <span>Transaction ID</span>
              <span>{notification?.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Request ID</span>
              <span>{notification?.requestId || "rxn-404"}</span>
            </div>
            <div className="flex justify-between">
              <span>Date</span>
              <span className="text-xs mt-2 text-right">
                {notification && format(notification.createdAt, "MM-dd-yyyy")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span>{notification && format(notification.createdAt, "p")}</span>
            </div>
            <div className="flex justify-between">
              <span>Method</span>
              <span>{notification?.transactionCategory}</span>
            </div>
            <div className="flex justify-between">
              <span>Transaction Type</span>
              <span>{notification?.type}</span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span
                className={cn(
                  "capitalize",
                  notification?.status &&
                    notification.status.toLowerCase() === "success"
                    ? "text-[#0FA301]"
                    : notification?.status &&
                      notification.status.toLowerCase() === "failed"
                    ? "text-[#FF0000]"
                    : "text-yellow-500"
                )}
              >
                {notification?.status && notification.status.toLowerCase()}
              </span>
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default NotificationModal;
