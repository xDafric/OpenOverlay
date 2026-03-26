"use client";

import * as React from "react";
import {
  Clapperboard,
  Home,
  Layers,
  LayoutDashboard,
  Mail,
  Settings,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/navigation/nav-main";
import { NavUser } from "@/components/navigation/nav-user";
import { WorkspaceSwitcher } from "@/components/navigation/workspace-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavWorkspace } from "./nav-workspace";
import { authClient } from "@/lib/auth-client";

const data = {
  navMain: [
    { title: "Home", url: "/", icon: Home },
    {
      title: "Overlays",
      url: "#",
      icon: Layers,
      items: [],
    },
    {
      title: "Scenes",
      url: "#",
      icon: Clapperboard,
      items: [],
    },
    {
      title: "Widgets",
      url: "#",
      icon: LayoutDashboard,
      items: [],
    },
  ],
  navWorkspace: [
    {
      name: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      name: "Members",
      url: "#",
      icon: Users,
    },
    {
      name: "Invites",
      url: "#",
      icon: Mail,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: workspaces } = authClient.useListOrganizations();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspaces={workspaces ?? []} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavWorkspace items={data.navWorkspace} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
