import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./message-bubble";
import { LoadingIndicator } from "./loading-indicator";
import { EmptyState } from "./empty-state";
import { Message } from "@/lib/types";

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  onScroll?: () => void;
}

export function MessageList({
  messages,
  isLoading = false,
  scrollRef,
  containerRef,
  onScroll,
}: MessageListProps) {
  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent"
      onScroll={onScroll}
    >
      <div className="max-w-4xl mx-auto">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-1">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        )}

        {isLoading && <LoadingIndicator />}

        {/* Elemento para auto-scroll */}
        <div ref={scrollRef} className="h-4" />
      </div>
    </div>
  );
}
