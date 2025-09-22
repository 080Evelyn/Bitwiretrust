import { logo } from "@/assets";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import {
  Bell,
  ChartNoAxesCombined,
  LockKeyholeIcon,
  LogOut,
  Menu,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
// import { FaCoins } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const SideNavbar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const handleClick = () => {
    logout();
  };
  const [isOpen, setIsOpen] = useState(false);

  const sidebarContent = [
    {
      path: "/admin/dashboard",
      name: "Overview",
      icon: <ChartNoAxesCombined className="size-4.5" />,
    },
    {
      path: "/admin/transactions",
      name: "Transaction",
      icon: <Bell className="size-4.5" />,
    },
    {
      path: "/admin/kyc-management",
      name: "Kyc Management",
      icon: <LockKeyholeIcon className="size-4.5" />,
    },
    {
      path: "/admin/users-management",
      name: "Users Management",
      icon: <UsersRound className="size-4.5" />,
    },
    // {
    //   path: "/admin/crypto-management",
    //   name: "Crypto Management",
    //   icon: <FaCoins className="size-4.5" />,
    // },
  ];

  const SidebarContent = ({ onClick }: { onClick?: () => void }) => (
    <div className="flex flex-col mt-5 gap-12">
      <div className="flex justify-center">
        <Link to="/admin/dashboard" onClick={onClick}>
          <div className="flex items-center">
            <img
              src={logo}
              alt="logo"
              className="w-full h-[34px] object-contain"
            />
            <span className="text-white text-2xl">itwire</span>
          </div>
        </Link>
      </div>

      <div className="flex gap-2 flex-col justify-center w-full">
        {sidebarContent.map((sidebarItem) => {
          const isActive = location.pathname === sidebarItem.path;

          return (
            <Link
              to={sidebarItem.path}
              key={sidebarItem.path}
              onClick={onClick}
            >
              <div
                className={`flex items-center gap-2 mx-3 px-1.5 py-2.5 rounded-[4px] transition-all duration-300 text-sm font-semibold ${
                  isActive
                    ? "bg-white text-[#7910b1]"
                    : "text-white hover:bg-white hover:text-[#7910b1]"
                }`}
              >
                <div>{sidebarItem.icon}</div>
                <span>{sidebarItem.name}</span>
              </div>
            </Link>
          );
        })}

        <div
          className="flex gap-2 flex-col justify-center w-ful cursor-pointer"
          onClick={handleClick}
        >
          <div className="flex items-center gap-2 mx-3 px-1.5 py-2.5 rounded-[4px] transition-all duration-300 text-sm font-semibold text-white hover:bg-white hover:text-[#7910b1]">
            <LogOut className="size-4.5" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="bg-[#28003E] hidden lg:block h-screen w-[var(--sidebar-width)]">
        <SidebarContent />
      </aside>

      {/* mobile view */}
      <div className="lg:hidden fixed top-0 h-12.5 bg-white shadow-sm w-full z-50">
        <div className="flex justify-between items-center h-full px-4">
          <Link to="/admin/dashboard">
            <div className="flex items-center">
              <img
                src={logo}
                alt="logo"
                className="w-full h-7 object-contain"
              />
              <span className="text-[#7910B1] text-xl font-semibold">
                itwire
              </span>
            </div>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="text-[#7910B1]">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="lg:hidden bg-[#28003E] h-screen w-[var(--sidebar-width)]"
            >
              <SheetTitle className="sr-only">Side navbar</SheetTitle>
              <SidebarContent onClick={() => setIsOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
