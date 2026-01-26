import { Link } from "react-router-dom";
import { arrow_reload, export_png, gala_add, wallet } from "../../assets";

interface ActionButtonsProps {
  onWithdrawClick: () => void;
}

const ActionButtons = ({ onWithdrawClick }: ActionButtonsProps) => {
  return (
    <div className="action-buttons">
      <Link to="/crypto-trading" className="action-button">
        <img src={gala_add} alt="add icon" />
        <span>Fund</span>
      </Link>
      <button className="action-button" onClick={onWithdrawClick}>
        <img src={export_png} alt="export icon" />
        <span>Withdraw</span>
      </button>
      <Link to="/crypto-trading" className="action-button">
        <img src={arrow_reload} alt="swap icon" />
        <span>Swap</span>
      </Link>
      <Link to="/crypto-trading" className="action-button">
        <img src={wallet} alt="wallet icon" />
        <span>Wallet</span>
      </Link>
    </div>
  );
};

export default ActionButtons;
