import WithdrawalRequestOverview from "../components/withdrawal-request/Overview";
import ProcessedWithdrawalTable from "../components/withdrawal-request/ProcessedWithdrawalTable";

const SuccessfulWithdrawalRequest = () => {
  return (
    <div className="pb-2">
      <WithdrawalRequestOverview />
      <ProcessedWithdrawalTable />
    </div>
  );
};

export default SuccessfulWithdrawalRequest;
