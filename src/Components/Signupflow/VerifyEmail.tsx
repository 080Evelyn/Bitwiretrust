import { full_logo } from "@/assets";
import { FormData } from "@/types";

interface VerifyEmailProps {
  formData: FormData;
  handleNextStep: () => void;
  isButtonEnabled: boolean;
  getLeftSideClass: () => string;
  getStepBackground: () => string;
  renderCodeInputs: () => React.ReactNode;
  codeError: boolean;
  isLoading: boolean;
}

const VerifyEmail = ({
  getLeftSideClass,
  getStepBackground,
  renderCodeInputs,
  formData,
  handleNextStep,
  isButtonEnabled,
  codeError,
  isLoading,
}: VerifyEmailProps) => {
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
          {codeError && <div className="error-message">Incorrect code</div>}
          <input type="hidden" name="email" value={formData.email} />
          <div className="button-container">
            <button
              type="button"
              className={`next-button ${
                isButtonEnabled ? "enabled" : "disabled"
              }`}
              onClick={handleNextStep}
              disabled={!isButtonEnabled || isLoading}
            >
              {isLoading ? "Processing..." : "Next"}
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
};

export default VerifyEmail;
