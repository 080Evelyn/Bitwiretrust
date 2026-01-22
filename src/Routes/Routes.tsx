import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AdminProtectedRoute, UserProtectedRoute } from "./protectedRoutes";
import ErrorBoundary from "@/ErrorBoundary";
import { lazyWithRetry } from "@/lib/lazyWithRetry";

// layouts
import Authlayout from "@/Authlayout";
import DashboardLayout from "../Pages/DashboardLayout";
import AdminLayout from "@/admin/components/layout/AdminLayout";

// Public pages
const Home = lazyWithRetry(() => import("../Pages/Home/Home"));
const About = lazyWithRetry(() => import("../Pages/About"));
const Contact = lazyWithRetry(() => import("../Pages/Contact"));
const PageNotFound = lazyWithRetry(() => import("@/Pages/404/PageNotFound"));

// Onboarding
const CreateAccountPage = lazyWithRetry(
  () => import("@/Pages/Onboarding/CreateAccountPage"),
);
const VerifyEmailPage = lazyWithRetry(
  () => import("@/Pages/Onboarding/VerifyEmailPage"),
);
const LoginPage = lazyWithRetry(() => import("@/Pages/Onboarding/LoginPage"));
const SetPinPage = lazyWithRetry(() => import("@/Pages/Onboarding/SetPinPage"));
const AddBankPage = lazyWithRetry(
  () => import("@/Pages/Onboarding/AddBankPage"),
);
const KycPage = lazyWithRetry(() => import("@/Pages/Onboarding/KycPage"));
const ForgotPassword = lazyWithRetry(
  () => import("@/Pages/Forget-Password/ForgetPassword"),
);

// User dashboard pages
const HomeDashboard = lazyWithRetry(
  () => import("../Components/HomeDashboard"),
);
const Utilitypayment = lazyWithRetry(() => import("../Pages/Utilitypayment"));
const VirtualTopUp = lazyWithRetry(() => import("@/Pages/VirtualTopUp"));
const BuyGiftCard = lazyWithRetry(
  () => import("@/Pages/GiftCards/BuyGiftCard"),
);
const SellGiftCards = lazyWithRetry(
  () => import("@/Pages/GiftCards/SellGiftCards"),
);
const CryptoTrading = lazyWithRetry(() => import("@/Pages/CryptoTrading"));

// Admin pages
const AdminDashboard = lazyWithRetry(
  () => import("@/admin/pages/AdminDashboard"),
);
const Transactions = lazyWithRetry(() => import("@/admin/pages/Transactions"));
const KycManagement = lazyWithRetry(
  () => import("@/admin/pages/KycManagement"),
);
const UserManagement = lazyWithRetry(
  () => import("@/admin/pages/UserManagement"),
);
const CryptoManagement = lazyWithRetry(
  () => import("@/admin/pages/CryptoManagement"),
);
const PendingWithdrawalRequest = lazyWithRetry(
  () => import("@/admin/pages/PendingWithdrawalRequest"),
);
const SuccessfulWithdrawalRequest = lazyWithRetry(
  () => import("@/admin/pages/SuccessfulWithdrawalRequest"),
);

// SHARED LOADER
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
  </div>
);

// ROUTER
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <PageNotFound />
      </Suspense>
    ),
  },

  // AUTH ROUTES
  {
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Authlayout />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      { path: "register", element: <CreateAccountPage /> },
      { path: "create-account", element: <CreateAccountPage /> },
      { path: "verify-email", element: <VerifyEmailPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "get-started", element: <LoginPage /> },
      { path: "set-pin", element: <SetPinPage /> },
      { path: "kyc", element: <KycPage /> },
      { path: "add-bank", element: <AddBankPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },

  //  USER DASHBOARD
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
            <Suspense fallback={<PageLoader />}>
              <DashboardLayout />
            </Suspense>
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

  //  ADMIN DASHBOARD
  {
    path: "admin",
    element: (
      <ErrorBoundary>
        <AdminProtectedRoute />
      </ErrorBoundary>
    ),
    children: [
      {
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminLayout />
          </Suspense>
        ),
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "transactions", element: <Transactions /> },
          { path: "kyc-management", element: <KycManagement /> },
          { path: "users-management", element: <UserManagement /> },
          { path: "crypto-management", element: <CryptoManagement /> },
          {
            path: "withdrawal-request/pending",
            element: <PendingWithdrawalRequest />,
          },
          {
            path: "withdrawal-request/success",
            element: <SuccessfulWithdrawalRequest />,
          },
        ],
      },
    ],
  },
]);
