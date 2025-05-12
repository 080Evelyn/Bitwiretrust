import { useState, ReactNode } from "react";
import { PinModalContext } from "@/context/PinModalContext";
import PinModal from "@/Components/PinModal";

export const PinModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState<
    (pin: string) => void
  >(() => () => {});

  const openPinModal = (onConfirm: (pin: string) => void) => {
    setOnConfirmCallback(() => onConfirm);
    setIsOpen(true);
  };

  const closePinModal = () => {
    setIsOpen(false);
  };

  return (
    <PinModalContext.Provider value={{ openPinModal, closePinModal }}>
      {children}
      <PinModal
        isOpen={isOpen}
        onClose={closePinModal}
        onConfirm={onConfirmCallback}
      />
    </PinModalContext.Provider>
  );
};
