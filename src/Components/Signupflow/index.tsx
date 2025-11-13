import { useState } from "react";
import { Step } from "../../types";
import {
  create_account_png,
  verify_email_png,
  get_started_png,
} from "../../assets";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import CreateAccount from "./CreateAccount";
import VerifyEmail from "./VerifyEmail";
import GetStarted from "./GetStarted";
import CreatePasscode from "./CreatePasscode";
import SuccessModal from "./SuccessModal";
import { useAuth } from "@/context/AuthContext";
import AddBankAccount from "./AddBankAccount";

type Props = {
  initialStep?: Step;
};

const Signupflow = ({ initialStep = Step.CREATE_ACCOUNT }: Props) => {
  const [currentStep, setCurrentStep] = useState<Step>(initialStep);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  const navigate = useNavigate();
  const { ContextLogin, updatePinStatus } = useAuth();

  const getStepBackground = () => {
    return {
      [Step.CREATE_ACCOUNT]: create_account_png,
      [Step.VERIFY_EMAIL]: verify_email_png,
      [Step.GET_STARTED]: get_started_png,
      [Step.CREATE_PASSCODE]: get_started_png,
      [Step.ADD_BANK_ACCOUNT]: get_started_png,
    }[currentStep];
  };

  const handleStepChange = (step: Step) => {
    setCurrentStep(step);
  };

  const handleCreateAccountSuccess = (email: string) => {
    setUserEmail(email);
    handleStepChange(Step.VERIFY_EMAIL);
  };

  const handleVerifyEmailSuccess = () => {
    handleStepChange(Step.GET_STARTED);
  };

  const handleLoginSuccess = (response: {
    data: { jwt: string; isPinSet: boolean; userRole: string };
  }) => {
    const isPinSet = response.data.isPinSet === true;
    const userRole = response.data.userRole.toLowerCase();
    updatePinStatus();
    ContextLogin(response.data.jwt);

    if (isPinSet && userRole === "user") {
      navigate("/dashboard");
    } else if (userRole === "admin") {
      navigate("/admin/dashboard");
    } else {
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        setCurrentStep(Step.CREATE_PASSCODE);
      }, 2000);
    }
  };

  const handleCreatePasscodeSuccess = () => {
    updatePinStatus();
    setCurrentStep(Step.ADD_BANK_ACCOUNT);
  };

  const renderStepContent = () => {
    const sharedProps = {
      getLeftSideClass: () => "left-side",
      getStepBackground,
    };

    switch (currentStep) {
      case Step.CREATE_ACCOUNT:
        return (
          <CreateAccount
            {...sharedProps}
            onSuccess={handleCreateAccountSuccess}
            setCurrentStep={setCurrentStep}
          />
        );
      case Step.VERIFY_EMAIL:
        return (
          <VerifyEmail
            {...sharedProps}
            email={userEmail}
            onSuccess={handleVerifyEmailSuccess}
          />
        );
      case Step.GET_STARTED:
        return (
          <GetStarted
            {...sharedProps}
            onSuccess={handleLoginSuccess}
            setCurrentStep={setCurrentStep}
          />
        );
      case Step.CREATE_PASSCODE:
        return (
          <CreatePasscode
            {...sharedProps}
            onSuccess={handleCreatePasscodeSuccess}
          />
        );

      case Step.ADD_BANK_ACCOUNT:
        return <AddBankAccount {...sharedProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-h-screen overflow-hidden">
      {renderStepContent()}
      {showSuccessModal && <SuccessModal />}
    </div>
  );
};

export default Signupflow;
