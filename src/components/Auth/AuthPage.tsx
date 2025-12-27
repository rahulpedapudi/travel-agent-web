import { AuthForm } from "./AuthForm";
import { AuthVisual } from "./AuthVisual";

export const AuthPage = () => {
    return (
        <div className="h-screen w-full bg-white flex overflow-hidden">
            {/* Left Side: Form */}
            <div className="w-full lg:w-1/2 z-10 bg-white h-full overflow-y-auto border-r border-gray-100">
                <AuthForm />
            </div>

            {/* Right Side: Visual */}
            <div className="w-full lg:w-1/2 relative hidden lg:block h-full">
                <AuthVisual />
            </div>
        </div>
    );
};
