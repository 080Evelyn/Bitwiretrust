import GetStarted from "@/Components/Signupflow/GetStarted";
import { get_started_png } from "@/assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthSignupLayout from "@/Components/Authlayout/AuthSignupLayout";

const LoginPage = () => {
  const navigate = useNavigate();
  const { ContextLogin, updatePinStatus } = useAuth();

  const handleLoginSuccess = (response: {
    data: { jwt: string; isPinSet: boolean; userRole: string };
  }) => {
    const isPinSet = response.data.isPinSet === true;
    const userRole = response.data.userRole.toLowerCase();
    updatePinStatus();
    ContextLogin(response.data.jwt);

    if (isPinSet && userRole === "user") {
      navigate("/dashboard");
    } else if (userRole === "admin") {
      navigate("/admin/dashboard");
    } else {
      // no pin yet: go to set-pin
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
