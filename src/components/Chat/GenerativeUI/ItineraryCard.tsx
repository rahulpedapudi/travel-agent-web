"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ItineraryCardProps } from "@/types/ui";

const activityTypeIcons: Record<string, string> = {
  attraction: "🏛️",
  food: "🍽️",
  transport: "🚗",
  hotel: "🏨",
  activity: "🎯",
  shopping: "🛍️",
  nature: "🌲",
  default: "📍",
};

export const ItineraryCard: React.FC<ItineraryCardProps> = ({
  day_number,
  date,
  theme,
  activities,
}) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="mt-4 overflow-hidden">
      <CardHeader className="bg-linear-to-r from-primary/10 to-primary/5 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Day {day_number}</CardTitle>
            <CardDescription>{formattedDate}</CardDescription>
          </div>
          <Badge variant="secondary" className="font-medium">
            {theme}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex gap-4 relative">
              {/* Timeline line */}
              {index < activities.length - 1 && (
                <div className="absolute left-[17px] top-10 w-0.5 h-full bg-border" />
              )}

              {/* Icon */}
              <div className="shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-lg z-10">
                {activityTypeIcons[activity.type] || activityTypeIcons.default}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {activity.location}
                    </p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
                    <div className="font-medium text-foreground">
                      {activity.time}
                    </div>
                    <div>{activity.duration}</div>
                  </div>
                </div>
                {activity.notes && (
                  <p className="text-xs text-muted-foreground mt-1 italic">
                    💡 {activity.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
