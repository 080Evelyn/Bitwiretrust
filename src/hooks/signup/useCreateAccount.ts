import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/auth";
import {
  createAccountSchema,
  CreateAccountFormData,
} from "@/lib/schemas/signup";
import { toast } from "sonner";
import axios from "axios";

export const useCreateAccount = () => {
  const form = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onBlur",
  });

  const createAccountMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      // Success handled in parent component
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

  const onSubmit = (
    data: CreateAccountFormData,
    onSuccess?: (email: string) => void
  ) => {
    createAccountMutation.mutate(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        phone: data.phone,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          onSuccess?.(data.email);
        },
      }
    );
  };

  return {
    form,
    onSubmit,
    isLoading: createAccountMutation.isPending,
  };
};
