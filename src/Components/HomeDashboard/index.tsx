import { useState } from "react";
import "./styles.css";
import {
  arrow_reload,
  circle_arrow_left,
  export_png,
  gala_add,
  LogoWhite,
  MoneyIn,
  MoneyOut,
  wallet,
} from "../../assets";
import BalanceOverview from "./BalanceOverview";
import TransferModal from "./TransferModal";
import { useQuery } from "@tanstack/react-query";
import { transactionHistory } from "@/api/user-notification";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";

type TransactionHistoryProps = {
  requestId: string;
  type: string;
  category: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  status: string;
  description: string;
  createdAt: Date;
  serviceType: string;
};

const HomeDashboard = () => {
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);

  const getStatusColorTransaction = (type: string) => {
    switch (type) {
      case "CREDIT":
        return "green";
      case "DEBIT":
        return "green";
      case "Announcement":
        return "orange";
      default:
        return "gray";
    }
  };
  const getBackgroundColorTransaction = (type: string) => {
    switch (type) {
      case "CREDIT":
        return "#16D005";
      case "DEBIT":
        return "#2EBAC6";
      default:
        return "#7910B1";
    }
  };

  const { isFetching, data: transactionsList } = useQuery({
    queryKey: ["transaction-history"],
    queryFn: transactionHistory,
    staleTime: 10 * 60 * 1000,
  });

  const notifications = transactionsList?.data as TransactionHistoryProps[];

  return (
    <>
      <BalanceOverview />

      <div className="rate-container overflow-x-auto pb-5">
        <div className="rate-container-left">
          <div className="action-buttons">
            <Link to="/crypto-trading" className="action-button">
              <img src={gala_add} alt="add icon" />
              <span>Fund</span>
            </Link>
            <div
              className="action-button"
              onClick={() => setIsWithdrawalOpen(true)}
            >
              <img src={export_png} alt="export icon" />
              <span>Withdraw</span>
            </div>
            <Link to="/crypto-trading" className="action-button">
              <img src={arrow_reload} alt="swap icon" />
              <span>Swap</span>
            </Link>
            <Link to="/crypto-trading" className="action-button">
              <img src={wallet} alt="wallet icon" />
              <span>Wallet</span>
            </Link>
          </div>

          <div className="quick-action">
            <div>
              <p className="quick-action-header">Quick Action - VTU</p>
              <Link to="/virtual-topups" className="quick-action-content">
                <p>Airtime</p>
                <img src={circle_arrow_left} alt="" />
              </Link>
            </div>
            <div>
              <p className="quick-action-header">Quick Action - Utility</p>
              <Link to="/utility-payment" className="quick-action-content">
                <p>Electricity</p>
                <img src={circle_arrow_left} alt="" />
              </Link>
            </div>
          </div>
        </div>

        <div className="rate-container-right">
          <div className="all-view">
            <div className="all-tab">
              <p>Transaction</p>
              <span className="all-count">{notifications?.length}</span>
            </div>
          </div>

          <div className="transaction-list max-h-[60vh] md:max-h-[calc(100vh-150px)] scrollbar-hide overflow-y-auto">
            {isFetching ? (
              <div className="flex flex-col gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <>
                {notifications
                  ?.filter(
                    (notif) =>
                      new Date(notif.createdAt).getMonth() ===
                      new Date().getMonth(),
                  )
                  .map((notif) => (
                    <div key={notif.requestId} className="transaction-item">
                      <div
                        className="transaction-icon-wrapper !rounded-[3.5px]"
                        style={{
                          backgroundColor: getBackgroundColorTransaction(
                            notif.type,
                          ),
                        }}
                      >
                        <img
                          src={
                            notif.type === "CREDIT"
                              ? MoneyIn
                              : notif.type === "DEBIT"
                                ? MoneyOut
                                : LogoWhite
                          }
                          alt="Transaction icon"
                          className="transaction-icon"
                        />
                      </div>

                      <div className="transaction-details">
                        <p className="transaction-title">{notif.serviceType}</p>
                        <p className="transaction-subtitle">
                          {notif.description}
                        </p>
                      </div>

                      <div
                        className="transaction-status"
                        style={{
                          backgroundColor: getStatusColorTransaction(
                            notif.type,
                          ),
                        }}
                      ></div>
                    </div>
                  ))}
                {notifications?.length === 0 && (
                  <div className="pt-4 text-center text-sm text-[#7901b1]">
                    No notifications for this month
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <TransferModal
        isWithdrawalOpen={isWithdrawalOpen}
        setIsWithdrawalOpen={() => setIsWithdrawalOpen(!isWithdrawalOpen)}
      />
    </>
  );
};

export default HomeDashboard;
