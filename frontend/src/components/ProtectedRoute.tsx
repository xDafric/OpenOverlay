import { authClient } from "@/lib/auth-client";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data, isPending } = authClient.useSession();

  return (
    <div>
      {isPending ? (
        <h1>Loading...</h1>
      ) : data?.session ? (
        children
      ) : (
        <Navigate to={"/auth/login"} />
      )}
    </div>
  );
};

export default ProtectedRoute;
