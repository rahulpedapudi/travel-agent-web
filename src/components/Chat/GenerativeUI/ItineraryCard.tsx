"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type {
  ItineraryCardProps,
  ItineraryActivity,
  ItineraryDay,
} from "@/types/ui";
import {
  Car,
  Footprints,
  TrainFront,
  Bus,
  Train,
  Plane,
  Clock,
  Info,
  Calendar,
  Navigation,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AddToCalendarButton } from "./AddToCalendarButton";
import { getDestinationImage } from "@/utils/destinationImages";

const getTravelIcon = (method?: string) => {
  const normalizedMethod = method?.toLowerCase();
  switch (normalizedMethod) {
    case "walk":
      return Footprints;
    case "metro":
      return TrainFront;
    case "taxi":
    case "drive":
    case "uber":
      return Car;
    case "bus":
      return Bus;
    case "train":
      return Train;
    case "flight":
      return Plane;
    default:
      return Navigation; // Generic arrow/nav icon
  }
};

// Helper to compute duration from time strings
const computeDuration = (startTime?: string, endTime?: string): string => {
  if (!startTime || !endTime) return "";
  try {
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    const diffMinutes = endMinutes - startMinutes;
    if (diffMinutes <= 0) return "";
    const hours = Math.floor(diffMinutes / 60);
    const mins = diffMinutes % 60;
    if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h`;
    return `${mins}m`;
  } catch {
    return "";
  }
};

const ActivityItem = ({
  activity,
  isLast,
}: {
  activity: ItineraryActivity;
  isLast: boolean;
  nextActivity?: ItineraryActivity;
}) => {
  // Normalize data from API format to display format
  const startTime = activity.start_time || activity.time || "";
  const title = activity.title || activity.place?.name || "";
  const location = activity.location || "";
  const activityType = activity.type || activity.place?.type || "";
  const duration =
    activity.duration || computeDuration(startTime, activity.end_time);

  // Determine if we need a travel segment after this activity
  const showTravel = !isLast && activity.travel_duration;
  const TravelIcon = getTravelIcon(activity.travel_method);

  return (
    <div className="flex gap-4 group">
      {/* Left Column: Time */}
      <div className="w-16 flex flex-col items-end pt-1 shrink-0">
        <span className="text-sm font-bold text-white">{startTime}</span>
        {activity.end_time && (
          <span className="text-xs text-muted-foreground/60">
            {activity.end_time}
          </span>
        )}
      </div>

      {/* Center Column: Timeline Graphics */}
      <div className="flex flex-col items-center shrink-0 relative">
        {/* Main Node */}
        <div className="w-3 h-3 rounded-full border-2 border-foreground bg-background z-10 my-2" />

        {/* Vertical Line */}
        {!isLast && (
          <div
            className={cn(
              "w-0.5 grow absolute top-5 -bottom-2 bg-border",
              showTravel
                ? "border-l-2 border-dashed border-border bg-transparent w-0"
                : "bg-border"
            )}
          />
        )}
      </div>

      {/* Right Column: Content */}
      <div className="flex-1 pb-8 pt-0.5">
        <div className="flex flex-col gap-1">
          {/* Title and Duration Pill */}
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-base text-white leading-tight">
              {title}
            </h4>
          </div>

          {/* Subtitle / Location */}
          <div className="text-sm text-muted-foreground flex items-center gap-1.5">
            {location && <span className="truncate">{location}</span>}
            {activityType && !location && (
              <span className="text-xs uppercase tracking-wider opacity-70">
                {activityType}
              </span>
            )}
            {duration && (
              <>
                {(location || activityType) && (
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                )}
                <span className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-medium text-white border border-white/10 backdrop-blur-sm">
                  <Clock className="w-3 h-3 text-white/80" />
                  {duration}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          {activity.description && (
            <p className="text-sm text-muted-foreground/80 mt-1 leading-relaxed">
              {activity.description}
            </p>
          )}

          {/* Notes */}
          {activity.notes && activity.notes.length > 0 && (
            <div className="mt-2 flex flex-col gap-1">
              {activity.notes.map((note, i) => (
                <div
                  key={i}
                  className="flex items-start gap-1.5 text-xs text-amber-200/90 bg-amber-500/10 px-2 py-1 rounded w-fit border border-amber-500/20">
                  <Info className="w-3 h-3 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Travel Segment Visualization */}
        {showTravel && (
          <div className="mt-2 mb-2 flex items-center gap-3 text-xs text-white/80 pl-0">
            <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-md border border-white/10 backdrop-blur-sm">
              <TravelIcon className="w-3.5 h-3.5 text-white" />
              <span className="font-medium text-white">
                {activity.travel_duration}
              </span>
              {activity.travel_method && (
                <span className="opacity-70 text-white/80">
                  via {activity.travel_method}
                </span>
              )}
            </div>
            {activity.travel_note && (
              <span className="opacity-60 italic text-[11px] text-white/60">
                • {activity.travel_note}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const DayCard = ({ day }: { day: ItineraryDay }) => {
  const dateObj = new Date(day.date);
  const dateStr = dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const yearStr = dateObj.toLocaleDateString("en-US", { year: "numeric" });

  const hasActivities = day.activities && day.activities.length > 0;

  return (
    <Card className="rounded-2xl border-white/10 bg-black/40 backdrop-blur-2xl text-white shadow-sm overflow-hidden mb-6 last:mb-0">
      <div className="px-6 py-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 text-primary-foreground w-10 h-10 rounded-xl flex flex-col items-center justify-center font-bold text-sm shrink-0 border border-primary/30 shadow-[0_0_10px_rgba(var(--primary),0.2)]">
            <span>{day.day_number}</span>
          </div>
          <div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider text-[10px]">
              {yearStr}
            </div>
            <h3 className="font-bold text-lg leading-none">{dateStr}</h3>
          </div>
        </div>
        {day.theme && (
          <Badge
            variant="secondary"
            className="font-normal text-xs bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-md shadow-sm">
            {day.theme}
          </Badge>
        )}
      </div>

      <CardContent className="p-6 pt-8">
        {hasActivities ? (
          <div className="flex flex-col">
            {day.activities.map((activity, index) => (
              <ActivityItem
                key={index}
                activity={activity}
                isLast={index === day.activities.length - 1}
                nextActivity={day.activities[index + 1]}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground opacity-60">
            <Calendar className="w-10 h-10 mb-2 stroke-1" />
            <p className="text-sm font-medium">No planned activities</p>
            <p className="text-xs">Enjoy your free time!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

import { useTrips } from "@/hooks/useTrips";
import { Button } from "@/components/ui/button";
import { Save, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

export const ItineraryCard: React.FC<ItineraryCardProps> = (props) => {
  // Normalize to array of days
  let days: ItineraryDay[] = [];

  if (props.days && props.days.length > 0) {
    days = props.days;
  } else if (props.day_number && props.date && props.activities) {
    days = [
      {
        day_number: props.day_number,
        date: props.date,
        theme: props.theme,
        activities: props.activities,
      },
    ];
  }

  const { saveTrip } = useTrips();
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (days.length === 0) return null;

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Construct trip data from props and first day
      const firstDay = days[0];
      const lastDay = days[days.length - 1];

      // Extract title/destination from context or use defaults
      // Since props don't pass full trip metadata, we infer or use generics
      // Ideally this card is part of a larger context.
      // For now, we'll try to guess or use a prompt.

      // Get destination-specific image if not provided
      const destination = props.destination || "Custom Destination";
      const imageUrl = props.imageUrl || getDestinationImage(destination);

      await saveTrip({
        title: props.title || `Trip to ${destination}`,
        destination: destination,
        startDate: firstDay.date,
        endDate: lastDay.date,
        imageUrl: imageUrl,
        totalBudget: props.budget || "Calculated",
      }, days);

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
      {/* Action Header */}
      <div className="flex justify-between items-center px-2">
        <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Suggested Itinerary</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          disabled={isSaved || isSaving}
          className={`text-xs gap-2 rounded-lg transition-all ${isSaved ? "text-teal-400 hover:text-teal-300 hover:bg-teal-500/10" : "text-zinc-400 hover:text-white hover:bg-white/10"}`}
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving..." : isSaved ? "Saved to Trips" : "Save Trip"}
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {days.map((day, index) => (
          <DayCard key={index} day={day} />
        ))}
      </div>

      {/* Add to Calendar Button */}
      <AddToCalendarButton days={days} />
    </div>
  );
};
