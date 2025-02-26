import { useState } from "react";
import logo from "../../assets/Logofull.png";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Function to check if link is active
  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };
  
  return (
    <div className="navbar">
      <img src={logo} alt="Bitwire logo" className="navbar-logo" />
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen ? "true" : "false"}
      >
        {isMenuOpen ? "✖" : "☰"}
      </button>

      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <div className="nav-menu-container">
          <Link to="/" className={isActive("/")}>Home</Link>
          <Link to="/about" className={isActive("/about")}>About</Link>
          <Link to="/contact" className={isActive("/contact")}>Contact Us</Link>
        </div>
        
        <div className="nav-register">
          <Link to="/register" className={isActive("/register")}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;