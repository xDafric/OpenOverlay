"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

export function NavWorkspace({
  items,
}: {
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { workspaceSlug } = useParams();
  const location = useLocation();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const url = `/${workspaceSlug}/${item.url}`;
          const isActive = location.pathname === url;
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                className={cn({ "bg-muted": isActive })}
                asChild
              >
                <NavLink to={url}>
                  <item.icon />
                  <span>{item.name}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
