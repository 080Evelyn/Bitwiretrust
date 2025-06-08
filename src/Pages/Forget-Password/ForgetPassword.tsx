import RequestEmail from "@/Components/Forgot-Password/RequestEmail";
import ResetPassword from "@/Components/Forgot-Password/ResetPassword";
import VerifyOTP from "@/Components/Forgot-Password/VerifyOTP";
import { useState } from "react";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <>
      {step === 1 && (
        <RequestEmail
          onSuccess={(email) => {
            if (email) {
              setEmail(email);
              setStep(2);
            }
          }}
        />
      )}
      {step === 2 && <VerifyOTP email={email} onVerified={() => setStep(3)} />}
      {step === 3 && <ResetPassword email={email} />}
    </>
  );
};

export default ForgotPassword;
