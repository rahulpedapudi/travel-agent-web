import type { ComponentType } from "react";

// Icon type that accepts className prop
type IconType = ComponentType<{ className?: string }>;

export interface SidebarData {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: {
    id: string;
    title: string;
    url: string;
    icon: IconType;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  recentChats: {
    id: string;
    title: string;
    url: string;
    icon: IconType;
  }[];
}

export interface FavoriteItem {
  id: string;
  title: string;
  href: string;
  color: string;
}

export interface TeamItem {
  id: string;
  title: string;
  icon: IconType;
}

export interface TopicItem {
  id: string;
  title: string;
  icon: IconType;
}
