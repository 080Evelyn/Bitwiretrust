import VerifyEmail from "@/Components/Signupflow/VerifyEmail";
import { verify_email_png } from "@/assets";
import { useSearchParams, useNavigate } from "react-router-dom";
import AuthSignupLayout from "@/Components/Authlayout/AuthSignupLayout";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") || "";

  const handleSuccess = () => {
    navigate("/login?prev=verify-email", { replace: true });
  };

  return (
    <main className="max-h-screen overflow-hidden">
      <AuthSignupLayout
        backgroundImage={verify_email_png}
        progressDots={2}
        title="Discover a Smarter Way to Manage Your Finances"
      >
        <VerifyEmail email={email} onSuccess={handleSuccess} />
      </AuthSignupLayout>
    </main>
  );
};

export default VerifyEmailPage;
