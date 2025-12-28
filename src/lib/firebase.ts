// Firebase configuration and exports
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  type DocumentData,
  type QuerySnapshot,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "techsprint-482415.firebaseapp.com",
  projectId: "techsprint-482415",
  storageBucket: "techsprint-482415.firebasestorage.app",
  messagingSenderId: "1005251868180",
  appId: "1:1005251868180:web:21c5726f7fa7fc81fa1901",
  measurementId: "G-ZRMH8LPFCW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
if (typeof window !== "undefined") {
  getAnalytics(app);
}

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
export const db = getFirestore(app);

// Auth helper functions
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);
export const signUpWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);
export const signOut = () => firebaseSignOut(auth);

// Re-export types and utilities
export { onAuthStateChanged };
export type { User };

// Firestore exports
export {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
};
export type { DocumentData, QuerySnapshot };
