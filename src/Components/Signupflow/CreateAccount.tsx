import { full_logo } from "@/assets";
import { FormData } from "@/types";

interface CreateAccountProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isButtonEnabled: boolean;
  handleNextStep: () => void;
  getLeftSideClass: () => string;
  getStepBackground: () => string;
  isLoading: boolean;
}

const CreateAccount = ({
  formData,
  handleInputChange,
  isButtonEnabled,
  handleNextStep,
  getLeftSideClass,
  getStepBackground,
  isLoading,
}: CreateAccountProps) => {
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
            <label>Enter Your First</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              placeholder="First Name "
            />
          </div>
          <div className="form-group">
            <label>Enter Your Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              placeholder="Last Name"
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
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="0803 456 7890"
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              placeholder="DD/MM/YYYY"
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

export default CreateAccount;
