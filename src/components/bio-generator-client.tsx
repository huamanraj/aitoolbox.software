"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Copy, Check, Loader2, Instagram, Linkedin, Music } from "lucide-react";
import { toast } from "sonner";

const platforms = [
  { value: "instagram", label: "Instagram", limit: 150, icon: Instagram },
  { value: "linkedin", label: "LinkedIn", limit: 220, icon: Linkedin },
  { value: "tiktok", label: "TikTok", limit: 80, icon: Music },
  { value: "twitter", label: "Twitter/X", limit: 160, icon: Sparkles },
];

const roles = [
  { value: "creator", label: "Content Creator" },
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "marketer", label: "Marketer" },
  { value: "coach", label: "Coach/Consultant" },
  { value: "artist", label: "Artist" },
  { value: "gamer", label: "Gamer/Streamer" },
  { value: "photographer", label: "Photographer" },
  { value: "writer", label: "Writer/Author" },
  { value: "fitness", label: "Fitness Trainer" },
  { value: "student", label: "Student" },
  { value: "other", label: "Other" },
];

const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual & Friendly" },
  { value: "creative", label: "Creative & Artistic" },
  { value: "witty", label: "Witty & Humorous" },
  { value: "inspirational", label: "Inspirational" },
  { value: "bold", label: "Bold & Confident" },
  { value: "minimal", label: "Minimalist" },
];

export function BioGeneratorClient() {
  const [platform, setPlatform] = useState("instagram");
  const [role, setRole] = useState("creator");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("professional");
  const [bios, setBios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const selectedPlatform = platforms.find((p) => p.value === platform);
  const PlatformIcon = selectedPlatform?.icon || Sparkles;

  const generateBios = async () => {
    if (!keywords.trim()) {
      toast.error("Please enter some keywords about yourself");
      return;
    }

    setLoading(true);
    setError(null);
    setBios([]);

    try {
      const roleLabel = roles.find((r) => r.value === role)?.label || role;
      const charLimit = selectedPlatform?.limit || 150;

      // Create a comprehensive prompt
      const prompt = `You are an expert ${platform} bio writer. Generate EXACTLY 10 unique, ${tone} bios for a ${roleLabel}.

STRICT REQUIREMENTS:
- Each bio MUST be under ${charLimit} characters
- Number each bio (1. 2. 3. etc.)
- Make each bio distinctly different
- Include relevant emojis (1-3 per bio)
- Incorporate these keywords naturally: ${keywords}

Platform: ${platform}
${platform === "instagram" ? "Style: Creative, engaging, with emojis\n" : ""}
${platform === "linkedin" ? "Style: Professional, achievement-focused\n" : ""}
${platform === "tiktok" ? "Style: Very short, punchy, fun\n" : ""}
${platform === "twitter" ? "Style: Witty, memorable, personality-driven\n" : ""}

Format:
1. [bio under ${charLimit} chars]
2. [bio under ${charLimit} chars]
...continue to 10

Return ONLY the numbered bios, nothing else.`;

      const encodedPrompt = encodeURIComponent(prompt);
      const url = `https://text.pollinations.ai/${encodedPrompt}`;

      console.log('Fetching from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'text/plain',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      console.log('Response:', text);

      // Parse the bios
      const parsedBios = text
        .split(/\n/)
        .map((line) => line.trim())
        .filter((line) => /^\d+\./.test(line)) // Lines starting with numbers
        .map((line) => line.replace(/^\d+\.\s*/, '').trim()) // Remove number prefix
        .filter((bio) => bio.length > 0 && bio.length <= charLimit * 1.2)
        .slice(0, 10)
        .map((bio) => {
          // Ensure under limit
          if (bio.length > charLimit) {
            return bio.substring(0, charLimit - 3) + "...";
          }
          return bio;
        });

      if (parsedBios.length === 0) {
        throw new Error('No valid bios generated');
      }

      setBios(parsedBios);
      toast.success(`Generated ${parsedBios.length} bios!`);
    } catch (err) {
      console.error('Error generating bios:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate bios';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (bio: string, index: number) => {
    try {
      await navigator.clipboard.writeText(bio);
      setCopiedIndex(index);
      toast.success("Bio copied to clipboard!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Free AI Bio Generator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Create perfect social media bios for Instagram, LinkedIn, TikTok & Twitter in seconds. AI-powered, platform-optimized, completely free.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Input Section */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select value={platform} onValueChange={setPlatform} disabled={loading}>
                  <SelectTrigger id="platform">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        <div className="flex items-center gap-2">
                          <p.icon className="h-4 w-4" />
                          {p.label} ({p.limit} chars)
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Select value={role} onValueChange={setRole} disabled={loading}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords/Interests</Label>
                <Input
                  id="keywords"
                  placeholder="e.g., travel, photography, tech, fitness"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple keywords with commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select value={tone} onValueChange={setTone} disabled={loading}>
                  <SelectTrigger id="tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={generateBios}
                disabled={loading || !keywords.trim()}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Bios...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate 10 Bios
                  </>
                )}
              </Button>

              <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <PlatformIcon className="h-4 w-4 text-primary" />
                  <span className="font-semibold">
                    {selectedPlatform?.label} Tips:
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                  <li>Maximum {selectedPlatform?.limit} characters</li>
                  <li>Use relevant emojis for visual appeal</li>
                  <li>Include keywords for discoverability</li>
                  <li>Make it memorable and unique</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="lg:col-span-3">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Your Generated Bios</Label>
                  {bios.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {bios.length} bios generated
                    </span>
                  )}
                </div>

                {loading && (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground">
                      Creating personalized bios for {selectedPlatform?.label}...
                    </p>
                  </div>
                )}

                {!loading && bios.length === 0 && !error && (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                    <PlatformIcon className="h-12 w-12 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground font-medium">
                        Your bios will appear here
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Fill in the details and click Generate
                      </p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <p className="text-destructive text-sm text-center font-medium">
                      {error}
                    </p>
                    <p className="text-destructive/80 text-xs text-center mt-1">
                      Please try again with different inputs
                    </p>
                  </div>
                )}

                {!loading && bios.length > 0 && (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {bios.map((bio, index) => (
                      <div
                        key={index}
                        className="group relative bg-muted/30 hover:bg-muted/50 transition-colors rounded-lg p-4 border border-border"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-sm leading-relaxed">{bio}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span>{bio.length} characters</span>
                              <span>•</span>
                              <span className={bio.length <= selectedPlatform!.limit ? "text-green-600" : "text-destructive"}>
                                {bio.length <= selectedPlatform!.limit ? "✓ Within limit" : "⚠ Too long"}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="flex-shrink-0"
                            onClick={() => copyToClipboard(bio, index)}
                          >
                            {copiedIndex === index ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.value} className="text-center">
                <CardContent className="p-6 space-y-2">
                  <Icon className="h-8 w-8 mx-auto text-primary" />
                  <h3 className="font-semibold">{p.label}</h3>
                  <p className="text-2xl font-bold text-primary">{p.limit}</p>
                  <p className="text-xs text-muted-foreground">characters max</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
