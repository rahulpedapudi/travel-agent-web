"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MessageSquare, ChevronRight, Trash2, Loader2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Chat } from "@/hooks/useChatHistory";
import { cn } from "@/lib/utils";

interface NavRecentChatsProps {
  chats: Chat[];
  currentChatId: string | null;
  isLoading: boolean;
  onChatSelect: (chatId: string) => void;
  onChatDelete: (chatId: string) => void;
}

export function NavRecentChats({
  chats,
  currentChatId,
  isLoading,
  onChatSelect,
  onChatDelete,
}: NavRecentChatsProps) {
  if (isLoading) {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      </SidebarGroup>
    );
  }

  if (!chats?.length) {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
        <div className="px-2 py-3 text-xs text-muted-foreground">
          No conversations yet
        </div>
      </SidebarGroup>
    );
  }

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            Recent Chats
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarMenu>
            {chats.map((chat) => (
              <SidebarMenuItem key={chat.id} className="group/item">
                <SidebarMenuButton
                  tooltip={chat.title}
                  onClick={() => onChatSelect(chat.id)}
                  className={cn(
                    "pr-8 relative",
                    currentChatId === chat.id && "bg-sidebar-accent"
                  )}>
                  <MessageSquare className="mr-2 h-4 w-4 opacity-70 shrink-0" />
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="truncate text-sm">{chat.title}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {formatDate(chat.updatedAt)}
                    </span>
                  </div>
                </SidebarMenuButton>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChatDelete(chat.id);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded">
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                </button>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  );
}
