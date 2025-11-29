import { ModalType } from "@/types";
import { CheckCircle } from "lucide-react";
const KycCompletion = ({
  toggleModal,
}: {
  toggleModal: (modal: ModalType) => void;
}) => {
  return (
    <div className="p-6 text-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 mb-3">
        KYC Submission Complete!
      </h2>

      {/* Message */}
      <div className="text-gray-600 mb-6 space-y-2">
        <p className="text-sm">
          Thank you for submitting your KYC verification documents.
        </p>
        <p className="text-sm">
          Your information is now under review by our team.
        </p>
      </div>

      {/* Processing Info */}
      {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center space-x-2 text-blue-700">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">
            Processing Your Submission
          </span>
        </div>
        <p className="text-xs text-blue-600 mt-2">
          Typically takes 24-48 hours. We'll notify you once verified.
        </p>
      </div> */}

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3">
        <button
          onClick={() => toggleModal("profile")}
          className="btn-primary w-full"
        >
          Return to Profile
        </button>
      </div>
    </div>
  );
};

export default KycCompletion;
