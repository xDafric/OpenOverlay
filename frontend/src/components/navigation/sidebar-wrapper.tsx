import { AppSidebar } from "@/components/navigation/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Fragment, useEffect, useState } from "react";
import { Outlet, useMatches, useParams, type Params } from "react-router-dom";

const SidebarWrapper: React.FC = () => {
  const matches = useMatches();
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchBreadcrumbs = async () => {
      const breadcrumbs = matches.filter((match) => match.pathname != "/");
      const fetchedBreadcrumbs = await Promise.all(
        breadcrumbs.map(async (breadcrumb) => {
          const field = (
            breadcrumb.handle as {
              breadcrumb: ((params: Params) => Promise<string>) | string;
            }
          ).breadcrumb;

          let value;
          if (typeof field === "function") {
            value = await field(params);
          } else {
            value = field;
          }
          return value;
        }),
      );
      setBreadcrumbs(fetchedBreadcrumbs);
    };
    fetchBreadcrumbs();
  }, [matches]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <Fragment key={index}>
                    {index != 0 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                    <BreadcrumbItem>
                      <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarWrapper;
