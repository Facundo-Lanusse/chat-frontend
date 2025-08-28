import React from "react";
import {
  MessageCircle,
  Sparkles,
  Lightbulb,
  Code,
  BookOpen,
} from "lucide-react";

export function EmptyState() {
  const suggestions = [
    { icon: Lightbulb, text: "Explícame un concepto" },
    { icon: Code, text: "Ayúdame con código" },
    { icon: BookOpen, text: "Responde una pregunta" },
    { icon: Sparkles, text: "Sé creativo" },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6">
      <div className="mb-6 p-3 bg-muted rounded-full shadow-sm">
        <MessageCircle className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="text-xl font-semibold mb-2 text-foreground">
        ¡Comienza la conversación!
      </h3>

      <p className="text-muted-foreground text-sm max-w-md mb-6 leading-relaxed">
        Envía tu primer mensaje para comenzar a chatear con Gemini. Puedo
        ayudarte con:
      </p>

      <div className="grid grid-cols-2 gap-2 max-w-sm w-full">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg border hover:bg-muted transition-colors duration-200"
          >
            <div className="p-1 bg-primary/10 rounded">
              <suggestion.icon className="h-3 w-3 text-primary" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {suggestion.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
