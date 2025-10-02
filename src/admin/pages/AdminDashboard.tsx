import EngagementBarChart from "../components/dashboard/EngagementBarChart";
import KycApproval from "../components/dashboard/KycApproval";
import Overview from "../components/dashboard/Overview";
import ServicePieChart from "../components/dashboard/ServicePieChart";
import WithdrawalTable from "../components/withdrawal-request/WithdrawalTable";

const AdminDashboard = () => {
  return (
    <div>
      <Overview />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
        <div className="md:col-span-4">
          <EngagementBarChart />
        </div>
        <div className="md:col-span-2">
          <ServicePieChart />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 mt-2 mb-4 gap-2">
        <div className="md:col-span-4">
          <WithdrawalTable compact />
        </div>
        <div className="md:col-span-2">
          <KycApproval />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
