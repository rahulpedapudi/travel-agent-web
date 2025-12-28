import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const DESTINATIONS = [
  {
    id: 1,
    name: "Cappadocia",
    country: "Turkey",
    flag: "🇹🇷",
    image:
      "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070&auto=format&fit=crop",
    hotels: "1,991",
    description:
      "Drift over fairy chimneys and honeycomb hills in a hot air balloon at sunrise.",
    popular: false,
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    flag: "🇮🇩",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop",
    hotels: "1,345",
    description:
      "Discover tropical beaches, volcanic mountains, and lush rice paddies in paradise.",
    popular: true,
  },
  {
    id: 3,
    name: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    // New Reliable Dubai Image (Dubai Marina at Night)
    image:
      "https://images.pexels.com/photos/3680912/pexels-photo-3680912.jpeg?cs=srgb&dl=pexels-abbas-mohammed-1990079-3680912.jpg&fm=jpg",
    hotels: "2,345",
    description:
      "Experience the ultimate in modern luxury, shopping, and lively nightlife.",
    popular: true,
  },
  {
    id: 4,
    name: "Agra",
    country: "India",
    flag: "🇮🇳",
    // Taj Mahal
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop",
    hotels: "890",
    description:
      "Witness the timeless beauty of the Taj Mahal, a symbol of eternal love.",
  },
  {
    id: 5,
    name: "Paris",
    country: "France",
    flag: "🇫🇷",
    // Eiffel Tower
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2146&auto=format&fit=crop",
    hotels: "3,100",
    description:
      "Walk the romantic streets of the City of Light and marvel at the Eiffel Tower.",
    popular: true,
  },
  {
    id: 6,
    name: "Ha Long Bay",
    country: "Vietnam",
    flag: "🇻🇳",
    image:
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=1935&auto=format&fit=crop",
    hotels: "2,178",
    description:
      "Navigate through emerald waters and thousands of towering limestone islands.",
  },
  {
    id: 7,
    name: "Kyoto",
    country: "Japan",
    flag: "🇯🇵",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    hotels: "1,560",
    description:
      "Immerse yourself in classical Buddhist temples, gardens, and imperial palaces.",
  },
  {
    id: 8,
    name: "New York",
    country: "USA",
    flag: "🇺🇸",
    // Times Square
    image:
      "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?cs=srgb&dl=pexels-mikel-1239162.jpg&fm=jpg",
    hotels: "4,200",
    description:
      "Feel the energy of the concrete jungle where dreams are made of.",
    popular: true,
  },
];

const DestinationCard = ({
  dest,
  index,
}: {
  dest: (typeof DESTINATIONS)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full w-full overflow-hidden rounded-[32px] cursor-pointer">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${dest.image})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1 text-white">
        {/* Title */}
        <h3 className="font-serif text-3xl font-medium leading-tight text-white/90">
          {dest.name}
        </h3>

        {/* Subtitle/Location */}
        <div className="flex items-center gap-2 text-white/70 text-sm mt-1">
          <span>{dest.flag}</span>
          <span>{dest.country}</span>
        </div>

        {/* Bottom Meta Row */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-medium text-white/60">
            {/* @ts-ignore - TS inference might be tricky with mixed array */}
            {dest.popular ? (
              <>
                <MapPin className="w-3 h-3 text-teal-400" />
                <span className="text-teal-400/90 shadow-black/50 drop-shadow-sm">
                  Popular Choice
                </span>
              </>
            ) : (
              <>
                <MapPin className="w-3 h-3" />
                <span>Discover</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-white/90">
            <span className="font-semibold">{dest.hotels}</span> Hotels
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const PopularDestinations = () => {
  return (
    <div className="h-full w-full bg-zinc-950 p-4 md:p-4">
      {/* Header */}
      <div className="sticky top-0 z-50 p-6 md:p-8 flex items-center justify-between bg-linear-to-b from-zinc-950/90 to-transparent backdrop-blur-sm">
        <h1 className="text-white/90 font-serif tracking-wider text-xl hidden md:block">
          Explore Destinations
        </h1>
      </div>

      {/* Grid Container */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {DESTINATIONS.map((dest, index) => (
            <div key={dest.id} className="aspect-3/4">
              <DestinationCard dest={dest} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Background elements for depth */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-teal-500/10 rounded-full blur-[128px]" />
      </div>
    </div>
  );
};
