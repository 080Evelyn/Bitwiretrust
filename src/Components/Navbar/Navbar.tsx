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

        <div className="flex items-center gap-3 lg:mt-1">
          <Link to="/login">
            <div className="py-1.75 px-3.5 outline-[#7910b9] outline-[1.5px] rounded-sm hover:bg-[#f9f9f9] hover:scale-[1.05] transition-all ease-in-out duration-300">
              Login
            </div>
          </Link>
          <Link to="/register">
            <div className="py-2 px-3.5 bg-[#7910b9] text-white rounded-sm hover:bg-[#6809a3] hover:scale-[1.05] transition-all ease-in-out duration-300">
              Register
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
