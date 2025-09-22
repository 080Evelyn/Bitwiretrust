import Overview from "../components/crypto-management/Overview";
import KycTable from "../components/kyc-management/KycTable";

const CryptoManagement = () => {
  return (
    <div className="pb-2">
      <Overview />
      <KycTable />
    </div>
  );
};

export default CryptoManagement;
