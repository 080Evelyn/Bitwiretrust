// phoneNumber-context.ts
import { createContext, useContext } from "react";

export type PhoneNumberContextType = {
  beneficiaryNumber: string;
  setBeneficiaryNumber: (number: string) => void;
};

// ← one shared context
export const PhoneNumberContext = createContext<
  PhoneNumberContextType | undefined
>(undefined);

// ← hook reads from that same context
export const usePhoneNumber = () => {
  const ctx = useContext(PhoneNumberContext);
  if (!ctx) {
    throw new Error("usePhoneNumber must be used within a PhoneNumberProvider");
  }
  return ctx;
};
