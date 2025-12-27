"use client";

import { Search } from "lucide-react";

import { SidebarHeader } from "@/components/ui/sidebar";
import { useEffect } from "react";

export function NavHeader() {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center justify-between px-2 pb-0 pt-3 cursor-pointer">
          <div className="flex items-center flex-1 gap-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-normal">
              Search
            </span>
          </div>
          <div className="flex items-center justify-center px-2 py-1 border border-border rounded-md">
            <kbd className="text-muted-foreground inline-flex font-[inherit] text-xs font-medium">
              <span className="opacity-70">⌘K</span>
            </kbd>
          </div>
        </div>
      </SidebarHeader>
    </>
  );
}
