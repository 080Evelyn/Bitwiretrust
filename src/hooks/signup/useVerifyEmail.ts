import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { verifyEmailCode } from "@/api/auth";
import { verifyEmailSchema, VerifyEmailFormData } from "@/lib/schemas/signup";
import { toast } from "sonner";
import axios from "axios";

export const useVerifyEmail = (email: string) => {
  const form = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: "",
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: (otp: string) =>
      verifyEmailCode({
        otp,
        email,
      }),
    onSuccess: () => {
      // Success handled in parent component
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const responseDesc =
          error.response?.data?.responseDesc || "Something went wrong";
        form.setError("otp", { message: responseDesc });
      } else {
        toast.error("Unexpected error occurred");
      }
    },
  });

  const onSubmit = (data: VerifyEmailFormData, onSuccess?: () => void) => {
    verifyEmailMutation.mutate(data.otp, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return {
    form,
    onSubmit,
    isLoading: verifyEmailMutation.isPending,
  };
};
