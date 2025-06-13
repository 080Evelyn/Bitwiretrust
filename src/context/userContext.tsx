import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/types/user";
import { getToken, getUserId } from "@/utils/AuthStorage";

const url = import.meta.env.VITE_API_URL;

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [authReady, setAuthReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getToken();
    const storedUserId = getUserId();
    setToken(storedToken);
    setUserId(storedUserId);
    setAuthReady(true);
  }, []);

  const enabled = authReady && token != null && userId != null;

  const fetchUser = async (): Promise<User> => {
    if (!token || !userId) {
      throw new Error("Missing token or userId");
    }
    const resp = await axios.get(
      `${url}/v1/user/wallet-service/profile/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = resp.data.data;

    return {
      firstName: data.firstName,
      lastName: data.lastName,
      kycVerified: data.kycVerified,
      email: data.email,
    };
  };

  const {
    data,
    isLoading: queryLoading,
    error,
    refetch,
  } = useQuery<User, Error>({
    queryKey: ["user", userId],
    queryFn: fetchUser,
    enabled,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });

  const contextValue: UserContextType = useMemo(
    () => ({
      user: data ?? null,
      isLoading: !authReady || queryLoading,
      error,
      refetch,
    }),
    [data, queryLoading, error, refetch, authReady]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within UserProvider");
  }
  return ctx;
};
