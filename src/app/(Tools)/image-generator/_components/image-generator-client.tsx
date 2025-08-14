"use client";

import React, { useState } from "react";
import ImageGeneratorForm from "./image-generator-form";
import ImageGeneratorOutput from "./image-generator-output";

import NativeBannerAd from "@/components/NativeBannerAd";

export interface ImageGenerationOptions {
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

export default function ImageGeneratorClient() {
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState<ImageGenerationOptions>({
    style: "photorealistic",
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
      const fullPrompt = `${prompt}, ${options.style}`;
      
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
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate image.");
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
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <ImageGeneratorForm
          prompt={prompt}
          setPrompt={setPrompt}
          options={options}
          setOptions={setOptions}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="md:col-span-2">
        <ImageGeneratorOutput
          imageUrl={imageUrl}
          isLoading={isLoading}
          error={error}
          prompt={prompt}
          ratio={options.ratio}
        />
      </div>
    
    </div>
      {/* Ad Banner */}
      <NativeBannerAd />

    </>
  );
} 