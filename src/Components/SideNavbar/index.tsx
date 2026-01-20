import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Menu } from "lucide-react";
import { navLinks } from "../../constants";
import { full_logo, login_png } from "../../assets";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import "./styles.css";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { calendar_svg } from "../../assets";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const SidebarContent = ({ onClick }: { onClick?: () => void }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { logout } = useAuth();

  const handleClick = () => {
    logout();
  };

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

            const isSubLinkActive = link.subLinks?.some((sub) =>
              location.pathname.startsWith(sub.to),
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
        <div className="side-navbar-actions max-sm:-mt-25">
          <div onClick={handleClick} className="text-sm cursor-pointer">
            <img src={login_png} alt="" className="side-navbar-icon" />
            Log out
          </div>
        </div>
      </div>
    </div>
  );
};

const SideNavbar = () => {
  const currentDate = format(new Date(), "MMMM dd, yyyy - h:mm a");

  const [scrolled, setScrolled] = useState(false);
  const closeSidebar = () => setIsOpen(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isGiftCardSellPage = useMemo(
    () =>
      location.pathname.startsWith("/gift-cards/") ||
      location.pathname.startsWith("/crypto-trading"),
    [location.pathname],
  );

  const headerClasses = cn(
    "lg:hidden pt-4 top-0 left-0 right-0 z-50 transition-colors duration-300",
    {
      "shadow-sm": scrolled && !isGiftCardSellPage,
      "bg-white fixed": !isGiftCardSellPage,
      "bg-transparent": isGiftCardSellPage,
    },
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">
      <aside className="hidden lg:block">
        <SidebarContent />
      </aside>

      <div className={headerClasses}>
        <div className="flex items-center justify-between px-5 pt-4 pb-3 relative">
          <Link
            to="/dashboard"
            className={cn("flex items-center gap-2", {
              "invisible md:visible": isGiftCardSellPage,
            })}
          >
            <img src={full_logo} alt="Bitwire Logo" className="h-7.5" />
          </Link>

          <div
            className={cn("flex items-center gap-2 cursor-pointer", {
              "invisible md:visible": isGiftCardSellPage,
            })}
          >
            <img src={calendar_svg} alt="Calendar" />
            <p className="text-xs sm:text-sm">{currentDate}</p>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  isGiftCardSellPage ? "text-foreground" : "text-[#7910B1]",
                  "z-50",
                )}
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="lg:hidden w-50 sm:w-45 p-0 text-white"
            >
              <SheetTitle className="sr-only">Side navbar</SheetTitle>
              <SidebarContent onClick={closeSidebar} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
