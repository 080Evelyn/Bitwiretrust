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
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

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
    <div className="flex w-full justify-center items-center">
      <div
        className={cn(
          "items-center justify-center !hidden sm:!flex w-[55%]",
          getLeftSideClass()
        )}
        style={{ backgroundImage: `url(${getStepBackground()})` }}
      >
        <h2>Ready To Step Up Your Financial Life?</h2>
        <div className="progress-indicator">
          <div className="progress-dot active"></div>
          <div className="progress-dot"></div>
          <div className="progress-dot"></div>
        </div>
      </div>
      <ScrollArea className="h-[96dvh] w-full">
        <div className="flex flex-1 flex-col">
          <div className="app-logo flex justify-center ">
            <Link to="/">
              <img src={full_logo} alt="Bitwire" />
            </Link>
          </div>
          <h2 className="text-lg font-medium max-md:text-center">
            Create an account
          </h2>
          <p className="text-sm text-gray-600 max-md:text-center">
            Let's get you started
          </p>
          <div className="flex max-md:justify-center mb-6 items-center gap-2 ">
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
          <form className="flex flex-col w-full gap-3">
            <div className="custom-form-group">
              <label>Enter Your First</label>
              <input
                type="text"
                name="first_name"
                className="form-input"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder="First Name"
              />
            </div>
            <div className="custom-form-group">
              <label>Enter Your Last Name</label>
              <input
                type="text"
                name="last_name"
                className="form-input"
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
            </div>
            <div className="custom-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="form-input"
                onChange={handleInputChange}
                placeholder="example@email.com"
              />
            </div>
            <div className="custom-form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                className="form-input"
                onChange={handleInputChange}
                placeholder="johndoe123"
              />
            </div>
            <div className="custom-form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                className="form-input"
                onChange={handleInputChange}
                placeholder="0803 456 7890"
              />
            </div>
            <div className="custom-form-group">
              <label>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="!pr-14 form-input placeholder:text-xl"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-4 cursor-pointer transform -translate-y-1/2 focus:text-[#7910B1]"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="size-4.5" />
                  ) : (
                    <FaEye className="size-4.5" />
                  )}
                </button>
              </div>
            </div>
            <div className="custom-form-group">
              <label>Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="!pr-14 form-input placeholder:text-xl"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-4 cursor-pointer transform -translate-y-1/2 focus:text-[#7910B1]"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="size-4.5" />
                  ) : (
                    <FaEye className="size-4.5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex px-4 gap-3 items-center">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="!w-4 !h-4"
                checked={formData.terms}
                onChange={handleInputChange}
              />
              <label
                htmlFor="terms"
                className="!underline cursor-pointer text-blue-700 hover:text-foreground"
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

            <button
              type="button"
              className={`btn-primary mx-4 ${
                isButtonEnabled ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={handleNextStep}
              disabled={!isButtonEnabled || isLoading}
            >
              {isLoading ? "Processing..." : "Next"}
            </button>
          </form>
        </div>
      </ScrollArea>
    </div>
  );
};

export default CreateAccount;
