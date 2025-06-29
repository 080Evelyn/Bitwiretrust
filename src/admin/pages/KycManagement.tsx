import KycTable from "../components/kyc-management/KycTable";
import Overview from "../components/kyc-management/Overview";

const KycManagement = () => {
  return (
    <div className="pb-2">
      <Overview />
      <KycTable />
    </div>
  );
};

export default KycManagement;
