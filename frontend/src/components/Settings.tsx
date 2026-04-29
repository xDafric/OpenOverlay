import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

const Settings = ({
  items,
  children,
}: {
  items: { url: string; icon: LucideIcon; title: string }[];
  children?: ReactNode;
}) => {
  return (
    <>
      <div className="flex flex-row h-full w-full bg-card/70 rounded-lg">
        <div className="bg-sidebar p-4 min-w-62 h-full rounded-l-lg border-r-2 shadow-xl border-muted/50">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <NavLink
                  relative="route"
                  to={item.url}
                  end
                  children={({ isActive }) => (
                    <SidebarMenuButton className={isActive ? "bg-muted" : ""}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
        <div className="h-full w-full rounded-lg border-muted p-4">
          {children}
        </div>
      </div>
    </>
  );
};

export default Settings;
