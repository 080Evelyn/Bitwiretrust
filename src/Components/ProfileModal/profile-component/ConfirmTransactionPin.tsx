import { createPin } from "@/api/auth";
import { passcode_lock } from "@/assets";
import { ModalType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface ConfirmTransactionPinProps {
  toggleModal: (modal: ModalType) => void;
  confirmTransactionPin: string[];
  handlePinChange: (
    index: number,
    value: string,
    isPinConfirmation?: boolean
  ) => void;
  transactionPin: string[];
  setConfirmTransactionPin: (pin: string[]) => void;
  setTransactionPin: (pin: string[]) => void;
}
const ConfirmTransactionPin = ({
  toggleModal,
  confirmTransactionPin,
  handlePinChange,
  transactionPin,
  setConfirmTransactionPin,
  setTransactionPin,
}: ConfirmTransactionPinProps) => {
  const [error, setError] = useState("");

  const setPinMutation = useMutation({
    mutationFn: async (pin: string) => createPin(pin),
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const responseDesc =
          error.response?.data?.responseDesc || "Something went wrong";
        toast.error(responseDesc);
      } else {
        toast.error("Unexpected error occurred");
      }
    },
  });

  function handleClick() {
    if (
      transactionPin.join("") === confirmTransactionPin.join("") &&
      confirmTransactionPin.join("").length === 4
    ) {
      setPinMutation.mutate(confirmTransactionPin.join(""), {
        onSuccess: () => {
          toast.success("Transaction PIN set successfully!");
          toggleModal("profile");
          setTransactionPin(["", "", "", ""]);
          setConfirmTransactionPin(["", "", "", ""]);
        },
      });
    } else {
      setError("PINs do not match. Please try again.");
      setConfirmTransactionPin(["", "", "", ""]);
    }
  }

  return (
    <div className="modal transaction-pin-modal">
      <div className="modal-header">
        <button
          className="back-btn"
          onClick={() => {
            toggleModal("transaction-pin");
            setTransactionPin(["", "", "", ""]);
            setConfirmTransactionPin(["", "", "", ""]);
            setError("");
          }}
        >
          Back
        </button>
        <h3>Confirm Transaction Pin</h3>
      </div>

      <div className="transaction-pin-content">
        <h4>Confirm your transaction pin</h4>
        <p>
          It's important to keep your transaction PIN confidential and not share
          it with anyone.
        </p>

        <div className="pin-instruction">
          <img src={passcode_lock} alt="lock" className="pin-lock-icon" />
          <span>Enter Passcode to continue</span>
        </div>

        <div className="pin-input-container">
          {confirmTransactionPin.map((digit, index) => (
            <input
              key={index}
              id={`confirm-pin-${index}`}
              type="password"
              maxLength={1}
              value={digit}
              onChange={(e) => {
                handlePinChange(index, e.target.value, true);
                setError("");
              }}
              className={`pin-input ${digit ? "filled" : ""}`}
            />
          ))}
        </div>
        {error && <p className="!text-red-500 text-sm text-center">{error}</p>}

        <button className="done" onClick={handleClick}>
          Done{" "}
        </button>
      </div>
    </div>
  );
};

export default ConfirmTransactionPin;
