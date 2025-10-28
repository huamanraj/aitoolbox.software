import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { AnimeGenerationOptions } from "./anime-generator-client";
import { Loader2, Copy, ChevronDown, ChevronUp, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnimeGeneratorFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  options: AnimeGenerationOptions;
  setOptions: (options: AnimeGenerationOptions) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const styles = [
  { value: "anime", label: "Anime", desc: "Classic vibrant anime" },
  { value: "manga", label: "Manga", desc: "Black & white manga" },
  { value: "ghibli", label: "Studio Ghibli", desc: "Dreamy, soft aesthetic" },
  { value: "chibi", label: "Chibi", desc: "Cute super-deformed" },
  { value: "cyberpunk anime", label: "Cyberpunk", desc: "Neon futuristic" },
  { value: "fantasy anime", label: "Fantasy", desc: "Magical worlds" },
  { value: "mecha anime", label: "Mecha", desc: "Giant robots" },
  { value: "shoujo anime", label: "Shoujo", desc: "Romance & sparkles" },
  { value: "shounen anime", label: "Shounen", desc: "Action-packed" },
  { value: "kawaii anime", label: "Kawaii", desc: "Extra cute style" },
  { value: "realistic anime", label: "Realistic", desc: "Semi-realistic anime" },
];

const ratios = [
  { value: "1:1", label: "Square (1:1)", use: "Social media posts" },
  { value: "16:9", label: "Landscape (16:9)", use: "Wallpapers, banners" },
  { value: "9:16", label: "Portrait (9:16)", use: "Phone wallpapers" },
  { value: "4:3", label: "Classic (4:3)", use: "Traditional displays" },
  { value: "3:4", label: "Portrait (3:4)", use: "Prints, posters" },
];

const promptExamples = {
  characters: [
    "A fierce female samurai with flowing purple hair, cherry blossoms falling around her",
    "Young wizard boy with messy black hair and round glasses, casting a glowing spell",
    "Cyberpunk hacker girl with neon pink hair, dual wielding energy swords",
    "Gentle elf princess in a moonlit forest, surrounded by fireflies",
  ],
  scenes: [
    "Ancient Japanese temple at sunset, golden light filtering through torii gates",
    "Futuristic Tokyo street at night, neon signs reflecting on wet pavement",
    "Magical library with floating books and glowing crystals",
    "Underwater palace with mermaids and colorful coral gardens",
  ],
  creatures: [
    "Majestic phoenix with rainbow flames, soaring through clouds",
    "Cute dragon hatchling playing with butterflies in a flower field",
    "Giant mecha robot standing in a destroyed cityscape, sunset background",
    "Mystical kitsune fox spirit with nine tails, surrounded by blue flames",
  ],
};

export default function AnimeGeneratorForm({
  prompt,
  setPrompt,
  options,
  setOptions,
  isLoading,
  onSubmit,
}: AnimeGeneratorFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [ideasLoading, setIdeasLoading] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);
  const currentStyle = styles.find((s) => s.value === options.style);
  const currentRatio = ratios.find((r) => r.value === options.ratio);

  const handleCopyPrompt = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(prompt);
      toast.success("Prompt copied to clipboard");
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = prompt;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        toast.success("Prompt copied to clipboard");
      } catch {
        toast.error("Failed to copy");
      }
      document.body.removeChild(textarea);
    }
  };

  const enhancePrompt = async () => {
    const raw = (prompt || "").trim();
    if (!raw) {
      toast.error("Write a prompt first to enhance");
      return;
    }
    try {
      setEnhancing(true);
      const systemPrompt = `You are an expert anime art prompt engineer. Rewrite the user's prompt into a single highly-descriptive anime image prompt (1-2 sentences). Include concise details about character/scene, style cues, lighting, mood, colors, and camera framing when relevant. Keep it compact, natural, and production-ready. Do not add quotes or extra commentary.`;
      const userPrompt = `Base prompt: ${raw}\nStyle: ${options.style}\nAspect ratio: ${options.ratio}${options.negativePrompt ? `\nAvoid: ${options.negativePrompt}` : ""}`;

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chat",
          prompt: userPrompt,
          options: {
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            model: "openai",
          },
        }),
      });
      if (!res.ok) throw new Error("Failed to enhance prompt");
      const data = await res.json();
      const text = String(data.data || "").replace(/```[a-z]*\n?|```/gi, "").trim();
      if (!text) throw new Error("Empty enhancement result");
      setPrompt(text);
      toast.success("Prompt enhanced");
    } catch (e: any) {
      toast.error(e?.message || "Could not enhance prompt");
    } finally {
      setEnhancing(false);
    }
  };

  const generateIdeas = async () => {
    try {
      setIdeasLoading(true);
      const sys = `You create short, vivid anime image prompt ideas suitable for text-to-image models. Return only a numbered list, one idea per line.`;
      const up = `Generate 4 diverse anime image prompt ideas in the style "${options.style}". Keep each idea to a single concise sentence with clear subject and scene.`;
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chat",
          prompt: up,
          options: {
            messages: [
              { role: "system", content: sys },
              { role: "user", content: up },
            ],
            model: "openai",
          },
        }),
      });
      if (!res.ok) throw new Error("Failed to generate ideas");
      const data = await res.json();
      const raw = String(data.data || "");
      const ideas = raw
        .split(/\n+/)
        .map((l: string) => l.replace(/^\s*\d+\.?\s*/, "").trim())
        .filter(Boolean)
        .slice(0, 4);
      if (ideas.length === 0) throw new Error("No ideas returned");
      setGeneratedIdeas(ideas);
      toast.success("Ideas generated");
    } catch (e: any) {
      toast.error(e?.message || "Could not generate ideas");
    } finally {
      setIdeasLoading(false);
    }
  };

  return (
    <Card className="h-fit sticky top-4">
      <CardHeader>
        <CardTitle>Create Anime Art</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="prompt">Describe Your Image</Label>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={enhancePrompt}
                  disabled={enhancing || isLoading}
                  className="h-8 px-2 text-xs"
                >
                  {enhancing ? (
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  ) : (
                    <Wand2 className="h-3 w-3 mr-1" />
                  )}
                  Enhance
                </Button>
                {prompt && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyPrompt}
                    className="h-8 px-2 text-xs"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                )}
              </div>
            </div>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A heroic samurai under cherry blossoms at sunset, cinematic lighting"
              rows={3}
              required
              disabled={isLoading}
              className="resize-y text-sm"
            />
          </div>

          {/* Prompt Examples with Tabs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Quick Ideas:</Label>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="h-8 text-xs"
                onClick={generateIdeas}
                disabled={ideasLoading || isLoading}
              >
                {ideasLoading ? (
                  <>
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" /> Generating
                  </>
                ) : (
                  "Generate Ideas"
                )}
              </Button>
            </div>
            <Tabs defaultValue="characters" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-8">
                <TabsTrigger value="characters" className="text-xs">Characters</TabsTrigger>
                <TabsTrigger value="scenes" className="text-xs">Scenes</TabsTrigger>
                <TabsTrigger value="creatures" className="text-xs">Creatures</TabsTrigger>
              </TabsList>
              <TabsContent value="characters" className="space-y-2 mt-2">
                {promptExamples.characters.slice(0, 2).map((ex, i) => (
                  <Button
                    key={i}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPrompt(ex)}
                    disabled={isLoading}
                    className="w-full text-left justify-start h-auto py-2 px-3 text-xs leading-relaxed"
                  >
                    <span className="line-clamp-2">{ex}</span>
                  </Button>
                ))}
              </TabsContent>
              <TabsContent value="scenes" className="space-y-2 mt-2">
                {promptExamples.scenes.slice(0, 2).map((ex, i) => (
                  <Button
                    key={i}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPrompt(ex)}
                    disabled={isLoading}
                    className="w-full text-left justify-start h-auto py-2 px-3 text-xs leading-relaxed"
                  >
                    <span className="line-clamp-2">{ex}</span>
                  </Button>
                ))}
              </TabsContent>
              <TabsContent value="creatures" className="space-y-2 mt-2">
                {promptExamples.creatures.slice(0, 2).map((ex, i) => (
                  <Button
                    key={i}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPrompt(ex)}
                    disabled={isLoading}
                    className="w-full text-left justify-start h-auto py-2 px-3 text-xs leading-relaxed"
                  >
                    <span className="line-clamp-2">{ex}</span>
                  </Button>
                ))}
              </TabsContent>
            </Tabs>

            {generatedIdeas.length > 0 && (
              <div className="mt-2 space-y-2">
                <Label className="text-xs text-muted-foreground">Generated Ideas</Label>
                {generatedIdeas.map((ex, i) => (
                  <Button
                    key={`gen-${i}`}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPrompt(ex)}
                    disabled={isLoading}
                    className="w-full text-left justify-start h-auto py-2 px-3 text-xs leading-relaxed"
                  >
                    <span className="line-clamp-2">{ex}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="style" className="text-sm">Anime Style</Label>
            <Select
              value={options.style}
              onValueChange={(value) => setOptions({ ...options, style: value })}
              disabled={isLoading}
            >
              <SelectTrigger id="style" className="h-10">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {styles.map((style) => (
                  <SelectItem key={style.value} value={style.value} className="py-2">
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">{currentStyle?.desc}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ratio" className="text-sm">Aspect Ratio</Label>
            <Select
              value={options.ratio}
              onValueChange={(value) => setOptions({ ...options, ratio: value })}
              disabled={isLoading}
            >
              <SelectTrigger id="ratio" className="h-10">
                <SelectValue placeholder="Select ratio" />
              </SelectTrigger>
              <SelectContent>
                {ratios.map((ratio) => (
                  <SelectItem key={ratio.value} value={ratio.value} className="py-2">
                    {ratio.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">{currentRatio?.use}</p>
          </div>

          {/* Advanced Options Toggle */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full h-9"
          >
            {showAdvanced ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
            <span className="text-sm">Advanced Options</span>
          </Button>

          {showAdvanced && (
            <div className="space-y-4 pt-2 border-t">
              <div className="space-y-2">
                <Label htmlFor="negativePrompt" className="text-sm">Negative Prompt (Optional)</Label>
                <Textarea
                  id="negativePrompt"
                  value={options.negativePrompt ?? ""}
                  onChange={(e) => setOptions({ ...options, negativePrompt: e.target.value })}
                  placeholder="e.g., blurry, low quality, distorted"
                  rows={2}
                  disabled={isLoading}
                  className="resize-y text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Describe what you don&apos;t want in the image
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seed" className="text-sm">Seed (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="seed"
                    type="number"
                    placeholder="Random"
                    value={options.seed ?? ""}
                    onChange={(e) => setOptions({ ...options, seed: e.target.value })}
                    disabled={isLoading}
                    className="h-9 text-sm"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setOptions({ ...options, seed: String(Math.floor(Math.random() * 1_000_000)) })}
                    disabled={isLoading}
                    className="h-9 text-xs whitespace-nowrap"
                  >
                    Random
                  </Button>
                  {options.seed && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setOptions({ ...options, seed: undefined })}
                      disabled={isLoading}
                      className="h-9 text-xs"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Use the same seed to reproduce results
                </p>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full h-10" disabled={isLoading || !prompt.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm">Generating...</span>
              </>
            ) : (
              <span className="text-sm">Generate Anime Image</span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
