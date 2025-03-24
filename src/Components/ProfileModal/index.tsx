import React, { useState } from "react";
import "./styles.css";
import { ProfileModalProps } from "../../types";
import { IoIosArrowForward, IoIosEye, IoIosEyeOff, IoMdCopy } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { about_us, contact_email, contact_us, dark_mode, facebook_contact, faq, illustration, instagram, invite_friends, kyc, legal, phone_icon, settings, twitter } from "../../assets";

type ModalType = "profile" | "invite" | "contact" | 'settings' 
| 'security-settings' 
| 'transaction-pin' 
| 'notifications' 
| null;

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profileImage,
  email,
  username,
}) => {
    const [activeModal, setActiveModal] = useState<ModalType>('profile');
    const [darkMode, setDarkMode] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('••••••••');
    const [newPassword, setNewPassword] = useState('••••••••');
    const [confirmPassword, setConfirmPassword] = useState('cryptwire2023#');
    const [transactionPin, setTransactionPin] = useState(['', '', '', '']);
    const [emailNotification, setEmailNotification] = useState(true);
    const [pushNotification, setPushNotification] = useState(true);
    
    const toggleModal = (modal: ModalType) => {
      setActiveModal(modal);
    };
    
    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
      
      if (!darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    };
    
    const copyReferralCode = () => {
      const code = "bitwirejoneswie3iu44";
      navigator.clipboard.writeText(code)
        .then(() => {
          alert("Referral code copied to clipboard!");
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    };
    
    const handleClose = () => {
      setActiveModal('profile');
      onClose();
    };
    
    const handlePinChange = (index: number, value: string) => {
      if (value.length <= 1 && /^\d*$/.test(value)) {
        const newPin = [...transactionPin];
        newPin[index] = value;
        setTransactionPin(newPin);
        
        if (value !== '' && index < 3) {
          const nextInput = document.getElementById(`pin-${index + 1}`);
          if (nextInput) nextInput.focus();
        }
      }
    };
    
    if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      {activeModal === "profile" && (
        <div className="modal profile-modal">
          <div className="profile-header">
            <div className="profile-image">
              <img src={profileImage} alt="profile" />
            </div>
            <h3>{username}</h3>
            <p>{email}</p>
            <span className="verified-badge">Verified</span>
          </div>

          <div className="profile-options">
            <div className="option" onClick={() => toggleModal("invite")}>
              <div className="option-left">
                <img src={invite_friends} alt="" className="option-icon invite-icon"/>
                <span>Invite Friends</span>
              </div>
              <IoIosArrowForward />
            </div>

            <div className="option">
              <div className="option-left">
                <img src={dark_mode} alt="" className="option-icon dark-mode-icon"/>
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
            </div>

            <div className="option" onClick={() => toggleModal("contact")}>
              <div className="option-left">
                <img src={contact_us} alt="contact-us" className="option-icon contact-icon"/>
                <span>Contact Us</span>
              </div>
              <IoIosArrowForward />
            </div>

            <div className="option">
              <div className="option-left">
                <img src={settings} alt="settings" className="option-icon settings-icon"/>
                <span>Settings</span>
              </div>
              <IoIosArrowForward />
            </div>

            <div className="option">
              <div className="option-left">
                <img src={legal} alt="legal" className="option-icon legal-icon"/>
                <span>Legal</span>
              </div>
              <IoIosArrowForward />
            </div>

            <div className="option">
              <div className="option-left">
                <img src={kyc} alt="kyc" className="option-icon account-icon"/>
                <span>Account Limitations (KYC)</span>
              </div>
              <IoIosArrowForward />
            </div>

            <div className="option">
              <div className="option-left">
                <img src={about_us} alt="about-us" className="option-icon about-icon"/>
                <span>About Us</span>
              </div>
              <IoIosArrowForward />
            </div>
          </div>

          <button className="close-modal-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      )}

      {activeModal === "invite" && (
        <div className="modal invite-modal">
          <div className="modal-header">
            <button className="back-btn" onClick={() => toggleModal("profile")}>
             Back
            </button>
            <h3>Invite Friends</h3>
          </div>

          <div className="invite-content">
            <div className="invite-illustration">
              <div className="invite-graphic">
                <div className="people-circles">
                  <img src={illustration} alt="illustration" />
                </div>
              </div>
            </div>

            <h4>Get Rewarded for Inviting Users</h4>
            <p>Refer friends to Bitwire and earn referral bonuses</p>

            <div className="referral-code">
              <code>bitwirejoneswie3iu44</code>
              <button className="copy-btn" onClick={copyReferralCode}>
                Copy <IoMdCopy />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === "contact" && (
        <div className="modal contact-modal">
          <div className="modal-header">
            <button className="back-btn" onClick={() => toggleModal("profile")}>
              Back
            </button>
            <h3>Contact Us</h3>
          </div>

          <div className="contact-options">
            <div className="contact-option">
              <div className="option-left">
                <img src={contact_email} alt='email' className="option-icon support-icon"/>
                <span>Support@bitwire.com</span>
              </div>
              <IoIosArrowForward />
            </div>

            <div className="contact-option">
              <div className="option-left">
                <img src={phone_icon} alt="phone-icon" className="option-icon phone-icon"/>
                <span>01234567890</span>
              </div>
              <IoIosArrowForward />
            </div>

            <div className="contact-option">
              <div className="option-left">
                <img src={faq} alt="faq" className="option-icon faq-icon"/>
                <span>FAQs</span>
              </div>
              <IoIosArrowForward />
            </div>
          </div>

          <div className="social-media">
            <h4>Social Media</h4>
            <div className="social-icons">
              <a href="#" className="social-icon facebook">
                <img src={facebook_contact} alt='facebook'/>

              </a>
              <a href="#" className="social-icon twitter">
                <img src={twitter} alt='twitter'/>
              </a>
              <a href="#" className="social-icon instagram">
                <img src={instagram} alt='instragram'/>
              </a>
            </div>
          </div>
        </div>
      )}

      {activeModal === "settings" && (
        <div className="modal settings-modal">
          <div className="modal-header">
            <button className="back-btn" onClick={() => toggleModal("profile")}>
              <IoArrowBackOutline /> Back
            </button>
            <h3>Settings</h3>
          </div>

          <div className="settings-options">
            <div
              className="option"
              onClick={() => toggleModal("security-settings")}
            >
              <div className="option-left">
                <span className="option-icon security-icon">🔐</span>
                <span>Security Settings</span>
              </div>
              <IoIosArrowForward />
            </div>

            <div
              className="option"
              onClick={() => toggleModal("transaction-pin")}
            >
              <div className="option-left">
                <span className="option-icon pin-icon">🔢</span>
                <span>Transaction Pin</span>
              </div>
              <IoIosArrowForward />
            </div>

            <div
              className="option"
              onClick={() => toggleModal("notifications")}
            >
              <div className="option-left">
                <span className="option-icon notification-icon">🔔</span>
                <span>Notifications</span>
              </div>
              <IoIosArrowForward />
            </div>
          </div>
        </div>
      )}

      {activeModal === "security-settings" && (
        <div className="modal security-settings-modal">
          <div className="modal-header">
            <button
              className="back-btn"
              onClick={() => toggleModal("settings")}
            >
              <IoArrowBackOutline /> Back
            </button>
            <h3>Security Settings</h3>
          </div>

          <div className="security-content">
            <div className="option" onClick={() => {}}>
              <div className="option-left">
                <span className="option-icon password-icon">🔑</span>
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

            <button className="action-button">Done</button>
          </div>
        </div>
      )}

   
       {activeModal === 'transaction-pin' && (
        <div className="modal transaction-pin-modal">
          <div className="modal-header">
            <button 
              className="back-btn"
              onClick={() => toggleModal('settings')}
            >
              <IoArrowBackOutline /> Back
            </button>
            <h3>Transaction Pin</h3>
          </div>
          
          <div className="transaction-pin-content">
            <h4>Create a four digit transaction pin</h4>
            <p>It's important to keep your transaction PIN confidential and not share it with anyone.</p>
            
            <div className="pin-instruction">
              <span className="pin-lock-icon">🔒</span>
              <span>Enter Passcode to continue</span>
            </div>
            
            <div className="pin-input-container">
              {transactionPin.map((digit, index) => (
                <input
                  key={index}
                  id={`pin-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  className="pin-input"
                />
              ))}
            </div>
            
            <button className="action-button">Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
