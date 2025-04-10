import React, { useState, useEffect } from "react";
import "./styles.css";
import { HeaderProps } from "../../types";
import { format } from "date-fns";
import { calendar_svg, ellipse_user } from "../../assets";
import { HiOutlineBell } from "react-icons/hi2";
import ProfileModal from "../ProfileModal";

interface ExtendedHeaderProps extends HeaderProps {
  isMobileView?: boolean;
}

const DashboardHeader: React.FC<ExtendedHeaderProps> = ({
  username,
  isMobileView: propsMobileView = false,
}) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(propsMobileView);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isTabletView, setIsTabletView] = useState(false);
  const [hasNotifications] = useState(true);
  const [hasProfileNotifications] = useState(true);


  const formatDate = () => {
    if (window.innerWidth <= 768) {
      return format(new Date(), "MMM dd, yyyy");
    } else {
      return format(new Date(), "MMMM dd, yyyy - h:mm a");
    }
  };

  const currentDate = formatDate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 425 || propsMobileView);
      setIsTabletView(window.innerWidth <= 768 && window.innerWidth > 425);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [propsMobileView]);

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  return (
    <div className="dashboard-header">
      <div className={`header-top ${isMobileView ? "mobile-view" : ""}`}>
        {isMobileView && (
          <div className="mobile-profile-icon" onClick={toggleProfileModal}>
            <img src={ellipse_user} alt="profile" />
          </div>
        )}

        <div className="welcome-section">
          <h1>Welcome to Bitwire</h1>
          <p>Hi, {username}! Welcome Back</p>
        </div>

        <div className="header-actions">
          {!isMobileView && (
            <div className="calendar-icon">
              <img src={calendar_svg} alt="Calendar" />
              <p>{currentDate}</p>
            </div>
          )}

          <div className="notification-icon">
            <HiOutlineBell className="notification" />
            {hasNotifications && (
              <span className="notification-badge orange"></span>
            )}
          </div>

          {!isMobileView && (
            <div className="profile-icon" onClick={toggleProfileModal}>
              <img src={ellipse_user} alt="profile" />
              {hasProfileNotifications && (
                <span className="notification-badge green"></span>
              )}
            </div>
          )}
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
