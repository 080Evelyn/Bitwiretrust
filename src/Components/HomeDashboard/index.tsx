import { useState } from "react";
import {
  RateData,
  TransactionData,
  TransactionListResponse,
} from "../../types";
import { coinRates, giftcardRates } from "../../constants";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import BalanceOverview from "./BalanceOverview";
import TransferModal from "./TransferModal";
import { useQuery } from "@tanstack/react-query";
import { transactions } from "@/api/user-notification";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";

type Props = object;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomeDashboard = (_props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_activeTab, setActiveTab] = useState("All");
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);

  const getBackgroundColor = (name: string) => {
    switch (name.toLowerCase()) {
      case "amazon":
        return "#2EBAC6";
      case "googleplay":
        return "#F7AE02";
      case "fortrite":
        return "#F7931A";
      case "aave":
        return "#2EBAC6";
      case "bitcoin":
        return "#F7AE02";
      default:
        return "#ddd";
    }
  };
  const getStatusColorTransaction = (type: string) => {
    switch (type) {
      case "CREDITED":
        return "green";
      case "DEBITED":
        return "green";
      case "orange":
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
      case "updated":
        return "#e0e0e0";
      default:
        return "#7910B1";
    }
  };
  const renderRatesTable = (rates: RateData[]) => (
    <div>
      {rates.map((rate) => (
        <div
          key={rate.id}
          className="flex justify-between items-center py-2 border-b-[0.78px] md:border-b-[0.45px] border-[#F9EDFF]"
        >
          <div className="flex items-center">
            <div
              className="rates-icon-wrapper"
              style={{ backgroundColor: getBackgroundColor(rate.name) }}
            >
              <img
                src={rate.image}
                alt={`${rate.name} logo`}
                className="rates-icon"
              />
            </div>
            <div className="text-xs md:text-[10px] text-[#8C8C8C]">
              {rate.name}
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <span className="text-[17px] md:text-[10px] text-foreground font-medium">
              ₦{rate.amount}
            </span>
            <img src={rate.icon} alt="" className="size-5" />
          </div>
        </div>
      ))}
    </div>
  );

  const { isFetching, data: transactionsList } =
    useQuery<TransactionListResponse>({
      queryKey: ["transactions"],
      queryFn: transactions,
    });

  const notifications = transactionsList?.data;

  return (
    <>
      <BalanceOverview />

      <div className="rate-container overflow-x-auto">
        <div className="rate-container-left">
          <div className="action-buttons">
            <div
              className="action-button"
              onClick={() => console.log("Fund account clicked")}
            >
              <img src={gala_add} alt="" />
              <span>Fund</span>
            </div>
            <div
              className="action-button"
              onClick={() => setIsWithdrawalOpen(true)}
            >
              <img src={export_png} alt="" />
              <span>Withdraw</span>
            </div>
            <Link to="/crypto-trading" className="action-button">
              <img src={arrow_reload} alt="" />
              <span>Swap</span>
            </Link>
            <Link to="/crypto-trading" className="action-button">
              <img src={wallet} alt="" />
              <span>Wallet</span>
            </Link>
          </div>

          <div className="quick-action">
            <div>
              <p className="quick-action-header">Quick Action - VTU</p>
              <div className="quick-action-content">
                <p>09132642083</p>
                <img src={circle_arrow_left} alt="" />
              </div>
            </div>
            <div>
              <p className="quick-action-header">Quick Action - Utility</p>
              <div className="quick-action-content">
                <p>Betting</p>
                <img src={circle_arrow_left} alt="" />
              </div>
            </div>
          </div>

          <div className="hidden md:flex gap-[15px]">
            <div className="rates-section">
              <div className="rates-header">
                <span>Giftcard Rates</span>
              </div>
              {renderRatesTable(giftcardRates)}
            </div>

            <div className="rates-section">
              <div className="rates-header">
                <span>Coin Rates</span>
              </div>
              {renderRatesTable(coinRates)}
            </div>
          </div>
          <div className="hidden border-[1.75px] border-[#F1F1F1] shadow-xs rounded-sm w-full p-4">
            <Tabs defaultValue="gift-card">
              <TabsList className="flex gap-5 w-full">
                <TabsTrigger
                  value="gift-card"
                  className="bg-[#B71FFF66]  cursor-pointer text-foreground px-4 py-5.5 rounded-[5.16px] text-sm data-[state=active]:bg-[#7910B1] data-[state=active]:text-white"
                >
                  Giftcard Rates
                </TabsTrigger>
                <TabsTrigger
                  value="coin-rates"
                  className="bg-[#B71FFF66] cursor-pointer text-foreground px-4 py-5.5 rounded-[5.16px] text-sm data-[state=active]:bg-[#7910B1]  data-[state=active]:text-white"
                >
                  Coin Rates
                </TabsTrigger>
              </TabsList>

              <TabsContent value="gift-card">
                {renderRatesTable(giftcardRates)}
              </TabsContent>
              <TabsContent value="coin-rates">
                {renderRatesTable(coinRates)}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="rate-container-right">
          <div className="all-view">
            <div className="all-tab" onClick={() => setActiveTab("All")}>
              <p>All</p>
              <span className="all-count">{notifications?.length}</span>
            </div>

            <div
              className="tab-item"
              onClick={() => setActiveTab("Transaction")}
            >
              <p>Transaction</p>
              <span className="status-dot green"></span>
            </div>

            <div
              className="tab-item"
              onClick={() => setActiveTab("Announcement")}
            >
              <p>Announcement</p>
              <span className="status-dot red"></span>
            </div>

            <div
              className="tab-item"
              onClick={() => setActiveTab("Activities")}
            >
              <p>Activities</p>
              <span className="status-dot orange"></span>
            </div>
          </div>

          <div className="transaction-list max-h-[60vh] md:max-h-[calc(100vh-150px)] overflow-y-auto">
            {isFetching ? (
              <div className="flex flex-col gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <>
                {notifications?.map((notif: TransactionData) => (
                  <div key={notif.id} className="transaction-item">
                    <div
                      className="transaction-icon-wrapper !rounded-[3.5px]"
                      style={{
                        backgroundColor: getBackgroundColorTransaction(
                          notif.type
                        ),
                      }}
                    >
                      <img
                        src={
                          notif.type === "CREDITED"
                            ? MoneyIn
                            : notif.type === "DEBITED"
                            ? MoneyOut
                            : LogoWhite
                        }
                        alt="Transaction icon"
                        className="transaction-icon"
                      />
                    </div>

                    <div className="transaction-details">
                      <p className="transaction-title">{notif.title}</p>
                      <p className="transaction-subtitle">{notif.message}</p>
                    </div>

                    <div
                      className="transaction-status"
                      style={{
                        backgroundColor: getStatusColorTransaction(notif.type),
                      }}
                    ></div>
                  </div>
                ))}
                {notifications?.length === 0 && (
                  <div className="pt-4 text-center text-sm text-[#7901b1]">
                    No Notifications found
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
