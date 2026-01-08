import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  initialValue?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading, initialValue = "" }) => {
  const [input, setInput] = useState(initialValue);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialValue) {
      setInput(initialValue);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [initialValue]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput("");
    // Reset height
    if (inputRef.current) inputRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  return (
    <div
      className={cn(
        "relative rounded-[26px] p-2 transition-all duration-200",
        "bg-white/10 dark:bg-black/10 backdrop-blur-2xl", // High transparency, high blur
        "border border-white/10 dark:border-white/5", // Subtle border
        "shadow-2xl shadow-black/5 dark:shadow-black/10",
        "focus-within:ring-1 focus-within:ring-white/20",
        "focus-within:bg-white/20 dark:focus-within:bg-black/20"
      )}>
      <form onSubmit={handleSubmit} className="flex flex-col relative">
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Plan your next trip..."
          className="w-full bg-transparent border-0 focus:ring-0 resize-none max-h-[200px] min-h-[52px] py-4 px-4 text-base placeholder:text-muted-foreground/70 dark:text-white outline-none"
          disabled={isLoading}
          rows={1}
        />

        <div className="flex justify-between items-center px-2 pb-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground h-8 w-8 hover:bg-white/20">
            <Paperclip className="w-4 h-4" />
          </Button>

          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={cn(
              "h-8 w-8 rounded-full p-0 flex items-center justify-center transition-all duration-200",
              input.trim()
                ? "bg-black/80 text-white hover:bg-black dark:bg-white/90 dark:text-black dark:hover:bg-white"
                : "bg-black/5 text-muted-foreground dark:bg-white/10 dark:text-white/30"
            )}>
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};
