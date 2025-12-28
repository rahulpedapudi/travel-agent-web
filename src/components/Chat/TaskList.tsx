"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check, Loader2, Circle } from "lucide-react";
import type { TaskItem } from "@/hooks/useChat";

interface TaskListProps {
  tasks: TaskItem[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  if (tasks.length === 0) return null;

  const completedCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4 mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
            <Loader2 className="w-3 h-3 text-primary animate-spin" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Planning
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {completedCount} / {tasks.length}
        </span>
      </div>

      {/* Task list */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-start gap-3 text-sm transition-all duration-200",
              task.status === "completed" && "opacity-60"
            )}>
            {/* Status icon */}
            <div className="mt-0.5 shrink-0">
              {task.status === "completed" ? (
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                </div>
              ) : task.status === "in_progress" ? (
                <div className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Loader2 className="w-3 h-3 text-amber-600 dark:text-amber-400 animate-spin" />
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full border border-muted-foreground/30 flex items-center justify-center">
                  <Circle className="w-2 h-2 text-muted-foreground/40" />
                </div>
              )}
            </div>

            {/* Task label */}
            <span
              className={cn(
                "leading-tight flex-1",
                task.status === "in_progress" && "text-foreground font-medium",
                task.status === "pending" && "text-muted-foreground",
                task.status === "completed" &&
                  "text-muted-foreground line-through"
              )}>
              {task.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
