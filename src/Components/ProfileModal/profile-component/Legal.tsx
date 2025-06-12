import { policies, term_condition } from "@/assets";
import { ModalType } from "@/types";
import { IoIosArrowForward } from "react-icons/io";

const Legal = ({
  toggleModal,
}: {
  toggleModal: (modal: ModalType) => void;
}) => {
  return (
    <div className="modal legal-modal">
      <div className="modal-header">
        <button className="back-btn" onClick={() => toggleModal("profile")}>
          Back
        </button>
        <h3>Legal</h3>
      </div>

      <div className="legal-options">
        <div
          className="option"
          onClick={() => toggleModal("terms-and-conditions")}
        >
          <div className="option-left">
            <img
              src={term_condition}
              alt="terms-conditions"
              className="option-icon security-icon"
            />
            <span>Terms & Conditions</span>
          </div>
          <IoIosArrowForward />
        </div>

        <div className="option" onClick={() => toggleModal("policies")}>
          <div className="option-left">
            <img
              src={policies}
              alt="policies"
              className="option-icon security-icon"
            />
            <span>Policies</span>
          </div>
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
};

export default Legal;
