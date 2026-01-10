import { useState, useCallback } from 'react';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface PollinationsChatOptions {
  model?: 'openai' | 'mistral';
  temperature?: number;
  max_tokens?: number;
  reasoning_effort?: 'minimal' | 'low' | 'medium' | 'high';
}

export function usePollinationsChat(
  initialMessages: ChatMessage[] = [],
  options: PollinationsChatOptions = {}
) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

    const newUserMessage: ChatMessage = {
      role: 'user',
      content: userMessage
    };

    setMessages(prev => [...prev, newUserMessage]);
    setLoading(true);
    setError(null);

    try {
      const token = process.env.NEXT_PUBLIC_POLLINATIONS_TOKEN;
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const payload: Record<string, unknown> = {
        model: options.model || 'openai',
        messages: [...messages, newUserMessage]
      };

      // Don't send temperature for free tier - only default (1) is supported
      // if (options.temperature !== undefined && options.temperature !== 1) {
      //   payload.temperature = options.temperature;
      // }
      if (options.max_tokens !== undefined) {
        payload.max_tokens = options.max_tokens;
      }
      // Don't send reasoning_effort for free tier
      // if (options.reasoning_effort && options.model === 'openai') {
      //   payload.reasoning_effort = options.reasoning_effort;
      // }

      // Use token in URL if available
      const url = token 
        ? `https://text.pollinations.ai/openai?token=${token}`
        : 'https://text.pollinations.ai/openai';

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: result.choices[0].message.content
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  }, [messages, options.model, options.temperature, options.max_tokens, options.reasoning_effort]);

  const clearMessages = useCallback(() => {
    setMessages(initialMessages);
    setError(null);
  }, [initialMessages]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages
  };
}
