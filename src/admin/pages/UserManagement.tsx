import Overview from "../components/user-management/Overview";
import UserTable from "../components/user-management/UserTable";

const UserManagement = () => {
  return (
    <div className="pb-2">
      <Overview />
      <UserTable />
    </div>
  );
};

export default UserManagement;
