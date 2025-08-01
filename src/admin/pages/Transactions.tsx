import { useSearchParams } from "react-router-dom";
import Filter from "../components/transaction/Filter";
import Overview from "../components/transaction/Overview";
import TransactionTable from "../components/transaction/TransactionTable";

const Transactions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <Overview />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 pb-2">
        <div className="md:col-span-1">
          <Filter
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
        <div className="md:col-span-4">
          <TransactionTable searchParams={searchParams} />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
