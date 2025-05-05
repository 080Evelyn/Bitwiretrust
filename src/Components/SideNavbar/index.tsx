import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { navLinks, bottomLinks } from "../../constants";
import { full_logo } from "../../assets";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import "./styles.css";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const SidebarContent = ({ onClick }: { onClick?: () => void }) => {
  const location = useLocation();

  return (
    <div className="side-navbar-wrapper w-[var(--sidebar-width)]">
      <div className="side-navbar-top">
        <Link to="/dashboard" onClick={onClick}>
          <img src={full_logo} alt="Bitwire Logo" />
        </Link>
      </div>

      <div className="side-navbar-links">
        <ul>
          {navLinks.map((link) => (
            <li
              key={link.to}
              className={location.pathname === link.to ? "active" : ""}
            >
              <Link to={link.to} onClick={onClick}>
                <img src={link.icon} alt="" className="side-navbar-icon" />
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="side-navbar-bottom">
        <div className="side-navbar-actions">
          {bottomLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClick}
              className={location.pathname === link.to ? "active" : ""}
            >
              <img src={link.icon} alt="" className="side-navbar-icon" />
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const SideNavbar = () => {
  const currentDate = format(new Date(), "MMMM dd, yyyy - h:mm a");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">
      <aside className="hidden lg:block">
        <SidebarContent />
      </aside>

      <div
        className={`lg:hidden fixed top-0 left-0 right-0 z-50  transition-colors duration-300 ${
          scrolled ? "bg-[#f2f2f2] shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between !px-6 !pt-2 ">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={full_logo} alt="Bitwire Logo" className="h-6" />
          </Link>
          <p className="block lg:hidden text-sm">{currentDate}</p>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12">
                <Menu className="text-[#7910B1] h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-50 sm:w-45 p-0 text-white">
              <SidebarContent onClick={() => {}} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
