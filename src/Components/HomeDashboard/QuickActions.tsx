import { Link } from "react-router-dom";
import { circle_arrow_left } from "../../assets";

const QuickActions = () => {
  return (
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
  );
};

export default QuickActions;
