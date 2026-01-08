import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DESTINATIONS } from "@/data/destinations";

const DestinationCard = ({
  dest,
  index,
}: {
  dest: (typeof DESTINATIONS)[0];
  index: number;
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => navigate(`/explore/${dest.id}`)}
      className="group relative h-full w-full overflow-hidden rounded-[32px] cursor-pointer"
    >
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
            {/* @ts-ignore */}
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
