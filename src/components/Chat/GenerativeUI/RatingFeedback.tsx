"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { RatingFeedbackProps } from "@/types/ui";

export const RatingFeedback: React.FC<RatingFeedbackProps> = ({
  scale = 5,
  show_comment = true,
  prompt = "How's this?",
  onSubmit,
}) => {
  const [rating, setRating] = React.useState<number>(0);
  const [hoveredRating, setHoveredRating] = React.useState<number>(0);
  const [comment, setComment] = React.useState<string>("");

  const handleSubmit = () => {
    if (rating === 0) return;

    let response = `${rating}`;
    if (comment.trim()) {
      response += ` - ${comment.trim()}`;
    }
    onSubmit(response);
  };

  return (
    <div className="mt-4 space-y-4">
      {prompt && (
        <p className="text-sm text-muted-foreground font-medium">{prompt}</p>
      )}

      {/* Star Rating */}
      <div className="flex gap-1 justify-center">
        {Array.from({ length: scale }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="p-1 transition-transform hover:scale-110">
            <svg
              className={cn(
                "w-8 h-8 transition-colors",
                (hoveredRating || rating) >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              )}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        ))}
      </div>

      {/* Comment */}
      {show_comment && (
        <Textarea
          placeholder="Any additional feedback? (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="resize-none"
          rows={3}
        />
      )}

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        className="w-full rounded-lg"
        disabled={rating === 0}>
        Submit Feedback
      </Button>
    </div>
  );
};
