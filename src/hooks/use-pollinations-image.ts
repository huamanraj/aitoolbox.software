import { useState, useEffect } from 'react';

export interface PollinationsImageOptions {
  model?: 'flux' | 'turbo';
  width?: number;
  height?: number;
  seed?: number;
  nologo?: boolean;
  enhance?: boolean;
  private?: boolean;
}

export function usePollinationsImage(
  prompt: string,
  options: PollinationsImageOptions = {}
) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!prompt) {
      setImageUrl(null);
      setLoading(false);
      return;
    }

    const generateImage = async () => {
      // Clear previous image and set loading
      setImageUrl(null);
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        
        if (options.model) params.append('model', options.model);
        if (options.width) params.append('width', options.width.toString());
        if (options.height) params.append('height', options.height.toString());
        if (options.seed !== undefined) params.append('seed', options.seed.toString());
        if (options.nologo) params.append('nologo', 'true');
        if (options.enhance) params.append('enhance', 'true');
        if (options.private) params.append('private', 'true');

        const encodedPrompt = encodeURIComponent(prompt);
        const token = process.env.NEXT_PUBLIC_POLLINATIONS_TOKEN;
        
        const baseUrl = token 
          ? `https://image.pollinations.ai/prompt/${encodedPrompt}?token=${token}`
          : `https://image.pollinations.ai/prompt/${encodedPrompt}`;
        
        const url = params.toString() 
          ? `${baseUrl}&${params.toString()}`
          : baseUrl;
        
        // Wait for image to actually load before showing it
        const img = new Image();
        img.onload = () => {
          setImageUrl(url);
          setLoading(false);
        };
        img.onerror = () => {
          setError('Failed to load image');
          setLoading(false);
        };
        img.src = url;
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate image');
        setLoading(false);
      }
    };

    generateImage();
  }, [prompt, options.model, options.width, options.height, options.seed, options.nologo, options.enhance, options.private]);

  return { imageUrl, loading, error };
}
