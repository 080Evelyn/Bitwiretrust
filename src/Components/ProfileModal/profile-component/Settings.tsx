import { change_password } from "@/assets";
import { ModalType } from "@/types";
import { IoIosArrowForward } from "react-icons/io";

const Settings = ({
  toggleModal,
}: {
  toggleModal: (modal: ModalType) => void;
}) => {
  return (
    <div className="modal settings-modal">
      <div className="modal-header">
        <button className="back-btn" onClick={() => toggleModal("profile")}>
          Back
        </button>
        <h3>Settings</h3>
      </div>

      <div className="settings-options">
        <div
          className="option"
          onClick={() => toggleModal("security-settings")}
        >
          <div className="option-left">
            <img
              src={change_password}
              alt=""
              className="option-icon security-icon"
            />
            <span>Security Settings</span>
          </div>
          <IoIosArrowForward />
        </div>

        {/* <div className="option" onClick={() => toggleModal("transaction-pin")}>
          <div className="option-left">
            <img
              src={transaction_pin}
              alt="transaction-pin"
              className="option-icon pin-icon"
            />
            <span>Transaction Pin</span>
          </div>
          <IoIosArrowForward />
        </div> */}

        {/* <div className="option" onClick={() => toggleModal("notifications")}>
          <div className="option-left">
            <img
              src={notification_bell}
              alt="notification-bell"
              className="option-icon notification-icon"
            />
            <span>Notifications</span>
          </div>
          <IoIosArrowForward />
        </div> */}
      </div>
    </div>
  );
};

export default Settings;
