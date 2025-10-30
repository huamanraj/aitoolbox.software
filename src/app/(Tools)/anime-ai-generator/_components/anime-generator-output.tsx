import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ImageIcon, Terminal, Download, History, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GeneratedImage } from "./anime-generator-client";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AnimeGeneratorOutputProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  prompt: string;
  ratio: string;
  history: GeneratedImage[];
  onLoadFromHistory: (image: GeneratedImage) => void;
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
  history,
  onLoadFromHistory,
}: AnimeGeneratorOutputProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [w, h] = ratio.split(":").map(Number);

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    const sanitizedPrompt = prompt.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    const filename = `anime_${sanitizedPrompt.slice(0, 30)}_${Date.now()}.jpg`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-4 md:p-6">
          <div
            className="w-full relative bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden shadow-inner"
            style={{ aspectRatio: `${w} / ${h}`, minHeight: "300px", maxHeight: "600px" }}
          >
            {isLoading && <SkeletonLoader />}

            {error && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <Alert variant="destructive" className="w-auto max-w-md">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription className="text-sm wrap-break-word">{error}</AlertDescription>
                </Alert>
              </div>
            )}

            {!isLoading && !error && !imageUrl && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 p-6">
                <ImageIcon className="w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 opacity-50" />
                <p className="font-semibold text-sm md:text-base">Your anime image will appear here</p>
                <p className="text-xs md:text-sm mt-2 max-w-sm">Choose a style and describe what you want to create</p>
              </div>
            )}

            {imageUrl && !isLoading && !error && (
              <>
                <Image
                  src={imageUrl}
                  alt={`Generated anime: ${prompt.slice(0, 100)}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
                  priority
                />
                <div className="absolute top-3 right-3 z-10 flex gap-2">
                  <Button
                    onClick={handleDownload}
                    size="icon"
                    className="cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
                    variant="secondary"
                  >
                    <Download className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">Download Image</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* History Panel */}
      {history.length > 0 && (
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 shrink-0" />
                <CardTitle className="text-base md:text-lg">Generation History</CardTitle>
                <Badge variant="secondary" className="text-xs">{history.length}</Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="h-8 text-xs md:text-sm"
              >
                {showHistory ? (
                  <>
                    <X className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    Hide
                  </>
                ) : (
                  "Show"
                )}
              </Button>
            </div>
          </CardHeader>
          {showHistory && (
            <CardContent className="pt-0">
              <ScrollArea className="h-[250px] md:h-[300px] w-full pr-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {history.map((img) => (
                    <div
                      key={img.id}
                      className="relative group cursor-pointer border-2 border-transparent hover:border-primary rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg"
                      onClick={() => onLoadFromHistory(img)}
                    >
                      <div className="aspect-square relative bg-gray-100 dark:bg-gray-900">
                        <Image
                          src={img.url}
                          alt={img.prompt.slice(0, 50)}
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                          <p className="text-white text-[10px] md:text-xs text-center line-clamp-4 leading-tight">
                            {img.prompt}
                          </p>
                        </div>
                      </div>
                      <div className="p-1.5 md:p-2 bg-card border-t">
                        <p className="text-[10px] md:text-xs text-muted-foreground truncate">
                          {img.options.style}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
}
