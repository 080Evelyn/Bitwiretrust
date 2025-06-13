import PrivacyAndPolicy from "@/constants/PrivacyAndPolicy";
import { ModalType } from "@/types";

const PrivacyPolicy = ({
  toggleModal,
}: {
  toggleModal: (modal: ModalType) => void;
}) => {
  return (
    <div className="modal policies-modal">
      <div className="modal-header">
        <button className="back-btn" onClick={() => toggleModal("legal")}>
          Back
        </button>
        <h3>Policies</h3>
      </div>

      <PrivacyAndPolicy />
    </div>
  );
};

export default PrivacyPolicy;
