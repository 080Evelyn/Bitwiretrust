import { usePinModal } from "@/context/PinModalContext";
import { Dialog, DialogContent, DialogOverlay } from "../ui/dialog";
import { WithrawalImage } from "@/assets";

interface ConfirmationProps {
  isConfirmationOpen: boolean;
  setIsConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    account: string;
    amount: string;
    remark?: string;
  };
}

const TransferConfirmation = ({
  isConfirmationOpen,
  setIsConfirmationOpen,
  data,
}: ConfirmationProps) => {
  const { openPinModal } = usePinModal();
  const handleSubmit = () => {
    setIsConfirmationOpen(false);
    openPinModal((pin) => {
      console.log("PIN entered:", pin);
    });
  };

  return (
    <div>
      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogOverlay>
          <DialogContent className="m-0 px-0 pb-[5px] pt-2">
            <div
              className="relative bg-[#F9F9F9] pb-8"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <img
                src={WithrawalImage}
                className="size-[85px] rounded-full absolute top-12 left-20 transform -translate-x-1/2 -translate-y-1/2"
                alt="withdrawal icon"
              />
              <div className="flex pl-35 py-3 justify-around items-center bg-white w-full px-3">
                <h4 className="font-medium text-[#221D7A]">Confirm Details</h4>
                <span className="size-[17px] bg-[#221d7a] rounded-full text-end" />
              </div>

              <div className="pt-12">
                <div className="flex flex-col gap-3 px-5">
                  <div className="flex flex-col gap-2 items-center">
                    <span className="text-xs md:text-[10px] text-[#9F9F9F]">
                      Recipient Details:
                    </span>
                    <span className="max-md:text-sm uppercase">
                      Temidayo Gabriel
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <span className="text-sm md:text-[10px] text-[#9F9F9F]">
                      Recipient Account:
                    </span>
                    <span className="max-md:text-sm ">{data.account}</span>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <span className="text-sm md:text-[10px] text-[#9F9F9F]">
                      Bank
                    </span>
                    <span className="max-md:text-sm ">Access Bank</span>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <span className="text-sm md:text-[10px] text-[#9F9F9F]">
                      Amount
                    </span>
                    <span className="max-md:text-sm ">{data.amount}</span>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <span className="text-sm md:text-[10px] text-[#9F9F9F]">
                      Remark
                    </span>
                    <span className="max-md:text-sm ">{data.remark}</span>
                  </div>
                  <button
                    className="btn-primary w-1/2 mt-1 mx-auto"
                    onClick={handleSubmit}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </div>
  );
};

export default TransferConfirmation;
