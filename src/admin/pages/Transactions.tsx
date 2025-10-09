import { useSearchParams } from "react-router-dom";
import Filter from "../components/transaction/Filter";
import Overview from "../components/transaction/Overview";
import TransactionTable from "../components/transaction/TransactionTable";
import { useState } from "react";

const Transactions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(0);
  const handleSetSearchParams = (params: URLSearchParams) => {
    setPage(0);
    setSearchParams(new URLSearchParams(params));
  };

  return (
    <div>
      <Overview />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 pb-2">
        <div className="md:col-span-1">
          <Filter
            searchParams={searchParams}
            setSearchParams={handleSetSearchParams}
          />
        </div>
        <div className="md:col-span-4">
          <TransactionTable
            searchParams={searchParams}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
