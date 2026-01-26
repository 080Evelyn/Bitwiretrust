import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createPin } from "@/api/auth";
import {
  createPasscodeSchema,
  CreatePasscodeFormData,
} from "@/lib/schemas/signup";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export const useCreatePin = () => {
  const { updatePinStatus } = useAuth();

  const form = useForm<CreatePasscodeFormData>({
    resolver: zodResolver(createPasscodeSchema),
    defaultValues: {
      passcode: "",
      confirmPasscode: "",
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

  const onSubmit = (data: CreatePasscodeFormData, onSuccess?: () => void) => {
    createPinMutation.mutate(data.passcode, {
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
