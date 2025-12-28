import { Link, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }: { items: any[] }) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.url;

          return (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={isActive}
                className="data-[active=true]:!bg-teal-500/10 data-[active=true]:!text-teal-400 data-[active=true]:!border-l-2 data-[active=true]:!border-teal-400 rounded-none px-4 py-3 h-auto hover:bg-white/5 hover:text-white transition-all duration-200 group-data-[collapsible=icon]:!size-14 group-data-[collapsible=icon]:!p-3 [&_svg]:!size-8"
              >
                <Link to={item.url}>
                  {Icon && <Icon className="mr-3 h-3.5 w-3.5 opacity-70 group-data-[collapsible=icon]:!m-0 group-data-[active=true]/menu-button:!opacity-100 group-data-[active=true]/menu-button:!text-teal-400" />}
                  <span className="font-medium tracking-wide text-base">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}

      </SidebarMenu>
    </SidebarGroup >
  );
}
