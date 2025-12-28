import { Link } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MessageSquare, MoreHorizontal } from "lucide-react";
import type { SidebarData } from "./types";

export function NavRecentChats({
  chats,
}: {
  chats: SidebarData["recentChats"];
}) {
  if (!chats?.length) return null;

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-xs font-semibold text-white/50 uppercase tracking-widest px-4 mb-2">Recent Chats</SidebarGroupLabel>
      <SidebarMenu>
        {chats.map((chat) => (
          <SidebarMenuItem key={chat.id}>
            <SidebarMenuButton
              asChild
              tooltip={chat.title}
              className="px-5 py-4 h-auto group-data-[collapsible=icon]:!size-14 group-data-[collapsible=icon]:!p-3 [&_svg]:!size-8"
            >
              <Link to={chat.url}>
                <MessageSquare className="mr-3 h-3.5 w-3.5 opacity-70 group-data-[collapsible=icon]:!m-0" />
                <span className="text-sm font-medium">{chat.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="px-5 py-4 h-auto text-sidebar-foreground/70 group-data-[collapsible=icon]:!size-14 group-data-[collapsible=icon]:!p-3 [&_svg]:!size-8">
            <MoreHorizontal className="text-sidebar-foreground/70 mr-3 h-4 w-4 group-data-[collapsible=icon]:!m-0" />
            <span className="text-sm font-medium">More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
