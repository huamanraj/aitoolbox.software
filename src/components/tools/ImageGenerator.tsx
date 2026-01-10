"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Sparkles, Loader2, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [width, setWidth] = useState("1024");
  const [height, setHeight] = useState("1024");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a description for your image",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch(
        `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true`,
        { method: "GET" }
      );

      if (!response.ok) throw new Error("Failed to generate image");

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImage(imageUrl);

      toast({
        title: "Success!",
        description: "Your image has been generated",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `ai-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Downloaded!",
      description: "Image saved to your device",
    });
  };

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Input */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="prompt" className="text-base font-semibold">
                Describe Your Image
              </Label>
              <Textarea
                id="prompt"
                placeholder="A serene mountain landscape at sunset with vibrant orange and pink clouds..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[200px] resize-none"
                disabled={isGenerating}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width" className="text-sm font-medium">
                  Width
                </Label>
                <Select value={width} onValueChange={setWidth} disabled={isGenerating}>
                  <SelectTrigger id="width">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="512">512px</SelectItem>
                    <SelectItem value="768">768px</SelectItem>
                    <SelectItem value="1024">1024px</SelectItem>
                    <SelectItem value="1280">1280px</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="text-sm font-medium">
                  Height
                </Label>
                <Select value={height} onValueChange={setHeight} disabled={isGenerating}>
                  <SelectTrigger id="height">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="512">512px</SelectItem>
                    <SelectItem value="768">768px</SelectItem>
                    <SelectItem value="1024">1024px</SelectItem>
                    <SelectItem value="1280">1280px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={generateImage}
              disabled={isGenerating || !prompt.trim()}
              size="lg"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Image
                </>
              )}
            </Button>

            <div className="pt-4 border-t space-y-2">
              <h3 className="font-semibold text-sm">Pro Tips:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Be specific about style, colors, and mood</li>
                <li>• Include lighting details (e.g., "golden hour")</li>
                <li>• Mention art style (e.g., "photorealistic", "oil painting")</li>
              </ul>
            </div>
          </div>

          {/* Right Side - Output */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-semibold">Generated Image</Label>
              {generatedImage && (
                <Button onClick={downloadImage} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              )}
            </div>

            <div className="flex-1 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 flex items-center justify-center min-h-[400px] overflow-hidden">
              {isGenerating ? (
                <div className="text-center space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground">Creating your image...</p>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated AI artwork"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center space-y-4 p-8">
                  <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground/50" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Your generated image will appear here
                    </p>
                    <p className="text-xs text-muted-foreground/75">
                      Enter a description and click Generate
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
