import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Trip } from "./data";

import { MapPin, Calendar, Clock, Map as MapIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapView } from "@/components/Chat/GenerativeUI/MapView";
import { getMockCoordinates } from "@/utils/destinationCoordinates";
import { useState } from "react";

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
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  if (!trip) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl p-0 bg-[#0B1121] border-white/10 text-white sm:rounded-3xl max-h-[90vh] flex flex-col [&>button]:hidden">
        <div className="overflow-y-auto custom-scrollbar h-full">
          <div className="relative h-[250px] w-full shrink-0">
            <img
              src={trip.imageUrl}
              alt={trip.title}
              className="w-full h-full object-cover opacity-60"
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

          <div className="grid lg:grid-cols-2 gap-8 p-8 h-full min-h-[500px]">
            {/* Left Column: Itinerary Timeline */}
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-teal-400" />
                Trip Itinerary
              </h3>
              
              <div className="relative border-l border-white/10 ml-3 space-y-8 pb-10">
                {trip.itinerary.length > 0 ? (
                  trip.itinerary.map((day, index) => {
                    const dayNumber = 'day' in day ? day.day : ('day_number' in day ? day.day_number : index + 1);
                    const dayTitle = 'title' in day ? day.title : ('theme' in day ? day.theme : `Day ${dayNumber}`);
                    
                    const activities: string[] = day.activities?.map((activity: string | { title?: string; place?: { name?: string }; time?: string }) => {
                      if (typeof activity === 'string') return activity;
                      return activity.title || activity.place?.name || 'Activity';
                    }) || [];

                    return (
                      <div 
                        key={index} 
                        className={`relative pl-8 transition-opacity duration-300 ${selectedDay === null || selectedDay === dayNumber ? 'opacity-100' : 'opacity-30'}`}
                      >
                        <div className={`absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-[#0B1121] transition-colors duration-300 ${selectedDay === null || selectedDay === dayNumber ? 'bg-teal-500' : 'bg-gray-700'}`} />

                        <div className="mb-1 cursor-pointer" onClick={() => setSelectedDay(selectedDay === dayNumber ? null : dayNumber)}>
                          <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${selectedDay === null || selectedDay === dayNumber ? 'text-teal-400' : 'text-gray-500'}`}>
                            Day {dayNumber}
                          </span>
                        </div>
                        <h4 className="text-lg font-medium text-white mb-3">
                          {dayTitle}
                        </h4>
                        <ul className="space-y-2">
                          {activities.map((activity, i) => (
                            <li
                              key={i}
                              className="text-gray-400 text-sm flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })
                ) : (
                  <div className="pl-8 text-gray-400 text-sm">
                    No itinerary details available yet.
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Map & Stats */}
            <div className="flex flex-col gap-6 sticky top-0">
               {/* Day Tabs */}
               <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDay(null)}
                    className={`rounded-full border text-xs h-8 px-4 ${selectedDay === null ? 'bg-teal-500/20 text-teal-300 border-teal-500/50' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'}`}
                  >
                    All Days
                  </Button>
                  {trip.itinerary.map((day, idx) => {
                     const dNum = 'day' in day ? day.day : ('day_number' in day ? day.day_number : idx + 1);
                     return (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDay(dNum)}
                        className={`rounded-full border text-xs h-8 px-4 whitespace-nowrap ${selectedDay === dNum ? 'bg-teal-500/20 text-teal-300 border-teal-500/50' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'}`}
                      >
                        Day {dNum}
                      </Button>
                     );
                  })}
               </div>

              {/* Map */}
              <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg relative">
                 <MapView 
                    center={getMockCoordinates(trip.destination, 0)}
                    zoom={11}
                    markers={
                      trip.itinerary.flatMap((day, dIdx) => {
                        const dNum = 'day' in day ? day.day : ('day_number' in day ? day.day_number : dIdx + 1);
                        
                        // Filter if day selected
                        // User wants "dimming other days". MapView doesn't support dimming prop natively yet (user reverted).
                        // So we will FILTER for now, OR show all but change type if I could.
                        // "when i click on a day, the locations should be marked in the map dimming other days"
                        // I'll simulate dimming by just showing the selected day's markers for clarity, 
                        // as "dimming" usually requires custom marker styling I can't easily add without the reverted changes.
                        // But wait, "show the locations... dimming other days" -> implies others are still there.
                        // I'll stick to filtering for cleaner UX given the constraints, or maybe use a 'default' color for others?
                        // Let's TRY to show all, but give 'gray' color to others.
                        // MapView uses types for color. 'rest' is gray.
                        
                        const isSelected = selectedDay === null || selectedDay === dNum;
                        const markerType = isSelected ? 'activity' : 'rest'; 

                        const acts = day.activities || [];
                        return acts.map((act, aIdx) => {
                           const title = typeof act === 'string' ? act : (act.title || 'Activity');
                           // Use mock coordinates seeded by destination + day + activity index
                           const coords = getMockCoordinates(trip.destination, (dNum * 10) + aIdx);
                           
                           return {
                             lat: coords.lat, 
                             lng: coords.lng,
                             title: title,
                             type: markerType, 
                             day: dNum,
                             description: `Day ${dNum}: ${title}`
                           };
                        });
                      })
                    }
                 />
                 
                 {/* Floating Overlay for Selected Day Info if needed */}
                 {selectedDay && (
                   <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-teal-400 font-bold shadow-xl pointer-events-none">
                     Showing Day {selectedDay}
                   </div>
                 )}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                      <Clock className="w-5 h-5 text-blue-400 mb-2" />
                      <div className="text-xs text-gray-500">Duration</div>
                      <div className="font-semibold text-white">{trip.stats.duration}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                      <MapPin className="w-5 h-5 text-purple-400 mb-2" />
                      <div className="text-xs text-gray-500">Places</div>
                      <div className="font-semibold text-white">{trip.stats.placesVisited}</div>
                  </div>
                   <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                      <MapIcon className="w-5 h-5 text-green-400 mb-2" />
                      <div className="text-xs text-gray-500">Distance</div>
                      <div className="font-semibold text-white">{trip.stats.distance}</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
