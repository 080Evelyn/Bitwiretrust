import "./styles.css";
import Buttons from "../Buttons";
import {
  circle_arrow_left,
  circular_frame,
  person_one,
  person_three,
  person_two,
} from "../../assets";
import WhysubSection from "../Whysubsection";
// import Testimonials from "../Testimonials";
import Faqs from "../Faqs";
import { Link } from "react-router-dom";

type Props = {};

const Aboutherosection = (_props: Props) => {
  return (
    <div className="hero-container about">
      <div className="about-hero-content">
        <div className="about-hero-left-content">
          <h1>
            Discover a Smarter Way to Manage Your Finances, With{" "}
            <span>Bitwire Trust</span>
          </h1>
          <p>
            Experience the ultimate convenience in managing your digital
            finances. Our platform offers fast, secure, and user-friendly
            solutions designed to streamline your everyday transactions.{" "}
          </p>
          <div className="button-group">
            <Link to={"/get-started"}>
              {" "}
              <Buttons
                variant="primary"
                iconSrc={circle_arrow_left}
                iconPosition="right"
              >
                Get Started
              </Buttons>
            </Link>
          </div>
        </div>
        <div className="about-hero-right-content">
          <img src={person_one} alt="person" className="main-image" />
          <div className="circular-element">
            <img src={circular_frame} alt="Bitwire frame" />
          </div>
        </div>
      </div>

      <WhysubSection
        hidePreferenceSection={true}
        containerClass="about-component"
      />

      <div className="third-section">
        <div className="third-section-left">
          <img src={person_two} alt="person" />
        </div>

        <div className="third-section-right">
          <span>Mission</span>
          <h2>Revolutionizing the Way You Access Financial Exposure</h2>
          <p>
            Our mission is to simplify your everyday digital needs by providing
            a trusted platform for purchasing gift cards, buying
            cryptocurrencies, settling utility payments, and accessing virtual
            top-ups. With a focus on convenience, security, and speed, we aim to
            redefine how you transact in a rapidly evolving digital world. Join
            us to experience the ease of managing all your services in one place
          </p>
        </div>
      </div>

      <div className="fourth-section">
        <div className="fourth-section-left">
          <span>Mission</span>
          <h2>
            Pioneering a Unified Digital Ecosystem for Effortless Transactions
            and Global Connectivity.
          </h2>
          <p>
            Our vision is to create a world where accessing essential digital
            services is seamless, secure, and universally available. We strive
            to become the go-to platform for purchasing gift cards, buying
            cryptocurrency, paying utility bills, and virtual top-ups. By
            leveraging cutting-edge technology and fostering trust, we aim to
            empower individuals and businesses to thrive in a fast-paced,
            digitally-driven economy. Together, we envision a future where
            convenience and innovation redefine the way people transact
            globally.
          </p>
        </div>

        <div className="fourth-section-right">
          <img src={person_three} alt="person" />
        </div>
      </div>

      {/* <Testimonials /> */}
      <Faqs />
    </div>
  );
};

export default Aboutherosection;
