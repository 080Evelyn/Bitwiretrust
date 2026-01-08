import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ImageContainer from "./ImageContainer";
import { full_logo } from "@/assets";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/auth";
import axios from "axios";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

const RequestEmail = ({
  onSuccess,
}: {
  onSuccess: (email: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: ({ email }: { email: string }) => forgotPassword({ email }),
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

  const isLoading = forgotPasswordMutation.isPending;

  const onSubmit = (data: { email: string }) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        onSuccess(data.email);
      },
    });
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
            <p className="text-gray-500">Please enter your email address</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email</label>
            <input
              {...register("email")}
              className="custom-input"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? (
              <span className="flex gap-2 items-center justify-center">
                Sending... <FaSpinner className="animate-spin" />
              </span>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>

        <div className="text-center">
          Remembered your password?{" "}
          <Link to="/login" className="text-primary font-medium !underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RequestEmail;
