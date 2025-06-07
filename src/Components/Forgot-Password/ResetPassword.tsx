import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImageContainer from "./ImageContainer";
import { Link, useNavigate } from "react-router-dom";
import { full_logo } from "@/assets";
import { FaEye } from "react-icons/fa6";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/api/auth";
import axios from "axios";
import { toast } from "sonner";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    email: z.string().email("no email found"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = ({ email }: { email: string }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const ResetPasswordMutation = useMutation({
    mutationFn: ({
      email,
      newPassword,
    }: {
      email: string;
      newPassword: string;
    }) => resetPassword({ email, newPassword }),
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

  const onSubmit = (data: {
    password: string;
    confirmPassword: string;
    email: string;
  }) => {
    ResetPasswordMutation.mutate(
      { email, newPassword: data.password },
      {
        onSettled: () => navigate("/get-started"),
      }
    );
  };

  return (
    <div className="flex w-full h-screen">
      <div className="items-center justify-center hidden sm:flex w-[55%]">
        <ImageContainer />
      </div>
      <div className="flex flex-col w-full sm:w-[45%] mt-20 px-4 gap-10">
        <div className="flex flex-col items-center gap-8">
          <Link to="/">
            <img src={full_logo} alt="logo" className="w-full h-12" />
          </Link>
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p className="text-gray-500">Please enter your new password</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <input type="hidden" value={email} {...register("email")} />

          <div className="flex flex-col">
            <label>New Password</label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="custom-input"
                {...register("password")}
              />
              <FaEye
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label>Confirm Password</label>
            <div className="relative">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                className="custom-input"
                {...register("confirmPassword")}
              />
              <FaEye
                onClick={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
