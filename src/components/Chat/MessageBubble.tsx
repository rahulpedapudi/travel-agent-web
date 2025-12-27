import React from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { Message } from "@/hooks/useChat";
import { UI_COMPONENTS, isValidUIComponent } from "./GenerativeUI";

interface MessageBubbleProps {
  message: Message;
  onSendMessage?: (message: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onSendMessage,
}) => {
  const isUser = message.role === "user";

  // Get the UI component if present
  const UIComponent =
    message.ui && isValidUIComponent(message.ui.type)
      ? UI_COMPONENTS[message.ui.type]
      : null;

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl p-4 shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-bl-none"
        )}>
        <div
          className={cn(
            "prose prose-sm dark:prose-invert max-w-none",
            isUser && "text-primary-foreground"
          )}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ReactMarkdown>{message.content}</ReactMarkdown>
          )}
        </div>

        {/* Render dynamic UI component if present and not already handled */}
        {UIComponent && message.ui && !message.uiHandled && onSendMessage && (
          <UIComponent {...message.ui.props} onSubmit={onSendMessage} />
        )}

        <div
          className={cn(
            "text-xs mt-2 opacity-70",
            isUser ? "text-primary-foreground/80" : "text-gray-400"
          )}>
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};
