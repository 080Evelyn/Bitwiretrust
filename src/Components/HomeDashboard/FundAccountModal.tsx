import { Check, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";
import { WithrawalImage } from "@/assets";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { DvaAccountInfo } from "@/types/dashboard";

interface FundAccountProps {
  isFundAccountOpen: boolean;
  setIsFundAccountOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dvaData?: DvaAccountInfo;
}

const FundAccountModal = ({
  isFundAccountOpen,
  setIsFundAccountOpen,
  dvaData,
}: FundAccountProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const accountNumber = document.getElementById("account-number");
    if (accountNumber) {
      navigator.clipboard.writeText(accountNumber.textContent || "");
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div>
      <Dialog open={isFundAccountOpen} onOpenChange={setIsFundAccountOpen}>
        <DialogOverlay>
          <DialogContent className="m-0 px-0 pb-[5px] pt-2">
            <div
              className="relative bg-[#F9F9F9] pb-8"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <img
                src={WithrawalImage}
                className="size-[85px] rounded-full absolute top-12 left-20 transform -translate-x-1/2 -translate-y-1/2 input"
                alt="withdrawal icon"
              />
              <div className="flex pl-35 py-3 px-3 justify-around items-center bg-white w-full">
                <DialogTitle>
                  <div className="flex flex-col text-center">
                    <h4 className="font-medium text-[#221D7A]">Fund Account</h4>
                    <span className="text-sm md:text-[10px]">
                      Bank Transfer
                    </span>
                  </div>
                </DialogTitle>

                <span className="size-[17px] bg-[#221d7a] rounded-full text-end" />
              </div>

              <div className="pb-10 pt-1.5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-col gap-2 items-center px-5 pb-2.5 pt-5 bg-white">
                    <span className="font-medium text-[#D9D9D9]">
                      Account Name
                    </span>
                    <span className="text-2xl uppercase text-[#221D7A]">
                      {dvaData?.accountName}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 items-center px-5 pb-2.5 pt-5 bg-white">
                    <span className="font-medium text-[#D9D9D9]">
                      Bank Name
                    </span>
                    <span className="text-2xl uppercase text-[#221D7A]">
                      {dvaData?.bankName}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5 items-center px-5 py-2.5 bg-white">
                    <span className="font-medium text-[#D9D9D9]">
                      Account Number
                    </span>
                    <div className="flex gap-3 text-[#221D7A]">
                      <span
                        className="text-2xl font-medium"
                        id="account-number"
                      >
                        {dvaData?.accountNumber}
                      </span>
                      {copied ? (
                        <Check className="size-6" />
                      ) : (
                        <Copy
                          className="size-6 cursor-pointer"
                          onClick={handleCopy}
                        />
                      )}
                    </div>
                  </div>
                  <DialogClose className="btn-primary w-1/2 mt-10 mx-auto">
                    Done
                  </DialogClose>
                </div>
              </div>
            </div>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </div>
  );
};

export default FundAccountModal;
