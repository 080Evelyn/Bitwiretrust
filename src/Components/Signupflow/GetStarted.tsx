import { useState, useEffect } from "react";
import { full_logo } from "@/assets";
import { Checkbox } from "../ui/checkbox";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

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
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      const fakeEvent = (
        name: string,
        value: string
      ): React.ChangeEvent<HTMLInputElement> => {
        return {
          target: { name, value },
        } as React.ChangeEvent<HTMLInputElement>;
      };

      handleGetStartedInputChange(fakeEvent("email", savedEmail));
      setRememberMe(true);
    }
  }, []);

  const handleCheckboxChange = () => {
    setRememberMe((prev) => !prev);
  };

  const handleLogin = () => {
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", getStartedFields.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
    handleNextStep();
  };

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

          <div className="form-group relative">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={getStartedFields.password}
              onChange={handleGetStartedInputChange}
              placeholder="••••••••"
            />
            <div
              className="absolute top-[65%] cursor-pointer right-[24%] md:right-[15%] transform -translate-y-1/2 focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="flex gap-1.5 items-center justify-between w-[80%] md:w-[90%] px-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={handleCheckboxChange}
              />
              <label htmlFor="remember" className="text-xs">
                Remember password
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-xs text-primary hover:text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="button-container">
            <button
              type="button"
              className={`next-button ${
                isButtonEnabled ? "enabled" : "disabled"
              }`}
              onClick={handleLogin}
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
