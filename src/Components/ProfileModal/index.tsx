import React, { useState } from "react";
import "./styles.css";
import { ModalType, ProfileModalProps } from "../../types";
import { useUser } from "@/context/userContext";
import Invite from "./profile-component/Invite";
import SecuritySettings from "./profile-component/SecuritySettings";
import TransactionPin from "./profile-component/TransactionPin";
import ConfirmTransactionPin from "./profile-component/ConfirmTransactionPin";
import Notifications from "./profile-component/Notification";
import Legal from "./profile-component/Legal";
import TermsCondition from "./profile-component/TermsCondition";
import PrivacyPolicy from "./profile-component/PrivacyPolicy";
import Profile from "./profile-component/Profile";
import Settings from "./profile-component/Settings";
import Contact from "./profile-component/Contact";

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profileImage,
}) => {
  const [activeModal, setActiveModal] = useState<ModalType>("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("••••••••");
  const [newPassword, setNewPassword] = useState("••••••••");
  const [confirmPassword, setConfirmPassword] = useState("cryptwire2023#");
  const [transactionPin, setTransactionPin] = useState(["", "", "", ""]);
  const [confirmTransactionPin, setConfirmTransactionPin] = useState([
    "",
    "",
    "",
    "",
  ]);
  const [emailNotification, setEmailNotification] = useState(true);
  const [pushNotification, setPushNotification] = useState(true);
  const { user } = useUser();
  const fullName = user?.firstName + " " + user?.lastName;

  const toggleModal = (modal: ModalType) => {
    setActiveModal(modal);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    if (!darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  const copyReferralCode = () => {
    const code = "bitwirejoneswie3iu44";
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert("Referral code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleClose = () => {
    setActiveModal("profile");
    onClose();
  };

  const handlePinChange = (
    index: number,
    value: string,
    isPinConfirmation: boolean = false
  ) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = isPinConfirmation
        ? [...confirmTransactionPin]
        : [...transactionPin];

      newPin[index] = value;

      if (isPinConfirmation) {
        setConfirmTransactionPin(newPin);
      } else {
        setTransactionPin(newPin);
      }

      if (value !== "" && index < 3) {
        const nextInput = document.getElementById(
          `${isPinConfirmation ? "confirm-pin" : "pin"}-${index + 1}`
        );
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const toggleNotification = (type: "email" | "push") => {
    if (type === "email") {
      setEmailNotification(!emailNotification);
    } else {
      setPushNotification(!pushNotification);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      {activeModal === "profile" && (
        <Profile
          toggleModal={toggleModal}
          fullName={fullName}
          profileImage={profileImage}
          user={user || undefined}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          handleClose={handleClose}
        />
      )}

      {activeModal === "invite" && (
        <Invite toggleModal={toggleModal} copyReferralCode={copyReferralCode} />
      )}

      {activeModal === "contact" && <Contact toggleModal={toggleModal} />}

      {activeModal === "settings" && <Settings toggleModal={toggleModal} />}

      {activeModal === "security-settings" && (
        <SecuritySettings
          toggleModal={toggleModal}
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          showConfirmPassword={showConfirmPassword}
          showCurrentPassword={showCurrentPassword}
          setShowCurrentPassword={setShowCurrentPassword}
          showNewPassword={showNewPassword}
          setShowNewPassword={setShowNewPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      )}

      {activeModal === "transaction-pin" && (
        <TransactionPin
          toggleModal={toggleModal}
          transactionPin={transactionPin}
          handlePinChange={handlePinChange}
          setTransactionPin={setTransactionPin}
        />
      )}

      {activeModal === "confirm-transaction-pin" && (
        <ConfirmTransactionPin
          setTransactionPin={setTransactionPin}
          toggleModal={toggleModal}
          confirmTransactionPin={confirmTransactionPin}
          handlePinChange={handlePinChange}
          transactionPin={transactionPin}
          setConfirmTransactionPin={setConfirmTransactionPin}
        />
      )}

      {activeModal === "notifications" && (
        <Notifications
          toggleModal={toggleModal}
          emailNotification={emailNotification}
          pushNotification={pushNotification}
          toggleNotification={toggleNotification}
        />
      )}

      {activeModal === "legal" && <Legal toggleModal={toggleModal} />}

      {activeModal === "terms-and-conditions" && (
        <TermsCondition toggleModal={toggleModal} />
      )}

      {activeModal === "policies" && (
        <PrivacyPolicy toggleModal={toggleModal} />
      )}
    </div>
  );
};

export default ProfileModal;
