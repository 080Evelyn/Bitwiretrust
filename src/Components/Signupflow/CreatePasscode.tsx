import { full_logo, passcode_lock } from "@/assets";
import { useState } from "react";

interface CreatePasscodeProps {
  getLeftSideClass: () => string;
  getStepBackground: () => string;
  renderPasscodeInputs: () => React.ReactNode;
  handleNextStep: () => void;
  isButtonEnabled: boolean;
  passcode: string[];
  confirmPasscode: string[];
  getStartedFields: { email: string; password: string };
  setConfirmPasscode: (passcode: string[]) => void;
  passcodeMatchError: boolean;
  setPasscodeMatchError: (error: boolean) => void;
}

const CreatePasscode = ({
  getLeftSideClass,
  getStepBackground,
  renderPasscodeInputs,
  handleNextStep,
  isButtonEnabled,
  passcode,
  confirmPasscode,
  setConfirmPasscode,
  passcodeMatchError,
  getStartedFields,
  setPasscodeMatchError,
}: CreatePasscodeProps) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirmPasscodeChange = (index: number, value: string) => {
    const newPasscode = [...confirmPasscode];
    newPasscode[index] = value.replace(/[^0-9]/g, "").slice(0, 1);
    setConfirmPasscode(newPasscode);
    setPasscodeMatchError(false);

    if (value && index < 5) {
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
        <h2>{isConfirming ? "Confirm Your Passcode" : "Create a Passcode"}</h2>
        <p>
          {isConfirming
            ? "Please re-enter your 6-digit passcode to confirm."
            : "Set up your 6-digit security passcode."}
          <br />
          Please, do not share this code with anyone.
        </p>
        <form>
          <input type="hidden" name="email" value={getStartedFields.email} />
          <div className="form-group passcode-form-group">
            <div className="passcode-lock">
              <img src={passcode_lock} alt="lock" />
              <p>{isConfirming ? "Confirm Passcode" : "Enter Passcode"}</p>
            </div>
            {isConfirming
              ? renderConfirmPasscodeInputs()
              : renderPasscodeInputs()}
            {passcodeMatchError && (
              <p className="error-message !text-red-500">
                Passcodes do not match. Please try again.
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
              disabled={!isButtonEnabled}
            >
              {isConfirming ? "Submit" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePasscode;
