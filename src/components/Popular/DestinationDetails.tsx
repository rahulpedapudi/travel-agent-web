import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Calendar, Banknote, Coins } from "lucide-react";
import { DESTINATIONS } from "@/data/destinations";

export const DestinationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const destination = DESTINATIONS.find((d) => d.id === Number(id));

    if (!destination) {
        return <div className="text-white p-10">Destination not found</div>;
    }

    return (
        <div className="relative w-full h-full bg-zinc-950 overflow-y-auto pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-cover bg-center bg-zinc-900"
                    style={{ backgroundImage: `url(${destination.image})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                </motion.div>

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 p-3 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-all z-20 group border border-white/10"
                >
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">{destination.flag}</span>
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium tracking-wider uppercase border border-white/10">
                                {destination.country}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif text-white font-medium mb-2 text-shadow-lg tracking-tight">
                            {destination.name}
                        </h1>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 space-y-12">

                {/* Travel Essentials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex flex-col gap-2 relative overflow-hidden group">
                        <div className="absolute right-[-10px] top-[-10px] bg-teal-500/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-colors" />
                        <div className="flex items-center gap-2 text-teal-400 mb-1">
                            <Banknote size={20} />
                            <span className="text-sm font-semibold uppercase tracking-wider">Daily Budget</span>
                        </div>
                        <p className="text-2xl font-medium text-white">{destination.budget || "N/A"}</p>
                        <p className="text-sm text-zinc-400">Estimated cost per person</p>
                    </div>

                    <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex flex-col gap-2 relative overflow-hidden group">
                        <div className="absolute right-[-10px] top-[-10px] bg-purple-500/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors" />
                        <div className="flex items-center gap-2 text-purple-400 mb-1">
                            <Calendar size={20} />
                            <span className="text-sm font-semibold uppercase tracking-wider">Best Time</span>
                        </div>
                        <p className="text-2xl font-medium text-white">{destination.bestTimeToVisit || "Year Round"}</p>
                        <p className="text-sm text-zinc-400">For optimal weather</p>
                    </div>

                    <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex flex-col gap-2 relative overflow-hidden group">
                        <div className="absolute right-[-10px] top-[-10px] bg-amber-500/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors" />
                        <div className="flex items-center gap-2 text-amber-400 mb-1">
                            <Coins size={20} />
                            <span className="text-sm font-semibold uppercase tracking-wider">Currency</span>
                        </div>
                        <p className="text-2xl font-medium text-white">{destination.currency || "Local"}</p>
                        <p className="text-sm text-zinc-400">Local currency used</p>
                    </div>
                </div>

                {/* About Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-3xl font-serif text-white">About {destination.name}</h2>
                        <p className="text-lg text-zinc-300 leading-relaxed font-light">
                            {destination.longDescription || destination.description}
                        </p>
                        <p className="text-zinc-400 leading-relaxed">
                            {destination.description}
                        </p>
                    </div>

                    {/* Quick Actions / Map Placeholder */}
                    <div className="bg-zinc-900 rounded-3xl border border-white/5 p-6 h-full min-h-[200px] flex items-center justify-center relative overflow-hidden">
                        {/* Placeholder for map - could be an image or real map */}
                        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/0,0,1,0/400x400')] bg-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-500" />
                        <div className="relative z-10 text-center">
                            <button className="px-6 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:scale-105 transition-transform">
                                View on Map
                            </button>
                        </div>
                    </div>
                </div>

                {/* Suggestions / Attractions */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-serif text-white">Suggested Experiences</h2>
                        <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium">
                            View All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {destination.attractions?.map((attraction, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/5 shadow-2xl"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${attraction.image})` }}
                                >
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-2 py-1 bg-white/10 backdrop-blur-md rounded-md text-xs font-medium text-white border border-white/10">
                                            {attraction.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <Star size={12} fill="currentColor" />
                                            <span className="text-xs font-bold">{attraction.rating}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-teal-400 transition-colors">
                                        {attraction.name}
                                    </h3>
                                    <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
                                        Check out the reviews from {attraction.reviews} travelers who loved this spot.
                                    </p>
                                    <div className="flex items-center text-teal-400 text-sm font-medium gap-1 group/btn">
                                        Explore Details <ArrowLeft className="rotate-180 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
