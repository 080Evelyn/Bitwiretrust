import { Link, useLocation } from "react-router-dom";
import "./styles.css";
import { bottomLinks, navLinks } from "../../constants";
import { full_logo } from "../../assets";

type Props = {
  isMobileView?: boolean;
  closeMenu?: () => void;
};

const SideNavbar = ({ isMobileView = false, closeMenu }: Props) => {
  const location = useLocation();

  return (
    <div className={`side-navbar-wrapper ${isMobileView ? 'mobile-view' : ''}`}>
      {!isMobileView && (
        <div className="side-navbar-top">
          <Link to="/home-dashboard">
            <img src={full_logo} alt="Bitwire Logo" className="side-navbar-logo" />
          </Link>
        </div>
      )}

      <div className="side-navbar-links">
        <ul>
          {navLinks.map((link) => (
            <li
              key={link.to}
              className={location.pathname === link.to ? "active" : ""}
            >
              <Link to={link.to} onClick={isMobileView ? closeMenu : undefined}>
                <img src={link.icon} alt="" className="side-navbar-icon" />
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="side-navbar-bottom">
        <div className="side-navbar-actions">
          <ul>
            {bottomLinks.map((link) => (
              <li
                key={link.to}
                className={location.pathname === link.to ? "active" : ""}
              >
                <Link to={link.to} onClick={isMobileView ? closeMenu : undefined}>
                  <img src={link.icon} alt="" className="side-navbar-icon" />
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
