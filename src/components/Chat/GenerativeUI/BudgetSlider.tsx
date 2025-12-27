"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { BudgetSliderProps } from "@/types/ui";

export const BudgetSlider: React.FC<BudgetSliderProps> = ({
  min = 10000,
  max = 500000,
  step = 5000,
  currency = "INR",
  presets = ["Budget (₹10k-50k)", "Mid-range (₹50k-1.5L)", "Luxury (₹2L+)"],
  onSubmit,
}) => {
  const [value, setValue] = React.useState<number[]>([(min + max) / 2]);

  const formatCurrency = (amount: number): string => {
    if (currency === "INR") {
      if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(1)}L`;
      } else if (amount >= 1000) {
        return `₹${(amount / 1000).toFixed(0)}k`;
      }
      return `₹${amount}`;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = () => {
    onSubmit(formatCurrency(value[0]));
  };

  const handlePresetClick = (preset: string) => {
    onSubmit(preset);
  };

  return (
    <div className="mt-4 space-y-6">
      {/* Slider */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {formatCurrency(min)}
          </span>
          <span className="text-2xl font-semibold text-primary">
            {formatCurrency(value[0])}
          </span>
          <span className="text-sm text-muted-foreground">
            {formatCurrency(max)}
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />
      </div>

      {/* Presets */}
      {presets.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Or choose a preset:</p>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => handlePresetClick(preset)}>
                {preset}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      <Button onClick={handleSubmit} className="w-full rounded-lg">
        Set Budget to {formatCurrency(value[0])}
      </Button>
    </div>
  );
};
