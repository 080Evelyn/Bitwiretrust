import { WalletProps } from "@/types/crypto";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCryptoWithdrawalHistory,
  fetchCryptoSwapHistory,
  fetchCryptoDepositHistory,
} from "@/api/crypto";
import { Badge } from "../ui/badge";
import { formatDate } from "date-fns";
import { cn } from "@/lib/utils";

interface Transactions {
  coin: WalletProps | null;
}

type TabType = "Swap" | "Deposit" | "Withdrawal";

interface TransactionData {
  id: string;
  reference: string;
  type: string;
  currency: string;
  amount: string;
  fee: string;
  total: string;
  txid: string;
  transaction_note: string;
  narration: string;
  status: string;
  reason: string;
  created_at: Date;
  done_at: Date;
  recipient: {
    type: string;
    details: {
      address: string;
      destination_tag: string;
      name: string;
      user_id: string;
    };
  };
  wallet: {
    id: string;
    name: string;
    currency: string;
    balance: string;
    locked: string;
    staked: string;
    user: {
      id: string;
      sn: string;
      email: string;
      reference: string;
      first_name: string;
      last_name: string;
      display_name: string;
      created_at: Date;
      updated_at: Date;
    };
  };
  user: {
    id: string;
    sn: string;
    email: string;
    reference: string;
    first_name: string;
    last_name: string;
    display_name: string;
    created_at: Date;
    updated_at: Date;
  };
}

const TransactionHistory = ({ coin }: Transactions) => {
  const [activeTab, setActiveTab] = useState<TabType>("Deposit");

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions", activeTab, coin?.currency],
    queryFn: async () => {
      if (!coin?.currency) return [];

      const params = {
        userId: "",
        currency: coin.currency.toLowerCase(),
        state: "done",
      };

      let response;
      switch (activeTab) {
        case "Swap":
          response = await fetchCryptoSwapHistory(params);
          break;
        case "Deposit":
          response = await fetchCryptoDepositHistory(params);
          break;
        case "Withdrawal":
          response = await fetchCryptoWithdrawalHistory(params);
          break;
      }

      return response?.data?.data?.data || [];
    },
    enabled: !!coin?.currency,
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-medium hidden md:block desktop-card-container rounded-[4px] py-1.75">
        Transaction History
      </div>

      <div className="h-full desktop-card-container md:max-h-86 rounded-md p-2">
        <div className="flex flex-col gap-2">
          <h3 className="md:hidden font-medium self-start tracking-[-0.17px]">
            Transaction History
          </h3>
          <div className="max-md:mt-2 flex gap-2 w-full justify-center">
            {(["Swap", "Deposit", "Withdrawal"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-2 xl:px-4 py-2 rounded-md text-sm md:text-xs xl:text-sm font-medium cursor-pointer transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto">
            {isLoading ? (
              <div className="text-center text-xs text-gray-400 py-4">
                Loading transactions...
              </div>
            ) : transactions.length > 0 ? (
              transactions.map((tx: TransactionData) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between gap-4 py-3 px-3 bg-[#F8F8F8] rounded-md"
                >
                  {/* Left: transaction meta */}
                  <div className="flex flex-col leading-tight">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium capitalize">
                        {activeTab}
                      </span>
                    </div>

                    <span className="text-[11px] text-muted-foreground">
                      {formatDate(tx.created_at, "MMM dd, yyyy")}
                    </span>
                  </div>

                  {/* Right: amount + status */}
                  <div
                    className="flex flex-col items-end gap-1"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <span className="text-sm font-semibold tracking-tight">
                      {tx.amount} {tx.currency.toUpperCase()}
                    </span>

                    <Badge
                      className={cn(
                        tx.status === "pending"
                          ? "bg-yellow-400"
                          : tx.status === "Done"
                            ? "bg-[#11C600]"
                            : "bg-[#FF0000]",
                        "text-[10px] px-2 py-0.5 capitalize",
                      )}
                    >
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-xs text-gray-400 py-4">
                No transactions found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
