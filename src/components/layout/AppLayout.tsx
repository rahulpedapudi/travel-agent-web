import React, { type ReactNode } from "react";
import { AppSidebar } from "@/components/sidebar-01/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChatProvider, useChatContext } from "@/contexts/ChatContext";

interface AppLayoutProps {
  children: ReactNode;
}

// Inner layout component that uses chat context
const AppLayoutInner: React.FC<AppLayoutProps> = ({ children }) => {
  const {
    chats,
    currentChatId,
    isLoadingChats,
    startNewChat,
    switchToChat,
    deleteChat,
  } = useChatContext();

  return (
    <SidebarProvider>
      <AppSidebar
        onNewChat={startNewChat}
        chats={chats}
        currentChatId={currentChatId}
        isLoadingChats={isLoadingChats}
        onChatSelect={switchToChat}
        onChatDelete={deleteChat}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 md:hidden">
          <SidebarTrigger className="-ml-2" />
          <span className="font-semibold">Traverse</span>
        </header>
        <div className="flex flex-1 flex-col h-[calc(100vh-4rem)] md:h-screen overflow-hidden">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

// Outer layout that provides ChatContext
export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <ChatProvider>
      <AppLayoutInner>{children}</AppLayoutInner>
    </ChatProvider>
  );
};
