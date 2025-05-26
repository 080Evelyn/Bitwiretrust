import { useMemo, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { NotificationItem } from "@/types";
import { format } from "date-fns";
import { Bell, Send, Wallet, X } from "lucide-react";
import NotificationModal from "./NotificationModal";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useResponsivePopover } from "@/hooks/viewportResize";

interface NotificationPopoverProps {
  trigger: React.ReactNode;
  notifications: NotificationItem[];
}

const iconMap = {
  wallet: <Wallet className="text-white size-5.5" />,
  send: <Send className="text-white size-5.5" />,
  bell: <Bell className="text-white size-5.5" />,
};

const statusColorMap = {
  Successful: "text-green-500",
  Failed: "text-red-500",
};

const NotificationPopover = ({
  trigger,
  notifications,
}: NotificationPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState<NotificationItem | null>(
    null
  );

  const [monthFilter, setMonthFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleNotificationClick = (notif: NotificationItem) => {
    if (selectedNotif?.id !== notif.id) {
      setSelectedNotif(notif);
    }
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      const notifMonth = format(notif.date, "MMM");
      const matchesMonth = monthFilter === "All" || notifMonth === monthFilter;
      const matchesCategory =
        categoryFilter === "All" || notif.category === categoryFilter;
      const matchesStatus =
        statusFilter === "All" || notif.status === statusFilter;

      return matchesMonth && matchesCategory && matchesStatus;
    });
  }, [notifications, monthFilter, categoryFilter, statusFilter]);

  useScrollLock(isOpen);

  useResponsivePopover(isOpen, setIsOpen);

  return (
    <div className="">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs md:z-50 z-49"
            onClick={() => setIsOpen(false)}
          />
        )}

        <PopoverContent
          sideOffset={5}
          className="z-55 w-screen max-md:h-[94vh] md:pb-4 max-md:-mt-14 md:w-[420px] md:mr-4 p-0 border border-[#F1F1F1] rounded-none md:rounded-2xl bg-white"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <button
            className="hidden md:block absolute top-2 left-[-35px] z-50 bg-white/80 hover:bg-white p-1 rounded-full cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <X className="size-4" />
          </button>

          <div className="flex justify-between items-center p-4 border-b text-sm font-semibold">
            <div className="flex justify-between w-full gap-4">
              <Select onValueChange={setMonthFilter}>
                <SelectTrigger className="w-[100px] text-muted-foreground bg-transparent h-8">
                  <SelectValue placeholder="Month">
                    {monthFilter !== "All" ? monthFilter : "Month"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="z-[60]">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Jan">Jan</SelectItem>
                  <SelectItem value="Feb">Feb</SelectItem>
                  <SelectItem value="Mar">Mar</SelectItem>
                  <SelectItem value="Apr">Apr</SelectItem>
                  <SelectItem value="May">May</SelectItem>
                  <SelectItem value="Jun">Jun</SelectItem>
                  <SelectItem value="Jul">Jul</SelectItem>
                  <SelectItem value="Aug">Aug</SelectItem>
                  <SelectItem value="Sep">Sep</SelectItem>
                  <SelectItem value="Oct">Oct</SelectItem>
                  <SelectItem value="Nov">Nov</SelectItem>
                  <SelectItem value="Dec">Dec</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[130px] text-muted-foreground bg-transparent h-8">
                  <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent className="z-[60]">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Payments">Payments</SelectItem>
                  <SelectItem value="Transfers">Transfers</SelectItem>
                  <SelectItem value="Alerts">Alerts</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[100px] text-muted-foreground bg-transparent h-8">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="z-[60]">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Successful">Successful</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <ScrollArea className="h-[80vh] md:h-[65vh] lg:h-[75vh] p-3">
            <div className="flex flex-col gap-4.5 tracking-[-0.15px]">
              {filteredNotifications.map((notif) => (
                <button
                  key={notif.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNotificationClick(notif);
                  }}
                  className="flex justify-between items-start text-left hover:bg-accent/40 rounded-md px-2 py-1 transition"
                >
                  <div className="flex gap-2 w-[70%]">
                    <div
                      className={cn(
                        "size-9 flex items-center justify-center rounded-md",
                        notif.icon === "wallet" && "bg-[#16D005]",
                        notif.icon === "send" && "bg-[#2EBAC6]",
                        notif.icon === "bell" && "bg-[#7910B1]"
                      )}
                    >
                      {iconMap[notif.icon || "bell"]}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h4 className="font-medium text-sm md:text-xs">
                        {notif.title}
                      </h4>
                      <p className="text-muted-foreground font-medium text-xs md:text-[10px] leading-snug">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs md:text-[10px] flex flex-col items-end">
                    <div className="text-muted-foreground font-light">
                      {format(notif.date, "MMM do, HH:mm")}
                    </div>
                    <div
                      className={cn(
                        "font-semibold",
                        statusColorMap[notif.status]
                      )}
                    >
                      {notif.status}
                    </div>
                  </div>
                </button>
              ))}
              {filteredNotifications.length === 0 && (
                <p className="text-sm text-muted-foreground text-center mt-6">
                  No notifications found.
                </p>
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      {/* Notification modal */}
      <NotificationModal
        notification={selectedNotif}
        onClose={() => setSelectedNotif(null)}
      />
    </div>
  );
};

export default NotificationPopover;
