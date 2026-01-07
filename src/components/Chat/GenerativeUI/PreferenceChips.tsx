"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PreferenceChipsProps, PreferenceOption } from "@/types/ui";

// Default options when backend doesn't provide any
const DEFAULT_OPTIONS: PreferenceOption[] = [
  { id: "food", label: "Food & Dining", selected: false },
  { id: "museums", label: "Museums & Art", selected: false },
  { id: "nature", label: "Nature & Outdoors", selected: false },
  { id: "nightlife", label: "Nightlife", selected: false },
  { id: "shopping", label: "Shopping", selected: false },
  { id: "history", label: "History & Culture", selected: false },
  { id: "adventure", label: "Adventure", selected: false },
  { id: "relaxation", label: "Relaxation", selected: false },
];

export const PreferenceChips: React.FC<PreferenceChipsProps> = ({
  options,
  multi_select = true,
  min_selections = 0,
  max_selections = null,
  onSubmit,
  disabled = false,
}) => {
  // Debug: log incoming options
  // console.log("PreferenceChips options:", options);

  // Normalize options to ensure they have id and label
  const normalizedOptions = React.useMemo(() => {
    if (!options || options.length === 0) return DEFAULT_OPTIONS;

    return options.map((opt: any, index: number) => {
      // Handle various backend formats
      const id = opt.id || opt.value || `option_${index}`;
      const label =
        opt.label || opt.text || opt.name || opt.value || String(opt);
      const selected = opt.selected || false;

      return { id, label, selected };
    });
  }, [options]);

  // Use default options if none provided or all labels are empty
  const displayOptions = normalizedOptions.some((o) => o.label)
    ? normalizedOptions
    : DEFAULT_OPTIONS;

  const [selected, setSelected] = React.useState<Set<string>>(
    new Set(displayOptions.filter((o) => o.selected).map((o) => o.id))
  );

  const toggleSelection = (id: string) => {
    if (disabled) return;
    const newSelected = new Set(selected);

    if (newSelected.has(id)) {
      if (newSelected.size > min_selections) {
        newSelected.delete(id);
      }
    } else {
      if (!multi_select) {
        newSelected.clear();
      }
      if (max_selections === null || newSelected.size < max_selections) {
        newSelected.add(id);
      }
    }

    setSelected(newSelected);
  };

  const handleSubmit = () => {
    if (disabled) return;
    const selectedLabels = displayOptions
      .filter((o) => selected.has(o.id))
      .map((o) => o.label.replace(/^[\p{Emoji}\s]+/u, "").trim())
      .join(", ");
    onSubmit(selectedLabels || "None selected");
  };

  return (
    <div className={cn("mt-4 space-y-4", disabled && "opacity-60")}>
      <div className="flex flex-wrap gap-2">
        {displayOptions.map((option, index) => (
          <Button
            key={option.id || `option-${index}`}
            variant="ghost"
            size="sm"
            disabled={disabled}
            className={cn(
              "rounded-full transition-all backdrop-blur-sm border",
              selected.has(option.id)
                ? "bg-teal-500/20 border-teal-500/50 text-teal-300 shadow-lg shadow-teal-500/10 hover:bg-teal-500/30 hover:text-teal-200"
                : "bg-white/5 hover:bg-white/10 border-white/10 text-white hover:text-white",
              disabled && "cursor-not-allowed opacity-50"
            )}
            onClick={() => toggleSelection(option.id)}>
            {option.label}
          </Button>
        ))}
      </div>
      <Button
        onClick={handleSubmit}
        className="w-full rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all shadow-lg hover:shadow-xl"
        disabled={disabled || selected.size < min_selections}>
        {disabled
          ? "Selection Confirmed"
          : `Continue with ${selected.size} selected`}
      </Button>
    </div>
  );
};
