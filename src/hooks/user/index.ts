import { UserContext } from "@/context/user.context";
import { getMyProfile } from "@/services/auth.api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getMyProfile,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};
