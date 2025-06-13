import { notification_key } from "@/assets";
import { ModalType } from "@/types";

interface NotificationProps {
  toggleModal: (modal: ModalType) => void;
  emailNotification: boolean;
  pushNotification: boolean;
  toggleNotification: (type: "email" | "push") => void;
}
const Notifications = ({
  toggleModal,
  emailNotification,
  pushNotification,
  toggleNotification,
}: NotificationProps) => {
  return (
    <div className="modal notifications-modal">
      <div className="modal-header">
        <button className="back-btn" onClick={() => toggleModal("settings")}>
          Back
        </button>
        <h3>Notification Settings</h3>
      </div>

      <div className="notifications-content">
        <div className="notification-option">
          <div className="option-left">
            <img
              src={notification_key}
              alt=""
              className="option-icon password-icon"
            />
            <span>Email Notification</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={emailNotification}
              onChange={() => toggleNotification("email")}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="notification-option">
          <div className="option-left">
            <img
              src={notification_key}
              alt=""
              className="option-icon password-icon"
            />
            <span>Push Notification</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={pushNotification}
              onChange={() => toggleNotification("push")}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <button className="done">Done</button>
      </div>
    </div>
  );
};

export default Notifications;
