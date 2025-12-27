import type { ElementType } from "react";

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
    icon: ElementType;
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
    icon: ElementType;
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
  icon: ElementType;
}

export interface TopicItem {
  id: string;
  title: string;
  icon: ElementType;
}
