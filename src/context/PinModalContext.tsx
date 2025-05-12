import { createContext, useContext } from "react";

export type PinModalContextType = {
  openPinModal: (onConfirm: (pin: string) => void) => void;
  closePinModal: () => void;
};

export const PinModalContext = createContext<PinModalContextType | undefined>(
  undefined
);

export const usePinModal = () => {
  const context = useContext(PinModalContext);
  if (!context) {
    throw new Error("usePinModal must be used within a PinModalProvider");
  }
  return context;
};
