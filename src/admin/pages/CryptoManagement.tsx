import CryptoTable from "../components/crypto-management/CryptoTable";
import Overview from "../components/crypto-management/Overview";

const CryptoManagement = () => {
  return (
    <div className="pb-2">
      <Overview />
      <CryptoTable />
    </div>
  );
};

export default CryptoManagement;
