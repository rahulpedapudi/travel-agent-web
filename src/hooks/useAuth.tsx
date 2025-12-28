import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import {
  auth,
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  signOut,
  onAuthStateChanged,
  type User,
} from "@/lib/firebase";

// Auth state interface
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Auth context interface
interface AuthContextType extends AuthState {
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState({
        user,
        loading: false,
        error: null,
      });
    });

    return () => unsubscribe();
  }, []);

  // Sign in with Google
  const handleGoogleSignIn = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, error: null }));
      await signInWithGoogle();
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setAuthState((prev) => ({
        ...prev,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // Sign in with Email/Password
  const handleEmailSignIn = useCallback(
    async (email: string, password: string) => {
      try {
        setAuthState((prev) => ({ ...prev, error: null }));
        await signInWithEmail(email, password);
      } catch (error: any) {
        const errorMessage = getFirebaseErrorMessage(error.code);
        setAuthState((prev) => ({ ...prev, error: errorMessage }));
        throw error;
      }
    },
    []
  );

  // Sign up with Email/Password
  const handleEmailSignUp = useCallback(
    async (email: string, password: string) => {
      try {
        setAuthState((prev) => ({ ...prev, error: null }));
        await signUpWithEmail(email, password);
      } catch (error: any) {
        const errorMessage = getFirebaseErrorMessage(error.code);
        setAuthState((prev) => ({ ...prev, error: errorMessage }));
        throw error;
      }
    },
    []
  );

  // Logout
  const handleLogout = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to sign out",
      }));
      throw error;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setAuthState((prev) => ({ ...prev, error: null }));
  }, []);

  const value: AuthContextType = {
    ...authState,
    signInWithGoogle: handleGoogleSignIn,
    signInWithEmail: handleEmailSignIn,
    signUpWithEmail: handleEmailSignUp,
    logout: handleLogout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Helper function to get user-friendly error messages
const getFirebaseErrorMessage = (code: string): string => {
  switch (code) {
    // Email/Password errors
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled. Please contact support.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/user-not-found":
      return "No account found with this email. Please sign up first.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/invalid-credential":
      return "Invalid email or password. Please check and try again.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please wait a few minutes and try again.";

    // Google sign-in errors
    case "auth/popup-closed-by-user":
      return "Sign-in cancelled. Please try again.";
    case "auth/popup-blocked":
      return "Pop-up blocked by browser. Please allow pop-ups and try again.";
    case "auth/cancelled-popup-request":
      return "Sign-in cancelled. Please try again.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using a different sign-in method.";

    // Network errors
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    case "auth/timeout":
      return "Request timed out. Please try again.";

    // Session errors
    case "auth/requires-recent-login":
      return "Please sign in again to continue.";
    case "auth/user-token-expired":
      return "Your session has expired. Please sign in again.";

    // Default
    default:
      console.error("Unhandled Firebase auth error:", code);
      return "An error occurred. Please try again.";
  }
};
