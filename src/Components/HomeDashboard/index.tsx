import { useState } from "react";
import "./styles.css";
import BalanceOverview from "./BalanceOverview";
import TransferModal from "./TransferModal";
import ActionButtons from "./ActionButtons";
import QuickActions from "./QuickActions";
import { useQuery } from "@tanstack/react-query";
import { transactionHistory } from "@/api/user-notification";
import { TransactionHistoryProps } from "@/types/dashboard";
import TransactionList from "./TransactionList";

const HomeDashboard = () => {
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);

  const { isFetching, data: transactionsList } = useQuery({
    queryKey: ["transaction-history"],
    queryFn: () => transactionHistory({ size: 20 }),
    staleTime: 10 * 60 * 1000,
  });

  const notifications = transactionsList?.data
    ?.data as TransactionHistoryProps[];

  return (
    <>
      <BalanceOverview />

      <div className="rate-container overflow-x-auto pb-5">
        <div className="rate-container-left">
          <ActionButtons onWithdrawClick={() => setIsWithdrawalOpen(true)} />
          <QuickActions />
        </div>

        {/* transactions  */}
        <TransactionList
          notifications={notifications}
          isFetching={isFetching}
        />
      </div>

      <TransferModal
        isWithdrawalOpen={isWithdrawalOpen}
        setIsWithdrawalOpen={() => setIsWithdrawalOpen(!isWithdrawalOpen)}
      />
    </>
  );
};

export default HomeDashboard;
