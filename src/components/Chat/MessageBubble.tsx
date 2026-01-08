import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { Message } from "@/hooks/useChat";
import { UI_COMPONENTS, isValidUIComponent } from "./GenerativeUI";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { UIComponent } from "@/types/ui";

interface MessageBubbleProps {
  message: Message;
  onSendMessage?: (message: string) => void;
}

// Display-only component types that should be rendered full-width
const DISPLAY_ONLY_TYPES = [
  "itinerary_card",
  "map_view",
  "route_view",
  "flight_card",
];

// Helper to strip hidden metadata from user messages
// Removes patterns like "[2026-01-14|2026-01-16]" from display
const stripHiddenMetadata = (content: string): string => {
  // Remove bracketed ISO dates pattern: [YYYY-MM-DD|YYYY-MM-DD]
  return content.replace(/\s*\[\d{4}-\d{2}-\d{2}\|\d{4}-\d{2}-\d{2}\]$/g, "").trim();
};

// Helper to render a single UI component
const renderUIComponent = (
  ui: UIComponent,
  onSendMessage: ((msg: string) => void) | undefined,
  isHandled: boolean,
  key?: number
) => {
  if (!isValidUIComponent(ui.type)) return null;
  const Component = UI_COMPONENTS[ui.type];
  const isDisplayOnly = DISPLAY_ONLY_TYPES.includes(ui.type);
  const isDisabled = !isDisplayOnly && isHandled;

  return (
    <div key={key} className="w-full">
      <Component
        {...ui.props}
        onSubmit={onSendMessage || (() => {})}
        disabled={isDisabled}
      />
    </div>
  );
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onSendMessage,
}) => {
  const isUser = message.role === "user";
  const [showFullMessage, setShowFullMessage] = useState(false);

  // Collect all UI components (from ui_components array or single ui)
  const uiComponents: UIComponent[] = [];
  if (message.ui_components && message.ui_components.length > 0) {
    uiComponents.push(...message.ui_components);
  } else if (message.ui) {
    uiComponents.push(message.ui);
  }

  // Check if any component is display-only
  const hasDisplayOnlyComponent = uiComponents.some((ui) =>
    DISPLAY_ONLY_TYPES.includes(ui.type)
  );

  // Don't render empty assistant messages (no content, no UI, not streaming)
  if (
    !isUser &&
    !message.content &&
    uiComponents.length === 0 &&
    !message.isStreaming
  ) {
    return null;
  }

  // For display-only components, render in full width mode
  if (hasDisplayOnlyComponent && uiComponents.length > 0) {
    return (
      <div className="flex flex-col w-full mb-4 gap-4">
        {/* Collapsible full message */}
        {message.content && (
          <div className="px-1">
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
              <div className="mt-2 p-3 bg-muted/30 rounded-lg text-sm text-foreground border border-border/40 prose prose-sm dark:prose-invert max-w-none break-all">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
        {/* Render all UI components */}
        {uiComponents.map((ui, index) =>
          renderUIComponent(ui, onSendMessage, !!message.uiHandled, index)
        )}
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
            ? "bg-primary text-primary-foreground rounded-br-none shadow-md"
            : "bg-black/10 backdrop-blur-2xl border border-white/5 shadow-sm rounded-bl-none"
        )}>
        <div
          className={cn(
            "prose prose-sm dark:prose-invert max-w-none",
            isUser && "text-primary-foreground"
          )}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{stripHiddenMetadata(message.content)}</p>
          ) : message.isStreaming && !message.content ? (
            // Show typing indicator inside bubble when streaming with no content
            <div className="flex space-x-1 py-1">
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          ) : (
            <ReactMarkdown>{message.content}</ReactMarkdown>
          )}
        </div>

        {/* Render inline UI components (non-display-only) */}
        {uiComponents.length > 0 &&
          uiComponents.map((ui, index) =>
            renderUIComponent(ui, onSendMessage, !!message.uiHandled, index)
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
