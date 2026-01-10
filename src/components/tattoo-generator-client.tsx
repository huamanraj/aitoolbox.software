"use client";

import { useState, useEffect } from "react";
import { usePollinationsImage } from "@/hooks/use-pollinations-image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Sparkles, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";

const tattooStyles = [
  { value: "traditional", label: "Traditional" },
  { value: "minimalist", label: "Minimalist" },
  { value: "realistic", label: "Realistic" },
  { value: "tribal", label: "Tribal" },
  { value: "japanese", label: "Japanese" },
  { value: "watercolor", label: "Watercolor" },
  { value: "geometric", label: "Geometric" },
  { value: "neo-traditional", label: "Neo-Traditional" },
  { value: "blackwork", label: "Blackwork" },
];

const placements = [
  { value: "arm", label: "Arm" },
  { value: "sleeve", label: "Full Sleeve" },
  { value: "back", label: "Back" },
  { value: "chest", label: "Chest" },
  { value: "leg", label: "Leg" },
  { value: "shoulder", label: "Shoulder" },
  { value: "wrist", label: "Wrist" },
  { value: "forearm", label: "Forearm" },
];

export function TattooGeneratorClient() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("traditional");
  const [placement, setPlacement] = useState("arm");
  const [finalPrompt, setFinalPrompt] = useState("");

  const { imageUrl, loading, error } = usePollinationsImage(finalPrompt, {
    model: "flux",
    width: 1024,
    height: 1024,
    enhance: true,
  });

  useEffect(() => {
    if (prompt) {
      setFinalPrompt("");
    }
  }, [prompt]);

  const generateTattoo = () => {
    if (!prompt.trim()) {
      toast.error("Please describe your tattoo idea");
      return;
    }

    const enhancedPrompt = `Professional ${style} tattoo design of ${prompt}, designed for ${placement} placement, high detail, black and grey with optional color accents, tattoo art style, clean lines, professional tattoo flash art`;
    setFinalPrompt(enhancedPrompt);
    toast.success("Generating your tattoo design...");
  };

  const downloadImage = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tattoo-design-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Tattoo design downloaded!");
    } catch (err) {
      toast.error("Failed to download image");
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Free AI Tattoo Generator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn your vision into stunning tattoo art in seconds. Create custom
            designs for sleeves, minimalist ink, and everything in between.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="prompt">Describe Your Tattoo Idea</Label>
                <Textarea
                  id="prompt"
                  placeholder="e.g., A majestic phoenix rising from flames with intricate feather details"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="resize-none"
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="style">Tattoo Style</Label>
                  <Select value={style} onValueChange={setStyle} disabled={loading}>
                    <SelectTrigger id="style">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tattooStyles.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="placement">Body Placement</Label>
                  <Select value={placement} onValueChange={setPlacement} disabled={loading}>
                    <SelectTrigger id="placement">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {placements.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={generateTattoo}
                disabled={loading || !prompt.trim()}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Design...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Tattoo Design
                  </>
                )}
              </Button>

              <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
                <p className="font-semibold">💡 Pro Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Be specific about elements you want included</li>
                  <li>Mention color preferences or black & grey</li>
                  <li>Consider size and detail level for placement</li>
                  <li>Generate multiple designs for inspiration</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Label>Your Tattoo Design</Label>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden relative">
                  {loading ? (
                    <div className="text-center space-y-4 p-8">
                      <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
                      <div className="space-y-2">
                        <p className="text-muted-foreground font-medium">
                          Creating your custom tattoo design...
                        </p>
                        <p className="text-xs text-muted-foreground">
                          This may take 15-30 seconds
                        </p>
                      </div>
                    </div>
                  ) : imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Generated tattoo design"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center space-y-2 p-8">
                      <Sparkles className="h-12 w-12 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">
                        Your tattoo design will appear here
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Describe your idea and click Generate
                      </p>
                    </div>
                  )}
                </div>

                {imageUrl && !loading && (
                  <Button
                    onClick={downloadImage}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Design
                  </Button>
                )}

                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <p className="text-destructive text-sm text-center font-medium">
                      {error}
                    </p>
                    <p className="text-destructive/80 text-xs text-center mt-1">
                      Please try again or modify your prompt
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Unlimited Designs</h3>
              <p className="text-sm text-muted-foreground">
                Generate as many tattoo concepts as you need. Completely free,
                no limits.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mx-auto">
                <RefreshCw className="h-6 w-6 text-chart-2" />
              </div>
              <h3 className="font-semibold">Multiple Styles</h3>
              <p className="text-sm text-muted-foreground">
                From traditional to minimalist, explore various tattoo art
                styles.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center mx-auto">
                <Download className="h-6 w-6 text-chart-4" />
              </div>
              <h3 className="font-semibold">HD Downloads</h3>
              <p className="text-sm text-muted-foreground">
                Download high-quality designs to share with your tattoo artist.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
