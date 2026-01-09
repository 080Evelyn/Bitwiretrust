import { resendOtp } from "@/api/auth";
import { full_logo } from "@/assets";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useVerifyEmail } from "@/hooks/signup/useVerifyEmail";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";

interface VerifyEmailProps {
  email: string;
  onSuccess: () => void;
}

const VerifyEmail = ({ email, onSuccess }: VerifyEmailProps) => {
  const { form, onSubmit, isLoading } = useVerifyEmail(email);
  const [timer, setTimer] = useState(120);
  const [resendLocked, setResendLocked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const mutateResendOtp = useMutation({
    mutationFn: (data: { email: string }) => resendOtp(data),
  });

  const handleResendOtp = () => {
    if (timer > 0) return;
    if (resendLocked) return;

    setResendLocked(true);

    mutateResendOtp.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("OTP sent successfully");
          setTimer(120);
          setResendLocked(false);
        },
        onError: (error: unknown) => {
          if (axios.isAxiosError(error)) {
            const responseDesc =
              error.response?.data?.responseDesc || "Something went wrong";
            toast.error(responseDesc);
          } else {
            toast.error("Unexpected error occurred");
          }
          setResendLocked(false);
        },
      }
    );
  };
  const handleSubmit = (data: { otp: string }) => {
    onSubmit(data, onSuccess);
  };

  return (
    <div className="right-side verify-email">
      <div className="app-logo">
        <img src={full_logo} alt="Bitwire" />
      </div>
      <h2 className="max-md:mt-5">Verify your E-mail</h2>
      <p>
        Enter the 4-digit code sent to your e-mail <span>{email}</span>{" "}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-4 justify-center">
                <FormControl>
                  <InputOTP
                    maxLength={4}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup className="gap-3">
                      <InputOTPSlot index={0} className="size-17 md:size-14" />
                      <InputOTPSlot index={1} className="size-17 md:size-14" />
                      <InputOTPSlot index={2} className="size-17 md:size-14" />
                      <InputOTPSlot index={3} className="size-17 md:size-14" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="!text-red-600" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? "Processing..." : "Next"}
          </Button>

          <div className="resend-link">
            {timer > 0 ? (
              <p>
                Resend available in {Math.floor(timer / 60)}:
                {String(timer % 60).padStart(2, "0")}
              </p>
            ) : (
              <p>
                Didn't get code?{" "}
                <span className="resend" onClick={handleResendOtp}>
                  Resend
                </span>
              </p>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VerifyEmail;
