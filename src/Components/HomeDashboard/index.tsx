import { useState } from "react";
import { RateData } from "../../types";
import { coinRates, giftcardRates, transactions } from "../../constants";
import "./styles.css";
import {
  arrow_reload,
  circle_arrow_left,
  export_png,
  gala_add,
  help_circle,
  password,
  wallet,
} from "../../assets";

type Props = object;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomeDashboard = (_props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_activeTab, setActiveTab] = useState("All");
  const [hideBalance, setHideBalance] = useState(false);

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

  const getStatusColorTransaction = (status: string) => {
    switch (status.toLowerCase()) {
      case "green":
        return "green";
      case "orange":
        return "orange";
      default:
        return "gray";
    }
  };

  const getBackgroundColorTransaction = (type: string) => {
    switch (type.toLowerCase()) {
      case "received":
        return "#16D005";
      case "transferred":
        return "#2EBAC6";
      case "updated":
        return "#7910B1";
      default:
        return "#E0E0E0";
    }
  };

  const renderRatesTable = (rates: RateData[]) => (
    <div>
      {rates.map((rate) => (
        <div key={rate.id} className="rates-table-row">
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
          <div className="rates-details">
            <div className="rates-name">{rate.name}</div>
            <div className="rates-values">
              <span>₦{rate.amount}</span>
            </div>
            <div>
              <img src={rate.icon} alt="" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="home-dashboard">
      <div className="total-balance">
        <div>
          <p>Total Balance</p>
          <img src={help_circle} alt="" />
        </div>
        <div>
          <h2>
            ₦
            {hideBalance ? (
              "******"
            ) : (
              <>
                152,000.<span className="decimal">00</span>
              </>
            )}
          </h2>

          <img src={password} onClick={() => setHideBalance(!hideBalance)} alt="" />

        </div>
      </div>

      <div className="rate-container">
        <div className="rate-container-left">
          <div className="action-buttons">
            <div className="action-button">
              <img src={gala_add} alt="" />
              <span>Fund</span>
            </div>
            <div className="action-button">
              <img src={export_png} alt="" />
              <span>Withdraw</span>
            </div>
            <div className="action-button">
              <img src={arrow_reload} alt="" />
              <span>Swap</span>
            </div>
            <div className="action-button">
              <img src={wallet} alt="" />
              <span>Wallet</span>
            </div>
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

          <div className="gift-cards-rates">
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
        </div>

        <div className="rate-container-right">
          <div className="all-view">
            <div className="all-tab" onClick={() => setActiveTab("All")}>
              <p>All</p>
              <span className="all-count">17</span>
            </div>

            <div
              className="tab-item"
              onClick={() => setActiveTab("Transaction")}
            >
              <p>Transaction</p>
              <span className="status-dot red"></span>
            </div>

            <div
              className="tab-item"
              onClick={() => setActiveTab("Announcement")}
            >
              <p>Announcement</p>
              <span className="status-dot green"></span>
            </div>

            <div
              className="tab-item"
              onClick={() => setActiveTab("Activities")}
            >
              <p>Activities</p>
              <span className="status-dot orange"></span>
            </div>
          </div>

          <div className="transaction-list">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">

                <div
                  className="transaction-icon-wrapper"
                  style={{
                    backgroundColor: getBackgroundColorTransaction(
                      transaction.type
                    ),
                  }}
                >
                  <img
                    src={transaction.image}
                    alt="Transaction icon"
                    className="transaction-icon"
                  />
                </div>

                {/* Transaction Details */}
                <div className="transaction-details">
                  <p className="transaction-title">{transaction.description}</p>
                  <p className="transaction-subtitle">
                    {transaction.subdescription}
                  </p>
                </div>

                {/* Status Indicator */}
                <div
                  className="transaction-status"
                  style={{
                    backgroundColor: getStatusColorTransaction(
                      transaction.status
                    ),
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
