import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const slides = [
    {
        id: 1,
        title: "Traverse AI",
        subtitle: "Redefining Exploration",
        description: "Your intelligent companion for crafting journeys that matter. \nExperience the world with new eyes.",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Curated Excellence",
        subtitle: "Designed for You",
        description: "Every itinerary is a bespoke masterpiece, \nwoven from your dreams and our intelligence.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop", // Fixed URL
    },
    {
        id: 3,
        title: "Limitless Discovery",
        subtitle: "Beyond the Guidebooks",
        description: "Unearth hidden gems and local secrets. \nGo where the ordinary traveler never sees.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2146&auto=format&fit=crop",
    }
];

export const Onboarding = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const navigate = useNavigate();

    // Preload images
    useEffect(() => {
        slides.forEach((slide) => {
            const img = new Image();
            img.src = slide.image;
        });
    }, []);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        } else {
            finishOnboarding();
        }
    };

    const finishOnboarding = () => {
        setIsExiting(true);
        // Wait for the exit animation to complete before navigating
        setTimeout(() => {
            localStorage.setItem("onboarded", "true");
            navigate("/");
        }, 1000);
    };

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black text-white selection:bg-white/30">

            {/* Background Layer */}
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />
                    <div className="absolute inset-0 bg-black/20" />
                </motion.div>
            </AnimatePresence>

            {/* Main Content */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-32 items-center px-6 text-center max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="flex flex-col items-center gap-6"
                    >
                        {/* Subtitle */}
                        <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-medium tracking-[0.2em] uppercase text-white/90">
                            {slides[currentSlide].subtitle}
                        </span>

                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-white drop-shadow-2xl">
                            {slides[currentSlide].title}
                        </h1>

                        {/* Description - Fixed Max Width & Line Breaks */}
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light max-w-xl mx-auto drop-shadow-lg whitespace-pre-line">
                            {slides[currentSlide].description}
                        </p>

                        {/* Dots */}
                        <div className="flex gap-3 mt-6 mb-2">
                            {slides.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${index === currentSlide ? "w-8 bg-white" : "w-1.5 bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Button */}
                        <motion.button
                            onClick={nextSlide}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4 group px-10 py-4 bg-white text-black rounded-full font-bold text-sm tracking-widest uppercase hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300"
                        >
                            <span className="flex items-center gap-2">
                                {currentSlide === slides.length - 1 ? "Start Journey" : "Continue"}
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* White Flash Exit Transition */}
            <AnimatePresence>
                {isExiting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 z-50 bg-white" // Flash to white for "waking up" effect
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
