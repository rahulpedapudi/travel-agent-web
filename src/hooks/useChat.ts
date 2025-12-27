import { useState, useEffect, useCallback, useRef } from "react";
import { streamChat, clearSession, type StreamDoneEvent } from "@/lib/api";
import { v4 as uuidv4 } from "uuid";
import type { UIComponent } from "@/types/ui";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  ui?: UIComponent;
  uiHandled?: boolean; // True if user has already responded to this UI
  isStreaming?: boolean; // True while content is being streamed
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

    // Create an empty assistant message for streaming
    const assistantMessageId = addMessage("assistant", "", undefined, true);
    streamingMessageIdRef.current = assistantMessageId;

    let accumulatedContent = "";

    try {
      await streamChat(
        content,
        sessionId,
        // onToken - append token to the streaming message
        (text: string) => {
          accumulatedContent += text;
          updateStreamingMessage(assistantMessageId, accumulatedContent);
        },
        // onComplete - finalize the message with UI component
        (data: StreamDoneEvent) => {
          // Update session ID if different
          if (data.session_id && data.session_id !== sessionId) {
            setSessionId(data.session_id);
            localStorage.setItem("chat_session_id", data.session_id);
          }
          finalizeStreamingMessage(assistantMessageId, data.ui);
          setIsLoading(false);
          streamingMessageIdRef.current = null;
        },
        // onError - show error message
        (errorMessage: string) => {
          updateStreamingMessage(
            assistantMessageId,
            `Sorry, I'm having trouble connecting to the server: ${errorMessage}`
          );
          finalizeStreamingMessage(assistantMessageId);
          setIsLoading(false);
          streamingMessageIdRef.current = null;
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
    sessionId,
    sendUserMessage,
    resetChat,
  };
};
