import CreatePin from "@/Components/Signupflow/CreatePin";
import { get_started_png } from "@/assets";
import { useNavigate } from "react-router-dom";
import AuthSignupLayout from "@/Components/Authlayout/AuthSignupLayout";

const SetPinPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/add-bank");
  };

  return (
    <main className="max-h-screen overflow-y-hidden">
      <AuthSignupLayout
        backgroundImage={get_started_png}
        progressDots={3}
        title="Best Rates, Secure Payment"
      >
        <CreatePin onSuccess={handleSuccess} />
      </AuthSignupLayout>
    </main>
  );
};

export default SetPinPage;
