import { useEffect, useRef } from "react";
import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";

export const ChatContainer = () => {
  const { messages, isLoading, sendUserMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="h-full w-full relative overflow-hidden">
      {/* Messages Area - Scrollable, leaving room for input */}
      <main className="absolute inset-0 bottom-20 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-full px-4 space-y-12 py-8">
              {/* Hero Section */}
              <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="font-serif text-5xl md:text-6xl font-medium tracking-tight bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent pb-2">
                  Welcome to Traverse
                </h1>
                <p className="text-xl text-muted-foreground font-light">
                  Your personalized travel planning assistant.
                </p>
              </div>

              {/* Quick Actions Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                <QuickActionCard
                  icon=""
                  title="Where to next?"
                  description="Show me the cheapest flights to London next week."
                  onClick={() =>
                    sendUserMessage("Show me cheapest flights to London")
                  }
                />
                <QuickActionCard
                  icon=""
                  title="Planned Trips"
                  description="Check status of my upcoming trip to Paris."
                  onClick={() => sendUserMessage("Check my Paris trip status")}
                />
                <QuickActionCard
                  icon=""
                  title="Ask about travel"
                  description="What are the visa requirements for Japan?"
                  onClick={() => sendUserMessage("Visa requirements for Japan")}
                />
              </div>
            </div>
          ) : (
            <div className="p-4 md:p-8 space-y-6 max-w-3xl mx-auto w-full">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  onSendMessage={sendUserMessage}
                />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input Area - Fixed at very bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center bg-background z-1">
        <div className="w-full max-w-3xl">
          <ChatInput onSend={sendUserMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

const QuickActionCard = ({
  icon,
  title,
  description,
  onClick,
}: {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex flex-col items-start p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-md transition-all text-left group h-full">
    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <span className="text-xl">{icon}</span>
    </div>
    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
      {title}
    </h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
      {description}
    </p>
  </button>
);
