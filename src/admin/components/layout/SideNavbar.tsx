import { logo } from "@/assets";
import {
  Bell,
  ChartNoAxesCombined,
  LockKeyholeIcon,
  UsersRound,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SideNavbar = () => {
  const location = useLocation();

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
  ];

  return (
    <div className="bg-[#28003E] hidden lg:block h-screen w-[var(--sidebar-width)]">
      <div className="flex flex-col mt-5 gap-12">
        <div className="flex justify-center">
          <Link to="/admin/dashboard">
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
              <Link to={sidebarItem.path} key={sidebarItem.path}>
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
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
