import { SearchIcon } from "@/assets";
import { Input } from "../ui/input";
import { coinTransactions } from "@/constants/coins";
import { WalletProps } from "@/types/crypto";

interface Transactions {
  coin: WalletProps | null;
}
const TransactionHistory = ({ coin }: Transactions) => {
  const filteredTransactions = coinTransactions.filter(
    (tx) => tx.coinId === coin?.id
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-medium hidden md:block desktop-card-container rounded-[4px] py-1.75">
        Transaction History
      </div>

      <div className="h-full desktop-card-container md:max-h-86 rounded-md p-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 w-full">
            <div className="relative flex-1 max-md:hidden">
              <Input
                type="search"
                placeholder="Search History"
                className="h-9 w-full !pl-9 !rounded-[4.7px]"
              />
              <img src={SearchIcon} className="absolute size-4 top-3 left-3" />
            </div>
          </div>
          <h3 className="md:hidden font-medium self-start tracking-[-0.17px]">
            Transaction History
          </h3>
          <div className="flex flex-col gap-2 overflow-y-auto">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex font-medium justify-between py-4 md:py-1.5 px-1 md:px-2.5 bg-[#F8F8F8] rounded-sm"
                >
                  <div className="flex gap-2 items-center">
                    <img src={tx.image} alt={tx.type} className="size-8" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium md:text-xs">
                        {tx.type}
                      </span>
                      <span className="text-[10px] md:text-[8px] tracking-[-0.17px] md:tracking-[-0.13px]">
                        {tx.date}
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex flex-col items-end gap-1 tracking-[-0.12px]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <span className="text-xs font-medium">{tx.amount} NGN</span>
                    {tx.value && (
                      <span className="text-[10px] text-[#615D5D]">
                        {tx.value} {tx.symbol}
                      </span>
                    )}
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
