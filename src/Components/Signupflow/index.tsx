import { useEffect, useState } from "react";
import { FormData, Step } from "../../types";
import {
  full_logo,
  passcode_lock,
  create_account_png,
  verify_email_png,
  get_started_png,
  circled_frame,
} from "../../assets";
import { FaCheck } from "react-icons/fa";
import "./styles.css";
import { useNavigate } from "react-router-dom";

type Props = {
  initialStep?: Step;
};

const Signupflow = ({ initialStep = Step.CREATE_ACCOUNT }: Props) => {
  const [currentStep, setCurrentStep] = useState<Step>(initialStep);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [storedCredentials, setStoredCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [getStartedFields, setGetStartedFields] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [verificationCode, setVerificationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);

  const [passcode, setPasscode] = useState<string[]>(["", "", "", "", "", ""]);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [codeError, setCodeError] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_showPasscodeScreen, setShowPasscodeScreen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    switch (currentStep) {
      case Step.CREATE_ACCOUNT:
        setIsButtonEnabled(
          formData.fullName.trim() !== "" &&
            formData.email.trim() !== "" &&
            formData.password.trim() !== "" &&
            formData.confirmPassword.trim() !== "" &&
            formData.password === formData.confirmPassword
        );
        break;
      case Step.VERIFY_EMAIL:
        setIsButtonEnabled(!verificationCode.includes(""));
        break;
      case Step.GET_STARTED:
        setIsButtonEnabled(
          getStartedFields.email.trim() !== "" &&
            getStartedFields.password.trim() !== ""
        );
        break;
      case Step.CREATE_PASSCODE:
        setIsButtonEnabled(!passcode.includes(""));
        break;
      default:
        setIsButtonEnabled(false);
    }
  }, [currentStep, formData, verificationCode, getStartedFields, passcode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGetStartedInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setGetStartedFields({ ...getStartedFields, [name]: value });
  };

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...verificationCode];
    newCode[index] = value.replace(/[^0-9]/g, "").slice(0, 1);
    setVerificationCode(newCode);

    if (value && index < 3) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    if (codeError) {
      setCodeError(false);
    }
  };

  const handlePasscodeChange = (index: number, value: string) => {
    const newPasscode = [...passcode];
    newPasscode[index] = value.replace(/[^0-9]/g, "").slice(0, 1);
    setPasscode(newPasscode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`passcode-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleNextStep = () => {
    if (!isButtonEnabled) return;

    if (currentStep === Step.CREATE_ACCOUNT) {
      setStoredCredentials({
        email: formData.email,
        password: formData.password,
      });
      setCurrentStep(currentStep + 1);
    } else if (currentStep === Step.VERIFY_EMAIL) {
      const enteredCode = verificationCode.join("");
      if (enteredCode !== "3534") {
        setCodeError(true);
        return;
      }
      setCurrentStep(currentStep + 1);
    } else if (currentStep === Step.GET_STARTED) {
      if (
        getStartedFields.email === storedCredentials.email &&
        getStartedFields.password === storedCredentials.password
      ) {
        setShowSuccessModal(true);

        setTimeout(() => {
          setShowSuccessModal(false);
          setShowPasscodeScreen(true);
          setCurrentStep(Step.CREATE_PASSCODE);
        }, 5000);
      } else {
        setShowSuccessModal(true);

        setTimeout(() => {
          setShowSuccessModal(false);
          setShowPasscodeScreen(true);
          setCurrentStep(Step.CREATE_PASSCODE);
        }, 2000);
      }
    } else if (currentStep === Step.CREATE_PASSCODE) {
      console.log("Passcode created:", passcode.join(""));

      navigate("/dashboard");
    }
  };

  const renderCodeInputs = () => {
    return (
      <div className="code-inputs">
        {verificationCode.map((digit, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            type="text"
            className={`code-input ${codeError ? "error" : ""}`}
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            maxLength={1}
            autoFocus={index === 0}
          />
        ))}
      </div>
    );
  };

  const renderPasscodeInputs = () => {
    return (
      <div className="passcode-inputs">
        {passcode.map((digit, index) => (
          <input
            key={index}
            id={`passcode-input-${index}`}
            type="password"
            className={`passcode-input ${digit ? "filled" : ""}`}
            value={digit}
            onChange={(e) => handlePasscodeChange(index, e.target.value)}
            maxLength={1}
            autoFocus={index === 0}
          />
        ))}
      </div>
    );
  };

  const getStepBackground = () => {
    switch (currentStep) {
      case Step.CREATE_ACCOUNT:
        return create_account_png;
      case Step.VERIFY_EMAIL:
        return verify_email_png;
      case Step.GET_STARTED:
      case Step.CREATE_PASSCODE:
        return get_started_png;
      default:
        return "";
    }
  };

  const getLeftSideClass = () => {
    switch (currentStep) {
      case Step.CREATE_ACCOUNT:
        return "left-side";
      case Step.VERIFY_EMAIL:
        return "left-side";
      case Step.GET_STARTED:
      case Step.CREATE_PASSCODE:
        return "left-side";
      default:
        return "left-side";
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case Step.CREATE_ACCOUNT:
        return (
          <div className="step-content">
            <div
              className={getLeftSideClass()}
              style={{ backgroundImage: `url(${getStepBackground()})` }}
            >
              <h2>Ready To Step Up Your Financial Life?</h2>
              <div className="progress-indicator">
                <div className="progress-dot active"></div>
                <div className="progress-dot"></div>
                <div className="progress-dot"></div>
              </div>
            </div>
            <div className="right-side">
              <div className="app-logo">
                <img src={full_logo} alt="Bitwire" />
              </div>
              <h2>Create an account</h2>
              <p>Let's get you started</p>
              <form>
                <div className="form-group">
                  <label>Enter Your First and Last Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="First Name and Last Name"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                  />
                </div>
                <div className="terms-checkbox">
                  <input type="checkbox" id="terms" />
                  <label htmlFor="terms">Accept Terms and Condition</label>
                </div>
                <div className="button-container">
                  <button
                    type="button"
                    className={`next-button ${
                      isButtonEnabled ? "enabled" : "disabled"
                    }`}
                    onClick={handleNextStep}
                    disabled={!isButtonEnabled}
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      case Step.VERIFY_EMAIL:
        return (
          <div className="step-content">
            <div
              className={getLeftSideClass()}
              style={{ backgroundImage: `url(${getStepBackground()})` }}
            >
              <h2>Discover a Smarter Way to Manage Your Finances</h2>
              <div className="progress-indicator">
                <div className="progress-dot active"></div>
                <div className="progress-dot active"></div>
                <div className="progress-dot"></div>
              </div>
            </div>
            <div className="right-side verify-email">
              <div className="app-logo">
                <img src={full_logo} alt="Bitwire" />
              </div>
              <h2>Verify your E-mail</h2>
              <p>
                Enter the 4-digit code sent to your e-mail{" "}
                <span>{formData.email}</span>{" "}
              </p>
              <form>
                {renderCodeInputs()}
                {codeError && (
                  <div className="error-message">Incorrect code</div>
                )}
                <div className="button-container">
                  <button
                    type="button"
                    className={`next-button ${
                      isButtonEnabled ? "enabled" : "disabled"
                    }`}
                    onClick={handleNextStep}
                    disabled={!isButtonEnabled}
                  >
                    Next
                  </button>
                </div>
                <div className="resend-link">
                  <p>
                    Didn't get code? <span className="resend">Resend</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        );

      case Step.GET_STARTED:
        return (
          <div className="step-content">
            <div
              className={getLeftSideClass()}
              style={{ backgroundImage: `url(${getStepBackground()})` }}
            >
              <h2>
                Best Rates
                <br />
                Secure Payment
              </h2>
              <div className="progress-indicator">
                <div className="progress-dot active"></div>
                <div className="progress-dot active"></div>
                <div className="progress-dot active"></div>
              </div>
            </div>
            <div className="right-side">
              <div className="app-logo">
                <img src={full_logo} alt="Bitwire" />
              </div>
              <h2>Let's get you started!</h2>
              <p>Fill in your details</p>
              <form>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={getStartedFields.email}
                    onChange={handleGetStartedInputChange}
                    placeholder="example@email.com"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={getStartedFields.password}
                    onChange={handleGetStartedInputChange}
                    placeholder="••••••••"
                  />
                </div>
                <div className="remember-password">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember password</label>
                </div>
                <div className="button-container">
                  <button
                    type="button"
                    className={`next-button ${
                      isButtonEnabled ? "enabled" : "disabled"
                    }`}
                    onClick={handleNextStep}
                    disabled={!isButtonEnabled}
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      case Step.CREATE_PASSCODE:
        return (
          <div className="step-content">
            <div
              className={getLeftSideClass()}
              style={{ backgroundImage: `url(${getStepBackground()})` }}
            >
              <h2>
                Best Rates
                <br />
                Secure Payment
              </h2>
              <div className="progress-indicator">
                <div className="progress-dot active"></div>
                <div className="progress-dot active"></div>
                <div className="progress-dot active"></div>
              </div>
            </div>
            <div className="right-side create-passcode">
              <div className="app-logo">
                <img src={full_logo} alt="Bitwire" />
              </div>
              <h2>Create a Passcode</h2>
              <p>
                Set up your 6-digit security passcode.
                <br />
                Please, do not share this code with anyone.
              </p>
              <form>
                <div className="form-group passcode-form-group">
                  <div className="passcode-lock">
                    <img src={passcode_lock} alt="lock" />
                    <p>Enter Passcode to continue</p>
                  </div>
                  {renderPasscodeInputs()}
                </div>
                <div className="button-container">
                  <button
                    type="button"
                    className={`next-button ${
                      isButtonEnabled ? "enabled" : "disabled"
                    }`}
                    onClick={handleNextStep}
                    disabled={!isButtonEnabled}
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSuccessModal = () => {
    if (!showSuccessModal) return null;

    return (
      <div className="modal-overlay">
        <div className="success-modal">
          <div className="success-modal-content">
            <img
              src={circled_frame}
              alt="Success"
              className="success-modal-image"
            />

            <div className="success-icon">
              <div className="checkmark-background">
                <FaCheck className="checkmark" />
              </div>
            </div>

            <h3>Congratulation!</h3>
            <p>You are all set.</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        {renderStepContent()}
        {renderSuccessModal()}
      </div>
    </div>
  );
};

export default Signupflow;
