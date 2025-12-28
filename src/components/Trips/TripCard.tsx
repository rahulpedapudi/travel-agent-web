import type { Trip } from "./data";
import { cn } from "@/lib/utils";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface TripCardProps {
  trip: Trip;
  onClick: (trip: Trip) => void;
  className?: string;
}

export function TripCard({ trip, onClick, className }: TripCardProps) {
  return (
    <div
      onClick={() => onClick(trip)}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-3xl cursor-pointer",
        "h-[400px] w-full transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-2",
        className
      )}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={trip.imageUrl}
          alt={trip.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 space-y-3">
        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-2">
          {trip.status === "completed" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-teal-500/20 text-teal-300 border border-teal-500/30 backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed
            </span>
          )}
        </div>

        <h3 className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors font-serif tracking-tight">
          {trip.title}
        </h3>

        <div className="flex flex-col gap-1.5 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-400" />
            <span>{trip.destination}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-400" />
            <span>{trip.dateRange}</span>
          </div>
        </div>

        {/* Hidden Stats that appear on hover */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Duration
            </p>
            <p className="font-semibold text-white">{trip.stats.duration}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Visited
            </p>
            <p className="font-semibold text-white">
              {trip.stats.placesVisited} Places
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
