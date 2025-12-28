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
    <div className="rounded-2xl border-0 bg-white shadow-lg p-5 mb-4 animate-in fade-in slide-in-from-top-2 duration-300 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            {completedCount < tasks.length ? (
              <Loader2 className="w-4 h-4 text-slate-600 animate-spin" />
            ) : (
              <Check className="w-4 h-4 text-emerald-600" />
            )}
          </div>
          <span className="text-base font-semibold text-slate-800">
            Planning
          </span>
        </div>
        <span className="text-xs font-medium text-slate-400">
          {completedCount} / {tasks.length}
        </span>
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center gap-3 text-sm transition-all duration-300",
              task.status === "completed" && "opacity-100"
            )}>
            {/* Status icon */}
            <div className="shrink-0">
              {task.status === "completed" ? (
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-600 stroke-3" />
                </div>
              ) : task.status === "in_progress" ? (
                <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                  <Loader2 className="w-3 h-3 text-amber-600 animate-spin" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center">
                  <Circle className="w-3 h-3 text-slate-300 hidden" />
                </div>
              )}
            </div>

            {/* Task label */}
            <span
              className={cn(
                "leading-tight flex-1",
                task.status === "in_progress" && "text-slate-800 font-medium",
                task.status === "pending" && "text-slate-400",
                task.status === "completed" && "text-slate-500" // No line-through
              )}>
              {task.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
