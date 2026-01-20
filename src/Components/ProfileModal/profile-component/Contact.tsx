import {
  contact_email,
  // facebook_contact,
  // instagram,
  phone_icon,
  // twitter,
} from "@/assets";
import { ModalType } from "@/types";
import { IoIosArrowForward } from "react-icons/io";

const Contact = ({
  toggleModal,
}: {
  toggleModal: (modal: ModalType) => void;
}) => {
  return (
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
            <img
              src={contact_email}
              alt="email"
              className="option-icon support-icon"
            />
            <span>support@bitwiretrust.com</span>
          </div>
          <IoIosArrowForward />
        </div>

        <div className="contact-option">
          <div className="option-left">
            <img
              src={phone_icon}
              alt="phone-icon"
              className="option-icon phone-icon"
            />
            <span>+2348105907370</span>
          </div>
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
};

export default Contact;
