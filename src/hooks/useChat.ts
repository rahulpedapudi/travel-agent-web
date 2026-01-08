import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { streamChat, type StreamDoneEvent, type PlanTask } from "@/lib/api";
import { v4 as uuidv4 } from "uuid";
import type { UIComponent } from "@/types/ui";
import { auth } from "@/lib/firebase";
import { useChatHistory } from "./useChatHistory";
import {
  processDemoMessage,
  isInDemoConversation,
  getDemoState,
} from "@/lib/demoFlow";
import { detectDemoDestination } from "@/lib/mockData";

// Re-export PlanTask for consumers
export type { PlanTask };

// Task item interface for local state
export interface TaskItem extends PlanTask {
  status: "pending" | "in_progress" | "completed";
}

// Message interface
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  ui?: UIComponent;
  ui_components?: UIComponent[];
  isStreaming?: boolean;
  uiHandled?: boolean;
}

// Thinking state interface
export interface ThinkingState {
  message: string;
  tool?: string;
}

// Helper to normalize UI component options
const normalizeUIComponent = (component: any): UIComponent | undefined => {
  if (!component || typeof component !== "object") {
    return undefined;
  }

  const normalized = { ...component };

  // Handle both 'ui' and 'ui_component' naming
  if (component.ui_component) {
    Object.assign(normalized, component.ui_component);
    delete normalized.ui_component;
  }

  // Normalize preference_chips options from string array to object array
  if (
    normalized.type === "preference_chips" ||
    normalized.type === "companion_selector"
  ) {
    if (normalized.options && Array.isArray(normalized.options)) {
      normalized.options = normalized.options.map(
        (
          opt: string | { id: string; label: string; selected?: boolean },
          index: number
        ) => {
          if (typeof opt === "string") {
            return {
              id: `option_${index}`,
              label: opt,
              selected: false,
            };
          }
          return opt;
        }
      );
    }
  }

  return normalized as UIComponent;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingMessage, setThinkingMessage] = useState<ThinkingState | null>(
    null
  );
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const streamingMessageIdRef = useRef<string | null>(null);
  const isFirstMessageRef = useRef<boolean>(true);
  const isCreatingChatRef = useRef<boolean>(false);

  // Router hooks
  const navigate = useNavigate();
  const { chatId: urlChatId } = useParams<{ chatId: string }>();

  // Firestore chat history
  const chatHistory = useChatHistory();

  // Sync state with URL - but skip if we're currently streaming
  useEffect(() => {
    // Don't interfere with active streaming
    if (streamingMessageIdRef.current) return;

    if (urlChatId) {
      // If we were creating a chat and now have an ID, we're done
      if (isCreatingChatRef.current) {
        isCreatingChatRef.current = false;
      }

      // If URL has ID and it's different from current, load it
      if (urlChatId !== chatHistory.currentChatId) {
        chatHistory.loadChatMessages(urlChatId);
      }
    } else {
      // If URL is empty, ensure we're in "new chat" state
      // BUT, if we are in process of creating a chat (awaiting nav), don't clear state!
      if (chatHistory.currentChatId && !isCreatingChatRef.current) {
        chatHistory.clearCurrentChat();
      }
    }
  }, [urlChatId, chatHistory.currentChatId]);

  // Load messages when current chat changes (but not during streaming)
  useEffect(() => {
    // Don't overwrite messages while streaming
    if (streamingMessageIdRef.current) return;

    if (chatHistory.currentChatId && chatHistory.currentMessages.length > 0) {
      const loadedMessages: Message[] = chatHistory.currentMessages.map(
        (m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          timestamp: m.timestamp,
          ui: m.ui ? normalizeUIComponent(m.ui) : undefined,
          isStreaming: false,
          uiHandled: true, // Mark as handled since they're loaded from history
        })
      );
      setMessages(loadedMessages);
      isFirstMessageRef.current = false;
    } else if (!chatHistory.currentChatId) {
      setMessages([]);
      isFirstMessageRef.current = true;
    }
  }, [chatHistory.currentChatId, chatHistory.currentMessages]);

  // Add a message to state (for streaming)
  const addMessage = useCallback(
    (
      role: "user" | "assistant",
      content: string,
      ui?: UIComponent,
      isStreaming = false
    ): string => {
      const id = uuidv4();
      const newMessage: Message = {
        id,
        role,
        content,
        timestamp: new Date(),
        ui,
        isStreaming,
      };
      setMessages((prev) => [...prev, newMessage]);
      return id;
    },
    []
  );

  // Update a streaming message
  const updateStreamingMessage = useCallback(
    (messageId: string, content: string) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, content } : msg))
      );
    },
    []
  );

  // Finalize a streaming message
  const finalizeStreamingMessage = useCallback(
    (messageId: string, ui?: UIComponent, uiComponents?: UIComponent[]) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, isStreaming: false, ui, ui_components: uiComponents }
            : msg
        )
      );
    },
    []
  );

  // Mark UI components as handled
  const markUIAsHandled = useCallback(() => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.ui && !msg.uiHandled ? { ...msg, uiHandled: true } : msg
      )
    );
  }, []);

  // Send a user message
  const sendUserMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Mark previous UI components as handled
    markUIAsHandled();

    // Get or create chat
    let chatId = chatHistory.currentChatId;
    if (!chatId) {
      isCreatingChatRef.current = true;
      chatId = await chatHistory.createChat();
      if (!chatId) {
        console.error("Failed to create chat");
        isCreatingChatRef.current = false;
        return;
      }
      // Navigate to the new chat URL silently (replace to avoid back button issues if needed, or push)
      navigate(`/c/${chatId}`, { replace: true });
    }

    // Add user message to state
    addMessage("user", content);
    setIsLoading(true);
    setThinkingMessage(null);

    // Save user message to Firestore
    await chatHistory.addMessage(chatId, "user", content);

    // Create empty assistant message for streaming
    const assistantMessageId = addMessage("assistant", "", undefined, true);
    streamingMessageIdRef.current = assistantMessageId;

    const isFirstMessage = isFirstMessageRef.current;
    const isDemoMode = import.meta.env.VITE_DEMO_MODE === "true";

    // Check for demo mode - either explicitly enabled or destination detected
    const demoResponse = processDemoMessage(content);
    const shouldUseDemoMode =
      isDemoMode || demoResponse || isInDemoConversation();

    if (shouldUseDemoMode && (demoResponse || detectDemoDestination(content))) {
      const response = demoResponse || processDemoMessage(content);
      if (response) {
        // Show thinking steps with delays
        if (response.thinkingSteps) {
          for (const step of response.thinkingSteps) {
            setThinkingMessage({ message: step.message });
            await new Promise((resolve) => setTimeout(resolve, step.delay));
          }
        }
        setThinkingMessage(null);

        // Simulate realistic typing delay
        await new Promise((resolve) =>
          setTimeout(resolve, response.responseDelay)
        );

        // Check if this is the final itinerary response (has ui_components)
        const isItineraryResponse =
          response.ui_components && response.ui_components.length > 0;
        const charDelay = isItineraryResponse ? 25 : 15; // Slower for itinerary
        const chunkSize = isItineraryResponse ? 2 : 3; // Smaller chunks for itinerary

        // Simulate streaming the response text character by character
        const responseText = response.text;
        for (let i = 0; i < responseText.length; i += chunkSize) {
          const chunk = responseText.slice(0, i + chunkSize);
          updateStreamingMessage(assistantMessageId, chunk);
          await new Promise((resolve) => setTimeout(resolve, charDelay));
        }

        // Finalize text first
        updateStreamingMessage(assistantMessageId, responseText);

        // For itinerary responses, show components in stages
        if (isItineraryResponse && response.ui_components) {
          const allComponents = response.ui_components
            .map((c) => normalizeUIComponent(c))
            .filter(Boolean) as UIComponent[];

          // Find component indices
          const flightIdx = allComponents.findIndex(
            (c) => c.type === "flight_card"
          );
          const itineraryIdx = allComponents.findIndex(
            (c) => c.type === "itinerary_card"
          );
          const mapIdx = allComponents.findIndex((c) => c.type === "map_view");

          // Stage 1: Show flight card first
          if (flightIdx !== -1) {
            setThinkingMessage({ message: "Finding best flights for you..." });
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setThinkingMessage(null);

            finalizeStreamingMessage(
              assistantMessageId,
              response.ui ? normalizeUIComponent(response.ui) : undefined,
              [allComponents[flightIdx]]
            );

            // Wait before showing more
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }

          // Stage 2: Add itinerary card
          if (itineraryIdx !== -1) {
            setThinkingMessage({
              message: "Building your day-by-day itinerary...",
            });
            await new Promise((resolve) => setTimeout(resolve, 1800));
            setThinkingMessage(null);

            const componentsToShow =
              flightIdx !== -1
                ? [allComponents[flightIdx], allComponents[itineraryIdx]]
                : [allComponents[itineraryIdx]];

            finalizeStreamingMessage(
              assistantMessageId,
              response.ui ? normalizeUIComponent(response.ui) : undefined,
              componentsToShow
            );

            // Wait before showing map
            await new Promise((resolve) => setTimeout(resolve, 1500));
          }

          // Stage 3: Add map view
          if (mapIdx !== -1) {
            setThinkingMessage({ message: "Mapping your destinations..." });
            await new Promise((resolve) => setTimeout(resolve, 1200));
            setThinkingMessage(null);

            // Show all components
            finalizeStreamingMessage(
              assistantMessageId,
              response.ui ? normalizeUIComponent(response.ui) : undefined,
              allComponents
            );
          }
        } else {
          // Non-itinerary responses - show everything at once
          finalizeStreamingMessage(
            assistantMessageId,
            response.ui ? normalizeUIComponent(response.ui) : undefined,
            response.ui_components
              ?.map((c) => normalizeUIComponent(c))
              .filter(Boolean) as UIComponent[] | undefined
          );
        }

        // Save to Firestore
        if (chatId) {
          await chatHistory.addMessage(
            chatId,
            "assistant",
            responseText,
            response.ui ? normalizeUIComponent(response.ui) : undefined
          );
        }

        // Generate demo title on first message
        if (isFirstMessage && chatId) {
          const demoState = getDemoState();
          if (demoState.destination) {
            await chatHistory.updateChatTitle(
              chatId,
              `${demoState.destination.name} Trip Plan`
            );
            isFirstMessageRef.current = false;
          }
        }

        setIsLoading(false);
        streamingMessageIdRef.current = null;
        return; // Exit early, skip real API call
      }
    }

    try {
      // Get Firebase ID token for authentication
      const currentUser = auth.currentUser;
      const authToken = currentUser ? await currentUser.getIdToken() : null;

      // Get session ID for continuing conversations
      const sessionId = chatHistory.getCurrentSessionId();

      let accumulatedContent = "";

      await streamChat(
        content,
        authToken,
        sessionId,
        // onToken
        (text: string) => {
          setThinkingMessage(null);
          accumulatedContent += text;
          updateStreamingMessage(assistantMessageId, accumulatedContent);
        },
        // onThinking
        (message: string, tool?: string) => {
          setThinkingMessage({ message, tool });
        },
        // onComplete
        async (data: StreamDoneEvent) => {
          setThinkingMessage(null);

          let uiComponent: UIComponent | undefined;
          let uiComponents: UIComponent[] | undefined;
          let finalText = accumulatedContent;

          // Handle UI component from done event
          if (data.ui) {
            uiComponent = normalizeUIComponent(data.ui);
          }

          // Handle ui_components array from done event (demo mode)
          if (data.ui_components && Array.isArray(data.ui_components)) {
            uiComponents = data.ui_components
              .map((c: any) => normalizeUIComponent(c))
              .filter((c): c is UIComponent => c !== undefined);
          }

          // Check if accumulated content is JSON
          if (accumulatedContent.trim().startsWith("{")) {
            try {
              const parsed = JSON.parse(accumulatedContent);
              if (parsed.ui || parsed.ui_component) {
                uiComponent = normalizeUIComponent(parsed);
              }
              finalText =
                parsed.text ||
                parsed.message ||
                parsed.user_preferences_introduction ||
                parsed.response ||
                "";
            } catch {
              // Not JSON, use as-is
            }
          }

          // Fallback text from data
          if (!finalText && data) {
            finalText =
              data.user_preferences_introduction || data.response || "";
          }

          // Update message with final content
          if (finalText) {
            updateStreamingMessage(assistantMessageId, finalText);
          }

          finalizeStreamingMessage(
            assistantMessageId,
            uiComponent,
            uiComponents
          );
          setIsLoading(false);
          setTasks([]);
          streamingMessageIdRef.current = null;

          // Save assistant message to Firestore
          if (chatId) {
            await chatHistory.addMessage(
              chatId,
              "assistant",
              finalText || accumulatedContent,
              uiComponent
            );
          }

          // Update session ID from backend (for ADK continuity)
          if (data.session_id && chatId) {
            await chatHistory.updateSessionId(chatId, data.session_id);
          }

          // Update chat title from backend (after first message)
          if (isFirstMessage && data.chat_title && chatId) {
            await chatHistory.updateChatTitle(chatId, data.chat_title);
            isFirstMessageRef.current = false;
          }
        },
        // onError
        (errorMessage: string) => {
          setThinkingMessage(null);
          setTasks([]);
          updateStreamingMessage(
            assistantMessageId,
            `Sorry, I'm having trouble connecting to the server: ${errorMessage}`
          );
          finalizeStreamingMessage(assistantMessageId);
          setIsLoading(false);
          streamingMessageIdRef.current = null;
        },
        // onPlan
        (newTasks) => {
          setTasks(
            newTasks.map((t) => ({ ...t, status: t.status || "pending" }))
          );
        },
        // onTaskStart
        (taskId) => {
          setTasks((prev) =>
            prev.map((t) =>
              t.id === taskId ? { ...t, status: "in_progress" as const } : t
            )
          );
        },
        // onTaskComplete
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
        "Sorry, something went wrong. Please try again."
      );
      finalizeStreamingMessage(assistantMessageId);
      setIsLoading(false);
      streamingMessageIdRef.current = null;
    }
  };

  // Start a new chat
  const startNewChat = useCallback(async () => {
    setMessages([]);
    setTasks([]);
    setThinkingMessage(null);
    isFirstMessageRef.current = true;
    navigate("/");
  }, [navigate]);

  // Switch to an existing chat
  const switchToChat = useCallback(
    async (chatId: string) => {
      setMessages([]);
      setTasks([]);
      setThinkingMessage(null);
      navigate(`/c/${chatId}`);
    },
    [navigate]
  );

  return {
    // State
    messages,
    isLoading,
    thinkingMessage,
    tasks,

    // Chat history state
    chats: chatHistory.chats,
    currentChatId: chatHistory.currentChatId,
    isLoadingChats: chatHistory.isLoadingChats,
    isLoadingMessages: chatHistory.isLoadingMessages,

    // Actions
    sendUserMessage,
    startNewChat,
    switchToChat,
    deleteChat: chatHistory.deleteChat,
  };
};
