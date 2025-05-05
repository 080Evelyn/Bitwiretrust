import "./styles.css";
import { HeaderProps } from "../../types";
import { format } from "date-fns";
import { calendar_svg, ellipse_user } from "../../assets";
import { HiOutlineBell } from "react-icons/hi2";
import ProfileModal from "../ProfileModal";
import { useState } from "react";

const DashboardHeader: React.FC<HeaderProps> = ({ username }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [hasNotifications] = useState(true);
  const [hasProfileNotifications] = useState(true);

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  const currentDate = format(new Date(), "MMMM dd, yyyy - h:mm a");

  return (
    <div className="!ps-4 !pe-10 !py-4 lg:w-[calc(100dvw-var(--sidebar-width))]">
      <div className="dashboard-header flex items-center justify-between">
        <div className="sm:hidden" onClick={toggleProfileModal}>
          <img
            src={ellipse_user}
            alt="profile"
            className="h-8 w-8 rounded-full"
          />
        </div>

        <div className="welcome-section ">
          <h1 className=" font-semibold">Welcome to Bitwire</h1>
          <p>Hi, {username}! Welcome Back</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 calendar-icon">
            <img src={calendar_svg} alt="Calendar" />
            <p>{currentDate}</p>
          </div>

          <div className="relative">
            <HiOutlineBell className="text-xl" />
            {hasNotifications && <span className="notification-badge orange" />}
          </div>

          <div
            className="hidden md:block relative cursor-pointer"
            onClick={toggleProfileModal}
          >
            <img
              src={ellipse_user}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
            {hasProfileNotifications && (
              <span className="notification-badge green" />
            )}
          </div>
        </div>
      </div>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={toggleProfileModal}
        profileImage={ellipse_user}
        username="Jacob Jones"
        email="Jacobbyjones@email.com"
      />
    </div>
  );
};

export default DashboardHeader;
