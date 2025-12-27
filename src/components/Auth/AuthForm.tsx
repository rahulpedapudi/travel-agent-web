import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login for now - in real app would hit API
        // Just navigate to chat
        navigate("/");
        // Send a welcome message or clear context if needed
    };

    return (
        <div className="flex flex-col h-full justify-center px-8 md:px-20 w-full max-w-2xl mx-auto py-8 overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="font-serif text-4xl md:text-5xl mb-2 text-gray-900 tracking-tight">Traverse AI</h1>
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] font-medium">
                    Explore More. Experience Life.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-full p-1.5 mb-6 relative mx-auto w-full max-w-sm h-12 shadow-inner">
                <div
                    className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-md transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${!isLogin ? 'left-1.5' : 'left-[calc(50%+3px)]'}`}
                />
                <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 relative z-10 text-sm font-semibold transition-colors duration-200 ${!isLogin ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Sign Up
                </button>
                <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 relative z-10 text-sm font-semibold transition-colors duration-200 ${isLogin ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Log In
                </button>
            </div>

            <div className="mb-6 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {isLogin ? "Welcome Back" : "Start your Journey"}
                </h2>
                <p className="text-sm text-gray-500">
                    {isLogin ? "Enter your details to access your account" : "Create your account to start planning trips"}
                </p>
            </div>

            {/* Social Login */}
            <div className="mb-6">
                <SocialButton icon={<GoogleIcon />} text="Continue with Google" />
            </div>

            <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <span className="relative z-10 bg-white px-4 text-xs font-medium text-gray-400">OR CONTINUE WITH</span>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleAuth} className="space-y-4">
                <AnimatePresence mode="wait">
                    {!isLogin && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full p-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all outline-none text-base font-medium shadow-sm hover:bg-white"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Username</label>
                    <input
                        type="text"
                        placeholder="eli_trekker"
                        className="w-full p-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all outline-none text-base font-medium text-gray-900 shadow-sm hover:bg-white"
                    />
                </div>

                <div className="space-y-1.5 relative">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full p-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all outline-none text-base font-medium text-gray-900 shadow-sm hover:bg-white"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-1 px-1">
                    <label className="flex items-center gap-2 cursor-pointer group select-none">
                        <div className="w-4 h-4 rounded border-2 border-gray-300 flex items-center justify-center transition-all group-hover:border-gray-400 peer-checked:bg-black peer-checked:border-black shadow-sm">
                            <Check size={12} className="text-white opacity-0 group-[.checked]:opacity-100 stroke-[3]" />
                        </div>
                        <input type="checkbox" className="hidden" />
                        <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">Remember me</span>
                    </label>
                    <button type="button" className="text-gray-900 font-semibold hover:underline">
                        Forgot Password?
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-900 text-white p-4 rounded-2xl font-bold text-lg hover:bg-black transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl hover:shadow-2xl flex justify-center items-center gap-3 group mt-3 tracking-wide"
                >
                    {isLogin ? "Log In" : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

const SocialButton = ({ icon, text }: { icon: React.ReactNode; text?: string }) => (
    <button className="flex items-center justify-center gap-4 w-full p-4 rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all font-semibold text-gray-700 text-lg shadow-sm">
        {icon}
        {text && <span>{text}</span>}
    </button>
);

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);


