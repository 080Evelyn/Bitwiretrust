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
interface NotificationModalProps {
  notification: NotificationItem | null;
  onClose: () => void;
}

const NotificationModal = ({
  notification,
  onClose,
}: NotificationModalProps) => {
  return (
    <Dialog open={!!notification} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="z-58">
        <DialogContent className="z-60 w-[398px] md:left-[48%]">
          <DialogHeader className="flex items-center">
            {notification?.status === "Successful" ? (
              <div className="bg-[#11C600]/50 rounded-full size-19 flex items-center justify-center">
                <div className="bg-[#0FA301] size-15.5 rounded-full flex items-center justify-center">
                  <img src={naira} alt="naira" className="h-[25.54px]" />
                </div>
              </div>
            ) : (
              <div className="bg-[#FF0000]/50 rounded-full size-19 flex items-center justify-center">
                <div className="bg-[#FF0000] size-15.5 rounded-full flex items-center justify-center">
                  <X className="size-[42px] text-white" />
                </div>
              </div>
            )}
            <div className="font-medium">{notification?.message}</div>
            <h3>NGN 78,000</h3>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {notification?.message}
          </p>
          <div className="text-xs mt-2 text-right">
            {notification && format(notification.date, "PPpp")}
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default NotificationModal;
