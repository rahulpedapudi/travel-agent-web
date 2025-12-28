"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PreferenceChipsProps, PreferenceOption } from "@/types/ui";

// Default options when backend doesn't provide any
const DEFAULT_OPTIONS: PreferenceOption[] = [
  { id: "food", label: "🍜 Food & Dining", selected: false },
  { id: "museums", label: "🏛️ Museums & Art", selected: false },
  { id: "nature", label: "🌲 Nature & Outdoors", selected: false },
  { id: "nightlife", label: "🌙 Nightlife", selected: false },
  { id: "shopping", label: "🛍️ Shopping", selected: false },
  { id: "history", label: "🏰 History & Culture", selected: false },
  { id: "adventure", label: "🎢 Adventure", selected: false },
  { id: "relaxation", label: "🧘 Relaxation", selected: false },
];

export const PreferenceChips: React.FC<PreferenceChipsProps> = ({
  options,
  multi_select = true,
  min_selections = 0,
  max_selections = null,
  onSubmit,
}) => {
  // Use default options if none provided
  const displayOptions =
    options && options.length > 0 ? options : DEFAULT_OPTIONS;

  const [selected, setSelected] = React.useState<Set<string>>(
    new Set(displayOptions.filter((o) => o.selected).map((o) => o.id))
  );

  const toggleSelection = (id: string) => {
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
    const selectedLabels = displayOptions
      .filter((o) => selected.has(o.id))
      .map((o) => o.label.replace(/^[\p{Emoji}\s]+/u, "").trim())
      .join(", ");
    onSubmit(selectedLabels || "None selected");
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-wrap gap-2">
        {displayOptions.map((option, index) => (
          <Button
            key={option.id || `option-${index}`}
            variant={selected.has(option.id) ? "default" : "outline"}
            size="sm"
            className={cn(
              "rounded-full transition-all",
              selected.has(option.id) &&
                "bg-primary text-primary-foreground shadow-md"
            )}
            onClick={() => toggleSelection(option.id)}>
            {option.label}
          </Button>
        ))}
      </div>
      <Button
        onClick={handleSubmit}
        className="w-full rounded-lg"
        disabled={selected.size < min_selections}>
        Continue with {selected.size} selected
      </Button>
    </div>
  );
};
