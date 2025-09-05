// This is being used for withdrawal pin code creation rather than passcode.

import { full_logo, passcode_lock } from "@/assets";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface CreatePasscodeProps {
  getLeftSideClass: () => string;
  getStepBackground: () => string;
  renderPasscodeInputs: () => React.ReactNode;
  handleNextStep: () => void;
  isButtonEnabled: boolean;
  passcode: string[];
  confirmPasscode: string[];
  setPasscode: (passcode: string[]) => void;
  setConfirmPasscode: (passcode: string[]) => void;
  passcodeMatchError: boolean;
  setPasscodeMatchError: (error: boolean) => void;
  getStartedFields: { email: string; password: string };
  isLoading: boolean;
}

const CreatePasscode = ({
  getLeftSideClass,
  getStepBackground,
  renderPasscodeInputs,
  handleNextStep,
  isButtonEnabled,
  passcode,
  confirmPasscode,
  setPasscode,
  setConfirmPasscode,
  passcodeMatchError,
  getStartedFields,
  isLoading,
  setPasscodeMatchError,
}: CreatePasscodeProps) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirmPasscodeChange = (index: number, value: string) => {
    const newPasscode = [...confirmPasscode];
    newPasscode[index] = value.replace(/[^0-9]/g, "").slice(0, 1);
    setConfirmPasscode(newPasscode);
    setPasscodeMatchError(false);

    if (value && index < 3) {
      const nextInput = document.getElementById(
        `confirm-passcode-input-${index + 1}`
      );
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = () => {
    if (confirmPasscode.join("") !== passcode.join("")) {
      setPasscodeMatchError(true);
      return;
    }
    handleNextStep();
  };

  const renderConfirmPasscodeInputs = () => {
    return (
      <div className="passcode-inputs">
        {confirmPasscode.map((digit, index) => (
          <input
            key={index}
            id={`confirm-passcode-input-${index}`}
            type="password"
            className={`passcode-input ${digit ? "filled" : ""} ${
              passcodeMatchError ? "error" : ""
            }`}
            value={digit}
            onChange={(e) => handleConfirmPasscodeChange(index, e.target.value)}
            maxLength={1}
            autoFocus={index === 0 && isConfirming}
          />
        ))}
      </div>
    );
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
      <div className="right-side create-passcode">
        <div className="app-logo">
          <img src={full_logo} alt="Bitwire" />
        </div>
        <h2>
          {isConfirming
            ? "Confirm Your Transaction Pin"
            : "Create a Transaction Pin"}
        </h2>
        <p className="text-center">
          {isConfirming
            ? "Please re-enter your 4-digit pin to confirm."
            : "Set up your 4-digit transaction pin."}
          <br />
          <span className="text-center text-sm">
            Please, do not share this pin with anyone.
          </span>
        </p>
        <form>
          <input type="hidden" name="email" value={getStartedFields.email} />
          <div className="form-group passcode-form-group">
            <div className="passcode-lock">
              <img src={passcode_lock} alt="lock" />
              <p>{isConfirming ? "Confirm Pin" : "Enter Pin"}</p>
            </div>
            {isConfirming
              ? renderConfirmPasscodeInputs()
              : renderPasscodeInputs()}
            {passcodeMatchError && (
              <p className="error-message !text-red-500">
                Pins do not match. Please try again.
              </p>
            )}
          </div>
          <div className="button-container">
            <button
              type="button"
              className={`next-button ${
                isButtonEnabled ? "enabled" : "disabled"
              }`}
              onClick={
                isConfirming ? handleSubmit : () => setIsConfirming(true)
              }
              disabled={!isButtonEnabled || isLoading}
            >
              {isLoading ? "Processing" : isConfirming ? "Submit" : "Next"}
            </button>

            {isConfirming && (
              <button
                type="button"
                className="text-[#6c0aa1] text-sm flex gap-2 justify-center items-center cursor-pointer mt-4"
                onClick={() => {
                  setIsConfirming(false);
                  setPasscode(["", "", "", ""]);
                  setConfirmPasscode(["", "", "", ""]);
                  setPasscodeMatchError(false);
                }}
              >
                <ArrowLeft className="size-5" />
                <span>Re-enter pin</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePasscode;
