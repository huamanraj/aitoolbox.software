import { useState, useEffect } from 'react';

export interface PollinationsTextOptions {
  model?: 'openai' | 'mistral';
  seed?: number;
  system?: string;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function usePollinationsText(
  prompt: string,
  options: PollinationsTextOptions = {}
) {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!prompt) {
      setText(null);
      setLoading(false);
      return;
    }

    let isCancelled = false;

    const generateText = async (retryCount = 0) => {
      if (isCancelled) return;

      setLoading(true);
      setError(null);
      setText(null);

      try {
        const payload: any = {
          model: options.model || 'openai',
          messages: [
            ...(options.system ? [{ role: 'system', content: options.system }] : []),
            { role: 'user', content: prompt }
          ],
          seed: options.seed,
          stream: false,
        };

        console.log('Sending request to Pollinations API:', {
          url: 'https://text.pollinations.ai/openai',
          payload: JSON.stringify(payload, null, 2)
        });

        const response = await fetch('https://text.pollinations.ai/openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorBody = await response.text();
          console.error('API Error Response:', errorBody);
          
          // Handle rate limiting with exponential backoff
          if (response.status === 429 && retryCount < 3) {
            const waitTime = Math.pow(2, retryCount) * 2000;
            console.log(`Rate limited. Retrying in ${waitTime/1000}s... (attempt ${retryCount + 1}/3)`);
            await sleep(waitTime);
            return generateText(retryCount + 1);
          }

          // Handle server errors with retry
          if (response.status >= 500 && retryCount < 2) {
            const waitTime = 3000;
            console.log(`Server error (${response.status}). Retrying in ${waitTime/1000}s... (attempt ${retryCount + 1}/2)`);
            await sleep(waitTime);
            return generateText(retryCount + 1);
          }

          throw new Error(`HTTP error! status: ${response.status} - ${errorBody}`);
        }
        
        const result = await response.json();
        console.log('API Response:', result);
        
        if (isCancelled) return;

        // Extract the message content from OpenAI format response
        const content = result.choices?.[0]?.message?.content || '';
        
        if (!content) {
          console.error('No content in response:', result);
          throw new Error('Empty response from API');
        }
        
        console.log('Generated text length:', content.length);
        setText(content);
      } catch (err) {
        if (isCancelled) return;
        
        console.error('Text generation error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to generate text';
        
        // User-friendly error messages
        if (errorMessage.includes('429')) {
          setError('Too many requests. Please wait a moment and try again.');
        } else if (errorMessage.includes('502') || errorMessage.includes('503')) {
          setError('Service temporarily unavailable. Please try again in a moment.');
        } else if (errorMessage.includes('Empty response')) {
          setError('No content generated. Please try again with a different prompt.');
        } else {
          setError(`Failed to generate text: ${errorMessage}`);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    generateText();

    return () => {
      isCancelled = true;
    };
  }, [prompt, options.model, options.seed, options.system]);

  return { text, loading, error };
}
