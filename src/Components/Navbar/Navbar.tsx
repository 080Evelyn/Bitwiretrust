import { useState } from "react";
import logo from "../../assets/Logofull.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        
        <div className="nav-register">
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;