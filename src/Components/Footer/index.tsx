import "./styles.css";
import Readysetup from "../Readysetup";
// import { footer_logo } from "../../assets";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type Props = object;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Footer = (_props: Props) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Readysetup />
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <ul>
              <li>
                <a href="#">Our Story</a>
              </li>
              <li>
                <a href="#">Mission & Values</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Customer Support</h3>
            <ul>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#faqs">FAQs</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li>
                <a href="#">Virtual Top-ups</a>
              </li>
              <li>
                <a href="#">Utility Payment</a>
              </li>
              <li>
                <a href="#">Gift Cards</a>
              </li>
              <li>
                <a href="#">Buy/Sell Cards</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul>
              <li>
                <a href="mailto:bitwireng@gmail.com">
                  Email: Bitwireng@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+2348105907370">Phone: +234 810 590 7370</a>
              </li>
              <li>
                <span>Address: 15, Circular Road Rumuodara, Rivers State</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-center">
            {/* <img src={footer_logo} className="logo" alt="" /> */}
            <h1 className="text-2xl font-semibold italic">Bitwire Trust</h1>
            <div className="social-icons">
              <span>
                <a href="#">
                  <FaXTwitter className="twitter" /> Twitter
                </a>
              </span>
              <span>
                <a href="#">
                  <FaInstagram className="instagram" /> Instagram
                </a>
              </span>
              <span>
                <a href="#">
                  <FaWhatsapp className="whatsapp" /> WhatsApp
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p>
            &copy; {currentYear} Bitwire trust is a product of Bitwire Digital
            Services Limited. All rights reserved
          </p>
          <p>Developed by Lynog Tech Nig LTD</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
