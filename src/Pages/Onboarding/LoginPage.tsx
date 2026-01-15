import GetStarted from "@/Components/Signupflow/GetStarted";
import { get_started_png } from "@/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthSignupLayout from "@/Components/Authlayout/AuthSignupLayout";
import { loginResponseData } from "@/types";
import SuccessModal from "@/Components/Signupflow/SuccessModal";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ContextLogin, updatePinStatus } = useAuth();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  //  read query param
  const searchParams = new URLSearchParams(location.search);
  const fromVerifyEmail = searchParams.get("prev") === "verify-email";

  const handleLoginSuccess = (response: { data: loginResponseData }) => {
    const { isPinSet, userRole, accessToken } = response.data;

    const role = userRole?.toLowerCase();

    ContextLogin(accessToken);

    // admin goes straight in
    if (role === "admin") {
      navigate("/admin/dashboard");
      return;
    }

    // normal user with pin already set
    if (isPinSet && role === "user") {
      updatePinStatus();
      navigate("/dashboard");
      return;
    }

    // if coming from verify-email, show success modal first
    if (fromVerifyEmail) {
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/set-pin", { replace: true });
      }, 2000);

      return;
    }

    // next after success shows
    navigate("/set-pin");
  };

  return (
    <main className="max-h-screen overflow-hidden">
      <AuthSignupLayout
        backgroundImage={get_started_png}
        progressDots={3}
        title="Best Rates, Secure Payment"
      >
        <GetStarted onSuccess={handleLoginSuccess} />
        {showSuccessModal && <SuccessModal />}
      </AuthSignupLayout>
    </main>
  );
};

export default LoginPage;
