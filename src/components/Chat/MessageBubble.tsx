import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { Message } from "@/hooks/useChat";
import { UI_COMPONENTS, isValidUIComponent } from "./GenerativeUI";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
  onSendMessage?: (message: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onSendMessage,
}) => {
  const isUser = message.role === "user";
  const [showFullMessage, setShowFullMessage] = useState(false);

  // Get the UI component if present
  const UIComponent =
    message.ui && isValidUIComponent(message.ui.type)
      ? UI_COMPONENTS[message.ui.type]
      : null;

  // Check if this is a display-only component that should hide message bubble
  const isItineraryCard = message.ui?.type === "itinerary_card";

  // For itinerary cards, render only the card without the bubble wrapper
  if (isItineraryCard && UIComponent && message.ui) {
    return (
      <div className="flex flex-col w-full mb-4">
        {/* Collapsible full message */}
        {message.content && (
          <div className="mb-4 px-1">
            <button
              onClick={() => setShowFullMessage(!showFullMessage)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              {showFullMessage ? (
                <>
                  <ChevronUp className="w-3 h-3" />
                  Hide full message
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3" />
                  Show full message
                </>
              )}
            </button>
            {showFullMessage && (
              <div className="mt-2 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
        {/* Itinerary cards */}
        <div className="w-full">
          <UIComponent
            {...message.ui.props}
            onSubmit={onSendMessage || (() => {})}
          />
        </div>
      </div>
    );
  }

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

        {/* Render dynamic UI component if present */}
        {UIComponent &&
          message.ui &&
          (() => {
            // Display-only components (like itinerary_card) should always render
            const isDisplayOnly = message.ui.type === "itinerary_card";

            // Interactive components should not render if already handled
            if (!isDisplayOnly && message.uiHandled) {
              return null;
            }

            // For interactive components, require onSendMessage
            if (!isDisplayOnly && !onSendMessage) {
              return null;
            }

            return (
              <UIComponent
                {...message.ui.props}
                onSubmit={onSendMessage || (() => {})}
              />
            );
          })()}

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
