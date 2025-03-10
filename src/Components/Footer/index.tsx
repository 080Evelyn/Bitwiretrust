import './styles.css'
import Readysetup from '../Readysetup'
import { footer_logo } from '../../assets'
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type Props = {}

const Footer = (_props: Props) => {
  return (
    <>
    <Readysetup />
    <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h3>About Us</h3>
        <ul>
          <li><a href="#">Our Story</a></li>
          <li><a href="#">Mission & Values</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Customer Support</h3>
        <ul>
          <li><a href="#">Help Center</a></li>
          <li><a href="#faqs">FAQs</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Services</h3>
        <ul>
          <li><a href="#">Virtual Top-ups</a></li>
          <li><a href="#">Utility Payment</a></li>
          <li><a href="#">Gift Cards</a></li>
          <li><a href="#">Buy/Sell Cards</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Contact Us</h3>
        <ul>
          <li><a href="#"> Email: support@yourcard.com</a></li>
          <li><a href="#">Phone: +1(XXX) XXX-XXXX</a></li>
        </ul>
      </div>
    </div>

    <div className="footer-bottom">
      <div className="footer-bottom-center">
      <img src={footer_logo} className="logo"/>
      <div className="social-icons">
       <span><a href='#'/><FaXTwitter className='twitter'/> Twitter</span>
        <span><a href='#'/><FaInstagram className='instagram'/> Instagram</span>
        <span><a href='#'/><FaWhatsapp className='whatsapp'/> WhatsApp</span>
      </div>
      </div>
    </div>

    <div className="copyright">
      <p>© 2024 Adric Group Inc. All rights reserved</p>
      <p>Designed by Zeedesign | Powered by Della Codes</p>
    </div>
  </footer>
  </>
  )
}

export default Footer