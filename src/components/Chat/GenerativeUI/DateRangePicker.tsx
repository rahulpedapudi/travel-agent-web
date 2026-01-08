"use client";

import * as React from "react";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { DateRangePickerProps } from "@/types/ui";
import type { DateRange } from "react-day-picker";

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  min_date,
  max_date,
  default_duration = 3,
  show_presets = true,
  onSubmit,
  disabled = false,
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), 7),
    to: addDays(new Date(), 7 + default_duration),
  });

  const presets = [
    { label: "This weekend", days: [5, 7] },
    { label: "Next week", days: [7, 14] },
    { label: "In 2 weeks", days: [14, 17] },
    { label: "Next month", days: [30, 33] },
  ];

  const handlePresetClick = (startOffset: number, endOffset: number) => {
    if (disabled) return;
    const from = addDays(new Date(), startOffset);
    const to = addDays(new Date(), endOffset);
    setDate({ from, to });
  };

  const handleSubmit = () => {
    if (disabled) return;
    if (date?.from && date?.to) {
      // Format: "January 14 - 16, 2026" (easy to read and parse)
      const startDateStr = format(date.from, "yyyy-MM-dd");
      const endDateStr = format(date.to, "yyyy-MM-dd");
      
      // Check if same month
      const sameMonth = date.from.getMonth() === date.to.getMonth() && 
                        date.from.getFullYear() === date.to.getFullYear();
      
      let displayText: string;
      if (sameMonth) {
        // "January 14 - 16, 2026"
        displayText = `${format(date.from, "MMMM d")} - ${format(date.to, "d, yyyy")}`;
      } else {
        // "January 28 - February 2, 2026"
        displayText = `${format(date.from, "MMMM d")} - ${format(date.to, "MMMM d, yyyy")}`;
      }
      
      // Send formatted text with hidden metadata
      // Format: "January 14 - 16, 2026 [2026-01-14|2026-01-16]"
      onSubmit(`${displayText} [${startDateStr}|${endDateStr}]`);
    } else if (date?.from) {
      const dateStr = format(date.from, "yyyy-MM-dd");
      const displayText = format(date.from, "MMMM d, yyyy");
      onSubmit(`${displayText} [${dateStr}|${dateStr}]`);
    }
  };

  const minDateParsed = min_date ? new Date(min_date) : undefined;
  const maxDateParsed = max_date ? new Date(max_date) : undefined;

  return (
    <div className={cn("mt-4 space-y-4", disabled && "opacity-60")}>
      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal rounded-lg bg-white/5 hover:bg-white/10 border-white/10 backdrop-blur-md text-white hover:text-white transition-all",
              !date && "text-white/60",
              disabled && "cursor-not-allowed opacity-50"
            )}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick your travel dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-black/80 backdrop-blur-2xl border-white/10 text-white"
          align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="bg-transparent text-white"
            classNames={{
              day_selected:
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-white/10 text-white",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-white/10 rounded-md transition-colors",
              day_range_middle:
                "aria-selected:bg-white/10 aria-selected:text-white",
              head_cell: "text-muted-foreground w-9 font-normal text-[0.8rem]",
            }}
            disabled={(date) => {
              if (minDateParsed && date < minDateParsed) return true;
              if (maxDateParsed && date > maxDateParsed) return true;
              return date < new Date();
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Presets */}
      {show_presets && (
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <Button
              key={preset.label}
              variant="outline"
              size="sm"
              className="rounded-full bg-white/5 hover:bg-white/10 border-white/10 text-white hover:text-white transition-all backdrop-blur-sm"
              disabled={disabled}
              onClick={() => handlePresetClick(preset.days[0], preset.days[1])}>
              {preset.label}
            </Button>
          ))}
        </div>
      )}

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        className="w-full rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all shadow-lg hover:shadow-xl"
        disabled={disabled || !date?.from}>
        {disabled ? "Dates Selected" : "Confirm Dates"}
      </Button>
    </div>
  );
};
