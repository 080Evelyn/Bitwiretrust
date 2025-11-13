import { useState, useEffect } from "react";
import { full_logo } from "@/assets";
import { Checkbox } from "../ui/checkbox";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useGetStarted } from "@/hooks/signup/useGetStarted";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Step } from "@/types";

interface GetStartedProps {
  getLeftSideClass: () => string;
  getStepBackground: () => string;
  onSuccess: (response: {
    data: { jwt: string; isPinSet: boolean; userRole: string };
  }) => void;
  setCurrentStep: (step: Step) => void;
}

const GetStarted = ({
  getLeftSideClass,
  getStepBackground,
  onSuccess,
  setCurrentStep,
}: GetStartedProps) => {
  const { form, onSubmit, isLoading } = useGetStarted();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      form.setValue("email", savedEmail);
      setRememberMe(true);
    }
  }, [form]);

  const handleCheckboxChange = () => {
    setRememberMe((prev) => !prev);
  };

  const handleSubmit = (data: { email: string; password: string }) => {
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", data.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
    onSubmit(data, onSuccess);
  };

  return (
    <div className="flex w-full">
      <div
        className={cn(
          "items-center justify-center hidden flex-1 sm:flex w-[55%]",
          getLeftSideClass()
        )}
        style={{ backgroundImage: `url(${getStepBackground()})` }}
      >
        <h2>
          Best Rates
          <br />
          Secure Payment
        </h2>
        <div className="progress-indicator">
          <div className="progress-dot active"></div>
          <div className="progress-dot active"></div>
          <div className="progress-dot active"></div>
        </div>
      </div>

      <div className="flex flex-1 mt-20 flex-col gap-2 w-full">
        <div className="app-logo">
          <Link to="/">
            <img src={full_logo} alt="Bitwire" />
          </Link>
        </div>
        <h2 className="text-lg font-medium max-md:text-center">
          Let's get you started!
        </h2>
        <div className="flex mb-2 max-md:justify-center items-center gap-2 ">
          <div className="font-medium text-sm text-gray-600">
            Don&apos;t have an account?
          </div>
          <Link to="/register">
            <button
              onClick={() => setCurrentStep(Step.CREATE_ACCOUNT)}
              className="text-blue-700 cursor-pointer hover:!underline text-sm font-medium transition-colors"
            >
              Sign Up
            </button>
          </Link>
        </div>
        <p className="text-sm text-gray-500 px-4">Fill in your details</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-3 flex flex-col w-full gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="custom-form-group">
                  <FormLabel>Email or Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="example@email.com"
                      className="form-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="custom-form-group">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="form-input"
                      />
                      <div
                        className="absolute top-1/2 right-4 cursor-pointer transform -translate-y-1/2 focus:text-[#7910B1]"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="size-4.5" />
                        ) : (
                          <FaEye className="size-4.5" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="custom-form-group justify-between flex-row gap-3 items-center">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="size-4"
                  checked={rememberMe}
                  onCheckedChange={handleCheckboxChange}
                />
                <label htmlFor="remember" className="text-xs">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-xs text-primary hover:text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="btn-primary mx-4"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Next"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default GetStarted;
