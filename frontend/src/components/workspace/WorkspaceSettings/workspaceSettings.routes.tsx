import type { RouteObject } from "react-router-dom";
import {
  Appearance,
  DangerZone,
  General,
  Integrations,
  PermissionsRoles,
} from "./WorkspaceSettings";

export const workspaceSettingsRoutes: RouteObject[] = [
  {
    index: true,
    element: <General />,
    handle: { breadcrumb: "General" },
  },
  {
    path: "appearance",
    element: <Appearance />,
    handle: { breadcrumb: "Appearance" },
  },
  {
    path: "permissions",
    element: <PermissionsRoles />,
    handle: { breadcrumb: "Permissions & Roles" },
  },
  {
    path: "integrations",
    element: <Integrations />,
    handle: { breadcrumb: "Integrations" },
  },
  {
    path: "danger",
    element: <DangerZone />,
    handle: { breadcrumb: "Danger Zone" },
  },
];
