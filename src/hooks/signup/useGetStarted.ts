import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { getStartedSchema, GetStartedFormData } from "@/lib/schemas/signup";
import axios from "axios";
import { loginResponseData } from "@/types";

export const useGetStarted = () => {
  const form = useForm<GetStartedFormData>({
    resolver: zodResolver(getStartedSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const loginMutation = useMutation({
    mutationFn: login,
  });

  const errorResponse = loginMutation.error
    ? axios.isAxiosError(loginMutation.error)
      ? loginMutation.error.response?.data?.responseDesc ||
        "Something went wrong"
      : "Unexpected error occurred"
    : null;

  const onSubmit = (
    data: GetStartedFormData,
    onSuccess?: (response: { data: loginResponseData }) => void
  ) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        onSuccess?.(response);
      },
    });
  };

  return {
    errorResponse,
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
};
