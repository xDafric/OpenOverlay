import {
  AlertTriangle,
  Palette,
  Plug,
  Settings,
  ShieldUser,
  type LucideIcon,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";
import { Link } from "react-router-dom";

const nav: {
  title: string;
  icon?: LucideIcon;
  url: string;
  styles?: string;
}[] = [
  {
    title: "General",
    icon: Settings,
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
    styles: "text-destructive hover:text-destructive",
  },
];

const WorkspaceSettings = () => {
  return (
    <>
      <div className="flex flex-row h-full">
        <div className="bg-sidebar p-4 min-w-52 rounded-xl">
          <SidebarMenu>
            {nav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link to={item.url}>
                  <SidebarMenuButton className={item.styles}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
        <div className="p-4">
          <h1>Test</h1>
        </div>
      </div>
    </>
  );
};

export default WorkspaceSettings;
