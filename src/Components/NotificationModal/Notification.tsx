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
import { TransactionData } from "@/types";
import { format } from "date-fns";
import { ArrowLeft, X } from "lucide-react";
import NotificationModal from "./NotificationModal";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useResponsivePopover } from "@/hooks/viewportResize";
import { logo, MoneyIn, MoneyOut } from "@/assets";
import { Skeleton } from "../ui/skeleton";

interface NotificationPopoverProps {
  trigger: React.ReactNode;
  isPending: boolean;
  notifications: TransactionData[];
}

const iconMap = {
  CREDIT: <img src={MoneyIn} className="text-white size-5.5" />,
  DEBIT: <img src={MoneyOut} className="text-white size-5.5" />,
  Announcement: <img src={logo} className="text-white size-5.5" />,
};

const statusColorMap = {
  success: "text-green-500",
  failed: "text-red-500",
  pending: "text-yellow-500",
};

const NotificationPopover = ({
  trigger,
  notifications,
  isPending,
}: NotificationPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState<TransactionData | null>(
    null
  );

  const [monthFilter, setMonthFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  type StatusKey = "success" | "failed" | "pending";

  function getStatusColor(status: string) {
    const key = (status ?? "").toLowerCase() as StatusKey;
    return statusColorMap[key] || "text-gray-400";
  }

  const handleNotificationClick = (notif: TransactionData) => {
    if (selectedNotif?.id !== notif.id) {
      setSelectedNotif(notif);
    }
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      const notifMonth = format(notif.createdAt, "MMM");
      const matchesMonth = monthFilter === "All" || notifMonth === monthFilter;
      const matchesCategory =
        categoryFilter === "All" || notif.type === categoryFilter;
      const matchesStatus =
        statusFilter === "All" ||
        (notif.status !== null && notif.status.toLowerCase() === statusFilter);

      return matchesMonth && matchesCategory && matchesStatus;
    });
  }, [notifications, monthFilter, categoryFilter, statusFilter]);

  useScrollLock(isOpen);

  useResponsivePopover(isOpen, setIsOpen);

  return (
    <div>
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

          <div className="flex flex-1 gap-4.5 justify-between items-center p-4 border-b text-sm font-semibold mx-0.5">
            <button
              className="md:hidden -ms-1.5 bg-white rounded-sm border-1 p-1 cursor-pointer shadow-md"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Back</span>
              <ArrowLeft className="size-5" />
            </button>
            <div className="flex justify-between w-full gap-3">
              <Select onValueChange={setMonthFilter}>
                <SelectTrigger className="text-muted-foreground bg-transparent h-8">
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
                <SelectTrigger className=" text-muted-foreground bg-transparent h-8">
                  <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent className="z-[60]">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="ELECTRICITY">Electricity</SelectItem>
                  <SelectItem value="TRANSFER">Transfers</SelectItem>
                  <SelectItem value="AIRTIME">Airtime</SelectItem>
                  <SelectItem value="DATA">Data</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setStatusFilter}>
                <SelectTrigger className=" text-muted-foreground bg-transparent h-8">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="z-[60]">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="success">Successful</SelectItem>
                  <SelectItem value="pending">pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <ScrollArea className="h-[80vh] md:h-[65vh] lg:h-[75vh] p-3">
            <div className="flex flex-col gap-4.5 tracking-[-0.15px]">
              {isPending ? (
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : (
                <>
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
                            "size-9 flex items-center justify-center rounded-md bg-[#7910B1]",
                            notif.transactionType === "CREDIT" &&
                              "bg-[#16D005]",
                            notif.transactionType === "DEBIT" && "bg-[#2EBAC6]"
                          )}
                        >
                          {iconMap[notif.transactionType || "announcement"]}
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
                          {format(notif.createdAt, "MMM do, HH:mm")}
                        </div>
                        <div
                          className={cn(
                            "font-semibold capitalize",
                            getStatusColor(notif.status)
                          )}
                        >
                          {notif?.status && notif.status.toLowerCase()}
                        </div>
                      </div>
                    </button>
                  ))}
                  {filteredNotifications.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center mt-6">
                      No notifications found.
                    </p>
                  )}
                </>
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
