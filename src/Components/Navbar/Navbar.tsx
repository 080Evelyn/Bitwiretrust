import { useEffect, useState } from "react";
import logo from "../../assets/Logofull.png";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isMenuOpen) {
      const handleScroll = () => setIsMenuOpen(false);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to check if link is active
  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="navbar">
      {isMenuOpen === true && (
        <div className="sm:hidden backdrop-blur-xs fixed bg-black/40 w-full h-full top-0 left-0 z-100" />
      )}
      <Link to={"/"}>
        <img src={logo} alt="Bitwire logo" className="navbar-logo" />
      </Link>
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen ? "true" : "false"}
      >
        {isMenuOpen ? <X /> : <Menu />}
      </button>

      <div
        className={`nav-links !rounded-t-none ${isMenuOpen ? "active" : ""}`}
      >
        <div className="nav-menu-container" onClick={toggleMenu}>
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
          <Link to="/about" className={isActive("/about")}>
            About
          </Link>
          <Link to="/contact" className={isActive("/contact")}>
            Contact Us
          </Link>
        </div>

        <div className="nav-register">
          <Link to="/register" className={isActive("/register")}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
