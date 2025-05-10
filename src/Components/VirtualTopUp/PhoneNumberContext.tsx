import { ReactNode, useState } from "react";
import { PhoneNumberContext } from "./PhoneNumber-context";

const PhoneNumberProvider = ({ children }: { children: ReactNode }) => {
  const [beneficiaryNumber, setBeneficiaryNumber] = useState("");

  return (
    <PhoneNumberContext.Provider
      value={{ beneficiaryNumber, setBeneficiaryNumber }}
    >
      {children}
    </PhoneNumberContext.Provider>
  );
};

export default PhoneNumberProvider;
