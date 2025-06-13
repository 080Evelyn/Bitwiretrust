import { change_password } from "@/assets";
import { ModalType } from "@/types";
import { IoIosArrowForward, IoIosEye, IoIosEyeOff } from "react-icons/io";

interface SecuritySettingsProps {
  toggleModal: (modal: ModalType) => void;
  currentPassword: string;
  setCurrentPassword: (password: string) => void;
  showCurrentPassword: boolean;
  setShowCurrentPassword: (show: boolean) => void;
  newPassword: string;
  setNewPassword: (password: string) => void;
  showNewPassword: boolean;
  setShowNewPassword: (show: boolean) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
}

const SecuritySettings = ({
  toggleModal,
  currentPassword,
  setCurrentPassword,
  showCurrentPassword,
  setShowCurrentPassword,
  newPassword,
  setNewPassword,
  showNewPassword,
  setShowNewPassword,
  confirmPassword,
  setConfirmPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: SecuritySettingsProps) => {
  return (
    <div className="modal security-settings-modal">
      <div className="modal-header">
        <button className="back-btn" onClick={() => toggleModal("settings")}>
          Back
        </button>
        <h3>Security Settings</h3>
      </div>

      <div className="security-content">
        <div className="option" onClick={() => {}}>
          <div className="option-left">
            <img
              src={change_password}
              alt="change-password"
              className="option-icon password-icon"
            />
            <span>Change Password</span>
          </div>
          <IoIosArrowForward />
        </div>

        <div className="password-fields">
          <div className="password-field">
            <label>Current Password</label>
            <div className="password-input-container">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                className="toggle-password"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <IoIosEyeOff /> : <IoIosEye />}
              </button>
            </div>
          </div>

          <div className="password-field">
            <label>New Password</label>
            <div className="password-input-container">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                className="toggle-password"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <IoIosEyeOff /> : <IoIosEye />}
              </button>
            </div>
          </div>

          <div className="password-field">
            <label>Confirm New Password</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <IoIosEyeOff /> : <IoIosEye />}
              </button>
            </div>
          </div>
        </div>

        <button className="done">Done</button>
      </div>
    </div>
  );
};

export default SecuritySettings;
