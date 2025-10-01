import { approveKyc, rejectKyc } from "@/admin/api/kyc";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useKycActions = (onSuccessCallback?: () => void) => {
  const approveMutation = useMutation({
    mutationFn: (userId: string) => approveKyc(userId),
    onSuccess: () => {
      toast.success("Kyc approved successfully");
      onSuccessCallback?.();
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

  const rejectMutation = useMutation({
    mutationFn: (userId: string) => rejectKyc(userId),
    onSuccess: () => {
      toast.success("Kyc rejected successfully");
      onSuccessCallback?.();
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

  return {
    approveMutation,
    rejectMutation,
  };
};
