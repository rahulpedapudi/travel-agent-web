import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  variant?: "default" | "glass";
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading, variant = "default" }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  const isGlass = variant === "glass";

  return (
    <div
      className={cn(
        "relative rounded-[26px] transition-all duration-200 p-2",
        isGlass
          ? "bg-[#020617]/80 backdrop-blur-xl border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] focus-within:border-cyan-400 focus-within:shadow-[0_0_25px_rgba(6,182,212,0.3)]"
          : "bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-primary/20",
        // "focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50" // Moved inside logic
      )}>
      <form onSubmit={handleSubmit} className="flex flex-col relative">
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask about flights..."
          className={cn(
            "w-full bg-transparent border-0 focus:ring-0 resize-none max-h-[200px] min-h-[52px] py-4 px-4 text-base outline-none",
            isGlass ? "text-white placeholder:text-blue-100/50" : "placeholder:text-muted-foreground"
          )}
          disabled={isLoading}
          rows={1}
        />

        <div className="flex justify-between items-center px-2 pb-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8",
              isGlass ? "text-blue-200/60 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground"
            )}>
            <Paperclip className="w-4 h-4" />
          </Button>

          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={cn(
              "h-8 w-8 rounded-full p-0 flex items-center justify-center transition-all duration-200",
              input.trim()
                ? isGlass
                  ? "bg-teal-500 text-white hover:bg-teal-400"
                  : "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black"
                : isGlass
                  ? "bg-white/10 text-white/20"
                  : "bg-gray-100 text-gray-400 dark:bg-gray-700"
            )}>
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};
