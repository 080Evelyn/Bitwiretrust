import { useState, useEffect } from "react";
import { full_logo } from "@/assets";
import { Checkbox } from "../ui/checkbox";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
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
import { AlertCircle } from "lucide-react";
import { loginResponseData } from "@/types";

interface GetStartedProps {
  onSuccess: (response: { data: loginResponseData }) => void;
}

const GetStarted = ({ onSuccess }: GetStartedProps) => {
  const { form, onSubmit, isLoading, errorResponse } = useGetStarted();
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
    <div className="flex flex-col gap-2 w-full">
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
        <Link
          to="/register"
          className="text-blue-700 cursor-pointer hover:!underline text-sm font-medium transition-colors"
        >
          Sign Up
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-3 flex flex-col w-full gap-4"
        >
          {errorResponse && (
            <span className="flex gap-2">
              <AlertCircle className="text-red-500 size-5" />
              <p className="!text-red-500 font-semibold text-sm">
                {errorResponse}
              </p>
            </span>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="custom-form-group">
                <FormLabel>Email</FormLabel>
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
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      className="absolute top-1/2 right-4 cursor-pointer transform -translate-y-1/2 focus:text-[#7910B1]"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="size-4.5" />
                      ) : (
                        <FaEye className="size-4.5" />
                      )}
                    </button>
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
            {isLoading ? "Processing..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GetStarted;
