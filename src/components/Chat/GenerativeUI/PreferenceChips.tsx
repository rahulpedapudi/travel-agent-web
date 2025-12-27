"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PreferenceChipsProps } from "@/types/ui";

export const PreferenceChips: React.FC<PreferenceChipsProps> = ({
  options,
  multi_select = true,
  min_selections = 0,
  max_selections = null,
  onSubmit,
}) => {
  const [selected, setSelected] = React.useState<Set<string>>(
    new Set(options.filter((o) => o.selected).map((o) => o.id))
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
    const selectedLabels = options
      .filter((o) => selected.has(o.id))
      .map((o) => o.label.replace(/^[\p{Emoji}\s]+/u, "").trim())
      .join(", ");
    onSubmit(selectedLabels || "None selected");
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option.id}
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
