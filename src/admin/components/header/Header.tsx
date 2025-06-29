import { AdminNotificationIcon, SearchFilther } from "@/assets";
import { Search } from "lucide-react";
import { useState } from "react";
import AdminNotification from "./Notification";

const AdminHeader = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const isPending = false;
  const notifications = [""];

  return (
    <>
      <div className="bg-white flex items-center justify-between px-4 py-3">
        <div className="flex relative">
          <div className="p-2 absolute top-1/2 left-1 -translate-y-1/2 bg-[#28003E] text-white rounded-full">
            <Search className="size-4" />
          </div>
          <input
            type="text"
            className="w-[37vw] h-10 !border-[0.84px] !border-[#C3D4E9]/20 !rounded-full !px-12 !bg-[#F0F0F0]"
          />
          <img
            src={SearchFilther}
            alt="filter icon"
            className="h-5 absolute top-1/2 right-3 -translate-y-1/2"
          />
        </div>

        <div className="flex items-center gap-3">
          <AdminNotification
            isPending={isPending}
            notifications={notifications}
            trigger={
              <div
                className="p-2 rounded-full cursor-pointer border-[0.84px] border-[#B71FFF]/40"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <img
                  src={AdminNotificationIcon}
                  alt="notification icon"
                  className="size-6"
                />
              </div>
            }
          />

          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt=""
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          <span className="font-semibold">Admin</span>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
