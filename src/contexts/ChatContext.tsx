import { createContext, useContext, type ReactNode } from "react";
import {
  useChat,
  type Message,
  type ThinkingState,
  type TaskItem,
} from "@/hooks/useChat";
import type { Chat } from "@/hooks/useChatHistory";

// Context type
interface ChatContextType {
  // Messages and state
  messages: Message[];
  isLoading: boolean;
  thinkingMessage: ThinkingState | null;
  tasks: TaskItem[];

  // Chat history
  chats: Chat[];
  currentChatId: string | null;
  isLoadingChats: boolean;
  isLoadingMessages: boolean;

  // Actions
  sendUserMessage: (content: string) => Promise<void>;
  startNewChat: () => Promise<void>;
  switchToChat: (chatId: string) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | null>(null);

// Provider component
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const chat = useChat();

  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
};

// Hook to use chat context
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
