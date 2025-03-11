import "./styles.css";
import Buttons from "../Buttons";
import { circle_arrow_left, gray_circle_arrow } from "../../assets";
import { Link } from "react-router-dom";

type Props = {};

const Readysetup = (_props: Props) => {
  return (
    <div className="setup-container">
      <div className="setup-content">
        <div className="usage-info">
          <h4 className="usage-title">Ready To Step Up Your Financial Life?</h4>
          <p className="usage-text">
            Discover Easy, Secure, and Efficient Solutions to Manage Your
            Payments, Track Your Expenses, and Achieve Your Financial Goals
          </p>
        </div>
      </div>
      <div className="button-group">
      <Link to={'/get-started'}><Buttons
          variant="primary"
          iconSrc={circle_arrow_left}
          iconPosition="right"
        >
          Get Started
        </Buttons>
        </Link>
        <Link to={'/about'}><Buttons
          variant="secondary" className="gray"
          iconSrc={gray_circle_arrow}
          iconPosition="right"
        >
          Learn More
        </Buttons>
        </Link>
      </div>
    </div>
  );
};

export default Readysetup;
