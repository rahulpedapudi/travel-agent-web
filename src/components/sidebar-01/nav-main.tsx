"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }: { items: any[] }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={item.id === "discover"} // Hardcoded active for "Discover"
                className="data-[active=true]:!bg-teal-500/10 data-[active=true]:!text-teal-400 data-[active=true]:!border-l-2 data-[active=true]:!border-teal-400 rounded-none px-4 py-3 h-auto hover:bg-white/5 hover:text-white transition-all duration-200 group-data-[collapsible=icon]:!size-14 group-data-[collapsible=icon]:!p-3 [&_svg]:!size-8"
              >
                {Icon && <Icon className="mr-3 h-3.5 w-3.5 opacity-70 group-data-[collapsible=icon]:!m-0 group-data-[active=true]/menu-button:!opacity-100 group-data-[active=true]/menu-button:!text-teal-400" />}
                <span className="font-medium tracking-wide text-base">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
