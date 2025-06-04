import { full_logo } from "@/assets";

interface GetStartedProps {
  getLeftSideClass: () => string;
  getStepBackground: () => string;
  getStartedFields: { email: string; password: string };
  handleGetStartedInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: () => void;
  isButtonEnabled: boolean;
  isLoading: boolean;
}

const GetStarted = ({
  getLeftSideClass,
  getStepBackground,
  getStartedFields,
  handleGetStartedInputChange,
  handleNextStep,
  isButtonEnabled,
  isLoading,
}: GetStartedProps) => {
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
              disabled={!isButtonEnabled || isLoading}
            >
              {isLoading ? "Processing..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetStarted;
