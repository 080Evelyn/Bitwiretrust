import WithdrawalRequestOverview from "../components/withdrawal-request/Overview";
import PendingWithdrawalTable from "../components/withdrawal-request/PendingWithdrawalTable";

const PendingWithdrawalRequest = () => {
  return (
    <div className="pb-2">
      <WithdrawalRequestOverview />
      <PendingWithdrawalTable />
    </div>
  );
};

export default PendingWithdrawalRequest;
