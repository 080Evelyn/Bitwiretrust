import { passcode_lock } from "@/assets";
import { ModalType } from "@/types";

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
}
const ConfirmTransactionPin = ({
  toggleModal,
  confirmTransactionPin,
  handlePinChange,
  transactionPin,
  setConfirmTransactionPin,
}: ConfirmTransactionPinProps) => {
  return (
    <div className="modal transaction-pin-modal">
      <div className="modal-header">
        <button
          className="back-btn"
          onClick={() => toggleModal("transaction-pin")}
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
              onChange={(e) => handlePinChange(index, e.target.value, true)}
              className={`pin-input ${digit ? "filled" : ""}`}
            />
          ))}
        </div>

        <button
          className="done"
          onClick={() => {
            if (transactionPin.join("") === confirmTransactionPin.join("")) {
              toggleModal("profile");
            } else {
              alert("PINs do not match. Please try again.");
              setConfirmTransactionPin(["", "", "", ""]);
            }
          }}
        >
          Done{" "}
        </button>
      </div>
    </div>
  );
};

export default ConfirmTransactionPin;
