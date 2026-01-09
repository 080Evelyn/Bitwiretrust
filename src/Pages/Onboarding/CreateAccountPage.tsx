import CreateAccount from "@/Components/Signupflow/CreateAccount";
import { create_account_png } from "@/assets";
import { useNavigate } from "react-router-dom";
import AuthSignupLayout from "@/Components/Authlayout/AuthSignupLayout";

const CreateAccountPage = () => {
  const navigate = useNavigate();

  const handleSuccess = (email: string) => {
    const encoded = encodeURIComponent(email);
    navigate(`/verify-email?email=${encoded}`);
  };

  const getLeftSideClass = () => "left-side";
  const getStepBackground = () => create_account_png;

  return (
    <main className="max-h-screen overflow-y-hidden">
      <AuthSignupLayout
        backgroundImage={create_account_png}
        progressDots={1}
        title="Ready To Step Up Your Financial Life?"
      >
        <CreateAccount
          getLeftSideClass={getLeftSideClass}
          getStepBackground={getStepBackground}
          onSuccess={handleSuccess}
          setCurrentStep={() => navigate("/create-account")}
        />
      </AuthSignupLayout>
    </main>
  );
};

export default CreateAccountPage;
