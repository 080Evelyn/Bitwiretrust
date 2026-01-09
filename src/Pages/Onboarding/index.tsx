import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/create-account", { replace: true });
  }, [navigate]);

  return null;
};

export default Register;
