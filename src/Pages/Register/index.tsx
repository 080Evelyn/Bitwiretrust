import Signupflow from "../../Components/Signupflow";
import { Step } from "../../types";

type RegisterProps = {
  initialStep?: Step;
};

const Register = ({ initialStep = Step.CREATE_ACCOUNT }: RegisterProps) => {
  return <Signupflow initialStep={initialStep} />;
};

export default Register;
