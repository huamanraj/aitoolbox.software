"use client";

import React, { useState } from "react";
import AnimeGeneratorForm from "./anime-generator-form";
import AnimeGeneratorOutput from "./anime-generator-output";

export interface AnimeGenerationOptions {
  style: string;
  ratio: string;
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
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const dimensions = calculateDimensions(options.ratio);
      const fullPrompt = `${prompt}, ${options.style} style, anime aesthetic, clean line art, vibrant colors`;

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
      setImageUrl(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <AnimeGeneratorForm
          prompt={prompt}
          setPrompt={setPrompt}
          options={options}
          setOptions={setOptions}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="md:col-span-2">
        <AnimeGeneratorOutput
          imageUrl={imageUrl}
          isLoading={isLoading}
          error={error}
          prompt={prompt}
          ratio={options.ratio}
        />
      </div>
    </div>
  );
}


