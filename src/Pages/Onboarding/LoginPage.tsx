import GetStarted from "@/Components/Signupflow/GetStarted";
import { get_started_png } from "@/assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthSignupLayout from "@/Components/Authlayout/AuthSignupLayout";
import { loginResponseData } from "@/types";

const LoginPage = () => {
  const navigate = useNavigate();
  const { ContextLogin, updatePinStatus } = useAuth();

  const handleLoginSuccess = (response: { data: loginResponseData }) => {
    const isPinSet = response.data.isPinSet === true;
    // const isKycVerified = response?.data?.isKycVerified;
    const userRole = response.data.userRole.toLowerCase();
    updatePinStatus();
    ContextLogin(response.data.accessToken);

    if (isPinSet && userRole === "user") {
      navigate("/dashboard");
    } else if (userRole === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/set-pin");
    }
  };

  return (
    <main className="max-h-screen overflow-y-hidden">
      <AuthSignupLayout
        backgroundImage={get_started_png}
        progressDots={3}
        title="Best Rates, Secure Payment"
      >
        <GetStarted onSuccess={handleLoginSuccess} />
      </AuthSignupLayout>
    </main>
  );
};

export default LoginPage;
