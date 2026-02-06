import { LoginForm } from "@/components/auth/login-form";
import { authClient } from "@/lib/auth-client";
import { Navigate } from "react-router-dom";

const Login: React.FC = () => {
  const { data } = authClient.useSession();

  return (
    <>
      {data?.session ? (
        <Navigate to={"/"} />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
