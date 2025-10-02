// src/components/SideNavbar.tsx
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
  ChevronDown,
  WalletCardsIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FaCoins } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

type SidebarChild = {
  path: string;
  name: string;
};

type SidebarItem = {
  path: string;
  name: string;
  icon?: React.ReactNode;
  children?: SidebarChild[];
};

const SIDEBAR_CONTENT: SidebarItem[] = [
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
  {
    path: "/admin/crypto-management",
    name: "Crypto Management",
    icon: <FaCoins className="size-4.5" />,
  },
  {
    path: "/admin/withdrawal-request",
    name: "Fiat Withdrawal",
    icon: <WalletCardsIcon className="size-4.5" />,
    children: [
      {
        path: "/admin/withdrawal-request/pending",
        name: "Pending",
      },
      {
        path: "/admin/withdrawal-request/success",
        name: "Successful",
      },
    ],
  },
];

type SidebarItemProps = {
  item: SidebarItem;
  onClick?: () => void;
  isMobile?: boolean;
  expanded: string | null;
  setExpanded: (value: string | null) => void;
  locationPath: string;
};

const SidebarItemComponent = ({
  item,
  onClick,
  expanded,
  setExpanded,
  locationPath,
}: SidebarItemProps) => {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const isActiveExact = locationPath === item.path;
  const isActiveParent =
    isActiveExact || (hasChildren && locationPath.startsWith(`${item.path}/`));

  const isExpanded = expanded === item.path;

  const toggleExpand = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setExpanded(expanded === item.path ? null : item.path);
  };

  if (hasChildren) {
    return (
      <div className="mx-3">
        <button
          onClick={toggleExpand}
          aria-expanded={isExpanded}
          className={cn(
            "w-full flex items-center justify-between gap-2 px-1.5 py-2.5 rounded-[4px] transition-all duration-500 text-sm font-semibold group relative overflow-hidden",
            isActiveParent
              ? "bg-white text-[#7910b1]"
              : "text-white hover:bg-white hover:text-[#7910b1]"
          )}
        >
          <span className="absolute inset-0 bg-background transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />

          <div className="flex items-center gap-2 z-10">
            <div>{item.icon}</div>
            <span>{item.name}</span>
          </div>

          <ChevronDown
            className={cn("size-4 z-10 transition-transform duration-300", {
              "rotate-180": isExpanded,
              "rotate-0": !isExpanded,
            })}
          />
        </button>

        <div
          className="overflow-hidden transition-[max-height] duration-300"
          style={{
            maxHeight: isExpanded
              ? `${(item.children?.length ?? 0) * 48}px`
              : "0px",
          }}
        >
          <div className="flex flex-col mt-2 space-y-1">
            {item.children?.map((child) => {
              const isActiveChild = locationPath === child.path;
              return (
                <Link
                  to={child.path}
                  onClick={() => {
                    onClick?.();
                    setExpanded(item?.path);
                  }}
                  key={child.path}
                  className="block"
                >
                  <div
                    className={cn(
                      "flex items-center gap-2 mx-3 pl-8 pr-1.5 py-2 rounded-[4px] transition-all duration-300 text-sm font-medium",
                      isActiveChild
                        ? "bg-white/95 text-[#7910b1] border-l-5 rounded-r-xl border-[#7910b1] pl-3"
                        : "text-white hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <span className="relative z-10">{child.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Normal single-level link
  return (
    <Link to={item.path} onClick={onClick} className="block">
      <div
        className={cn(
          "flex items-center gap-2 mx-3 px-1.5 py-2.5 rounded-[4px] transition-all duration-500 text-sm font-semibold group relative overflow-hidden",
          isActiveExact
            ? "bg-white text-[#7910b1]"
            : "text-white hover:bg-white hover:text-[#7910b1]"
        )}
      >
        <span className="absolute inset-0 bg-background transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />

        <div className="flex items-center gap-2 relative z-10 transition-colors duration-300 delay-100">
          <div>{item.icon}</div>
          <span>{item.name}</span>
        </div>
      </div>
    </Link>
  );
};

const SidebarContent = ({
  onClick,
  expanded,
  setExpanded,
  locationPath,
}: {
  onClick?: () => void;
  expanded: string | null;
  setExpanded: (value: string | null) => void;
  locationPath: string;
}) => (
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
      {SIDEBAR_CONTENT.map((sidebarItem) => (
        <SidebarItemComponent
          key={sidebarItem.path}
          item={sidebarItem}
          onClick={onClick}
          expanded={expanded}
          setExpanded={setExpanded}
          locationPath={locationPath}
        />
      ))}
    </div>
  </div>
);

const SideNavbar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  // memoize the path for stable reference
  const locationPath = useMemo(() => location.pathname, [location.pathname]);

  // auto-expand parent if current route is inside it (useful on page load / deep link)
  useEffect(() => {
    const parent = SIDEBAR_CONTENT.find((s) => locationPath.startsWith(s.path));
    if (parent && parent.children) {
      setExpanded(parent.path);
    } else {
      // do not forcibly collapse to preserve user's manual toggles
      setExpanded(null);
    }
  }, [locationPath]);

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <>
      <aside className="bg-[#28003E] hidden lg:block h-screen w-[var(--sidebar-width)]">
        <SidebarContent
          onClick={() => {}}
          expanded={expanded}
          setExpanded={setExpanded}
          locationPath={locationPath}
        />
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
              <SidebarContent
                onClick={() => {
                  setIsOpen(false);
                }}
                expanded={expanded}
                setExpanded={setExpanded}
                locationPath={locationPath}
              />
              <div className="mx-3 mt-6">
                <div
                  role="button"
                  onClick={() => {
                    handleLogoutClick();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-1.5 py-2.5 rounded-[4px] transition-all duration-500 text-sm font-semibold text-white hover:bg-white hover:text-[#7910b1] group relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-background transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                  <div className="flex items-center gap-2 relative z-10 transition-colors duration-300 delay-100">
                    <LogOut className="size-4.5" />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
