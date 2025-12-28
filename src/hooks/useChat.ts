import { useState, useEffect, useCallback, useRef } from "react";
import {
  streamChat,
  clearSession,
  type StreamDoneEvent,
  type PlanTask,
} from "@/lib/api";
import { v4 as uuidv4 } from "uuid";
import type { UIComponent } from "@/types/ui";
import { auth } from "@/lib/firebase";

// Re-export PlanTask for consumers
export type { PlanTask };

// Local task state with computed status
export interface TaskItem extends PlanTask {
  // status is inherited: "pending" | "in_progress" | "completed"
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  ui?: UIComponent;
  uiHandled?: boolean; // True if user has already responded to this UI
  isStreaming?: boolean; // True while content is being streamed
}

export interface ThinkingState {
  message: string;
  tool?: string;
}

// Normalize UI component data from backend
// Handles: ui_component vs ui, string arrays vs object arrays
const normalizeUIComponent = (raw: any): UIComponent | undefined => {
  console.log("[normalizeUIComponent] Raw input:", raw);

  if (!raw || !raw.type) {
    console.log(
      "[normalizeUIComponent] Invalid raw input, returning undefined"
    );
    return undefined;
  }

  const normalized = { ...raw };

  // Normalize preference_chips options from string[] to object[]
  if (raw.type === "preference_chips" && raw.props?.options) {
    const options = raw.props.options;
    if (
      Array.isArray(options) &&
      options.length > 0 &&
      typeof options[0] === "string"
    ) {
      normalized.props = {
        ...raw.props,
        options: options.map((label: string, index: number) => ({
          id: `option_${index}`,
          label,
          selected: false,
        })),
      };
    }
  }

  // Normalize companion_selector options from string[] to object[]
  if (raw.type === "companion_selector" && raw.props?.options) {
    const options = raw.props.options;
    if (
      Array.isArray(options) &&
      options.length > 0 &&
      typeof options[0] === "string"
    ) {
      const iconMap: Record<string, string> = {
        Solo: "👤",
        Couple: "💑",
        Family: "👨‍👩‍👧",
        Friends: "👥",
      };
      normalized.props = {
        ...raw.props,
        options: options.map((label: string, index: number) => ({
          id: `option_${index}`,
          label,
          icon: iconMap[label] || "👤",
        })),
      };
    }
  }

  console.log("[normalizeUIComponent] Normalized output:", normalized);
  return normalized as UIComponent;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingMessage, setThinkingMessage] = useState<ThinkingState | null>(
    null
  );
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const streamingMessageIdRef = useRef<string | null>(null);

  useEffect(() => {
    const storedSessionId = localStorage.getItem("chat_session_id");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
      localStorage.setItem("chat_session_id", newSessionId);
    }

    // Load persisted messages if any
    const storedMessages = localStorage.getItem("chat_messages");
    if (storedMessages) {
      try {
        const parsed = JSON.parse(storedMessages);
        setMessages(
          parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
            isStreaming: false, // Ensure no streaming state on reload
          }))
        );
      } catch (e) {
        console.error("Failed to parse messages", e);
      }
    }
  }, []);

  useEffect(() => {
    // Persist messages whenever they change (but not during streaming)
    if (messages.length > 0 && !messages.some((m) => m.isStreaming)) {
      localStorage.setItem("chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Mark all pending UI components as handled when user sends a new message
  const markUIAsHandled = useCallback(() => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.role === "assistant" && msg.ui && !msg.uiHandled
          ? { ...msg, uiHandled: true }
          : msg
      )
    );
  }, []);

  // Add a new message
  const addMessage = useCallback(
    (
      role: "user" | "assistant",
      content: string,
      ui?: UIComponent,
      isStreaming = false
    ) => {
      const messageId = uuidv4();
      const newMessage: Message = {
        id: messageId,
        role,
        content,
        timestamp: new Date(),
        ui,
        uiHandled: false,
        isStreaming,
      };
      setMessages((prev) => [...prev, newMessage]);
      return messageId;
    },
    []
  );

  // Update a streaming message with new content
  const updateStreamingMessage = useCallback(
    (messageId: string, newContent: string) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, content: newContent } : msg
        )
      );
    },
    []
  );

  // Finalize a streaming message
  const finalizeStreamingMessage = useCallback(
    (messageId: string, ui?: UIComponent) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, isStreaming: false, ui } : msg
        )
      );
    },
    []
  );

  const sendUserMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Mark previous UI components as handled before adding user message
    markUIAsHandled();

    addMessage("user", content);
    setIsLoading(true);
    setThinkingMessage(null);

    // Create an empty assistant message for streaming
    const assistantMessageId = addMessage("assistant", "", undefined, true);
    streamingMessageIdRef.current = assistantMessageId;

    let accumulatedContent = "";

    try {
      // Get Firebase ID token for authentication
      const currentUser = auth.currentUser;
      const authToken = currentUser ? await currentUser.getIdToken() : null;

      await streamChat(
        content,
        authToken,
        // onToken - append token to the streaming message
        (text: string) => {
          setThinkingMessage(null); // Clear thinking when tokens start
          accumulatedContent += text;
          updateStreamingMessage(assistantMessageId, accumulatedContent);
        },
        // onThinking - show what the agent is doing
        (message: string, tool?: string) => {
          setThinkingMessage({ message, tool });
        },
        // onComplete - finalize the message with UI component
        (data: StreamDoneEvent) => {
          setThinkingMessage(null);
          // Update session ID if different
          if (data.session_id && data.session_id !== sessionId) {
            setSessionId(data.session_id);
            localStorage.setItem("chat_session_id", data.session_id);
          }

          let finalText = "";
          // Normalize UI from done event
          let uiComponent = data.ui ? normalizeUIComponent(data.ui) : undefined;

          // Check if accumulated content is JSON (backend might send full response as tokens)
          if (accumulatedContent.trim().startsWith("{")) {
            try {
              const parsed = JSON.parse(accumulatedContent);
              // Extract text content from various possible fields
              finalText =
                parsed.user_preferences_introduction ||
                parsed.response ||
                parsed.message ||
                "";
              // Extract UI component - check both 'ui' and 'ui_component' fields
              const rawUi = parsed.ui || parsed.ui_component;
              if (rawUi && !uiComponent) {
                uiComponent = normalizeUIComponent(rawUi);
              }
            } catch {
              // Not valid JSON, use as-is
              finalText = accumulatedContent;
            }
          } else {
            // Regular text content
            finalText =
              accumulatedContent ||
              data.user_preferences_introduction ||
              data.response ||
              "";
          }

          // Update message with extracted text
          if (finalText) {
            updateStreamingMessage(assistantMessageId, finalText);
          }

          finalizeStreamingMessage(assistantMessageId, uiComponent);
          setIsLoading(false);
          setTasks([]); // Clear tasks when complete
          streamingMessageIdRef.current = null;
        },
        // onError - show error message
        (errorMessage: string) => {
          setThinkingMessage(null);
          setTasks([]); // Clear tasks on error
          updateStreamingMessage(
            assistantMessageId,
            `Sorry, I'm having trouble connecting to the server: ${errorMessage}`
          );
          finalizeStreamingMessage(assistantMessageId);
          setIsLoading(false);
          streamingMessageIdRef.current = null;
        },
        // onPlan - initialize task list
        (newTasks) => {
          setTasks(
            newTasks.map((t) => ({ ...t, status: t.status || "pending" }))
          );
        },
        // onTaskStart - mark task as in progress
        (taskId) => {
          setTasks((prev) =>
            prev.map((t) =>
              t.id === taskId ? { ...t, status: "in_progress" as const } : t
            )
          );
        },
        // onTaskComplete - mark task as completed
        (taskId) => {
          setTasks((prev) =>
            prev.map((t) =>
              t.id === taskId ? { ...t, status: "completed" as const } : t
            )
          );
        }
      );
    } catch (error) {
      console.error("Failed to send message:", error);
      updateStreamingMessage(
        assistantMessageId,
        "Sorry, I'm having trouble connecting to the server. Please try again."
      );
      finalizeStreamingMessage(assistantMessageId);
      setIsLoading(false);
      streamingMessageIdRef.current = null;
    }
  };

  const resetChat = async () => {
    if (sessionId) {
      try {
        await clearSession(sessionId);
      } catch (error) {
        console.error("Failed to clear backend session:", error);
      }
    }
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    localStorage.setItem("chat_session_id", newSessionId);
    setMessages([]);
    localStorage.removeItem("chat_messages");
  };

  return {
    messages,
    isLoading,
    thinkingMessage,
    tasks,
    sessionId,
    sendUserMessage,
    resetChat,
  };
};
