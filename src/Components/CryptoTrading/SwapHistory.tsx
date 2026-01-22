// import { formatDate } from "date-fns";

interface SwapTransaction {
  id: number;
  reference: string;
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  quotedPrice: number;
  quotedCurrency: string;
  swapQuoteId: string;
  confirmed: boolean;
  created_at?: Date;
}

interface SwapHistoryProps {
  transactions: SwapTransaction[];
  isLoading: boolean;
}

const SwapHistory = ({ transactions, isLoading }: SwapHistoryProps) => {
  if (isLoading) {
    return (
      <div className="text-center text-xs text-gray-400 py-4">
        Loading swap transactions...
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center text-xs text-gray-400 py-4">
        No swap transactions found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 pb-4">
      {transactions.map((tx: SwapTransaction) => (
        <div
          key={tx.id}
          className="flex max-md:items-center md:flex-col max-md:justify-between gap-2 py-3 px-3 bg-[#F8F8F8] rounded-md"
        >
          <div className="flex flex-col gap-2 leading-tight">
            <span className="text-xs text-gray-600 font-semibold mt-1">
              {tx.fromAmount} {tx.fromCurrency} → {tx.toAmount} {tx.toCurrency}
            </span>
            <div className="flex items-center gap-2">
              {tx.confirmed && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                  Confirmed
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col max-md:items-end gap-1">
            <span className="text-xs font-mono text-gray-500">
              {tx?.swapQuoteId}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwapHistory;
