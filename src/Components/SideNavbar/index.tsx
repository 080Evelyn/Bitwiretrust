import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Menu } from "lucide-react";
import { navLinks, bottomLinks } from "../../constants";
import { full_logo } from "../../assets";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import "./styles.css";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { calendar_svg } from "../../assets";

const SidebarContent = ({ onClick }: { onClick?: () => void }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (link: string) => {
    setOpenDropdown((prev) => (prev === link ? null : link));
  };

  return (
    <div className="side-navbar-wrapper w-[var(--sidebar-width)]">
      <div className="side-navbar-top">
        <Link to="/dashboard" onClick={onClick}>
          <img src={full_logo} alt="Bitwire Logo" />
        </Link>
      </div>

      <div className="side-navbar-links">
        <ul>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;

            const isSubLinkActive = link.subLinks?.some(
              (sub) => location.pathname === sub.to
            );

            return (
              <li
                key={link.to || link.text}
                className={`${
                  isActive || isSubLinkActive
                    ? "active font-semibold text-[11px]"
                    : "text-[0.625rem]"
                }`}
              >
                {link.subLinks ? (
                  <div className="flex flex-col">
                    <div
                      className={`nav-parent-header flex items-center gap-2 px-4 lg:px-5 py-2 cursor-pointer relative ${
                        isActive || isSubLinkActive ? "active" : ""
                      }`}
                      onClick={() => handleDropdownToggle(link.text)}
                    >
                      <img
                        src={link.icon}
                        alt="icon"
                        className="side-navbar-icon"
                      />
                      <span>{link.text}</span>{" "}
                      <ChevronRight
                        className={`ml-auto size-4 transition-transform ${
                          openDropdown === link.text ? "rotate-90" : ""
                        }`}
                      />
                    </div>

                    {openDropdown === link.text && (
                      <ul className="pl-4">
                        {link.subLinks.map((subLink) => {
                          const isThisSubLinkActive =
                            location.pathname === subLink.to;

                          return (
                            <li key={subLink.to}>
                              <Link
                                to={subLink.to}
                                onClick={onClick}
                                className={`${
                                  isThisSubLinkActive ? "active" : ""
                                }`}
                              >
                                {subLink.text}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.to}
                    onClick={onClick}
                    className={`nav-parent-header flex items-center relative ${
                      isActive ? "active" : ""
                    }`}
                  >
                    <img src={link.icon} alt="" className="side-navbar-icon" />
                    {link.text}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="side-navbar-bottom">
        <div className="side-navbar-actions">
          {bottomLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClick}
              className={location.pathname === link.to ? "active" : "text-sm"}
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
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => setIsOpen(false);
  const location = useLocation();
  const isGiftCardSellPage = location.pathname.startsWith("/gift-cards/");

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
        className={`lg:hidden pt-4 fixed top-0 left-0 right-0 z-50 transition-colors duration-300
    ${scrolled && !isGiftCardSellPage ? "shadow-sm" : ""}
    ${isGiftCardSellPage ? "bg-transparent" : "bg-white"}`}
      >
        {isGiftCardSellPage ? (
          <div className="flex items-center justify-between px-5 pt-4 pb-3 relative">
            <Link to="/dashboard" className="hidden items-center gap-2">
              <img src={full_logo} alt="Bitwire Logo" className="h-6" />
            </Link>
            <div className=" hidden items-center gap-2 cursor-pointer">
              <img src={calendar_svg} alt="Calendar" />
              <p className="text-xs sm:text-sm">{currentDate}</p>
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="cursor-pointer">
                  <Menu className="text-[#7910B1] absolute right-5 h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-50 sm:w-45 p-0 text-white"
              >
                <SidebarContent onClick={closeSidebar} />
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center justify-between px-5 pt-4 pb-3 relative">
            <Link to="/dashboard" className="flex items-center gap-2">
              <img src={full_logo} alt="Bitwire Logo" className="h-6" />
            </Link>
            <div className="flex lg:hidden items-center gap-2 cursor-pointer">
              <img src={calendar_svg} alt="Calendar" />
              <p className="text-xs sm:text-sm">{currentDate}</p>
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="">
                  <Menu className="text-[#7910B1] h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-50 sm:w-45 p-0 text-white"
              >
                <SidebarContent onClick={closeSidebar} />
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
