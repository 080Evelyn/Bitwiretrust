import { passcode_lock } from "@/assets";
import { ModalType } from "@/types";

interface TransactionPinProps {
  toggleModal: (modal: ModalType) => void;
  transactionPin: string[];
  handlePinChange: (index: number, value: string) => void;
}
const TransactionPin = ({
  toggleModal,
  transactionPin,
  handlePinChange,
}: TransactionPinProps) => {
  return (
    <div className="modal transaction-pin-modal">
      <div className="modal-header">
        <button className="back-btn" onClick={() => toggleModal("settings")}>
          Back
        </button>
        <h3>Transaction Pin</h3>
      </div>

      <div className="transaction-pin-content">
        <h4>Create a four digit transaction pin</h4>
        <p>
          It's important to keep your transaction PIN confidential and not share
          it with anyone.
        </p>

        <div className="pin-instruction">
          <img src={passcode_lock} alt="lock" className="pin-lock-icon" />
          <span>Enter Passcode to continue</span>
        </div>

        <div className="pin-input-container">
          {transactionPin.map((digit, index) => (
            <input
              key={index}
              id={`pin-${index}`}
              type="password"
              maxLength={1}
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              className={`pin-input ${digit ? "filled" : ""}`}
            />
          ))}
        </div>

        <button
          className="done"
          onClick={() => toggleModal("confirm-transaction-pin")}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TransactionPin;
