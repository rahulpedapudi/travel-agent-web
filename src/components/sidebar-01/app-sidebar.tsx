import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
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
import { Button } from "@/components/ui/button";
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

  const handleChatDelete = (chatId: string) => {
    onChatDelete?.(chatId);
  };

  return (
    <>
      <Sidebar {...props}>
        <SidebarHeader className="p-4 gap-4">
          <div className="flex items-center space-x-2 text-primary px-1">
            <span className="font-serif text-lg tracking-tight text-foreground">
              Traverse
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full justify-between rounded-lg font-normal text-muted-foreground shadow-none border-input bg-background hover:bg-accent hover:text-accent-foreground"
              onClick={() => setOpen(true)}>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span>Search chat</span>
              </div>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start rounded-lg shadow-none border-input bg-background hover:bg-accent hover:text-accent-foreground font-medium"
              onClick={onNewChat}>
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <NavMain items={navMainData} />
          <NavRecentChats
            chats={chats}
            currentChatId={currentChatId}
            isLoading={isLoadingChats}
            onChatSelect={handleChatSelect}
            onChatDelete={handleChatDelete}
          />
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-sidebar-border">
          <NavFooter />
        </SidebarFooter>
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
