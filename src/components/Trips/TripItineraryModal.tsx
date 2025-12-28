import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Trip } from "./data";

import { MapPin, Calendar, Clock, Map as MapIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TripItineraryModalProps {
  trip: Trip | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TripItineraryModal({
  trip,
  open,
  onOpenChange,
}: TripItineraryModalProps) {
  if (!trip) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-[#0B1121] border-white/10 text-white sm:rounded-3xl max-h-[90vh] flex flex-col [&>button]:hidden">
        <div className="overflow-y-auto custom-scrollbar">
          <div className="relative h-[300px] w-full shrink-0">
            <img
              src={trip.imageUrl}
              alt={trip.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0B1121] via-[#0B1121]/50 to-transparent" />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-md">
              <X className="w-5 h-5" />
            </Button>

            <div className="absolute bottom-6 left-8 right-8">
              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold backdrop-blur-md uppercase tracking-wider mb-3 inline-block">
                {trip.status} Trip
              </span>
              <DialogTitle className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
                {trip.title}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  {trip.destination}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-400" />
                  {trip.dateRange}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr,300px] gap-8 p-8">
            {/* Itinerary Timeline */}
            <div className="h-full flex flex-col">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-teal-400" />
                Trip Itinerary
              </h3>
              {/* Removed ScrollArea, letting parent scroll */}
              <div className="relative border-l border-white/10 ml-3 space-y-8 pb-10">
                {trip.itinerary.map((day, index) => (
                  <div key={index} className="relative pl-8">
                    {/* Timeline Dot */}
                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-teal-500 ring-4 ring-[#0B1121]" />

                    <div className="mb-1">
                      <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                        Day {day.day}
                      </span>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-3">
                      {day.title}
                    </h4>
                    <ul className="space-y-2">
                      {day.activities.map((activity, i) => (
                        <li
                          key={i}
                          className="text-gray-400 text-sm flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
                  Trip Stats
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-semibold text-white">
                        {trip.stats.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Places Visited</p>
                      <p className="font-semibold text-white">
                        {trip.stats.placesVisited} Spots
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                      <MapIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Distance</p>
                      <p className="font-semibold text-white">
                        {trip.stats.distance}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-linear-to-br from-teal-900/20 to-teal-800/20 border border-teal-500/20">
                <p className="text-sm text-teal-200/80 italic">
                  "This was an unforgettable journey through the heart of{" "}
                  {trip.destination.split(",")[0]}. Can't wait to go back!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
