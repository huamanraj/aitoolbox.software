"use client";

import React, { useState } from "react";
import AnimeGeneratorForm from "./anime-generator-form";
import AnimeGeneratorOutput from "./anime-generator-output";
import NativeBannerAd from "@/components/ads/NativeBannerAd";

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
  options: AnimeGenerationOptions;
}

export interface AnimeGenerationOptions {
  style: string;
  ratio: string;
  seed?: string;
  negativePrompt?: string;
  nologo?: boolean;
}

const calculateDimensions = (ratio: string): { width: number; height: number } => {
  const [w, h] = ratio.split(":").map(Number);
  const baseSize = 1024;

  if (w > h) {
    return {
      width: baseSize,
      height: Math.round((baseSize * h) / w),
    };
  } else {
    return {
      width: Math.round((baseSize * w) / h),
      height: baseSize,
    };
  }
};

export default function AnimeGeneratorClient() {
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState<AnimeGenerationOptions>({
    style: "anime",
    ratio: "1:1",
    nologo: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const dimensions = calculateDimensions(options.ratio);
      let fullPrompt = `${prompt}, ${options.style} style, high quality, detailed`;
      
      // Add negative prompt handling
      if (options.negativePrompt && options.negativePrompt.trim()) {
        fullPrompt += `, avoiding: ${options.negativePrompt}`;
      }

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "image",
          prompt: fullPrompt,
          options: {
            width: dimensions.width,
            height: dimensions.height,
            model: "anime",
            nologo: options.nologo,
            ...(options.seed ? { seed: String(options.seed) } : {}),
          },
        }),
      });

      if (!response.ok) {
        let message = "Failed to generate image.";
        try {
          const errorData = await response.json();
          message = errorData.error || message;
        } catch {}
        throw new Error(message);
      }

      const data = await response.json();
      const generatedUrl = data.data;
      setImageUrl(generatedUrl);
      
      // Add to history
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: generatedUrl,
        prompt,
        timestamp: new Date(),
        options: { ...options },
      };
      setHistory((prev) => [newImage, ...prev].slice(0, 10)); // Keep last 10 images
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromHistory = (image: GeneratedImage) => {
    setImageUrl(image.url);
    setPrompt(image.prompt);
    setOptions(image.options);
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      <div className="lg:col-span-1">
        <AnimeGeneratorForm
          prompt={prompt}
          setPrompt={setPrompt}
          options={options}
          setOptions={setOptions}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="lg:col-span-2">
        <AnimeGeneratorOutput
          imageUrl={imageUrl}
          isLoading={isLoading}
          error={error}
          prompt={prompt}
          ratio={options.ratio}
          history={history}
          onLoadFromHistory={loadFromHistory}
        />
      </div>
    </div>
    
    {/* Ad Banner */}
    <div className="mt-8">
      <NativeBannerAd />
    </div>
    </>
  );
}
