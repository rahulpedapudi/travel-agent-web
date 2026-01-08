import axios from "axios";
import type { UIComponent } from "@/types/ui";

const API_BASE_URL = import.meta.env.VITE_PRODUCTION_URL;

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

// Create a new chat session
export const createSession = async (
  authToken: string
): Promise<{ session_id: string; message: string }> => {
  const response = await fetch(`${API_BASE_URL}/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to create session: ${response.status}`);
  }

  return response.json();
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

export interface StreamThinkingEvent {
  type: "thinking";
  message: string;
  tool?: string;
}

// Task tracking types
export interface PlanTask {
  id: string;
  label: string;
  status: "pending" | "in_progress" | "completed";
}

export interface StreamPlanEvent {
  type: "plan";
  tasks: PlanTask[];
}

export interface StreamTaskStartEvent {
  type: "task_start";
  taskId: string;
  label?: string;
}

export interface StreamTaskCompleteEvent {
  type: "task_complete";
  taskId: string;
}

export interface StreamDoneEvent {
  type: "done";
  session_id: string;
  chat_title?: string; // Backend-generated title after first message
  ui?: UIComponent;
  // Text content can come from various fields
  response?: string;
  user_preferences_introduction?: string;
}

export interface StreamErrorEvent {
  type: "error";
  message: string;
}

export type StreamEvent =
  | StreamTokenEvent
  | StreamThinkingEvent
  | StreamPlanEvent
  | StreamTaskStartEvent
  | StreamTaskCompleteEvent
  | StreamDoneEvent
  | StreamErrorEvent;

// Streaming chat function
export const streamChat = async (
  message: string,
  authToken: string | null,
  sessionId: string | null,
  onToken: (text: string) => void,
  onThinking: (message: string, tool?: string) => void,
  onComplete: (data: StreamDoneEvent) => void,
  onError: (error: string) => void,
  onPlan?: (tasks: PlanTask[]) => void,
  onTaskStart?: (taskId: string, label?: string) => void,
  onTaskComplete?: (taskId: string) => void
): Promise<void> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add auth token if available
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    // Build request body
    const body: { message: string; session_id?: string } = { message };
    if (sessionId) {
      body.session_id = sessionId;
    }

    const response = await fetch(`${API_BASE_URL}/chat/stream`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
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
            console.log("[API] SSE Event:", data);

            if (data.type === "token") {
              onToken(data.text);
            } else if (data.type === "thinking") {
              onThinking(data.message, data.tool);
            } else if (data.type === "plan" && onPlan) {
              onPlan(data.tasks);
            } else if (data.type === "task_start" && onTaskStart) {
              onTaskStart(data.taskId, data.label);
            } else if (data.type === "task_complete" && onTaskComplete) {
              onTaskComplete(data.taskId);
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
