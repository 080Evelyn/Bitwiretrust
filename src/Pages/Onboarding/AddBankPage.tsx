import AddBankAccount from "@/Components/Signupflow/AddBankAccount";
import { get_started_png } from "@/assets";
import AuthSignupLayout from "@/Components/Authlayout/AuthSignupLayout";

const AddBankPage = () => {
  return (
    <main className="max-h-screen overflow-y-hidden">
      <AuthSignupLayout
        backgroundImage={get_started_png}
        progressDots={3}
        title="Best Rates, Secure Payment"
      >
        <AddBankAccount />
      </AuthSignupLayout>
    </main>
  );
};

export default AddBankPage;
