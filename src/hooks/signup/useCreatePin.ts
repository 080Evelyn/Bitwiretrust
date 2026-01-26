import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createPin } from "@/api/auth";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { CreatePinFormData, createPinSchema } from "@/lib/schemas/signup";

export const useCreatePin = () => {
  const { updatePinStatus } = useAuth();

  const form = useForm<CreatePinFormData>({
    resolver: zodResolver(createPinSchema),
    defaultValues: {
      pin: "",
      confirmPin: "",
    },
    mode: "onBlur",
  });

  const createPinMutation = useMutation({
    mutationFn: createPin,
    onSuccess: () => {
      updatePinStatus();
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

  const onSubmit = (data: CreatePinFormData, onSuccess?: () => void) => {
    createPinMutation.mutate(data.pin, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return {
    form,
    onSubmit,
    isLoading: createPinMutation.isPending,
  };
};
