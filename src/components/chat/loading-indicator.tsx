import React from "react";
import { Bot, Loader2 } from "lucide-react";

export function LoadingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start gap-2 max-w-[80%]">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-muted">
          <Bot className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Loading content */}
        <div className="ml-1">
          <div className="px-3 py-2 bg-muted rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Pensando...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
