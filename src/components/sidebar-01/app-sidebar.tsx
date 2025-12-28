import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  IconCompass,
  IconHistory,
  IconPlaneDeparture,
} from "@tabler/icons-react";
import { Plus, Search } from "lucide-react";
import { NavMain } from "@/components/sidebar-01/nav-main";
import { NavRecentChats } from "@/components/sidebar-01/nav-recent-chats";
import { NavFooter } from "@/components/sidebar-01/nav-footer";
import type { SidebarData } from "./types";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { Chat } from "@/hooks/useChatHistory";

const navMainData: SidebarData["navMain"] = [
  {
    id: "discover",
    title: "Discover",
    url: "#",
    icon: IconCompass,
    items: [
      {
        title: "Destinations",
        url: "#",
      },
      {
        title: "Trip Guides",
        url: "#",
      },
    ],
  },
  {
    id: "trips",
    title: "My Trips",
    url: "#",
    icon: IconPlaneDeparture,
  },
  {
    id: "history",
    title: "My History",
    url: "#",
    icon: IconHistory,
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNewChat?: () => void;
  chats?: Chat[];
  currentChatId?: string | null;
  isLoadingChats?: boolean;
  onChatSelect?: (chatId: string) => void;
  onChatDelete?: (chatId: string) => void;
}

export function AppSidebar({
  onNewChat,
  chats = [],
  currentChatId = null,
  isLoadingChats = false,
  onChatSelect,
  onChatDelete,
  ...props
}: AppSidebarProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleChatSelect = (chatId: string) => {
    onChatSelect?.(chatId);
    setOpen(false);
  };

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="m-3 h-[calc(100svh-1.5rem)] rounded-[2rem] border border-white/5 shadow-2xl bg-transparent text-white [&_[data-sidebar=sidebar]]:bg-transparent overflow-hidden"
        style={
          {
            "--sidebar-background": "rgba(2, 6, 23, 0.0)", // Fully transparent background var
            "--sidebar-foreground": "#ffffff",
            "--sidebar-primary": "#0f172a",
            "--sidebar-primary-foreground": "#ffffff",
            "--sidebar-accent": "rgba(255, 255, 255, 0.05)",
            "--sidebar-accent-foreground": "#ffffff",
            "--sidebar-border": "rgba(255,255,255,0.0)", // No internal separator borders
            "--sidebar-ring": "#0d9488",
            "--sidebar-width-icon": "4rem",
          } as React.CSSProperties
        }
        {...props}>
        {/* Enhanced Liquid Glass background layer matching ChatInput */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-2xl -z-10" />
        <SidebarHeader className="p-4 gap-4">
          <div className="flex items-center justify-between px-1">
            {/* Expanded State: Logo Text */}
            <div className="flex items-center space-x-2 text-primary group-data-[collapsible=icon]:hidden animate-in fade-in duration-300">
              <span className="font-serif text-lg tracking-tight text-white drop-shadow-sm">
                <IconPlaneDeparture />
              </span>
            </div>

            {/* Collapsed State: Dynamic Icon */}
            <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-full relative group/icon">
              <SidebarTrigger className="absolute opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 z-10 text-white hover:bg-white" />
              <div className="flex items-center justify-center w-10 h-10 rounded-lg transition-opacity duration-300 group-hover/icon:opacity-0">
                <IconPlaneDeparture className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Expanded State: Close Button */}
            <div className="group-data-[collapsible=icon]:hidden">
              <SidebarTrigger className="text-white/60 hover:text-white hover:bg-white/10" />
            </div>
          </div>

          <SidebarMenu className="mt-2">
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setOpen(true)}
                tooltip="Search chat"
                className="bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10">
                <Search className="h-6 w-6" />
                <span>Search chat</span>
                <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-slate-400 opacity-100 group-data-[collapsible=icon]:hidden">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={onNewChat}
                tooltip="New Chat"
                className="bg-teal-600 hover:bg-teal-700 text-white hover:text-white data-[active=true]:bg-teal-700 data-[active=true]:text-white shadow-sm font-medium">
                <Plus className="h-6 w-6" />
                <span>New Chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <NavMain items={navMainData} />
          <NavRecentChats
            chats={chats}
            currentChatId={currentChatId}
            isLoading={isLoadingChats}
            onChatSelect={handleChatSelect}
            onChatDelete={onChatDelete || (() => {})}
          />
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-white/5">
          <NavFooter />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search chats..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent Chats">
            {chats.map((chat) => (
              <CommandItem
                key={chat.id}
                onSelect={() => handleChatSelect(chat.id)}>
                <IconPlaneDeparture className="mr-2 h-4 w-4" />
                <span>{chat.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
