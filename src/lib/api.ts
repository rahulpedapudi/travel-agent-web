import axios from "axios";
import type { UIComponent } from "@/types/ui";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const checkHealth = async () => {
  try {
    const response = await api.get("/health");
    return response.data;
  } catch (error) {
    console.error("Health check failed:", error);
    return { status: "unhealthy" };
  }
};

// Non-streaming version (fallback)
export const sendMessage = async (
  message: string,
  sessionId: string | null
) => {
  const response = await api.post("/chat", {
    message,
    session_id: sessionId,
  });
  return response.data;
};

// Streaming response types
export interface StreamTokenEvent {
  type: "token";
  text: string;
}

export interface StreamDoneEvent {
  type: "done";
  session_id: string;
  ui?: UIComponent;
}

export interface StreamErrorEvent {
  type: "error";
  message: string;
}

export type StreamEvent = StreamTokenEvent | StreamDoneEvent | StreamErrorEvent;

// Streaming chat function
export const streamChat = async (
  message: string,
  sessionId: string | null,
  onToken: (text: string) => void,
  onComplete: (data: StreamDoneEvent) => void,
  onError: (error: string) => void
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, session_id: sessionId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Process complete lines
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; // Keep incomplete line in buffer

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6)) as StreamEvent;

            if (data.type === "token") {
              onToken(data.text);
            } else if (data.type === "done") {
              onComplete(data);
            } else if (data.type === "error") {
              onError(data.message);
            }
          } catch (e) {
            console.error("Failed to parse SSE data:", line, e);
          }
        }
      }
    }
  } catch (error) {
    console.error("Stream error:", error);
    onError(error instanceof Error ? error.message : "Stream failed");
  }
};

export const clearSession = async (sessionId: string) => {
  await api.delete(`/session/${sessionId}`);
};

export default api;
