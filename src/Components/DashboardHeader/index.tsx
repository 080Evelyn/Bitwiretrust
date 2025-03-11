import React from 'react'
import './styles.css'
import { HeaderProps } from '../../types'
import { format } from 'date-fns';
import { calendar_svg, ellipse_user } from '../../assets';
import { HiOutlineBell } from "react-icons/hi2";


const DashboardHeader: React.FC<HeaderProps> = ({ username }) => {

    const currentDate = format(new Date(), 'MMMM dd, yyyy - h:mm a');

  return (
    <div className='dashboard-header'>
    <div className="header-top">
    <div className="welcome-section">
          <h1>Welcome to Bitwire</h1>
          <p>Hi, {username}! Welcome Back</p>
        </div>

        <div className="header-actions">
            <div className="calendar-icon">
                <img src={calendar_svg} alt=''/>
                <p>{currentDate}</p>
            </div>

            <div className="notification-icon">
                <HiOutlineBell className='notification'/>
            </div>
            <div className="profile-icon">
                <img src={ellipse_user} alt="profile" />
            </div>
        </div>
    </div>


    </div>
  )
}

export default DashboardHeader