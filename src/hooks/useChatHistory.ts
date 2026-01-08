import { useState, useEffect, useCallback } from "react";
import {
  db,
  auth,
  collection,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "@/lib/firebase";
import { getDocs } from "firebase/firestore";

// Types
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  ui?: any; // UI component data
  ui_components?: any[]; // Array of UI components (for demo mode)
}

export interface Chat {
  id: string;
  sessionId: string;
  title: string;
  lastMessage: string;
  createdAt: Date;
  updatedAt: Date;
}

export const useChatHistory = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const userId = auth.currentUser?.uid;

  // Real-time listener for chat list
  useEffect(() => {
    if (!userId) {
      setChats([]);
      setIsLoadingChats(false);
      return;
    }

    setIsLoadingChats(true);
    const chatsRef = collection(db, "users", userId, "chats");
    const q = query(chatsRef, orderBy("updatedAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const chatList: Chat[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            sessionId: data.sessionId || doc.id,
            title: data.title || "New Chat",
            lastMessage: data.lastMessage || "",
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          };
        });
        setChats(chatList);
        setIsLoadingChats(false);
      },
      (error) => {
        console.error("Error loading chats:", error);
        setIsLoadingChats(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  // Create a new chat
  const createChat = useCallback(async (): Promise<string | null> => {
    if (!userId) return null;

    try {
      // Get auth token and create session on backend first
      const currentUser = auth.currentUser;
      if (!currentUser) return null;

      const authToken = await currentUser.getIdToken();

      // Import dynamically to avoid circular dependencies
      const { createSession } = await import("@/lib/api");
      const { session_id } = await createSession(authToken);

      // Create Firestore document with the backend session_id
      const chatsRef = collection(db, "users", userId, "chats");
      const docRef = await addDoc(chatsRef, {
        sessionId: session_id, // Use backend session ID
        title: "New Chat",
        lastMessage: "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setCurrentChatId(docRef.id);
      setCurrentMessages([]);
      return docRef.id;
    } catch (error) {
      console.error("Error creating chat:", error);
      return null;
    }
  }, [userId]);

  // Update chat session ID (after first backend response)
  const updateSessionId = useCallback(
    async (chatId: string, sessionId: string) => {
      if (!userId) return;

      try {
        const chatRef = doc(db, "users", userId, "chats", chatId);
        await setDoc(chatRef, { sessionId }, { merge: true });
      } catch (error) {
        console.error("Error updating session ID:", error);
      }
    },
    [userId]
  );

  // Update chat title (from backend)
  const updateChatTitle = useCallback(
    async (chatId: string, title: string) => {
      if (!userId || !title) return;

      try {
        const chatRef = doc(db, "users", userId, "chats", chatId);
        await setDoc(chatRef, { title }, { merge: true });
      } catch (error) {
        console.error("Error updating chat title:", error);
      }
    },
    [userId]
  );

  // Add a message to a chat
  const addMessage = useCallback(
    async (
      chatId: string,
      role: "user" | "assistant",
      content: string,
      ui?: any,
      ui_components?: any[]
    ) => {
      if (!userId || !chatId) return;

      try {
        const messagesRef = collection(
          db,
          "users",
          userId,
          "chats",
          chatId,
          "messages"
        );
        await addDoc(messagesRef, {
          role,
          content,
          ui: ui || null,
          ui_components: ui_components || null,
          timestamp: serverTimestamp(),
        });

        // Update chat's lastMessage and updatedAt
        const chatRef = doc(db, "users", userId, "chats", chatId);
        const preview =
          content.slice(0, 100) + (content.length > 100 ? "..." : "");
        await setDoc(
          chatRef,
          {
            lastMessage: preview,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (error) {
        console.error("Error adding message:", error);
      }
    },
    [userId]
  );

  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  // ... (existing useEffects)

  // Get session ID for current chat
  const getCurrentSessionId = useCallback(() => {
    if (currentChat?.sessionId) return currentChat.sessionId;
    if (!currentChatId) return null;
    const chatFromList = chats.find((c) => c.id === currentChatId);
    return chatFromList?.sessionId || null;
  }, [currentChat, currentChatId, chats]);

  // Load messages for a specific chat
  const loadChatMessages = useCallback(
    async (chatId: string) => {
      if (!userId || !chatId) return;

      setIsLoadingMessages(true);
      setCurrentChatId(chatId);

      try {
        // 1. Fetch chat document to get session ID and metadata
        const chatRef = doc(db, "users", userId, "chats", chatId);
        // Actually getDoc is better for single doc
        const chatDocSnap = await import("firebase/firestore").then((m) =>
          m.getDoc(chatRef)
        );

        if (chatDocSnap.exists()) {
          const data = chatDocSnap.data();
          setCurrentChat({
            id: chatDocSnap.id,
            sessionId: data.sessionId || chatDocSnap.id,
            title: data.title || "New Chat",
            lastMessage: data.lastMessage || "",
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          });
        }

        // 2. Fetch messages
        const messagesRef = collection(
          db,
          "users",
          userId,
          "chats",
          chatId,
          "messages"
        );
        const q = query(messagesRef, orderBy("timestamp", "asc"));
        const snapshot = await getDocs(q);

        const messages: ChatMessage[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            role: data.role,
            content: data.content,
            timestamp: data.timestamp?.toDate() || new Date(),
            ui: data.ui,
            ui_components: data.ui_components,
          };
        });

        setCurrentMessages(messages);
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [userId]
  );

  // Delete a chat
  const deleteChat = useCallback(
    async (chatId: string) => {
      if (!userId) return;

      try {
        // Delete all messages in the chat first
        const messagesRef = collection(
          db,
          "users",
          userId,
          "chats",
          chatId,
          "messages"
        );
        const snapshot = await getDocs(query(messagesRef));
        const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        // Delete the chat document
        const chatRef = doc(db, "users", userId, "chats", chatId);
        await deleteDoc(chatRef);

        // If this was the current chat, clear it
        if (currentChatId === chatId) {
          setCurrentChatId(null);
          setCurrentMessages([]);
        }
      } catch (error) {
        console.error("Error deleting chat:", error);
      }
    },
    [userId, currentChatId]
  );

  // Clear current chat state
  const clearCurrentChat = useCallback(() => {
    setCurrentChatId(null);
    setCurrentMessages([]);
    setCurrentChat(null);
  }, []);

  // Start a new chat (just clear state, don't create in DB yet)
  const startNewChat = useCallback(async () => {
    clearCurrentChat();
    return null;
  }, [clearCurrentChat]);

  return {
    // State
    chats,
    currentChatId,
    currentMessages,
    isLoadingChats,
    isLoadingMessages,

    // Actions
    createChat,
    updateSessionId,
    updateChatTitle,
    addMessage,
    loadChatMessages,
    deleteChat,
    startNewChat,
    clearCurrentChat,
    getCurrentSessionId,
    setCurrentChatId,
  };
};
