import { useState, useEffect, useCallback } from "react";
import { sendMessage, clearSession } from "@/lib/api";
import { v4 as uuidv4 } from "uuid";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const storedSessionId = localStorage.getItem("chat_session_id");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
      localStorage.setItem("chat_session_id", newSessionId);
    }

    // Load persisted messages if any (optional, for now just session ID)
    const storedMessages = localStorage.getItem("chat_messages");
    if (storedMessages) {
      try {
        const parsed = JSON.parse(storedMessages);
        setMessages(
          parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }))
        );
      } catch (e) {
        console.error("Failed to parse messages", e);
      }
    }
  }, []);

  useEffect(() => {
    // Persist messages whenever they change
    if (messages.length > 0) {
      localStorage.setItem("chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  const addMessage = useCallback(
    (role: "user" | "assistant", content: string) => {
      const newMessage: Message = {
        id: uuidv4(),
        role,
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
    },
    []
  );

  const sendUserMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    addMessage("user", content);
    setIsLoading(true);

    try {
      const response = await sendMessage(content, sessionId);

      // Update session ID if returned (though usually it's stable)
      if (response.session_id && response.session_id !== sessionId) {
        setSessionId(response.session_id);
        localStorage.setItem("chat_session_id", response.session_id);
      }

      addMessage("assistant", response.response);
    } catch (error) {
      console.error("Failed to send message:", error);
      addMessage(
        "assistant",
        "Sorry, I'm having trouble connecting to the server. Please try again."
      );
    } finally {
      setIsLoading(false);
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
