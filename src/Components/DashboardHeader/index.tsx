import "./styles.css";
import { HeaderProps } from "../../types";
import { format } from "date-fns";
import { calendar_svg, ellipse_user } from "../../assets";
import { HiOutlineBell } from "react-icons/hi2";
import ProfileModal from "../ProfileModal";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const DashboardHeader: React.FC<HeaderProps> = ({ username }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [hasNotifications] = useState(true);
  const [hasProfileNotifications] = useState(true);

  const HeaderContent = () => (
    <div className="dashboard-header flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <div onClick={toggleProfileModal} className="md:hidden">
          <img
            src={ellipse_user}
            alt="profile"
            className="h-9 w-9 rounded-full"
          />
        </div>

        <div className="welcome-section">
          <h1 className="font-semibold">Welcome to Bitwire Trust</h1>
          <p>Hi, {username}! Welcome Back</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 calendar-icon">
          <img src={calendar_svg} alt="Calendar" className="hidden lg:block" />
          <p className="hidden font-bold lg:block">{currentDate}</p>
        </div>

        <div className="relative">
          <HiOutlineBell className="h-7.5 w-7.5" />
          {hasNotifications && <span className="notification-badge orange" />}
        </div>

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

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };
  const location = useLocation();

  const currentDate = format(new Date(), "MMMM dd, yyyy - h:mm a");

  return (
    <div className="ps-4 pe-10 pt-9 lg:pt-3 pb-3">
      {location.pathname === "/dashboard" && (
        <div className="md:hidden">
          <HeaderContent />
        </div>
      )}

      <div className="hidden md:block">
        <HeaderContent />
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
