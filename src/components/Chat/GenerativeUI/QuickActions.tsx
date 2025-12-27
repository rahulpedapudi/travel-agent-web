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
          className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => onSubmit(action.label)}>
          {action.label}
        </Button>
      ))}
    </div>
  );
};
