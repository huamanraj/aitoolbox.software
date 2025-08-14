import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ImageIcon, Terminal, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnimeGeneratorOutputProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  prompt: string;
  ratio: string;
}

const SkeletonLoader = () => (
  <div className="absolute inset-0 bg-card rounded-lg flex items-center justify-center animate-pulse">
    <ImageIcon className="w-16 h-16 text-gray-400" />
  </div>
);

export default function AnimeGeneratorOutput({
  imageUrl,
  isLoading,
  error,
  prompt,
  ratio,
}: AnimeGeneratorOutputProps) {
  const [w, h] = ratio.split(":").map(Number);

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    const sanitizedPrompt = prompt.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    const filename = `${sanitizedPrompt.slice(0, 50)}.jpg`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="h-full">
      <CardContent className="p-4 md:p-6 h-full flex items-center justify-center">
        <div
          className="w-full relative bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden"
          style={{ aspectRatio: `${w} / ${h}` }}
        >
          {isLoading && <SkeletonLoader />}

          {error && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Alert variant="destructive" className="w-auto max-w-full">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          {!isLoading && !error && !imageUrl && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-gray-500 p-4">
              <ImageIcon className="w-16 h-16 mb-4" />
              <p className="font-semibold">Your anime image will appear here.</p>
              <p className="text-sm">Enter a prompt and click &quot;Generate Anime Image&quot; to start.</p>
            </div>
          )}

          {imageUrl && !isLoading && !error && (
            <>
              <Image
                src={imageUrl}
                alt={`Generated anime image for: ${prompt}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <Button
                onClick={handleDownload}
                size="icon"
                className="absolute top-4 cursor-pointer right-4 z-10"
                variant="secondary"
              >
                <Download className="h-5 w-5" />
                <span className="sr-only">Download Image</span>
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


