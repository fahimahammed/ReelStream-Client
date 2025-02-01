import { useUser } from "@/hooks/user";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import Spinner from "../ui/spinner";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
