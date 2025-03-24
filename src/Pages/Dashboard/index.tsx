import SideNavbar from "../../Components/SideNavbar";
import { Link, Outlet } from "react-router-dom";
import "./styles.css";
import DashboardHeader from "../../Components/DashboardHeader";
import { calendar_svg, full_logo } from "../../assets";
import { format } from "date-fns";
import { useEffect, useState } from "react";

type Props = {};

const Dashboard = (_props: Props) => {
  // const currentDate = format(new Date(), 'MMMM dd, yyyy - h:mm a');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 425);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

   const formatDate = () => {
      if (window.innerWidth <= 768) {
        return format(new Date(), 'MMM dd, yyyy');
      } else {
        return format(new Date(), 'MMMM dd, yyyy - h:mm a');
      }
    };
    
    const currentDate = formatDate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 425;
      setIsMobileView(mobile);
      if (mobile === false) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-mobile-header">
        <Link to="/home-dashboard">
          <img src={full_logo} alt="Bitwire Logo" className="side-navbar-logo" />
        </Link>

        {!isMobileView && (
          <div className="calendar-icon">
            <img src={calendar_svg} alt="Calendar" />
            <p>{currentDate}</p>
          </div>
        )}

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>
      
      {(isMobileView && isMenuOpen) || !isMobileView ? (
        <SideNavbar 
          isMobileView={isMobileView} 
          closeMenu={() => setIsMenuOpen(false)} 
        />
      ) : null}
      
      <div className={`dashboard-content ${isMobileView ? 'mobile-view' : ''}`}>
        <DashboardHeader username="John Doe" isMobileView={isMobileView} />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

