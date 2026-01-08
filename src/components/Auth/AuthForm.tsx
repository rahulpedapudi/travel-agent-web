import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const {
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    error,
    clearError,
  } = useAuth();

  const handleGoogleAuth = async () => {
    try {
      setIsSubmitting(true);
      clearError();
      await signInWithGoogle();
      navigate("/onboarding");
    } catch (error) {
      // Error is handled by useAuth
      console.error("Google sign in failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setIsSubmitting(true);
      clearError();

      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      navigate("/onboarding");
    } catch (error) {
      // Error is handled by useAuth
      console.error("Email auth failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Switch between login and signup
  const handleTabSwitch = (loginMode: boolean) => {
    setIsLogin(loginMode);
    clearError();
  };

  return (
    <div className="flex flex-col h-full justify-center px-6 md:px-16 w-full max-w-lg mx-auto py-6 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="font-serif text-3xl md:text-4xl mb-1.5 text-gray-900 tracking-tight">
          Traverse AI
        </h1>
        <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">
          Explore More. Experience Life.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-full p-1 mb-5 relative mx-auto w-full max-w-xs h-10 shadow-inner">
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-md transition-all duration-300 ease-out ${!isLogin ? "left-1" : "left-[calc(50%+2px)]"
            }`}
        />
        <button
          onClick={() => handleTabSwitch(false)}
          className={`flex-1 relative z-10 text-sm font-semibold transition-colors duration-200 ${!isLogin ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}>
          Sign Up
        </button>
        <button
          onClick={() => handleTabSwitch(true)}
          className={`flex-1 relative z-10 text-sm font-semibold transition-colors duration-200 ${isLogin ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}>
          Log In
        </button>
      </div>

      <div className="mb-4 text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-0.5">
          {isLogin ? "Welcome Back" : "Start your Journey"}
        </h2>
        <p className="text-xs text-gray-500">
          {isLogin
            ? "Enter your details to access your account"
            : "Create your account to start planning trips"}
        </p>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4">
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Login */}
      <div className="mb-4">
        <SocialButton
          icon={<GoogleIcon />}
          text="Continue with Google"
          onClick={handleGoogleAuth}
          disabled={isSubmitting}
        />
      </div>

      <div className="relative flex items-center justify-center mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <span className="relative z-10 bg-white px-3 text-[10px] font-medium text-gray-400">
          OR CONTINUE WITH
        </span>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleEmailAuth} className="space-y-3">
        <AnimatePresence mode="wait">
          {!isLogin && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-all outline-none text-sm text-black font-medium shadow-sm hover:bg-white"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700 ml-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full p-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-all outline-none text-sm font-medium text-gray-900 shadow-sm hover:bg-white"
          />
        </div>

        <div className="space-y-1 relative">
          <label className="text-xs font-semibold text-gray-700 ml-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              minLength={6}
              className="w-full p-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-all outline-none text-sm font-medium text-gray-900 shadow-sm hover:bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end items-center text-xs pt-1 px-1">
          {/* <label className="flex items-center gap-2 cursor-pointer group select-none">
            <div className="w-4 h-4 rounded border-2 border-gray-300 flex items-center justify-center transition-all group-hover:border-gray-400 peer-checked:bg-black peer-checked:border-black shadow-sm">
              <Check
                size={12}
                className="text-white opacity-0 group-[.checked]:opacity-100 stroke-3"
              />
            </div>
            <input type="checkbox" className="hidden" />
            <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
              Remember me
            </span>
          </label> */}
          <button
            type="button"
            className="text-gray-900 font-semibold hover:underline">
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-900 text-white p-3 rounded-xl font-semibold text-sm hover:bg-black transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg hover:shadow-xl flex justify-center items-center gap-2 group mt-2 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100">
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isLogin ? (
            "Log In"
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

const SocialButton = ({
  icon,
  text,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex items-center justify-center gap-3 w-full p-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all font-semibold text-gray-700 text-sm shadow-sm disabled:opacity-70 disabled:cursor-not-allowed">
    {icon}
    {text && <span>{text}</span>}
  </button>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);
