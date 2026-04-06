import {
  createBrowserRouter,
  Outlet,
  type Params,
  type RouteObject,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import NoWorkspace from "./pages/NoWorkspace";
import WorkspaceProvider from "./provider/workspaceProvider";
import Home from "./pages/Home";
import SidebarWrapper from "./components/navigation/sidebar-wrapper";
import { authClient } from "./lib/auth-client";
import WorkspaceSettings from "./components/workspace/WorkspaceSettings/WorkspaceSettings";
import Members from "./components/workspace/Members";
import Invites from "./components/workspace/Invites";

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
