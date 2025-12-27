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
    const from = addDays(new Date(), startOffset);
    const to = addDays(new Date(), endOffset);
    setDate({ from, to });
  };

  const handleSubmit = () => {
    if (date?.from && date?.to) {
      const formattedRange = `${format(date.from, "MMMM d")}-${format(
        date.to,
        "d, yyyy"
      )}`;
      onSubmit(formattedRange);
    } else if (date?.from) {
      onSubmit(format(date.from, "MMMM d, yyyy"));
    }
  };

  const minDateParsed = min_date ? new Date(min_date) : undefined;
  const maxDateParsed = max_date ? new Date(max_date) : undefined;

  return (
    <div className="mt-4 space-y-4">
      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal rounded-lg",
              !date && "text-muted-foreground"
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
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
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
              className="rounded-full"
              onClick={() => handlePresetClick(preset.days[0], preset.days[1])}>
              {preset.label}
            </Button>
          ))}
        </div>
      )}

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        className="w-full rounded-lg"
        disabled={!date?.from}>
        Confirm Dates
      </Button>
    </div>
  );
};
