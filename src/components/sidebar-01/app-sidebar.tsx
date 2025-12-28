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
  CommandSeparator,
} from "@/components/ui/command";

const data: SidebarData = {
  user: {
    name: "Traveler",
    email: "traveler@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
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
  ],
  recentChats: [
    {
      id: "tokyo-trip",
      title: "Tokyo Adventure 2024",
      url: "#",
      icon: IconPlaneDeparture,
    },
    {
      id: "paris-honeymoon",
      title: "Romantic Paris Getaway",
      url: "#",
      icon: IconPlaneDeparture,
    },
    {
      id: "bali-retreat",
      title: "Bali Yoga Retreat",
      url: "#",
      icon: IconPlaneDeparture,
    },
    {
      id: "nyc-weekend",
      title: "Weekend in NYC",
      url: "#",
      icon: IconPlaneDeparture,
    },
  ],
};

export function AppSidebar({
  onNewChat,
  ...props
}: React.ComponentProps<typeof Sidebar> & { onNewChat?: () => void }) {
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
          <NavMain items={data.navMain} />
          <NavRecentChats chats={data.recentChats} />
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
            {data.recentChats.map((chat) => (
              <CommandItem
                key={chat.id}
                onSelect={() => {
                  setOpen(false);
                  // Implementation for navigating to chat would go here
                }}>
                <IconPlaneDeparture className="mr-2 h-4 w-4 opacity-70" />
                <span>{chat.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigation">
            {data.navMain.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => {
                  setOpen(false);
                }}>
                {item.icon && <item.icon className="mr-2 h-4 w-4 opacity-70" />}
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
