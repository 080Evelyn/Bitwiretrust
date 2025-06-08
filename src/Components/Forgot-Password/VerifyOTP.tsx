import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Link } from "react-router-dom";
import { full_logo } from "@/assets";
import ImageContainer from "./ImageContainer";
import { verifyResetPasswordOtp } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";
import axios from "axios";
import { toast } from "sonner";

const schema = z.object({
  otp: z
    .string()
    .length(4, "OTP must be 4 digits")
    .refine((val) => !isNaN(Number(val)), {
      message: "OTP must be a valid number",
    }),
  email: z.string().email("Email not found"),
});

const VerifyOTP = ({
  email,
  onVerified,
}: {
  email: string;
  onVerified: () => void;
}) => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { otp: "", email: "" },
  });

  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email, setValue]);

  const verifyOtpMutation = useMutation({
    mutationFn: ({ otp, email }: { otp: string; email: string }) =>
      verifyResetPasswordOtp({ otp, email }),
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

  const onSubmit = (data: { otp: string; email: string }) => {
    verifyOtpMutation.mutate(data, {
      onSuccess: () => onVerified(),
    });
  };

  const isLoading = verifyOtpMutation.isPending;

  return (
    <div className="flex w-full h-screen">
      <div className="items-center justify-center hidden sm:flex w-[55%]">
        <ImageContainer />
      </div>

      <div className="flex flex-col w-full sm:w-[45%] max-sm:justify-center items-center -mt-20 sm:mt-20 px-4 gap-12">
        <div className="flex flex-col items-center gap-8">
          <Link to="/">
            <img src={full_logo} alt="logo" className="w-full h-12" />
          </Link>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p className="text-gray-500">Enter OTP sent to {email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <input type="hidden" {...register("email")} />

          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-2 items-center">
                <InputOTP
                  maxLength={4}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
                {errors.otp && (
                  <p className="text-red-500 text-sm">{errors.otp.message}</p>
                )}
              </div>
            )}
          />

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? (
              <span className="flex gap-3 items-center justify-center">
                Verifying <FaSpinner className="animate-spin" />
              </span>
            ) : (
              "Verify"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
