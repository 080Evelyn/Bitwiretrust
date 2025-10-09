import { useQuery } from "@tanstack/react-query";
import { withdrawalRequestCount } from "../api/withdrawal-request";

export function useWithdrawalRequestCount(status: string) {
  return useQuery({
    queryKey: ["withdrawalRequestCount", status],
    queryFn: () => withdrawalRequestCount(status),
    staleTime: Infinity,
  });
}
