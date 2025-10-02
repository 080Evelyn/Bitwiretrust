import WithdrawalRequestOverview from "../components/withdrawal-request/Overview";
import WithdrawalTable from "../components/withdrawal-request/WithdrawalTable";

const WithdrawalRequest = () => {
  return (
    <div className="pb-2">
      <WithdrawalRequestOverview />
      <WithdrawalTable />
    </div>
  );
};

export default WithdrawalRequest;
