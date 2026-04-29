import {
  createBrowserRouter,
  Outlet,
  type Params,
  type RouteObject,
} from "react-router-dom";
import SidebarWrapper from "./components/navigation/sidebar-wrapper";
import ProtectedRoute from "./components/ProtectedRoute";
import Invites from "./components/workspace/Invites";
import Members from "./components/workspace/Members";
import { WorkspaceSettings } from "./components/workspace/WorkspaceSettings/WorkspaceSettings";
import { workspaceSettingsRoutes } from "./components/workspace/WorkspaceSettings/workspaceSettings.routes";
import { authClient } from "./lib/auth-client";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import NoWorkspace from "./pages/NoWorkspace";
import WorkspaceProvider from "./provider/workspaceProvider";

export type AppRoute = Omit<RouteObject, "children"> & {
  children?: AppRoute[];
  breadcrumb?: string | ((params: Params) => string);
  title?: string;
  requiresAuth?: boolean;
};

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <div className="h-dvh">
        <Outlet />
      </div>
    ),
    handle: {
      breadcrumb: "Auth",
    },
    children: [
      {
        path: "login",
        element: <Login />,
        handle: {
          breadcrumb: "Login",
        },
      },
      {
        path: "signup",
        element: <Signup />,
        handle: {
          breadcrumb: "Signup",
        },
      },
    ],
  },

  {
    path: "/no-workspace",
    element: (
      <ProtectedRoute>
        <NoWorkspace />
      </ProtectedRoute>
    ),
    handle: {
      breadcrumb: "No Workspace",
    },
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <WorkspaceProvider>
          <Outlet />
        </WorkspaceProvider>
      </ProtectedRoute>
    ),
    handle: {
      breadcrumb: "Root",
    },
    children: [
      {
        path: ":workspaceSlug",
        element: <SidebarWrapper />,
        handle: {
          breadcrumb: async (params: Params) => {
            const { data } = await authClient.organization.getFullOrganization({
              query: { organizationSlug: params.workspaceSlug },
            });
            return data?.name;
          },
        },
        children: [
          {
            index: true,
            element: <Home />,
            handle: {
              breadcrumb: "Home",
            },
          },
          {
            path: "settings",
            element: <WorkspaceSettings />,
            handle: {
              breadcrumb: "Settings",
            },
            children: workspaceSettingsRoutes,
          },
          {
            path: "members",
            element: <Members />,
            handle: {
              breadcrumb: "Members",
            },
          },
          {
            path: "invites",
            element: <Invites />,
            handle: {
              breadcrumb: "Invites",
            },
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);
