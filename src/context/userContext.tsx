import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { userDetails } from "@/api/user";

interface User {
  firstName: string;
  lastName: string;
  kycVerified: boolean;
  email: string;
}

interface UserContextType {
  user: User | undefined;
  isLoading: boolean;
  refetch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: userDetails,
    enabled: !!localStorage.getItem("token"),
  });

  return (
    <UserContext.Provider value={{ user, isLoading, refetch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
