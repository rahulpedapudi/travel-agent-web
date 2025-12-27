import React, { type ReactNode } from "react";
import { AppSidebar } from "@/components/sidebar-01/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useChat } from "@/hooks/useChat";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { resetChat } = useChat();

  return (
    <SidebarProvider>
      <AppSidebar onNewChat={resetChat} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 md:hidden">
          <SidebarTrigger className="-ml-2" />
          <span className="font-semibold">TravelAgent</span>
        </header>
        <div className="flex flex-1 flex-col h-[calc(100vh-4rem)] md:h-screen overflow-hidden">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
