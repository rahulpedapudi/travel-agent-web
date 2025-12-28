"use client";

import { Link } from "react-router-dom";

interface NavItem {
  id: string;
  title: string;
  url: string;
  icon?: React.ElementType;
}

export function NavMain({ items }: { items: NavItem[] }) {
  if (!items?.length) return null;

  return (
    <div className="grid grid-cols-2 gap-2 p-2 px-1">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.id}
            to={item.url}
            className="group relative flex flex-col items-center justify-center gap-3 aspect-square rounded-[1.25rem] bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-sm overflow-hidden">
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

            {Icon && (
              <div className="relative z-10 text-white/70 group-hover:text-teal-300 group-hover:scale-110 transition-all duration-300">
                <Icon className="w-7 h-7 stroke-[1.5]" />
              </div>
            )}
            <span className="relative z-10 text-[13px] font-medium text-white/60 group-hover:text-white transition-colors">
              {item.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
