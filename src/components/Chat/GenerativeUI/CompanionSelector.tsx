"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { CompanionSelectorProps } from "@/types/ui";

export const CompanionSelector: React.FC<CompanionSelectorProps> = ({
  options,
  show_kids_age_input = false,
  onSubmit,
}) => {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [kidsAges, setKidsAges] = React.useState<string>("");
  const [showKidsInput, setShowKidsInput] = React.useState(false);

  const handleSelect = (id: string) => {
    setSelected(id);
    // Show kids age input if family_kids is selected
    if (id === "family_kids" && show_kids_age_input) {
      setShowKidsInput(true);
    } else {
      setShowKidsInput(false);
      setKidsAges("");
    }
  };

  const handleSubmit = () => {
    if (!selected) return;

    const option = options.find((o) => o.id === selected);
    if (!option) return;

    let response = option.label;
    if (showKidsInput && kidsAges.trim()) {
      response += `, ages ${kidsAges.trim()}`;
    }

    onSubmit(response);
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all hover:border-primary/50",
              selected === option.id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-background"
            )}>
            <span className="text-2xl mb-2">{option.icon}</span>
            <span className="text-sm font-medium text-center">
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {showKidsInput && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
          <Label htmlFor="kids-ages">Kids ages (comma separated)</Label>
          <Input
            id="kids-ages"
            placeholder="e.g., 8, 12"
            value={kidsAges}
            onChange={(e) => setKidsAges(e.target.value)}
          />
        </div>
      )}

      <Button
        onClick={handleSubmit}
        className="w-full rounded-lg"
        disabled={!selected}>
        Continue
      </Button>
    </div>
  );
};
