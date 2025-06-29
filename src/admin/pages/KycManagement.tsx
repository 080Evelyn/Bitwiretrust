import KycTable from "../components/kyc-management.tsx/KycTable";
import Overview from "../components/kyc-management.tsx/Overview";

const KycManagement = () => {
  return (
    <div className="pb-2">
      <Overview />
      <KycTable />
    </div>
  );
};

export default KycManagement;
