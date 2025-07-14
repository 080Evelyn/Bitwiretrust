import { useEffect, useState } from "react";
import { FormData, Step } from "../../types";
import {
  create_account_png,
  verify_email_png,
  get_started_png,
} from "../../assets";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import CreateAccount from "./CreateAccount";
import VerifyEmail from "./VerifyEmail";
import GetStarted from "./GetStarted";
import CreatePasscode from "./CreatePasscode";
import SuccessModal from "./SuccessModal";
import { useMutation } from "@tanstack/react-query";
import { createAccount, createPin, login, verifyEmailCode } from "@/api/auth";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

type Props = {
  initialStep?: Step;
};

const Signupflow = ({ initialStep = Step.CREATE_ACCOUNT }: Props) => {
  const [currentStep, setCurrentStep] = useState<Step>(initialStep);
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    phone: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [storedCredentials, setStoredCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [getStartedFields, setGetStartedFields] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [verificationCode, setVerificationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);

  const [passcode, setPasscode] = useState<string[]>(["", "", "", ""]);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [codeError, setCodeError] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [confirmPasscode, setConfirmPasscode] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const [passcodeMatchError, setPasscodeMatchError] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const isValidPhone = (phone: string): boolean => {
      const phoneRegex = /^\+?[0-9\s\-()]+$/;
      return phoneRegex.test(phone);
    };
    let isAdult = false;
    if (formData.dateOfBirth) {
      const today = new Date();
      const birthday = new Date(formData.dateOfBirth);
      const age = today.getFullYear() - birthday.getFullYear();
      const month = today.getMonth() - birthday.getMonth();
      isAdult = age >= 18 || (age === 17 && month >= 0);
    }

    switch (currentStep) {
      case Step.CREATE_ACCOUNT:
        setIsButtonEnabled(
          formData.first_name.trim() !== "" &&
            formData.last_name.trim() !== "" &&
            isValidEmail(formData.email) &&
            isValidPhone(formData.phone) &&
            formData.dateOfBirth.trim() !== "" &&
            formData.password.trim() !== "" &&
            formData.confirmPassword.trim() !== "" &&
            formData.terms !== false &&
            formData.password === formData.confirmPassword &&
            isAdult
        );
        break;
      case Step.VERIFY_EMAIL:
        setIsButtonEnabled(!verificationCode.includes(""));
        break;
      case Step.GET_STARTED:
        setIsButtonEnabled(
          isValidEmail(getStartedFields.email) &&
            getStartedFields.password.trim() !== ""
        );
        break;
      case Step.CREATE_PASSCODE:
        setIsButtonEnabled(!passcode.includes(""));
        break;
      default:
        setIsButtonEnabled(false);
    }
  }, [currentStep, formData, verificationCode, getStartedFields, passcode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleGetStartedInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setGetStartedFields({ ...getStartedFields, [name]: value });
  };

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...verificationCode];
    newCode[index] = value.replace(/[^0-9]/g, "").slice(0, 1);
    setVerificationCode(newCode);

    if (value && index < 3) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    if (codeError) {
      setCodeError(false);
    }
  };

  const handlePasscodeChange = (index: number, value: string) => {
    const newPasscode = [...passcode];
    newPasscode[index] = value.replace(/[^0-9]/g, "").slice(0, 1);
    setPasscode(newPasscode);

    if (value && index < 3) {
      const nextInput = document.getElementById(`passcode-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const createAccountMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      setStoredCredentials({
        ...storedCredentials,
      });
      setCurrentStep(currentStep + 1);
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const responseDesc =
          error.response?.data?.responseDesc || "Something went wrong";
        toast.error(responseDesc);
      } else {
        toast.error("Unexpected error occurred");
      }
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: () =>
      verifyEmailCode({
        otp: verificationCode.join(""),
        email: formData.email,
      }),
    onSuccess: () => {
      setCurrentStep(currentStep + 1);
    },
    onError: (error: unknown) => {
      setCodeError(true);
      if (axios.isAxiosError(error)) {
        const responseDesc =
          error.response?.data?.responseDesc || "Something went wrong";
        setOtpError(responseDesc);
        console.error(responseDesc);
      } else {
        toast.error("Unexpected error occurred");
      }
    },
  });

  const { ContextLogin, updatePinStatus } = useAuth();

  const loginMutation = useMutation({
    mutationFn: () => login(getStartedFields),
    onSuccess: (response) => {
      const isPinSet =
        response.data.isPinSet === true || response.data.isPinSet === "true";
      const userRole = response.data.userRole.toLowerCase();
      updatePinStatus();
      ContextLogin(response.data.jwt);

      if (isPinSet && userRole === "user") {
        navigate("/dashboard");
      } else if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          setCurrentStep(Step.CREATE_PASSCODE);
        }, 2000);
      }
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const responseDesc =
          error.response?.data?.responseDesc || "Something went wrong";
        toast.error(responseDesc);
      } else {
        toast.error("Unexpected error occurred");
      }
    },
  });

  const savePin = useMutation({
    mutationFn: (pin: string) => createPin(pin),
    onSuccess: () => {
      updatePinStatus();
      navigate("/dashboard");
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const responseDesc =
          error.response?.data?.responseDesc || "Something went wrong";
        toast.error(responseDesc);
      } else {
        toast.error("Unexpected error occurred");
      }
    },
  });

  const isLoading =
    createAccountMutation.isPending ||
    verifyCodeMutation.isPending ||
    loginMutation.isPending ||
    savePin.isPending;

  const handleNextStep = () => {
    if (!isButtonEnabled) return;

    if (currentStep === Step.CREATE_ACCOUNT) {
      createAccountMutation.mutate({
        first_name: formData.first_name,
        last_name: formData.last_name,
        dateOfBirth: formData.dateOfBirth,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });
    } else if (currentStep === Step.VERIFY_EMAIL) {
      verifyCodeMutation.mutate();
    } else if (currentStep === Step.GET_STARTED) {
      loginMutation.mutate();
    } else if (currentStep === Step.CREATE_PASSCODE) {
      if (confirmPasscode.join("") === passcode.join("")) {
        savePin.mutate(passcode.join(""));
      } else {
        setPasscodeMatchError(true);
      }
    }
  };

  const renderCodeInputs = () => {
    return (
      <div className="flex justify-center items-center w-full md:w-[80%] lg:w-[90%] gap-3.5 md:gap-5 lg:gap-8 mb-10">
        {verificationCode.map((digit, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            type="tel"
            className={`size-15 md:size-13 lg:size-20 !rounded-md text-center font-semibold text-2xl md:text-lg lg:!text-3xl ${
              codeError ? "error" : ""
            }`}
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            maxLength={1}
            autoFocus={index === 0}
          />
        ))}
      </div>
    );
  };

  const renderPasscodeInputs = () => {
    return (
      <div className="passcode-inputs">
        {passcode.map((digit, index) => (
          <input
            key={index}
            id={`passcode-input-${index}`}
            type="password"
            className={`passcode-input ${digit ? "filled" : ""}`}
            value={digit}
            onChange={(e) => handlePasscodeChange(index, e.target.value)}
            maxLength={1}
            autoFocus={index === 0}
          />
        ))}
      </div>
    );
  };

  const getStepBackground = () => {
    return {
      [Step.CREATE_ACCOUNT]: create_account_png,
      [Step.VERIFY_EMAIL]: verify_email_png,
      [Step.GET_STARTED]: get_started_png,
      [Step.CREATE_PASSCODE]: get_started_png,
    }[currentStep];
  };

  const renderStepContent = () => {
    const sharedProps = {
      getLeftSideClass: () => "left-side",
      getStepBackground,
      isButtonEnabled,
      handleNextStep,
      isLoading,
    };

    switch (currentStep) {
      case Step.CREATE_ACCOUNT:
        return (
          <CreateAccount
            {...sharedProps}
            formData={formData}
            setCurrentStep={setCurrentStep}
            handleInputChange={handleInputChange}
          />
        );
      case Step.VERIFY_EMAIL:
        return (
          <VerifyEmail
            {...sharedProps}
            formData={formData}
            renderCodeInputs={renderCodeInputs}
            codeError={codeError}
            otpError={otpError}
          />
        );
      case Step.GET_STARTED:
        return (
          <GetStarted
            {...sharedProps}
            setCurrentStep={setCurrentStep}
            getStartedFields={getStartedFields}
            handleGetStartedInputChange={handleGetStartedInputChange}
          />
        );
      case Step.CREATE_PASSCODE:
        return (
          <CreatePasscode
            {...sharedProps}
            getStartedFields={getStartedFields}
            renderPasscodeInputs={renderPasscodeInputs}
            passcode={passcode}
            setPasscode={setPasscode}
            confirmPasscode={confirmPasscode}
            setConfirmPasscode={setConfirmPasscode}
            passcodeMatchError={passcodeMatchError}
            setPasscodeMatchError={setPasscodeMatchError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-h-screen overflow-hidden">
      {renderStepContent()}
      {showSuccessModal && <SuccessModal />}
    </div>
  );
};

export default Signupflow;
