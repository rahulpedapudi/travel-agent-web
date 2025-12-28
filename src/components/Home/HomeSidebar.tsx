import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarRail,
} from "@/components/ui/sidebar";
import {
    IconCompass,
    IconPlaneDeparture,
} from "@tabler/icons-react";
import { Plus, Search } from "lucide-react";
import { NavMain } from "@/components/sidebar-01/nav-main";
import { NavRecentChats } from "@/components/sidebar-01/nav-recent-chats";
import { NavFooter } from "@/components/sidebar-01/nav-footer";
import { Button } from "@/components/ui/button";

// Mock Data (reusing similar structure)
const data = {
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
                { title: "Destinations", url: "#" },
                { title: "Trip Guides", url: "#" },
            ],
        },
        {
            id: "trips",
            title: "My Trips",
            url: "/trips",
            icon: IconPlaneDeparture,
        },
        {
            id: "popular",
            title: "Popular Destinations",
            url: "/popular",
            icon: IconCompass,
        },

    ],
    recentChats: [
        {
            id: "tokyo",
            title: "Tokyo Adventure 2024",
            url: "#",
            icon: IconPlaneDeparture,
        },
        {
            id: "paris",
            title: "Romantic Paris Getaway",
            url: "#",
            icon: IconPlaneDeparture,
        },
        {
            id: "bali",
            title: "Bali Yoga Retreat",
            url: "#",
            icon: IconPlaneDeparture,
        },
        {
            id: "nyc",
            title: "Weekend in NYC",
            url: "#",
            icon: IconPlaneDeparture,
        },
    ],
};

export function HomeSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar
            collapsible="icon"
            {...props}
            // FORCE background color and Update visual border to Cyan/Teal
            className="border-r border-cyan-500/30 bg-[#020617] text-white [&_[data-sidebar=sidebar]]:!bg-[#020617]"
            style={{
                "--sidebar-background": "#020617",
                "--sidebar-foreground": "#ffffff",
                "--sidebar-primary": "#0f172a",
                "--sidebar-primary-foreground": "#ffffff",
                "--sidebar-accent": "#1e293b",
                "--sidebar-accent-foreground": "#ffffff",
                "--sidebar-border": "rgba(6,182,212,0.3)", // Cyan border variable
                "--sidebar-ring": "#0d9488",
                "--sidebar-width-icon": "4rem", // Wider to fit larger icons
            } as React.CSSProperties}
        >
            <SidebarHeader className="p-4 gap-4">
                {/* Header moved to Home Page as requested */}

                <div className="flex flex-col gap-2 pt-2 group-data-[collapsible=icon]:hidden">
                    <Button
                        variant="ghost"
                        className="w-full justify-between rounded-lg font-normal text-slate-400 shadow-none border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white"
                    >
                        <div className="flex items-center gap-2">
                            <Search className="h-4 w-4" />
                            <span>Search chat</span>
                        </div>
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-slate-400 opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </Button>

                    <Button
                        variant="default" // Primary action
                        className="w-full justify-start rounded-lg shadow-sm bg-teal-600 hover:bg-teal-700 text-white font-medium"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Chat
                    </Button>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2">
                <NavMain items={data.navMain} />
                <NavRecentChats chats={data.recentChats} />
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-white/5">
                <NavFooter user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
