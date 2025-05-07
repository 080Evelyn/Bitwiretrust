import { Outlet } from "react-router-dom";

import SideNavbar from "../../Components/SideNavbar";
import DashboardHeader from "../../Components/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col lg:[--sidebar-width:11.25rem] xl:[--sidebar-width:12.5rem] w-[100dvw]">
      <SideNavbar />

      <div className="flex flex-col lg:ml-[var(--sidebar-width)] max-lg:mt-10">
        <DashboardHeader username="John Doe" />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
