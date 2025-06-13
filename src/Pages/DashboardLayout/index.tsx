import { Outlet } from "react-router-dom";

import SideNavbar from "../../Components/SideNavbar";
import DashboardHeader from "../../Components/DashboardHeader";
import { useUser } from "@/context/userContext";

const DashboardLayout = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <span>Loading...</span>;

  return (
    <div className="grid grid-cols-1 lg:[--sidebar-width:11.25rem] xl:[--sidebar-width:12.5rem] w-screen overflow-x-hidden">
      <SideNavbar />

      <div className="flex flex-col lg:ml-[var(--sidebar-width)] w-full lg:w-[calc(100vw-var(--sidebar-width))] max-lg:mt-10">
        <DashboardHeader user={user} />
        <div className="mx-[4vw] bg-[#FEFBFB]  md:mx-[3vw] lg:mx-4 lg:pe-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
