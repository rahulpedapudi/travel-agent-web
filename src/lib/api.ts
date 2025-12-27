import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

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

export const clearSession = async (sessionId: string) => {
  await api.delete(`/session/${sessionId}`);
};

export default api;
