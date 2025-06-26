import {
  electricityBillerVerificationCode,
  serviceIdentifiers,
} from "@/api/micro-transaction";
import { useQuery } from "@tanstack/react-query";

export function useServiceIdentifiers(identifier: string | undefined) {
  return useQuery({
    queryKey: ["service-identifiers", identifier],
    queryFn: () => serviceIdentifiers(identifier!),
    enabled: !!identifier,
    select: (res) => res.data,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

export const useBillerVerificationCode = (serviceID: string | undefined) => {
  return useQuery({
    queryKey: ["electricity-biller-verification-code", serviceID],
    queryFn: () => electricityBillerVerificationCode(serviceID!),
    enabled: !!serviceID,
    select: (res) => res.data,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
