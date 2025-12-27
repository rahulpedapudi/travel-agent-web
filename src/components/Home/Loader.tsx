
import { Html, useProgress } from "@react-three/drei";

export const Loader = () => {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="text-teal-300 font-mono text-sm tracking-wider animate-pulse">
                    INITIALIZING SYSTEM... {progress.toFixed(0)}%
                </div>
                <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-teal-500 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </Html>
    );
};
