import {
  about_us,
  contact_us,
  edit_profile,
  invite_friends,
  kyc,
  legal,
  settings,
} from "@/assets";
import { cn } from "@/lib/utils";
import { ModalType } from "@/types";
import { User } from "@/types/user";
import { IoIosArrowForward } from "react-icons/io";

interface profileProps {
  toggleModal: (modal: ModalType) => void;
  fullName: string;
  profileImage: string;
  user: User | undefined;
  handleClose: () => void;
}

const Profile = ({
  toggleModal,
  fullName,
  profileImage,
  user,
  handleClose,
}: profileProps) => {
  return (
    <div className="modal profile-modal">
      <div className="profile-header">
        <div className="profile-image">
          <img src={profileImage} alt="profile" />
          <div className="edit-icon">
            <img src={edit_profile} alt="" className="edit-profile" />
          </div>
        </div>
        <h3>{fullName}</h3>
        <p>{user?.email}</p>
        <span
          className={cn(
            "text-sm capitalize",
            user?.userKycVerificationStatus === "VERIFIED"
              ? "text-green-600"
              : user?.userKycVerificationStatus === "PENDING"
              ? "text-yellow-500"
              : "text-red-500"
          )}
        >
          {user?.userKycVerificationStatus}
        </span>
      </div>

      <div className="profile-options">
        <div className="option" onClick={() => toggleModal("invite")}>
          <div className="option-left">
            <img
              src={invite_friends}
              alt=""
              className="option-icon invite-icon"
            />
            <span>Invite Friends</span>
          </div>
          <IoIosArrowForward />
        </div>

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

        <div className="option">
          <div className="option-left">
            <img
              src={about_us}
              alt="about-us"
              className="option-icon about-icon"
            />
            <span>About Us</span>
          </div>
          <IoIosArrowForward />
        </div>
      </div>

      <button className="close-modal-btn" onClick={handleClose}>
        Close
      </button>
    </div>
  );
};

export default Profile;
