import React from "react";

export function ChatHeader() {
  return (
    <div className="text-center space-y-3 py-4">
      <div className="flex items-center justify-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-sm">
          <svg
            className="w-5 h-5 text-primary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Chat con Gemini</h1>
      </div>
      <p className="text-muted-foreground text-base">
        Tu asistente de IA inteligente. Pregúntame lo que quieras
      </p>
    </div>
  );
}
