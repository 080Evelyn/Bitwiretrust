import AuthSignupLayout from "@/Components/Authlayout/AuthSignupLayout";
import Step1Form from "@/Components/kyc/Step1Form";
import Step2Form from "@/Components/kyc/Step2Form";
import { full_logo, get_started_png } from "@/assets";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const KycPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    setStep(2);
  };

  const handleComplete = () => {
    // Proceed to set-pin after KYC completion
    navigate("/set-pin");
  };

  return (
    <main className="max-h-screen overflow-y-hidden">
      <AuthSignupLayout
        backgroundImage={get_started_png}
        progressDots={3}
        title="Verify Your Identity"
      >
        <div className="flex flex-col gap-2 w-full bg-white rounded-lg p-4">
          <div className="app-logo">
            <Link to="/">
              <img src={full_logo} alt="Bitwire" />
            </Link>
          </div>
          <h2 className="text-lg font-medium text-center">
            Verify Your Identity
          </h2>
          {step === 1 ? (
            <Step1Form onNext={handleNext} />
          ) : (
            <Step2Form onNext={handleComplete} />
          )}
        </div>
      </AuthSignupLayout>
    </main>
  );
};

export default KycPage;
