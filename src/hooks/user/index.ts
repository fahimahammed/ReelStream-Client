import { UserContext } from "@/context/user.context";
import { useContext } from "react";

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};
