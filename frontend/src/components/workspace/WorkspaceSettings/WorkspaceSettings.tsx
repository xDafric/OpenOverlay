import Settings from "@/components/settings";
import {
  AlertTriangle,
  Palette,
  Plug,
  Settings as SettingsIcon,
  ShieldUser,
  type LucideIcon,
} from "lucide-react";
import { Outlet } from "react-router-dom";

const nav: {
  title: string;
  icon: LucideIcon;
  url: string;
}[] = [
  {
    title: "General",
    icon: SettingsIcon,
    url: "",
  },
  {
    title: "Appearance",
    icon: Palette,
    url: "appearance",
  },
  {
    title: "Permissions & Roles",
    icon: ShieldUser,
    url: "permissions",
  },
  {
    title: "Integrations",
    icon: Plug,
    url: "integrations",
  },
  {
    title: "Danger Zone",
    icon: AlertTriangle,
    url: "danger",
  },
];

export const WorkspaceSettings = () => {
  return (
    <>
      <Settings items={nav}>
        <Outlet />
      </Settings>
    </>
  );
};

export const General = () => {
  return (
    <>
      <h1>General</h1>
    </>
  );
};

export const Appearance = () => {
  return (
    <>
      <h1>Appearance</h1>
    </>
  );
};

export const PermissionsRoles = () => {
  return (
    <>
      <h1>Permissions & Roles</h1>
    </>
  );
};

export const Integrations = () => {
  return (
    <>
      <h1>Integrations</h1>
    </>
  );
};

export const DangerZone = () => {
  return (
    <>
      <h1>Danger Zone</h1>
    </>
  );
};
