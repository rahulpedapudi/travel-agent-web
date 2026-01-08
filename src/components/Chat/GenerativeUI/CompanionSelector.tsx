"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { CompanionSelectorProps, CompanionOption } from "@/types/ui";

// Default options when backend doesn't provide any
const DEFAULT_OPTIONS: CompanionOption[] = [
  { id: "solo", label: "Solo", icon: "👤" },
  { id: "couple", label: "Couple", icon: "💑" },
  { id: "family_kids", label: "Family with Kids", icon: "👨‍👩‍👧" },
  { id: "family_adults", label: "Family (Adults)", icon: "👨‍👩‍👦‍👦" },
  { id: "friends", label: "Friends", icon: "👥" },
];

export const CompanionSelector: React.FC<CompanionSelectorProps> = ({
  options,
  show_kids_age_input = true,
  onSubmit,
  disabled = false,
}) => {
  // Use default options if none provided
  const displayOptions =
    options && options.length > 0 ? options : DEFAULT_OPTIONS;

  const [selected, setSelected] = React.useState<string | null>(null);
  const [kidsAges, setKidsAges] = React.useState<string>("");
  const [showKidsInput, setShowKidsInput] = React.useState(false);

  const handleSelect = (id: string) => {
    if (disabled) return;
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
    if (disabled) return;
    if (!selected) return;

    const option = displayOptions.find((o) => o.id === selected);
    if (!option) return;

    let response = option.label;
    if (showKidsInput && kidsAges.trim()) {
      response += `, ages ${kidsAges.trim()}`;
    }

    onSubmit(response);
  };

  return (
    <div className={cn("mt-4 space-y-4", disabled && "opacity-60")}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {displayOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            disabled={disabled}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-xl border transition-all backdrop-blur-sm",
              !disabled && "hover:bg-white/10 hover:border-white/20 hover:shadow-lg",
              selected === option.id
                ? "bg-teal-500/20 border-teal-500/50 shadow-lg shadow-teal-500/10"
                : "bg-white/5 border-white/10",
              disabled && "cursor-not-allowed opacity-50"
            )}>
            <span className="text-2xl mb-2">{option.icon}</span>
            <span className={cn(
              "text-sm font-medium text-center",
              selected === option.id ? "text-teal-300" : "text-white"
            )}>
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
            disabled={disabled}
          />
        </div>
      )}

      <Button
        onClick={handleSubmit}
        className="w-full rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all shadow-lg hover:shadow-xl"
        disabled={disabled || !selected}>
        {disabled ? "Selection Confirmed" : "Continue"}
      </Button>
    </div>
  );
};
