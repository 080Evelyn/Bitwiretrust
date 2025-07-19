import { resendOtp } from "@/api/auth";
import { full_logo } from "@/assets";
import { FormData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface VerifyEmailProps {
  formData: FormData;
  handleNextStep: () => void;
  isButtonEnabled: boolean;
  getLeftSideClass: () => string;
  getStepBackground: () => string;
  renderCodeInputs: () => React.ReactNode;
  codeError: boolean;
  isLoading: boolean;
  otpError: string;
  setCodeError: (arg0: boolean) => void;
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
  otpError,
  setCodeError,
}: VerifyEmailProps) => {
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const mutateResendOtp = useMutation({
    mutationFn: (data: { email: string }) => resendOtp(data),
  });

  const handleResendOtp = () => {
    if (timer > 0) return;
    mutateResendOtp.mutate(
      { email: formData.email },
      {
        onSuccess: () => {
          toast.success("OTP sent successfully");
          setCodeError(false);
          setTimer(120);
        },
        onError: (error: unknown) => {
          if (axios.isAxiosError(error)) {
            const responseDesc =
              error.response?.data?.responseDesc || "Something went wrong";
            toast.error(responseDesc);
          } else {
            toast.error("Unexpected error occurred");
          }
        },
      }
    );
  };

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
          {codeError && <div className="error-message">{otpError}</div>}
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
            {timer > 0 ? (
              <p>
                Resend available in {Math.floor(timer / 60)}:
                {String(timer % 60).padStart(2, "0")}
              </p>
            ) : (
              <p>
                Didn't get code?{" "}
                <span className="resend" onClick={handleResendOtp}>
                  Resend
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
