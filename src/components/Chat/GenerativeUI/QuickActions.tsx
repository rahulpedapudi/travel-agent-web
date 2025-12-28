"use client";

import { Button } from "@/components/ui/button";
import type { QuickActionsProps } from "@/types/ui";

export const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  onSubmit,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="outline"
          size="sm"
          className="rounded-full bg-white/5 hover:bg-white/10 border-white/10 text-white hover:text-white transition-all backdrop-blur-sm"
          onClick={() => onSubmit(action.label)}>
          {action.label}
        </Button>
      ))}
    </div>
  );
};
