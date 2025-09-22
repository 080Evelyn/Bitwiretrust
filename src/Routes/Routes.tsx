import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import About from "../Pages/About";
import Register from "../Pages/Register";
import Authlayout from "../Authlayout";
import { Step } from "../types";
import DashboardLayout from "../Pages/DashboardLayout";
import HomeDashboard from "../Components/HomeDashboard";
import Utilitypayment from "../Pages/Utilitypayment";
import Contact from "../Pages/Contact";
import VirtualTopUp from "@/Pages/VirtualTopUp";
import BuyGiftCard from "@/Pages/GiftCards/BuyGiftCard";
import SellGiftCards from "@/Pages/GiftCards/SellGiftCards";
import CryptoTrading from "@/Pages/CryptoTrading";
import { AdminProtectedRoute, UserProtectedRoute } from "./protectedRoutes";
import ForgotPassword from "@/Pages/Forget-Password/ForgetPassword";
import AdminLayout from "@/admin/components/layout/AdminLayout";
import AdminDashboard from "@/admin/pages/AdminDashboard";
import Transactions from "@/admin/pages/Transactions";
import KycManagement from "@/admin/pages/KycManagement";
import UserManagement from "@/admin/pages/UserManagement";
import PageNotFound from "@/Pages/404/PageNotFound";
import ErrorBoundary from "@/ErrorBoundary";
// import CryptoManagement from "@/admin/pages/CryptoManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  { path: "*", element: <PageNotFound /> },

  {
    children: [
      {
        element: <Authlayout />,
        children: [
          { path: "register", element: <Register /> },
          {
            path: "get-started",
            element: <Register initialStep={Step.GET_STARTED} />,
          },
          {
            path: "login",
            element: <Register initialStep={Step.GET_STARTED} />,
          },
          { path: "forgot-password", element: <ForgotPassword /> },
        ],
      },
    ],
  },

  //user route
  {
    element: (
      <ErrorBoundary>
        <UserProtectedRoute />
      </ErrorBoundary>
    ),
    children: [
      {
        element: (
          <ErrorBoundary>
            <DashboardLayout />
          </ErrorBoundary>
        ),
        children: [
          { path: "dashboard", element: <HomeDashboard /> },
          { path: "utility-payment", element: <Utilitypayment /> },
          { path: "virtual-topups", element: <VirtualTopUp /> },
          { path: "gift-cards/buy", element: <BuyGiftCard /> },
          { path: "gift-cards/sell", element: <SellGiftCards /> },
          { path: "crypto-trading", element: <CryptoTrading /> },
        ],
      },
    ],
  },

  //Admin route
  {
    element: (
      <ErrorBoundary>
        <AdminProtectedRoute />
      </ErrorBoundary>
    ),
    path: "admin/",
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "transactions", element: <Transactions /> },
          { path: "kyc-management", element: <KycManagement /> },
          { path: "users-management", element: <UserManagement /> },
          // { path: "crypto-management", element: <CryptoManagement /> },
        ],
      },
    ],
  },
]);
