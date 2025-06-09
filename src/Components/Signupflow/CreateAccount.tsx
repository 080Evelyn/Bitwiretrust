import { useState } from "react";
import { full_logo } from "@/assets";
import { FormData, Step } from "@/types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogOverlay } from "@radix-ui/react-dialog";
import TermsAndCondition from "@/constants/TermsAndCondition";
import { Link } from "react-router-dom";

interface CreateAccountProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isButtonEnabled: boolean;
  handleNextStep: () => void;
  getLeftSideClass: () => string;
  getStepBackground: () => string;
  isLoading: boolean;
  setCurrentStep: (step: Step) => void;
}

const CreateAccount = ({
  formData,
  handleInputChange,
  isButtonEnabled,
  handleNextStep,
  getLeftSideClass,
  getStepBackground,
  isLoading,
  setCurrentStep,
}: CreateAccountProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
        <div className="flex max-md:justify-center -mt-6 mb-6 items-center gap-2 ">
          <div className="font-medium text-sm text-gray-600">
            Already have an account?
          </div>
          <Link to="/login">
            <button
              onClick={() => setCurrentStep(Step.GET_STARTED)}
              className="text-blue-700 cursor-pointer hover:!underline text-sm font-medium transition-colors"
            >
              Login
            </button>
          </Link>
        </div>
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="!pr-14"
              />
              <button
                type="button"
                className="absolute top-1/2 right-[24%] md:right-[15%] transform -translate-y-1/2 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="!pr-14"
              />
              <button
                type="button"
                className="absolute top-1/2 right-[24%] md:right-[15%] transform -translate-y-1/2 focus:outline-none"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="terms-checkbox">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="size-4"
              checked={formData.terms}
              onChange={handleInputChange}
            />
            <label
              htmlFor="terms"
              className="!underline cursor-pointer hover:text-blue-700"
              onClick={() => setShowDialog(true)}
            >
              Accept Terms and Condition
            </label>
          </div>

          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogOverlay>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Terms and Conditions</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <TermsAndCondition />
                </DialogDescription>
              </DialogContent>
            </DialogOverlay>
          </Dialog>

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
