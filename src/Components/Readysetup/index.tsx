import "./styles.css";
import Buttons from "../Buttons";
import { circle_arrow_left, gray_circle_arrow } from "../../assets";

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
        <Buttons
          variant="primary"
          iconSrc={circle_arrow_left}
          iconPosition="right"
        >
          Get Started
        </Buttons>
        <Buttons
          variant="secondary" className="gray"
          iconSrc={gray_circle_arrow}
          iconPosition="right"
        >
          Learn More
        </Buttons>
      </div>
    </div>
  );
};

export default Readysetup;
