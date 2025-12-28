import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, MapPin, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DESTINATIONS = [
    {
        id: 1,
        name: "Cappadocia",
        country: "Turkey",
        flag: "🇹🇷",
        image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070&auto=format&fit=crop",
        hotels: "1,991",
        packages: "42",
        description: "Drift over fairy chimneys and honeycomb hills in a hot air balloon at sunrise.",
    },
    {
        id: 2,
        name: "Bali",
        country: "Indonesia",
        flag: "🇮🇩",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop",
        hotels: "1,345",
        packages: "24",
        description: "Discover tropical beaches, volcanic mountains, and lush rice paddies in paradise.",
    },
    {
        id: 3,
        name: "Dubai",
        country: "UAE",
        flag: "🇦🇪",
        // New Reliable Dubai Image (Dubai Marina at Night)
        image: "https://images.pexels.com/photos/3680912/pexels-photo-3680912.jpeg?cs=srgb&dl=pexels-abbas-mohammed-1990079-3680912.jpg&fm=jpg",
        hotels: "2,345",
        packages: "54",
        description: "Experience the ultimate in modern luxury, shopping, and lively nightlife.",
    },
    {
        id: 4,
        name: "Agra",
        country: "India",
        flag: "🇮🇳",
        // Taj Mahal
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop",
        hotels: "890",
        packages: "18",
        description: "Witness the timeless beauty of the Taj Mahal, a symbol of eternal love.",
    },
    {
        id: 5,
        name: "Paris",
        country: "France",
        flag: "🇫🇷",
        // Eiffel Tower
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2146&auto=format&fit=crop",
        hotels: "3,100",
        packages: "65",
        description: "Walk the romantic streets of the City of Light and marvel at the Eiffel Tower.",
    },
    {
        id: 6,
        name: "Ha Long Bay",
        country: "Vietnam",
        flag: "🇻🇳",
        image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=1935&auto=format&fit=crop",
        hotels: "2,178",
        packages: "32",
        description: "Navigate through emerald waters and thousands of towering limestone islands.",
    },
    {
        id: 7,
        name: "Kyoto",
        country: "Japan",
        flag: "🇯🇵",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
        hotels: "1,560",
        packages: "29",
        description: "Immerse yourself in classical Buddhist temples, gardens, and imperial palaces.",
    },
    {
        id: 8,
        name: "New York",
        country: "USA",
        flag: "🇺🇸",
        // Times Square
        image: "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?cs=srgb&dl=pexels-mikel-1239162.jpg&fm=jpg",
        hotels: "4,200",
        packages: "72",
        description: "Feel the energy of the concrete jungle where dreams are made of.",
    },
];

const DestinationSection = ({ dest }: { dest: typeof DESTINATIONS[0] }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });

    return (
        <section
            ref={ref}
            className="relative w-full h-full snap-start shrink-0 overflow-hidden"
        >
            {/* Background Image with Parallax-ish Scale Effect */}
            <motion.div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${dest.image})` }}
                initial={{ scale: 1.2 }}
                animate={isInView ? { scale: 1 } : { scale: 1.2 }}
                transition={{ duration: 10, ease: "easeOut" }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/90" />
            <div className="absolute inset-0 z-10 bg-black/20" /> {/* General dim */}

            {/* Content Container */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-20 pb-24 md:pb-32">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl md:text-4xl">{dest.flag}</span>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm font-medium uppercase tracking-widest text-white/90">
                                <MapPin className="w-3 h-3 md:w-4 md:h-4 text-teal-400" />
                                {dest.country}
                            </div>
                        </div>

                        <h2 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
                            {dest.name}
                        </h2>

                        <p className="text-lg md:text-2xl text-white/90 max-w-2xl font-light leading-relaxed mb-8 drop-shadow-md">
                            {dest.description}
                        </p>

                        <div className="flex flex-wrap gap-6 items-center text-sm md:text-base text-white/70 mb-8 font-mono">
                            <span className="flex items-center gap-2">
                                <span className="text-teal-400 font-bold">{dest.hotels}</span> Hotels
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                            <span className="flex items-center gap-2">
                                <span className="text-teal-400 font-bold">{dest.packages}</span> Packages
                            </span>
                        </div>

                        <Button className="h-12 px-8 text-base bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-lg shadow-teal-900/50 rounded-full transition-transform hover:scale-105 active:scale-95">
                            Explore {dest.name}
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Hint */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-white/50 flex flex-col items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <ChevronDown className="w-6 h-6" />
            </motion.div>
        </section>
    );
};

export const PopularDestinations = () => {
    return (
        <div className="relative h-screen w-full bg-slate-950 overflow-hidden">

            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8 flex items-center justify-between pointer-events-none">
                <Link to="/home" className="pointer-events-auto">
                    <Button variant="ghost" className="text-white hover:bg-white/10 gap-2 rounded-full pl-3 pr-5 h-10 border border-white/10 backdrop-blur-md bg-black/20">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-medium">Back</span>
                    </Button>
                </Link>

                <h1 className="text-white/80 font-serif tracking-wider text-lg mix-blend-difference hidden md:block">
                    Popular Destinations
                </h1>
            </div>

            {/* Vertical Scroll Snap Container */}
            <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
                <style>{`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>

                {DESTINATIONS.map((dest) => (
                    <DestinationSection key={dest.id} dest={dest} />
                ))}
            </div>
        </div>
    );
};
