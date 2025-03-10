import { Link, useLocation } from "react-router-dom";
import "./styles.css";
import { bottomLinks, navLinks } from "../../constants";
import { full_logo } from "../../assets";

type Props = {};

const SideNavbar = (_props: Props) => {
  const location = useLocation();

  return (
    <div className="side-navbar-wrapper">
      <div className="side-navbar-top">
        <div></div>
        <Link to="/home-dashboard">
          <img src={full_logo} alt="" className="side-navbar-logo" />
        </Link>
      </div>

      <div className="side-navbar-links">
        <ul>
          {navLinks.map((link) => (
            <li
              key={link.to}
              className={location.pathname === link.to ? "active" : ""}
            >
              <Link to={link.to}>
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
                <Link to={link.to}>
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
