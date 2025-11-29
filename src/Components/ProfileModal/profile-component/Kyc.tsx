import { useState } from "react";

import { ModalType } from "@/types";
import Step2Form from "@/Components/kyc/Step2Form";
import Step1Form from "@/Components/kyc/Step1Form";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/types/user";
import { CheckCircle } from "lucide-react";
import KycCompletion from "@/Components/kyc/KycCompletion";

const UserKyc = ({
  toggleModal,
}: {
  toggleModal: (modal: ModalType) => void;
}) => {
  const { user } = useOutletContext<UserContext>();

  const userCurrentStep = user.kycState === "BASIC_INFO_VERIFIED" ? 2 : 1;

  const [step, setStep] = useState(userCurrentStep);

  const kycStatus = user.userKycVerificationStatus;

  if (kycStatus === "VERIFIED") {
    return (
      <div className="modal terms-conditions-modal">
        <div className="modal-header">
          <button className="back-btn" onClick={() => toggleModal("profile")}>
            Back
          </button>
        </div>
        <div className="p-6 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-600" />

          <h2 className="mt-4 text-xl font-semibold">KYC Completed</h2>

          <p className="mt-2 text-sm text-gray-600">
            Your KYC has been approved. You can no longer submit new documents.
          </p>
        </div>
      </div>
    );
  }

  if (kycStatus === "PENDING") {
    return (
      <div className="modal terms-conditions-modal">
        <div className="modal-header">
          <button className="back-btn" onClick={() => toggleModal("profile")}>
            Back
          </button>
        </div>
        <div className="p-6 text-center">
          <h2 className="text-lg font-semibold">KYC In Progress</h2>
          <p className="mt-2 text-sm text-gray-600">
            Your submission has been received and is currently being processed.
            You will be notified once verification is complete.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal terms-conditions-modal">
      {step === 1 ? (
        <Step1Form onNext={() => setStep(2)} toggleModal={toggleModal} />
      ) : step === 2 ? (
        <Step2Form onNext={() => setStep(3)} toggleModal={toggleModal} />
      ) : (
        <KycCompletion toggleModal={toggleModal} />
      )}
    </div>
  );
};

export default UserKyc;
