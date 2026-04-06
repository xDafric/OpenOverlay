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

const data = {
  navMain: [
    { title: "Home", url: "", icon: Home },
    {
      title: "Overlays",
      url: "overlays",
      icon: Layers,
      items: [],
    },
    {
      title: "Scenes",
      url: "scenes",
      icon: Clapperboard,
      items: [],
    },
    {
      title: "Widgets",
      url: "widgets",
      icon: LayoutDashboard,
      items: [],
    },
  ],
  navWorkspace: [
    {
      name: "Settings",
      url: "settings",
      icon: Settings,
    },
    {
      name: "Members",
      url: "members",
      icon: Users,
    },
    {
      name: "Invites",
      url: "invites",
      icon: Mail,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher />
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
