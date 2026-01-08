"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Check, Loader2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ItineraryDay } from "@/types/ui";
import {
  loadGoogleAPI,
  addItineraryToCalendar,
} from "@/lib/googleCalendar";

interface AddToCalendarButtonProps {
  days: ItineraryDay[];
  tripName?: string;
  className?: string;
}

type ButtonState = "idle" | "loading" | "success" | "error";

export const AddToCalendarButton: React.FC<AddToCalendarButtonProps> = ({
  days,
  tripName,
  className,
}) => {
  const [state, setState] = useState<ButtonState>("idle");
  const [calendarUrl, setCalendarUrl] = useState<string | null>(null);
  const [eventsCreated, setEventsCreated] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCalendar = async () => {
    setState("loading");
    setError(null);

    try {
      // Load Google API if not already loaded
      await loadGoogleAPI();

      // Add events to calendar
      const result = await addItineraryToCalendar(days, tripName);

      if (result.success) {
        setState("success");
        setCalendarUrl(result.calendarUrl);
        setEventsCreated(result.eventsCreated);
      } else {
        setState("error");
        setError("Failed to add events to calendar");
      }
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.error("Calendar error:", err);
    }
  };

  if (state === "success") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <div className="flex items-center gap-2 text-green-400">
          <Check className="h-4 w-4" />
          <span className="text-sm">
            Added {eventsCreated} events to your calendar!
          </span>
        </div>
        {calendarUrl && (
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Open Calendar
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <div className="text-sm text-red-400">{error}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddToCalendar}
          className="w-fit"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleAddToCalendar}
      disabled={state === "loading"}
      className={cn(
        "w-full mt-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-white border border-white/10 backdrop-blur-md transition-all shadow-lg hover:shadow-xl",
        className
      )}
    >
      {state === "loading" ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding to Calendar...
        </>
      ) : (
        <>
          <Calendar className="mr-2 h-4 w-4" />
          Add to Google Calendar
        </>
      )}
    </Button>
  );
};
