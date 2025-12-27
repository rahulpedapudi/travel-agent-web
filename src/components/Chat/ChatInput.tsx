import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
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

  return (
    <div
      className={cn(
        "relative rounded-[26px] bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 p-2 transition-all duration-200",
        "focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50"
      )}>
      <form onSubmit={handleSubmit} className="flex flex-col relative">
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask about flights..."
          className="w-full bg-transparent border-0 focus:ring-0 resize-none max-h-[200px] min-h-[52px] py-4 px-4 text-base placeholder:text-muted-foreground outline-none"
          disabled={isLoading}
          rows={1}
        />

        <div className="flex justify-between items-center px-2 pb-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground h-8 w-8">
            <Paperclip className="w-4 h-4" />
          </Button>

          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={cn(
              "h-8 w-8 rounded-full p-0 flex items-center justify-center transition-all duration-200",
              input.trim()
                ? "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black"
                : "bg-gray-100 text-gray-400 dark:bg-gray-700"
            )}>
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};
