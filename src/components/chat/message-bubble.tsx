import React from "react";
import { Message } from "@/lib/types";
import { User, Bot } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  // Helper simple para formatear tiempo
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex items-start gap-2 max-w-[80%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? "bg-primary" : "bg-muted"
          }`}
        >
          {isUser ? (
            <User className="h-4 w-4 text-primary-foreground" />
          ) : (
            <Bot className="h-4 w-4 text-muted-foreground" />
          )}
        </div>

        {/* Message content */}
        <div className={`${isUser ? "mr-1" : "ml-1"}`}>
          {/* Message bubble */}
          <div
            className={`px-3 py-2 rounded-lg shadow-sm transition-colors ${
              isUser
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>

          {/* Timestamp */}
          <p
            className={`text-xs text-muted-foreground/70 mt-1 ${
              isUser ? "text-right" : "text-left"
            }`}
          >
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
}
