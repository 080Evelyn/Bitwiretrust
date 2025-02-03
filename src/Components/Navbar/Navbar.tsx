
import { useState } from "react";
import logo from "../../assets/Logofull.png"
import "./Navbar.css"


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

      <div className={`nav-menu-container ${isMenuOpen ? "active" : ""}`}
        role="menu">
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact Us</a>
        <div className="nav-register">
          <button><a href="/register">Register</a></button>
        </div>
      </div>

    </div>



  )
}

export default Navbar