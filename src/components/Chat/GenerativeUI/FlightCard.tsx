"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FlightCardProps, Flight, FlightSegment } from "@/types/ui";
import { Plane, Clock, Users, Check, ChevronRight } from "lucide-react";

const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

interface FlightOptionProps {
  flight: Flight;
  isSelected: boolean;
  onSelect: () => void;
}

const FlightOption: React.FC<FlightOptionProps> = ({
  flight,
  isSelected,
  onSelect,
}) => {
  const segment: FlightSegment = flight.segments[0];

  return (
    <div
      className={cn(
        "group relative flex items-center justify-between gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200",
        "bg-white/5 hover:bg-white/10 border-2",
        isSelected
          ? "border-primary/60 bg-primary/10"
          : "border-transparent hover:border-white/10"
      )}
      onClick={onSelect}>
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Check className="w-3.5 h-3.5 text-white" />
        </div>
      )}

      {/* Airline Info */}
      <div className="flex items-center gap-3 min-w-[120px]">
        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
          <Plane className="w-5 h-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white text-sm">
            {segment.airline}
          </span>
          <span className="text-xs text-white/60">{segment.flight_number}</span>
        </div>
      </div>

      {/* Times & Route */}
      <div className="flex items-center gap-4 flex-1 justify-center">
        {/* Departure */}
        <div className="text-center">
          <div className="text-lg font-bold text-white">
            {segment.departure_time}
          </div>
          <div className="text-xs text-white/60">
            {segment.departure_airport}
          </div>
        </div>

        {/* Duration */}
        <div className="flex flex-col items-center gap-1 min-w-[100px]">
          <span className="text-xs text-white/50">{flight.total_duration}</span>
          <div className="relative w-full h-[2px] bg-gradient-to-r from-primary/40 via-primary to-emerald-500/40 rounded">
            <div className="absolute -top-1 left-0 w-2 h-2 bg-primary rounded-full" />
            <div className="absolute -top-1 right-0 w-2 h-2 bg-emerald-500 rounded-full" />
          </div>
          <span
            className={cn(
              "text-[10px] font-medium px-2 py-0.5 rounded-full",
              flight.stops === 0
                ? "text-emerald-400 bg-emerald-500/20"
                : "text-amber-400 bg-amber-500/20"
            )}>
            {flight.stops === 0
              ? "Direct"
              : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
          </span>
        </div>

        {/* Arrival */}
        <div className="text-center">
          <div className="text-lg font-bold text-white">
            {segment.arrival_time}
          </div>
          <div className="text-xs text-white/60">{segment.arrival_airport}</div>
        </div>
      </div>

      {/* Price */}
      <div className="text-right min-w-[80px]">
        <div className="text-xl font-bold text-white">
          {flight.price_formatted}
        </div>
        <div className="text-xs text-white/50">{flight.booking_class}</div>
      </div>

      <ChevronRight
        className={cn(
          "w-5 h-5 transition-transform",
          isSelected
            ? "text-primary"
            : "text-white/30 group-hover:text-white/60"
        )}
      />
    </div>
  );
};

export const FlightCard: React.FC<FlightCardProps> = ({
  origin,
  destination,
  departure_date,
  passengers,
  flights = [],
  onSubmit,
}) => {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const handleBooking = () => {
    if (selectedFlight && onSubmit) {
      onSubmit(
        JSON.stringify({
          action: "book_flight",
          flight_id: selectedFlight.id,
          price: selectedFlight.price,
        })
      );
    }
  };

  return (
    <Card className="rounded-2xl border-white/10 bg-black/40 backdrop-blur-2xl text-white shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/10 bg-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-lg font-bold">
              <span>{origin}</span>
              <Plane className="w-4 h-4 text-primary rotate-45" />
              <span>{destination}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{formatDate(departure_date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>
                {passengers} passenger{passengers > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Options */}
      <div className="p-4 flex flex-col gap-3">
        {flights.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-white/50">
            <Plane className="w-10 h-10 mb-2 stroke-1" />
            <p className="text-sm font-medium">No flights found</p>
            <p className="text-xs">Try adjusting your search criteria</p>
          </div>
        ) : (
          flights.map((flight) => (
            <FlightOption
              key={flight.id}
              flight={flight}
              isSelected={selectedFlight?.id === flight.id}
              onSelect={() => setSelectedFlight(flight)}
            />
          ))
        )}
      </div>

      {/* Booking Action */}
      {selectedFlight && (
        <div className="px-6 py-4 border-t border-white/10 bg-white/5">
          <button
            onClick={handleBooking}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5">
            Book {selectedFlight.price_formatted}
          </button>
        </div>
      )}
    </Card>
  );
};
