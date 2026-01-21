import { TransactionData, WalletProps } from "@/types/crypto";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCryptoWithdrawalHistory,
  fetchCryptoSwapHistory,
  fetchCryptoDepositHistory,
} from "@/api/crypto";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/Components/ui/dialog";
import { Badge } from "../ui/badge";
import { formatDate } from "date-fns";
import { cn } from "@/lib/utils";
import SwapHistory from "./SwapHistory";
import { ChevronRightCircle } from "lucide-react";
import { Button } from "../ui/button";

interface Transactions {
  coin: WalletProps | null;
}

type TabType = "Swap" | "Deposit" | "Withdrawal";

const TransactionHistory = ({ coin }: Transactions) => {
  const [activeTab, setActiveTab] = useState<TabType>("Deposit");
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions", activeTab, coin?.currency],
    queryFn: async () => {
      if (!coin?.currency) return [];

      const params = {
        userId: "",
        currency: coin.currency.toLowerCase(),
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

      return response?.data?.data || [];
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
          <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide max-h-[80dvh] md:max-h-70">
            {activeTab === "Swap" ? (
              <SwapHistory transactions={transactions} isLoading={isLoading} />
            ) : isLoading ? (
              <div className="text-center text-xs text-gray-400 py-4">
                Loading transactions...
              </div>
            ) : transactions.length > 0 ? (
              transactions.map((tx: TransactionData) => (
                <div
                  key={tx.id}
                  onClick={() => {
                    setSelectedTransaction(tx);
                    setIsDialogOpen(true);
                  }}
                  className="flex items-center justify-between gap-4 py-3 px-3 bg-[#F8F8F8] rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  {/* Left: transaction meta */}
                  <div className="flex flex-col leading-tight">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium capitalize">
                        {activeTab}
                      </span>
                    </div>

                    <span className="text-[11px] text-muted-foreground">
                      {tx.created_at &&
                        formatDate(tx.created_at, "MMM dd, yyyy")}
                    </span>
                  </div>

                  {/* Right: amount + status */}
                  <div className="flex items-center gap-4">
                    <div
                      className="flex flex-col items-end gap-1"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      <span className="text-sm font-semibold capitalize tracking-tight">
                        {tx.amount} {tx.currency}
                      </span>

                      <Badge
                        className={cn(
                          tx.status === "pending"
                            ? "bg-yellow-400"
                            : tx.status === "Done" || tx.status === "accepted"
                              ? "bg-[#11C600]"
                              : "bg-[#FF0000]",
                          "text-[10px] px-2 py-0.5 capitalize",
                        )}
                      >
                        {tx.status}
                      </Badge>
                    </div>

                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      className="flex items-center gap-2 md:hidden text-muted-foreground"
                    >
                      <span className="sr-only">View Details</span>
                      <ChevronRightCircle className="text-primary size-5" />
                    </Button>
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

      {/* Transaction Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xs sm:max-w-sm md:max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription className="sr-only">
              Detailed information about this transaction
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-3">
              {/* Transaction ID */}
              {selectedTransaction.txid && (
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-semibold text-gray-600">
                    Transaction ID
                  </span>
                  <span className="text-xs md:text-sm font-mono bg-gray-100 px-2 py-1 rounded break-all max-w-[60%]">
                    {selectedTransaction.txid}
                  </span>
                </div>
              )}

              {/* Amount */}
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm font-semibold text-gray-600">
                  Amount
                </span>
                <span className="text-xs md:text-sm font-semibold capitalize">
                  {selectedTransaction.amount} {selectedTransaction?.currency}
                </span>
              </div>

              {/* Fee */}
              {selectedTransaction.fee && selectedTransaction.fee !== "0" && (
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-semibold text-gray-600">
                    Fee
                  </span>
                  <span className="text-xs md:text-sm capitalize">
                    {selectedTransaction.fee} {selectedTransaction?.currency}
                  </span>
                </div>
              )}

              {/* Total */}
              {selectedTransaction.total && (
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-semibold text-gray-600">
                    Total
                  </span>
                  <span className="text-xs md:text-sm font-semibold capitalize">
                    {selectedTransaction.total} {selectedTransaction?.currency}
                  </span>
                </div>
              )}

              {/* Status */}
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm font-semibold text-gray-600">
                  Status
                </span>
                <Badge
                  className={cn(
                    selectedTransaction.status === "pending"
                      ? "bg-yellow-400"
                      : selectedTransaction.status === "Done" ||
                          selectedTransaction.status === "accepted"
                        ? "bg-[#11C600]"
                        : "bg-[#FF0000]",
                    "text-xs px-2 py-1 capitalize",
                  )}
                >
                  {selectedTransaction.status}
                </Badge>
              </div>

              {/* Recipient Address */}
              {selectedTransaction.recipient?.details?.address && (
                <div className="flex justify-between max-sm:gap-2 items-start">
                  <span className="text-xs md:text-sm font-semibold text-gray-600">
                    Recipient Address
                  </span>
                  <span className="text-xs md:text-sm font-mono bg-gray-100 px-2 py-1 rounded break-all max-w-[60%]">
                    {selectedTransaction.recipient.details.address}
                  </span>
                </div>
              )}

              {/* Destination Tag */}
              {selectedTransaction.recipient?.details?.destination_tag && (
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-semibold text-gray-600">
                    Destination Tag
                  </span>
                  <span className="text-xs md:text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    {selectedTransaction.recipient.details.destination_tag}
                  </span>
                </div>
              )}

              {/* Recipient Name */}
              {selectedTransaction.recipient?.details?.name && (
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-semibold text-gray-600">
                    Recipient Name
                  </span>
                  <span className="text-xs md:text-sm bg-gray-100 px-2 py-1 rounded">
                    {selectedTransaction.recipient.details.name}
                  </span>
                </div>
              )}

              {/* Created At */}
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm font-semibold text-gray-600">
                  Date
                </span>
                <span className="text-xs md:text-sm bg-gray-100 px-2 py-1 rounded">
                  {selectedTransaction.created_at &&
                    formatDate(
                      selectedTransaction.created_at,
                      "MMM dd, yyyy HH:mm:ss",
                    )}
                </span>
              </div>

              {/* Done At */}
              {selectedTransaction.done_at && (
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-semibold text-gray-600">
                    Completed At
                  </span>
                  <span className="text-xs md:text-sm bg-gray-100 px-2 py-1 rounded">
                    {formatDate(
                      selectedTransaction.done_at,
                      "MMM dd, yyyy HH:mm:ss",
                    )}
                  </span>
                </div>
              )}

              {/* Reason */}
              {selectedTransaction.reason && (
                <div className="flex justify-between items-start">
                  <span className="text-xs md:text-sm font-semibold text-gray-600">
                    Reason
                  </span>
                  <span className="text-xs md:text-sm bg-gray-100 px-2 py-1 rounded max-w-[60%] break-words">
                    {selectedTransaction.reason}
                  </span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionHistory;
