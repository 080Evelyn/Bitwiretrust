import { BankList } from "@/types/dashboard";

interface ConfirmationPayload {
  amount: number;
  remark?: string;
  accountDetails: { account: string };
  selectedBank: BankList;
  accountName: string;
}

interface ConfirmationProps {
  payload: ConfirmationPayload;
  handleSubmit: () => void;
  onBack: () => void;
  initiateTransaferMutationPending: boolean;
}

const TransferConfirmation = ({
  payload,
  handleSubmit,
  onBack,
  initiateTransaferMutationPending,
}: ConfirmationProps) => {
  if (!payload || !payload.accountDetails || !payload.selectedBank) {
    return null;
  }

  return (
    <div className="pt-12">
      <div className="flex flex-col gap-3 px-5">
        <div className="flex flex-col gap-2 items-center">
          <span className="text-xs md:text-[10px] text-[#9F9F9F]">
            Recipient Details:
          </span>
          <span className="max-md:text-sm uppercase">
            {payload.accountName}
          </span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <span className="text-sm md:text-[10px] text-[#9F9F9F]">
            Recipient Account:
          </span>
          <span className="max-md:text-sm">
            {payload.accountDetails.account}
          </span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <span className="text-sm md:text-[10px] text-[#9F9F9F]">Bank</span>
          <span className="max-md:text-sm">{payload.selectedBank.name}</span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <span className="text-sm md:text-[10px] text-[#9F9F9F]">Amount</span>
          <span className="font-semibold">{payload.amount}</span>
        </div>
        {payload.remark !== undefined && payload.remark !== "" && (
          <div className="flex flex-col gap-2 items-center">
            <span className="text-sm md:text-[10px] text-[#9F9F9F]">
              Remark
            </span>
            <span className="max-md:text-sm">{payload.remark}</span>
          </div>
        )}

        <div className="flex justify-between items-center mt-4.5 px-5">
          <button
            type="button"
            className="text-sm rounded-[4.75px] cursor-pointer bg-white hover:bg-[#f7f7f7] py-2.5 border border-[#221D7A] w-1/2 mx-auto mr-2"
            onClick={onBack}
          >
            Back
          </button>
          <button
            type="button"
            className="btn-primary w-1/2 ml-2"
            onClick={handleSubmit}
            disabled={initiateTransaferMutationPending}
          >
            {initiateTransaferMutationPending ? "Transferring..." : "Transfer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferConfirmation;
