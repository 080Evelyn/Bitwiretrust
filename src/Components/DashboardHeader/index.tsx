import React, { useState } from 'react'
import './styles.css'
import { HeaderProps } from '../../types'
import { format } from 'date-fns';
import { calendar_svg, ellipse_user } from '../../assets';
import { HiOutlineBell } from "react-icons/hi2";
import ProfileModal from '../ProfileModal';

interface ExtendedHeaderProps extends HeaderProps {
  isMobileView?: boolean;
}

const DashboardHeader: React.FC<ExtendedHeaderProps> = ({ username, isMobileView = false }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const currentDate = format(new Date(), 'MMMM dd, yyyy - h:mm a');
  
  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  return (
    <div className='dashboard-header'>
      <div className={`header-top ${isMobileView ? 'mobile-view' : ''}`}>
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
            <HiOutlineBell className='notification' />
          </div>
          
          {!isMobileView && (
            <div className="profile-icon" onClick={toggleProfileModal}>
              <img src={ellipse_user} alt="profile" />
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
