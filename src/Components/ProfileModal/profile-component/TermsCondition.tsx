import TermsAndCondition from "@/constants/TermsAndCondition";
import { ModalType } from "@/types";

const TermsCondition = ({
  toggleModal,
}: {
  toggleModal: (modal: ModalType) => void;
}) => {
  return (
    <div className="modal terms-conditions-modal">
      <div className="modal-header">
        <button className="back-btn" onClick={() => toggleModal("legal")}>
          Back
        </button>
        <h3>Terms & Conditions</h3>
      </div>
      <TermsAndCondition />
    </div>
  );
};

export default TermsCondition;
