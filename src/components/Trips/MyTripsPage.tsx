import { useState } from "react";
import { TripCard } from "./TripCard";
import { TripItineraryModal } from "./TripItineraryModal";
import { myTrips, suggestions, type Trip } from "./data";
import { motion } from "framer-motion";

export function MyTripsPage() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleTripClick = (trip: Trip) => {
    setSelectedTrip(trip);
    setModalOpen(true);
  };

  return (
    <div className="flex-1 bg-zinc-950 p-8 md:p-12 bg-linear-to-b from-zinc-950/90 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <h1 className="text-white/90 font-serif tracking-wider text-xl hidden md:block">
          Your Trips
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}>
              <TripCard trip={trip} onClick={handleTripClick} />
            </motion.div>
          ))}
        </div>

        {/* Suggestions Section */}
        <div className="space-y-6 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-linear-to-b from-teal-400 to-cyan-500 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
              Recommended For <span className="text-teal-400">You</span>
            </h2>
          </div>
          <p className="text-gray-400">
            Curated destinations based on your travel history.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestions.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className="group relative h-[250px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-teal-500/50 transition-all cursor-pointer"
                onClick={() => handleTripClick(item)}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs font-bold text-teal-400 bg-teal-500/10 px-2 py-1 rounded-full border border-teal-500/20">
                      {item.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Empty State / Footer hint */}
        <div className="text-center pt-12 pb-8 opacity-50">
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            Your journey is just beginning
          </p>
        </div>
      </div>

      <TripItineraryModal
        trip={selectedTrip}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
