import { contact_us, kyc, legal, settings } from "@/assets";
import { IoIosArrowForward } from "react-icons/io";
import { ModalType } from "@/types";

interface ProfileOptionsProps {
  toggleModal: (modal: ModalType) => void;
}

const ProfileOptions = ({ toggleModal }: ProfileOptionsProps) => {
  return (
    <div className="profile-options">
      {/* <div className="option" onClick={() => toggleModal("invite")}>
        <div className="option-left">
          <img
            src={invite_friends}
            alt=""
            className="option-icon invite-icon"
          />
          <span>Invite Friends</span>
        </div>
        <IoIosArrowForward />
      </div> */}

      {/* <div className="option">
        <div className="option-left">
          <img
            src={dark_mode}
            alt=""
            className="option-icon dark-mode-icon"
          />
          <span>Dark Mode</span>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <span className="slider round"></span>
        </label>
      </div> */}

      <div className="option" onClick={() => toggleModal("contact")}>
        <div className="option-left">
          <img
            src={contact_us}
            alt="contact-us"
            className="option-icon contact-icon"
          />
          <span>Contact Us</span>
        </div>
        <IoIosArrowForward />
      </div>

      <div className="option" onClick={() => toggleModal("settings")}>
        <div className="option-left">
          <img
            src={settings}
            alt="settings"
            className="option-icon settings-icon"
          />
          <span>Settings</span>
        </div>
        <IoIosArrowForward />
      </div>

      <div className="option" onClick={() => toggleModal("legal")}>
        <div className="option-left">
          <img src={legal} alt="legal" className="option-icon legal-icon" />
          <span>Legal</span>
        </div>
        <IoIosArrowForward />
      </div>

      <div className="option" onClick={() => toggleModal("kyc")}>
        <div className="option-left">
          <img src={kyc} alt="kyc" className="option-icon account-icon" />
          <span>Account Limitations (KYC)</span>
        </div>
        <IoIosArrowForward />
      </div>

      {/* <div className="option">
        <div className="option-left">
          <img
            src={about_us}
            alt="about-us"
            className="option-icon about-icon"
          />
          <span>About Us</span>
        </div>
        <IoIosArrowForward />
      </div> */}
    </div>
  );
};

export default ProfileOptions;
