import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { IconCompass, IconPlaneDeparture, IconEdit } from "@tabler/icons-react";
import { Search } from "lucide-react"; // Import Settings if needed here, or keep in footer
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
    id: "explore",
    title: "Explore",
    url: "/explore",
    icon: IconCompass,
  },
  {
    id: "trips",
    title: "My Trips",
    url: "/trips",
    icon: IconPlaneDeparture,
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
        className="m-3 h-[calc(100svh-1.5rem)] rounded-[2rem] border border-white/10 shadow-[0_0_15px_-3px_rgba(255,255,255,0.15)] bg-transparent text-white **:data-[sidebar=sidebar]:bg-transparent overflow-hidden z-40"
        style={
          {
            "--sidebar-background": "rgba(0, 0, 0, 0.0)", // Fully transparent
            "--sidebar-foreground": "#ffffff",
            "--sidebar-primary": "#18181b", // Zinc 950 (Neutral)
            "--sidebar-primary-foreground": "#ffffff",
            "--sidebar-accent": "rgba(255, 255, 255, 0.05)",
            "--sidebar-accent-foreground": "#ffffff",
            "--sidebar-border": "rgba(255,255,255,0.0)",
            "--sidebar-ring": "#d4d4d8", // Zinc 300
            "--sidebar-width-icon": "4rem",
          } as React.CSSProperties
        }
        {...props}>
        {/* Enhanced Liquid Glass background layer matching ChatInput */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-2xl -z-10" />

        <SidebarHeader className="p-4 gap-4">
          <div className="flex items-center justify-between px-1">
            {/* Menu Trigger (Sidebar Toggle) */}
            <SidebarTrigger className="text-white/70 hover:text-white hover:bg-white/10" />

            {/* Search Trigger */}
            <button
              onClick={() => setOpen(true)}
              className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-md transition-colors group-data-[collapsible=icon]:hidden">
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="px-1 group-data-[collapsible=icon]:px-0">
            <button
              onClick={onNewChat}
              className="w-full flex items-center gap-3 px-3 py-2 text-white/90 hover:text-white bg-transparent hover:bg-white/5 rounded-lg transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
              <IconEdit className="w-6 h-6" />
              <span className="font-medium group-data-[collapsible=icon]:hidden">
                New chat
              </span>
            </button>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2 scrollbar-none">
          {/* My Stuff Section */}
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="px-2 text-white/50 font-normal">
              My Stuff
            </SidebarGroupLabel>
            <NavMain items={navMainData} />
          </SidebarGroup>

          {/* Divider if needed, or just relying on spacing */}
          <div className="h-4" />

          {/* Recent Chats Section */}
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
