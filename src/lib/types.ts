// Interfaces que coinciden exactamente con el schema de Prisma

// Enum que coincide con MessageRole en Prisma
export type MessageRole = "user" | "assistant";

// Interface base que coincide con el modelo Message de Prisma
export interface PrismaMessage {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  createdAt: Date | string; // Puede venir como string del API
}

// Interface para uso en el frontend (compatibilidad con componentes existentes)
export interface Message extends Omit<PrismaMessage, "createdAt"> {
  timestamp: Date; // Alias para createdAt para compatibilidad con componentes
}

// Interface que coincide con el modelo Conversation de Prisma
export interface Conversation {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  messages: PrismaMessage[];
}

// Interface para la respuesta del endpoint de conversaciones con conteo
export interface ConversationWithCount extends Conversation {
  _count: {
    messages: number;
  };
}

// Interface para crear un nuevo mensaje (request body)
export interface CreateMessageRequest {
  content: string;
  role?: MessageRole; // Opcional porque el backend asume 'user' por defecto
}

// Interface para la respuesta al agregar un mensaje
export interface AddMessageResponse {
  userMessage: PrismaMessage;
  geminiAiMessage: PrismaMessage;
  conversationId: string;
}

// Helper function para convertir PrismaMessage a Message
export function prismaMessageToMessage(prismaMessage: PrismaMessage): Message {
  return {
    id: prismaMessage.id,
    conversationId: prismaMessage.conversationId,
    role: prismaMessage.role,
    content: prismaMessage.content,
    timestamp: new Date(prismaMessage.createdAt),
  };
}
