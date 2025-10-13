import { useQueryClient } from "@tanstack/react-query";

export const useQueryInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateAfterTransaction = () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
  };

  return { invalidateAfterTransaction };
};

export const useNotificationInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateAfterTransaction = () => {
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
  };

  return { invalidateAfterTransaction };
};
