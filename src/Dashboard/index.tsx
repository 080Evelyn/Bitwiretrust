import React from "react";
import SideNavbar from "../Components/SideNavbar";
import { Outlet } from "react-router-dom";
import "./styles.css";
import DashboardHeader from "../Components/DashboardHeader";

type Props = {};

const Dashboard = (_props: Props) => {
  return (
    <div className="dashboard-container">
      <SideNavbar />
      <div className="dashboard-content">
        <DashboardHeader username="John Doe"/>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
