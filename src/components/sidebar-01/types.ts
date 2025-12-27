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
