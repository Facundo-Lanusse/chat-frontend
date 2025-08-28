"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ChatHeader } from "@/components/chat/chat-header";
import { MessageList } from "@/components/chat/message-list";
import { MessageInput } from "@/components/chat/message-input";
import {
  Message,
  Conversation,
  CreateMessageRequest,
  PrismaMessage,
  prismaMessageToMessage,
} from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function GeminiChat() {
  // Estados usando las interfaces correctas
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Referencias - corregir el tipo para que no sea nullable
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  // Auto-scroll simple
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current;

      // Distancia desde el final
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      // Si estamos a más de 100px del final y hay mensajes, mostrar botón
      const shouldShow = distanceFromBottom > 100 && messages.length > 1;

      setShowScrollButton(shouldShow);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // También ejecutar handleScroll cuando cambien los mensajes para detectar estado inicial
  useEffect(() => {
    // Pequeño delay para asegurar que el DOM se haya actualizado
    setTimeout(() => {
      handleScroll();
    }, 100);
  }, [messages]);

  // Crear conversación
  const createConversation = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Error al crear conversación");

      const newConversation = await response.json();
      setConversation(newConversation);
      return newConversation.id;
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al crear la conversación");
      return null;
    }
  };

  // Enviar mensaje
  const sendMessage = async () => {
    const messageText = inputMessage.trim();
    if (!messageText || isLoading) return;

    setInputMessage("");
    setIsLoading(true);

    try {
      // Crear conversación si no existe
      let conversationId = conversation?.id;
      if (!conversationId) {
        conversationId = await createConversation();
        if (!conversationId) return;
      }

      // Mensaje optimista del usuario
      const userMessage: Message = {
        id: Date.now().toString(),
        conversationId: conversationId,
        content: messageText,
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // Llamada a la API
      const response = await fetch(
        `${API_BASE_URL}/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: messageText, role: "user" }),
        }
      );

      if (response.status === 429) {
        toast.error(
          "Demasiadas solicitudes. Espera un momento e intenta de nuevo."
        );
        return;
      }

      if (!response.ok) throw new Error("Error al enviar mensaje");

      const updatedMessages: PrismaMessage[] = await response.json();
      const messagesWithTimestamp = updatedMessages.map(prismaMessageToMessage);

      setMessages(messagesWithTimestamp);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al enviar el mensaje");
      // Remover mensaje optimista
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar teclas
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="shrink-0 p-4 pb-0">
          <ChatHeader />
        </div>

        {/* Área de mensajes */}
        <div className="flex-1 p-4 overflow-hidden">
          <Card className="h-full shadow-lg bg-background/95 backdrop-blur-sm relative overflow-hidden">
            <MessageList
              messages={messages}
              isLoading={isLoading}
              scrollRef={messagesEndRef}
              containerRef={messagesContainerRef}
              onScroll={handleScroll}
            />
            {showScrollButton && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                <Button
                  onClick={scrollToBottom}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-200 hover:scale-105"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  Último mensaje
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Input */}
        <div className="shrink-0 p-4 pt-0">
          <MessageInput
            value={inputMessage}
            onChange={setInputMessage}
            onSubmit={sendMessage}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
