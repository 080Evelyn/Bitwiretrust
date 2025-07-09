import { Outlet } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import AdminHeader from "../header/Header";

const AdminLayout = () => {
  return (
    <div className="flex flex-col md:flex-row lg:[--sidebar-width:12.5rem] xl:[--sidebar-width:13.5rem] w-screen overflow-x-hidden">
      <SideNavbar />
      <div className="flex flex-col max-lg:mt-12.5 w-full h-screen overflow-y-auto lg:w-[calc(100vw-var(--sidebar-width))]">
        <AdminHeader />
        <div className="bg-[#F0F0F0] px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
