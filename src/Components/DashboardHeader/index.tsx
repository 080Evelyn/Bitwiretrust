import "./styles.css";
import { format } from "date-fns";
import { calendar_svg, ellipse_user } from "../../assets";
import ProfileModal from "../ProfileModal";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NotificationPopover from "../NotificationModal/Notification";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { TransactionListResponse } from "@/types";
import { transactions } from "@/api/user-notification";
import { useMediaQuery } from "@/hooks/use-media-query";

const DashboardHeader = ({ user }: { user: User }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [hasProfileNotifications] = useState(true);
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
          <img
            src={ellipse_user}
            alt="profile"
            className="size-12 sm:size-10 lg:size-12 rounded-full"
          />
        </div>

        <div className="welcome-section">
          <h1 className="font-semibold">Welcome to Bitwire Trust</h1>
          <p>Hi, {fullName}! Welcome Back</p>
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
          className="hidden md:block relative cursor-pointer"
          onClick={toggleProfileModal}
        >
          <img
            src={ellipse_user}
            alt="profile"
            className="h-9 w-9 rounded-full"
          />
          {hasProfileNotifications && (
            <span className="notification-badge green" />
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
        profileImage={ellipse_user}
        fullName={fullName}
        user={user}
      />
    </>
  );
};

export default DashboardHeader;
