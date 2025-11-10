import { useState } from "react";

import { ModalType } from "@/types";
import Step2Form from "@/Components/kyc/Step2Form";
import Step1Form from "@/Components/kyc/Step1Form";

const UserKyc = ({
  toggleModal,
}: {
  toggleModal: (modal: ModalType) => void;
}) => {
  const [step, setStep] = useState(1);

  return (
    <div className="modal terms-conditions-modal">
      {step === 1 ? (
        <Step1Form onNext={() => setStep(2)} toggleModal={toggleModal} />
      ) : (
        <Step2Form onBack={() => setStep(1)} toggleModal={toggleModal} />
      )}
    </div>
  );
};

export default UserKyc;
