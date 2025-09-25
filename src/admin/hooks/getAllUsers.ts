import { useQuery } from "@tanstack/react-query";
import { totalUserCount } from "../api/user-managment";

export function useTotalUserCount() {
  return useQuery({
    queryKey: ["totalUserCount"],
    queryFn: () => totalUserCount(),
    staleTime: Infinity,
  });
}
