import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AnimeGenerationOptions } from "./anime-generator-client";
import { Loader2 } from "lucide-react";

interface AnimeGeneratorFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  options: AnimeGenerationOptions;
  setOptions: (options: AnimeGenerationOptions) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const styles = [
  "anime",
  "manga",
  "ghibli",
  "chibi",
  "cyberpunk anime",
  "fantasy anime",
  "mecha anime",
];
const ratios = ["1:1", "16:9", "9:16", "4:3", "3:4"];

export default function AnimeGeneratorForm({
  prompt,
  setPrompt,
  options,
  setOptions,
  isLoading,
  onSubmit,
}: AnimeGeneratorFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Anime Image Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A heroic samurai under cherry blossoms at sunset"
              rows={4}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="style">Style</Label>
            <Select
              value={options.style}
              onValueChange={(value) => setOptions({ ...options, style: value })}
              disabled={isLoading}
            >
              <SelectTrigger id="style">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                {styles.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ratio">Aspect Ratio</Label>
            <Select
              value={options.ratio}
              onValueChange={(value) => setOptions({ ...options, ratio: value })}
              disabled={isLoading}
            >
              <SelectTrigger id="ratio">
                <SelectValue placeholder="Select ratio" />
              </SelectTrigger>
              <SelectContent>
                {ratios.map((ratio) => (
                  <SelectItem key={ratio} value={ratio}>
                    {ratio}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Anime Image"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


