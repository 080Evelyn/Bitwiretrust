import { circled_frame } from "@/assets";
import { FaCheck } from "react-icons/fa";

const SuccessModal = () => {
  return (
    <div className="modal-overlay">
      <div className="success-modal">
        <div className="success-modal-content">
          <img
            src={circled_frame}
            alt="Success"
            className="success-modal-image"
          />

          <div className="success-icon">
            <div className="checkmark-background">
              <FaCheck className="checkmark" />
            </div>
          </div>

          <h3>Congratulation!</h3>
          <p>You are all set.</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
