import { useRef } from "react";
import authBg from "@/assets/auth-bg.png";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

export const AuthVisual = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();

        // Calculate normalized position (-0.5 to 0.5)
        const normalizedX = (clientX - left) / width - 0.5;
        const normalizedY = (clientY - top) / height - 0.5;

        x.set(normalizedX);
        y.set(normalizedY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Smooth springs for movement
    const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
    const moveX = useSpring(useTransform(x, [-0.5, 0.5], [15, -15]), springConfig);
    const moveY = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);

    // Floating animation for overlay card
    const cardMoveX = useSpring(useTransform(x, [-0.5, 0.5], [30, -30]), springConfig);
    const cardMoveY = useSpring(useTransform(y, [-0.5, 0.5], [30, -30]), springConfig);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-full overflow-hidden bg-teal-900 perspective-1000"
        >
            {/* Background Image with Parallax */}
            <motion.div
                className="absolute inset-[-5%] bg-cover bg-center origin-center"
                style={{
                    backgroundImage: `url(${authBg})`,
                    x: moveX,
                    y: moveY,
                    scale: 1.1, // Slight scale to prevent inconsistent edges during movement
                }}
            >
                <div className="absolute inset-0 bg-black/10" />
            </motion.div>

            {/* Bottom Text - Kept as requested (or implied to keep "Escaping Ordinary") */}
            <div className="absolute bottom-12 left-12 right-12 flex justify-end items-end z-20 pointer-events-none">
                <motion.div
                    style={{ x: cardMoveX, y: cardMoveY }}
                    className="flex flex-col text-right text-white drop-shadow-xl"
                >
                    <h4 className="text-4xl font-bold tracking-tight">Escape the Ordinary,</h4>
                    <h4 className="text-4xl font-bold mb-4">Embrace the Journey.</h4>

                    <div className="self-end px-8 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-base tracking-wide font-medium">
                        Experience the world your way
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
