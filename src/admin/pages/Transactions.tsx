import Filter from "../components/transaction/Filter";
import Overview from "../components/transaction/Overview";
import TransactionTable from "../components/transaction/TransactionTable";

const Transactions = () => {
  return (
    <div>
      <Overview />
      <div className="grid grid-cols-5 gap-2.5 pb-2">
        <div className="col-span-1">
          <Filter />
        </div>
        <div className="col-span-4">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
