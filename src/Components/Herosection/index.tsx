import Buttons from "../Buttons";
import { a_vector, circle_arrow, circle_arrow_left, naira, primaryPhone, secondaryPhone } from "../../assets";
import transactionData from "../../constants";
import Offersection from "../Offersection";
import "./styles.css";
import { Link } from "react-router-dom";

type Props = object;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Herosection = (_props: Props) => {
  const successfulTransactions = transactionData.filter(
    (tx) => tx.status === "successful"
  );
  const pendingTransactions = transactionData.filter(
    (tx) => tx.status === "pending"
  );

  const primaryTransactions = [
    successfulTransactions[0],
    pendingTransactions[0],
  ];
  const secondaryTransactions = [
    successfulTransactions[1],
    pendingTransactions[1],
  ];
  return (
    <div className="hero-container">
      <div className="hero-content">
        <div className="hero-header">
          <h1>
            Effortlessly Simplify All Your Personal Finances with{" "}
            <span>Bitwire</span>
          </h1>
          <p>
            The revolutionary app that brings simplicity and convenienceto your
            financial life like never before.
          </p>
          <div className="button-group">
            <Link to={'/get-started'}><Buttons variant="primary" iconSrc={circle_arrow_left} iconPosition="right">Get Started</Buttons></Link>
            <Link to={'/about'}><Buttons variant="secondary" iconSrc={circle_arrow} iconPosition="right">Learn More</Buttons></Link>
          </div>
        </div>

        <div className="hero-preview">
          <div className="phone-container primary">
            <img src={primaryPhone} alt="" />
            <div className="transactions">
              {primaryTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`transaction ${transaction.status}`}
                >
                  <p className="icon">
                    {transaction.type === "withdrawal" ? (
                      <img src={naira} alt="Withdrawal" />
                    ) : (
                      <img src={a_vector} alt="Deposit" />
                    )}
                  </p>

                  <div className="details">
                    <p className="type">
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                    </p>
                    <p className="date">{transaction.date}</p>
                  </div>
                  <div className="amount-container">
                    {transaction.value && (
                      <span className="value">{transaction.value}</span>
                    )}
                    <p className="amount">
                      {transaction.status === "successful" ? (
                        `${transaction.currency
                        } ${transaction.amount.toLocaleString()}`
                      ) : (
                        <span className="pending-amount">
                          {`${transaction.amount.toLocaleString()} ${transaction.currency
                            }`}
                        </span>
                      )}
                    </p>

                    <p className="status">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="phone-container secondary">
            <img src={secondaryPhone} alt="" />
            <div className="transactions">
              {secondaryTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`transaction ${transaction.status}`}
                >
                  <span className="icon">
                    {transaction.type === "withdrawal" ? (
                      <img src={naira} alt="Withdrawal" />
                    ) : (
                      <img src={a_vector} alt="Deposit" />
                    )}
                  </span>
                  <div className="details">
                    <p className="type">
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                    </p>
                    <p className="date">{transaction.date}</p>
                  </div>
                  <div className="amount-container">
                    {transaction.value && (
                      <span className="value">{transaction.value}</span>
                    )}
                    <p className="amount">
                      {transaction.status === "successful" ? (
                        `${transaction.currency
                        } ${transaction.amount.toLocaleString()}`
                      ) : (
                        <span className="pending-amount">
                          {`${transaction.amount.toLocaleString()} ${transaction.currency
                            }`}
                        </span>
                      )}
                    </p>

                    <p className="status">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Offersection />
    </div>
  );
};

export default Herosection;
