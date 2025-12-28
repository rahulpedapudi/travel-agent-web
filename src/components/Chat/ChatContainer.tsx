import { useEffect, useRef } from "react";
import { useChatContext } from "@/contexts/ChatContext";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { TaskList } from "./TaskList";
import { Globe } from "../Home/Globe";

export const ChatContainer = () => {
  const { messages, isLoading, thinkingMessage, tasks, sendUserMessage } =
    useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, thinkingMessage, tasks]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Globe />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="h-full w-full relative overflow-hidden z-10">
        {/* Messages Area - Scrollable, leaving room for input */}
        <main className="absolute inset-0 bottom-20 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-4">
            {messages.length === 0 ? null : (
              <div className="p-4 md:p-8 space-y-6 max-w-3xl mx-auto w-full">
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    onSendMessage={sendUserMessage}
                  />
                ))}

                {/* Task List - shows agent's plan */}
                {tasks.length > 0 && <TaskList tasks={tasks} />}
                {thinkingMessage && (
                  <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-black/10 backdrop-blur-2xl border border-white/5 rounded-2xl rounded-bl-none p-4 shadow-sm max-w-[80%]">
                      <div className="flex items-center gap-3">
                        <div className="flex space-x-1">
                          <span
                            className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {thinkingMessage.message}
                          {thinkingMessage.tool && (
                            <span className="ml-1 text-xs opacity-60">
                              ({thinkingMessage.tool})
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </main>

        {/* Input Area - Fade gradient background for better readability/transition */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 flex justify-center z-10 pointer-events-none">
          <div className="w-full max-w-3xl pointer-events-auto">
            <ChatInput onSend={sendUserMessage} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};
