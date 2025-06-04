import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from "../ui/dialog";
import { format } from "date-fns";
import { NotificationItem } from "@/types";
import { naira } from "@/assets";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
interface NotificationModalProps {
  notification: NotificationItem | null;
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
          <DialogHeader className="flex items-center">
            {notification?.status === "Successful" ? (
              <div className="bg-[#11C600]/50 rounded-full size-19 flex items-center justify-center">
                <div className="bg-[#0FA301] size-15.5 rounded-full flex items-center justify-center">
                  <img src={naira} alt="naira" className="h-[25.54px]" />
                </div>
              </div>
            ) : notification?.status === "Failed" ? (
              <div className="bg-[#FF0000]/50 rounded-full size-19 flex items-center justify-center">
                <div className="bg-[#FF0000] size-15.5 rounded-full flex items-center justify-center">
                  <X className="size-[42px] text-white" />
                </div>
              </div>
            ) : null}
            <div className="font-medium">
              Airtime Recharge {notification?.status}
            </div>
            <h3 className="font-bold text-2xl">NGN 78,000</h3>
          </DialogHeader>
          <span className="border-2 border-[#7910B1] rounded-xs px-3 my-1.5" />
          <div className="flex flex-col gap-2 text-sm font-medium">
            <div className="flex justify-between">
              <span>Transaction ID</span>
              <span>BW-TRSF-WY4RY</span>
            </div>
            <div className="flex justify-between">
              <span>Date</span>
              <span className="text-xs mt-2 text-right">
                {notification && format(notification.date, "MM-dd-yyyy")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span>{notification && format(notification.date, "p")}</span>
            </div>
            <div className="flex justify-between">
              <span>Method</span>
              <span>Airtime Recharge</span>
            </div>
            <div className="flex justify-between">
              <span>Network</span>
              <span>MTN</span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span
                className={cn(
                  notification?.status === "Successful"
                    ? "text-[#0FA301]"
                    : "text-[#FF0000]"
                )}
              >
                {notification?.status}
              </span>
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default NotificationModal;
