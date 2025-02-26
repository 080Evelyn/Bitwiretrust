import "./styles.css";
import WhysubSection from "../Whysubsection";
import { full_logo, security_validation, solar_copy, user } from "../../assets";

type Props = {};

const Whysection = (_props: Props) => {
  return (
    <div className="whysection-container">
      <div className="whysection-content">
        <WhysubSection />
        <div className="security-section">
          <div className="security-feature">
            <img
              src={security_validation}
              alt="Security Shield"
              className="feature-icon"
            />
            <p className="feature-text">
              Experience Top-Notch Security with Every Payment, Ensuring All
              Transactions Are Always Safe
            </p>
          </div>

          <div className="stats-feature">
            <h3 className="stats-number">3K</h3>
            <p className="stats-text">Top Users Experiences and Satisfaction</p>
          </div>

          <div className="main-content">
            <div className="usage-info">
              <h4 className="usage-title">Easy To Use</h4>
              <p className="usage-text">
                Our website offers a user-friendly interface that makes managing
                and completing your payments effortless, allowing you to
                navigate with ease and complete transactions in just a few
                clicks
              </p>
            </div>

            <div className="payment-wrapper">
              <div className="payment-card">
                <div className="payment-header">
                  <img src={user} alt="User" className="user-avatar" />
                  <div className="user-info">
                    <span className="user-name">Babasoola Oluwasina</span>
                    <span className="welcome">welcome back</span>
                  </div>
                </div>

                <div className="receiver-info">
                  <p className="username">Babasoola Oluwashina</p>
                  <p className="payment-amount">NGN 1,878,550</p>
                </div>

                <div className="wallet-box">
                  <p className="wallet-title">Wallet Address</p>
                  <p className="wallet-address">
                    123hryjkmtyvtrhbnjdfvsdnlkwa@wqhodiv674567bn78
                  </p>
                  <div className="wallet-icon">
                    <img src={full_logo} alt="Bitwire" />
                  </div>
                </div>

                <div className="withdrawal-info">
                  <div className="copy">
                    <p>withdrawal</p>
                    <div className="copy-address">
                      <p>copy address</p>
                      <img src={solar_copy} alt="copy-icon" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className="payment-input"
                    placeholder="ug79uh2hjv2h8f@wallet.bitwire.com"
                  />
                </div>

                <button className="payment-button">Pay</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whysection;
