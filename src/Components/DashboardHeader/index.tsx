import "./styles.css";
import { format } from "date-fns";
import { calendar_svg } from "../../assets";
import ProfileModal from "../ProfileModal";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NotificationPopover from "../NotificationModal/Notification";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { TransactionListResponse } from "@/types";
import { transactions } from "@/api/user-notification";
import { useMediaQuery } from "@/hooks/use-media-query";
import { User2 } from "lucide-react";

const DashboardHeader = ({ user }: { user: User }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { isPending, data: transactionsList } =
    useQuery<TransactionListResponse>({
      queryKey: ["transactions"],
      queryFn: transactions,
    });

  useEffect(() => {
    if (
      transactionsList?.data.length === 0 ||
      transactionsList?.data.every((transaction) => transaction.isRead === true)
    ) {
      setHasNotifications(false);
    } else {
      setHasNotifications(true);
    }
  }, [transactionsList]);

  const fullName = user?.first_name + " " + user?.last_name;
  const currentDate = format(new Date(), "MMMM dd, yyyy - h:mm a");

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };
  const location = useLocation();

  const HeaderContent = () => (
    <div className="dashboard-header flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <div onClick={toggleProfileModal} className="md:hidden cursor-pointer">
          {user?.profileUpload?.url ? (
            <img
              src={user?.profileUpload?.url}
              alt="profile"
              className="size-11 rounded-full"
            />
          ) : (
            <User2 className="size-full p-2 text-primary fill-primary/50" />
          )}
        </div>

        <div>
          <h1 className="font-semibold text-lg sm:text-2xl">
            Welcome to Bitwire Trust
          </h1>
          <p className="text-xs sm:text-sm">Hi, {fullName}! Welcome Back</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 calendar-icon">
          <img src={calendar_svg} alt="Calendar" className="hidden lg:block" />
          <p className="hidden font-bold lg:block">{currentDate}</p>
        </div>

        <NotificationPopover
          notifications={transactionsList?.data || []}
          isPending={isPending}
          hasNotifications={hasNotifications}
          isOpen={isNotificationOpen}
          setIsOpen={setIsNotificationOpen}
        />

        <div
          className="hidden md:block relative cursor-pointer bg-[#E9A9FF80] rounded-full"
          onClick={toggleProfileModal}
        >
          {user?.profileUpload?.url ? (
            <img
              src={user?.profileUpload?.url}
              alt="profile"
              className="size-10 rounded-full"
            />
          ) : (
            <User2 className="size-full p-2 text-primary fill-primary/50" />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {location.pathname === "/dashboard" && !isDesktop && (
        <div className="md:hidden ps-5 pe-10 pt-20 lg:pt-3 pb-3">
          <HeaderContent />
        </div>
      )}

      {isDesktop && (
        <div className="hidden md:block ps-4 pe-10 md:pt-20 lg:pt-3 pb-3">
          <HeaderContent />
        </div>
      )}

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={toggleProfileModal}
        fullName={fullName}
      />
    </>
  );
};

export default DashboardHeader;
