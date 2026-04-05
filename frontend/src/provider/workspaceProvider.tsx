import { authClient } from "@/lib/auth-client";
import { useEffect, type ReactNode } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const WorkspaceProvider = ({ children }: { children?: ReactNode }) => {
  const { workspaceSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: workspaces, isPending: isWorkspacesPending } =
    authClient.useListOrganizations();

  const { data: activeWorkspace, isPending: isActivePending } =
    authClient.useActiveOrganization();

  useEffect(() => {
    const navigateToWorkspace = (slug: string) => {
      const segments = location.pathname.split("/");
      segments[1] = slug;
      navigate(segments.join("/"));
    };

    if (isWorkspacesPending || isActivePending || !workspaces) return;

    if (workspaces.length < 1) {
      navigate("/no-workspace");
      return;
    }

    if (!workspaceSlug) {
      navigateToWorkspace(workspaces[0].slug);
      return;
    }

    const workspace = workspaces.find((w) => w.slug === workspaceSlug);

    if (!workspace) {
      navigateToWorkspace(activeWorkspace?.slug ?? workspaces[0].slug);
      return;
    }

    if (!activeWorkspace || workspace.id != activeWorkspace?.id) {
      authClient.organization.setActive({
        organizationId: workspace.id,
        organizationSlug: workspace.slug,
      });
    }
  }, [
    isWorkspacesPending,
    isActivePending,
    workspaces,
    workspaceSlug,
    navigate,
    location,
  ]);

  useEffect(() => {
    if (!activeWorkspace) return;

    if (workspaceSlug !== activeWorkspace.slug) {
      navigate(`/${activeWorkspace.slug}`);
    }
  }, [activeWorkspace, workspaceSlug, navigate]);

  return (
    <>
      {!isWorkspacesPending && !isActivePending && (
        <>
          {children} <Outlet />
        </>
      )}
    </>
  );
};

export default WorkspaceProvider;
