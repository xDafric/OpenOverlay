import { CreateWorkspaceCard } from "@/components/workspace/CreateWorkspace";
import { authClient } from "@/lib/auth-client";
import { Navigate } from "react-router-dom";

const NoWorkspace: React.FC = () => {
  const { data, isPending } = authClient.useListOrganizations();

  return (
    <>
      {!isPending && (data?.length ?? 0) > 0 && <Navigate to={"/"} />}
      <div className="h-screen w-full flex justify-center items-center">
        <CreateWorkspaceCard />
      </div>
    </>
  );
};

export default NoWorkspace;
