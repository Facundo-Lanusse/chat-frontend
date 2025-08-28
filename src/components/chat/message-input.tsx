import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

export function MessageInput({
  value,
  onChange,
  onSubmit,
  onKeyPress,
  disabled = false,
  isLoading = false,
  placeholder = "Escribe tu mensaje aquí... (Shift+Enter para nueva línea)",
}: MessageInputProps) {
  const canSubmit = value.trim() && !disabled && !isLoading;

  return (
    <div className="bg-background border rounded-2xl shadow-sm p-4">
      <div className="flex items-end space-x-3">
        <div className="flex-1">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="min-h-[50px] max-h-32 resize-none border-0 focus:ring-0 focus:outline-none bg-transparent placeholder:text-muted-foreground/60"
          />
        </div>

        <Button
          onClick={onSubmit}
          disabled={!canSubmit}
          size="lg"
          className={`
            h-10 w-10 rounded-full p-0 transition-all duration-200 ease-in-out transform
            ${
              canSubmit
                ? "bg-primary hover:bg-primary/90 hover:scale-105 shadow-sm"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }
          `}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send
              className={`h-4 w-4 ${
                canSubmit ? "text-primary-foreground" : ""
              }`}
            />
          )}
        </Button>
      </div>
    </div>
  );
}
