import { useState } from "react";
import { TripCard } from "./TripCard";
import { TripItineraryModal } from "./TripItineraryModal";
import { myTrips, suggestions, type Trip } from "./data";
import { motion } from "framer-motion";
import { useTrips } from "@/hooks/useTrips";
import { Loader2, Calendar } from "lucide-react";
import { getDestinationImage } from "@/utils/destinationImages";

export function MyTripsPage() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { trips: realTrips, loading } = useTrips();

  // Combine real trips (Firestore) with mock trips (Legacy)
  // We map real trips to match the Trip interface exactly if needed, 
  // though we updated the mapping logic in the render.

  const allTrips = [
    ...realTrips.map(t => {
      const itinerary = t.itineraryData || [];
      const numDays = itinerary.length;
      // Count total activities across all days
      const totalActivities = itinerary.reduce((acc: number, day: { activities?: unknown[] }) => {
        return acc + (day.activities?.length || 0);
      }, 0);
      
      return {
        id: t.id,
        title: t.title,
        destination: t.destination,
        dateRange: `${t.startDate} - ${t.endDate}`,
        // Use destination image utility as fallback for older trips with generic images
        imageUrl: t.imageUrl && !t.imageUrl.includes('photo-1469854523086') 
          ? t.imageUrl 
          : getDestinationImage(t.destination),
        status: t.status,
        itinerary: itinerary,
        stats: { 
          duration: numDays > 0 ? `${numDays} Day${numDays > 1 ? 's' : ''}` : "N/A", 
          placesVisited: totalActivities,
          distance: "—" // We don't have distance data from AI
        },
      };
    }),
    ...myTrips
  ];

  const handleTripClick = (trip: any) => {
    // Map Firestore trip to UI Trip logic is now handled in the array creation roughly,
    // but specific click handling might need normalization if the object shapes differ slightly.
    // Since we merged them, 'trip' should be consistent enough for basic display.

    // If it's a real trip (has itineraryData), ensure we pass that.
    const uiTrip: Trip = {
      id: trip.id,
      title: trip.title,
      destination: trip.destination || trip.location, // Fallback
      dateRange: trip.dateRange || trip.dates, // Fallback
      imageUrl: trip.imageUrl,
      status: trip.status || "upcoming",
      itinerary: trip.itinerary || trip.itineraryData || [],
      stats: trip.stats || {
        duration: "N/A",
        placesVisited: 0,
        distance: "N/A"
      }
    };
    setSelectedTrip(uiTrip);
    setModalOpen(true);
  };

  return (
    <div className="flex-1 bg-zinc-950 p-8 md:p-12 bg-linear-to-b from-zinc-950/90 to-transparent backdrop-blur-sm min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-white/90 font-serif tracking-wider text-xl hidden md:block">
            Your Trips
          </h1>
          <span className="text-xs font-mono text-zinc-500">{allTrips.length} TRIPS SAVED</span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <Loader2 className="w-8 h-8 animate-spin text-teal-500 mb-4" />
            <p className="text-xs uppercase tracking-widest text-zinc-400">Syncing with cloud...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && allTrips.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 border border-white/5 bg-white/5 rounded-3xl">
            <Calendar className="w-12 h-12 text-zinc-600 mb-6 stroke-1" />
            <h3 className="text-xl text-white font-serif mb-2">No trips yet</h3>
            <p className="text-zinc-400 text-sm max-w-sm text-center">Start a chat with our AI agent to plan your first dream vacation.</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}>
              <TripCard
                trip={{
                  id: trip.id,
                  title: trip.title,
                  destination: trip.destination,
                  dateRange: trip.dateRange,
                  imageUrl: trip.imageUrl,
                  status: (trip.status as any),
                  itinerary: trip.itinerary,
                  stats: trip.stats
                }}
                onClick={() => handleTripClick(trip)}
              />
            </motion.div>
          ))}
        </div>

        {/* Suggestions Section */}
        <div className="space-y-6 pt-12 border-t border-white/10">
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
                onClick={() => {
                  // Create dummy ui trip for suggestion
                  const uiTrip: Trip = { ...item, status: "suggested" };
                  setSelectedTrip(uiTrip);
                  setModalOpen(true);
                }}>
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
      </div>

      <TripItineraryModal
        trip={selectedTrip}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
