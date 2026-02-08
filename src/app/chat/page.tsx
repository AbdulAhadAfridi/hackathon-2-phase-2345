"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth";
import { ChatContainer, type Message } from "@/components/chat/ChatContainer";
import {
  sendChatMessage,
  generateMessageId,
  ChatApiError,
  type ChatResponse,
} from "@/services/chatApi";

/**
 * Chat page
 * - Auth protected
 * - Optimistic UI updates
 * - Retry support
 */
export default function ChatPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Chat state
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState("");

  /**
   * Redirect unauthenticated users
   */
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin?redirect=/chat");
    }
  }, [session, isPending, router]);

  /**
   * Send message to chat API
   */
  const handleSendMessage = useCallback(
    async (messageContent: string) => {
      if (!session?.user?.id) {
        setError("Please sign in to continue.");
        return;
      }

      setError(null);
      setIsLoading(true);
      setLastUserMessage(messageContent);

      const userMessage: Message = {
        id: generateMessageId(),
        role: "user",
        content: messageContent,
        createdAt: new Date(),
      };

      // Optimistic update
      setMessages((prev) => [...prev, userMessage]);

      try {
        const token = session.session?.token ?? "";

        const response: ChatResponse = await sendChatMessage(
          session.user.id,
          messageContent,
          conversationId,
          token
        );

        if (!conversationId) {
          setConversationId(response.conversationId);
        }

        const assistantMessage: Message = {
          id: generateMessageId(),
          role: "assistant",
          content: response.response,
          toolCalls: response.toolCalls,
          createdAt: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        console.error("Chat error:", err);

        // Rollback optimistic message
        setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));

        setError(
          err instanceof ChatApiError
            ? err.message
            : "Something went wrong. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [session, conversationId]
  );

  /**
   * Retry last failed message
   */
  const handleRetry = useCallback(() => {
    if (lastUserMessage) {
      setError(null);
      handleSendMessage(lastUserMessage);
    }
  }, [lastUserMessage, handleSendMessage]);

  /**
   * Clear error manually
   */
  const handleClearError = useCallback(() => {
    setError(null);
  }, []);

  // Auth loading state
  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  // Will redirect if not authenticated
  if (!session) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Chat</h1>
        <p className="mt-1 text-gray-600">
          Manage your tasks using natural language
        </p>
      </header>

      <ChatContainer
        conversationId={conversationId}
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSendMessage={handleSendMessage}
        onRetry={handleRetry}
        onClearError={handleClearError}
      />
    </main>
  );
}
