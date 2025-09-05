import { useState, useEffect } from "react";
import { full_logo } from "@/assets";
import { Checkbox } from "../ui/checkbox";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Step } from "@/types";
import { cn } from "@/lib/utils";

interface GetStartedProps {
  getLeftSideClass: () => string;
  getStepBackground: () => string;
  getStartedFields: { email: string; password: string };
  handleGetStartedInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: () => void;
  isButtonEnabled: boolean;
  isLoading: boolean;
  setCurrentStep: (step: Step) => void;
}

const GetStarted = ({
  getLeftSideClass,
  getStepBackground,
  getStartedFields,
  handleGetStartedInputChange,
  handleNextStep,
  isButtonEnabled,
  isLoading,
  setCurrentStep,
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
    <div className="flex w-full">
      <div
        className={cn(
          "items-center justify-center hidden flex-1 sm:flex w-[55%]",
          getLeftSideClass()
        )}
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

      <div className="flex flex-1 mt-20 flex-col gap-2 w-full">
        <div className="app-logo">
          <Link to="/">
            <img src={full_logo} alt="Bitwire" />
          </Link>
        </div>
        <h2 className="text-lg font-medium max-md:text-center">
          Let's get you started!
        </h2>
        <div className="flex mb-2 max-md:justify-center items-center gap-2 ">
          <div className="font-medium text-sm text-gray-600">
            Don&apos;t have an account?
          </div>
          <Link to="/register">
            <button
              onClick={() => setCurrentStep(Step.CREATE_ACCOUNT)}
              className="text-blue-700 cursor-pointer hover:!underline text-sm font-medium transition-colors"
            >
              Sign Up
            </button>
          </Link>
        </div>
        <p className="text-sm text-gray-500 px-4">Fill in your details</p>
        <form className="mt-3 flex flex-col w-full gap-4">
          <div className="custom-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={getStartedFields.email}
              onChange={handleGetStartedInputChange}
              placeholder="example@email.com"
            />
          </div>

          <div className="custom-form-group">
            <label>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-input"
                value={getStartedFields.password}
                onChange={handleGetStartedInputChange}
                placeholder="••••••••"
              />
              <div
                className="absolute top-1/2 right-4 cursor-pointer transform -translate-y-1/2 focus:text-[#7910B1]"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FaEyeSlash className="size-4.5" />
                ) : (
                  <FaEye className="size-4.5" />
                )}
              </div>
            </div>
          </div>

          <div className="custom-form-group justify-between flex-row gap-3 items-center">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="size-4"
                checked={rememberMe}
                onCheckedChange={handleCheckboxChange}
              />
              <label htmlFor="remember" className="text-xs">
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-xs text-primary hover:text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="button"
            className={`btn-primary mx-4 ${
              isButtonEnabled ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            onClick={handleLogin}
            disabled={!isButtonEnabled || isLoading}
          >
            {isLoading ? "Processing..." : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetStarted;
