import {
  contact_email,
  facebook_contact,
  faq,
  instagram,
  phone_icon,
  twitter,
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
            <span>Support@bitwire.com</span>
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
            <span>01234567890</span>
          </div>
          <IoIosArrowForward />
        </div>

        <div className="contact-option">
          <div className="option-left">
            <img src={faq} alt="faq" className="option-icon faq-icon" />
            <span>FAQs</span>
          </div>
          <IoIosArrowForward />
        </div>
      </div>

      <div className="social-media">
        <h4>Social Media</h4>
        <div className="social-icons">
          <a href="#" className="social-icon facebook">
            <img src={facebook_contact} alt="facebook" />
          </a>
          <a href="#" className="social-icon twitter">
            <img src={twitter} alt="twitter" />
          </a>
          <a href="#" className="social-icon instagram">
            <img src={instagram} alt="instragram" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
