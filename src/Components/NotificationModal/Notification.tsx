import { useMemo, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useQueryClient, useMutation } from "@tanstack/react-query";
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
import { useResponsivePopover } from "@/hooks/viewportResize";
import { LogoWhite, MoneyIn, MoneyOut, NotificationArrowDown } from "@/assets";
import { Skeleton } from "../ui/skeleton";
import { markAsRead } from "@/api/user-notification";
import { HiOutlineBell } from "react-icons/hi2";

interface NotificationPopoverProps {
  hasNotifications: boolean;
  isPending: boolean;
  notifications: TransactionData[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const statusColorMap = {
  success: "text-green-500",
  failed: "text-red-500",
  pending: "text-yellow-500",
};

const NotificationPopover = ({
  hasNotifications,
  notifications,
  isPending,
  isOpen,
  setIsOpen,
}: NotificationPopoverProps) => {
  const queryClient = useQueryClient();
  const [selectedNotif, setSelectedNotif] = useState<TransactionData | null>(
    null,
  );
  const [monthFilter, setMonthFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [localReadIds, setLocalReadIds] = useState<Set<string>>(new Set());

  type StatusKey = "success" | "failed" | "pending";

  function getStatusColor(status: string) {
    const key = (status ?? "").toLowerCase() as StatusKey;
    return statusColorMap[key] || "text-gray-400";
  }

  const readMutation = useMutation({
    mutationFn: (id: string) => {
      return markAsRead(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const handleNotificationClick = (notif: TransactionData) => {
    setSelectedNotif(notif);

    // instant UI feedback
    if (!notif.isRead) {
      setLocalReadIds((prev) => new Set(prev).add(notif.requestId));
      readMutation.mutate(notif.requestId);
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

  useResponsivePopover(isOpen, setIsOpen);

  return (
    <div>
      <Popover
        modal={true}
        open={isOpen}
        onOpenChange={(open) => {
          if (!open && selectedNotif) return;
          setIsOpen(open);
        }}
      >
        <PopoverTrigger asChild>
          <div className="relative cursor-pointer">
            <HiOutlineBell className="h-7.5 w-7.5 bell-animation" />
            {hasNotifications && <span className="notification-badge orange" />}
          </div>
        </PopoverTrigger>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs md:z-50 z-49"
            onClick={() => setIsOpen(false)}
          />
        )}

        <PopoverContent
          sideOffset={5}
          className="z-55 w-screen max-md:h-[94dvh] md:pb-4 max-md:-mt-14 md:w-[420px] md:mr-4 p-0 border border-[#F1F1F1] rounded-none md:rounded-2xl bg-white"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <button
            className="hidden md:block absolute top-2 left-[-35px] z-50 bg-white/80 hover:bg-white p-1 rounded-full cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <X className="size-4" />
          </button>

          <div className="flex flex-1 gap-4.5 justify-between items-center px-2 py-4 border-b text-sm font-semibold mx-0.5">
            <button
              className="md:hidden -ms-1.5 bg-white rounded-sm border-1 p-1 cursor-pointer "
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Back</span>
              <ArrowLeft className="size-5" />
            </button>
            <div className="flex justify-between w-full gap-3">
              <Select onValueChange={setMonthFilter}>
                <SelectTrigger className="font-semibold text-base hover:text-primary border-0 flex cursor-pointer gap-1 shadow-none bg-transparent h-8 [&_svg]:hidden">
                  <SelectValue placeholder="Month">
                    {monthFilter !== "All" ? monthFilter : "Month"}
                  </SelectValue>
                  <img src={NotificationArrowDown} alt="arrow-icon" />
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

              <div className="flex gap-1">
                <Select onValueChange={setCategoryFilter}>
                  <SelectTrigger className="font-semibold text-base hover:text-primary border-0 flex cursor-pointer gap-1 shadow-none  h-8 [&_svg]:hidden">
                    <SelectValue placeholder="Categories">
                      {categoryFilter !== "All" ? categoryFilter : "Categories"}
                    </SelectValue>
                    <img src={NotificationArrowDown} alt="arrow-icon" />
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
                  <SelectTrigger className="font-semibold text-base hover:text-primary border-0 flex cursor-pointer gap-1 shadow-none  h-8 [&_svg]:hidden">
                    <SelectValue placeholder="Status">
                      {statusFilter !== "All" ? statusFilter : "Status"}
                    </SelectValue>
                    <img src={NotificationArrowDown} alt="arrow-icon" />
                  </SelectTrigger>
                  <SelectContent className="z-[60]">
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="success">Successful</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                      className={cn(
                        !notif.isRead && !localReadIds.has(notif.id)
                          ? "bg-blue-500/8"
                          : "bg-background",
                        "flex justify-between items-start text-left hover:opacity-90 cursor-pointer rounded-md px-2 mx-1 py-1 transition",
                      )}
                    >
                      <div className="flex gap-2 w-[70%]">
                        <div
                          className={cn(
                            "size-9.5 flex items-center justify-center rounded-[3px] bg-primary",
                            notif.type === "CREDITED" && "bg-[#16D005]",
                            notif.type === "DEBITED" && "bg-[#2EBAC6]",
                          )}
                        >
                          <img
                            src={
                              notif.type === "CREDITED"
                                ? MoneyIn
                                : notif.type === "DEBITED"
                                  ? MoneyOut
                                  : LogoWhite
                            }
                            className="size-5"
                            alt={
                              notif.type === "CREDITED"
                                ? "money-in"
                                : notif.type === "DEBITED"
                                  ? "money-out"
                                  : "logo"
                            }
                          />
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
                            getStatusColor(notif.status),
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
