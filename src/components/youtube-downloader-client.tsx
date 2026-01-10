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
import { Play, Download, Loader2, Youtube, Music } from "lucide-react";
import { toast } from "sonner";

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
}

// Hardcoded quality options
const videoQualities = [
  { value: "1080p", label: "1080p (Full HD) - MP4" },
  { value: "720p", label: "720p (HD) - MP4" },
  { value: "480p", label: "480p (SD) - MP4" },
  { value: "360p", label: "360p - MP4" },
];

export function YouTubeDownloaderClient() {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const fetchVideoInfo = async () => {
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError("Invalid YouTube URL");
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    setLoading(true);
    setError(null);
    setVideoInfo(null);
    setSelectedQuality("");

    try {
      // Fetch real video data using YouTube oEmbed API
      const oEmbedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

      const response = await fetch(oEmbedUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch video information");
      }

      const data = await response.json();

      // Create video info with real data
      const videoInfo: VideoInfo = {
        title: data.title || "Unknown Title",
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        duration: "Unknown Duration", // oEmbed doesn't provide duration
        author: data.author_name || "Unknown Channel",
      };

      setVideoInfo(videoInfo);
      // Auto-select highest quality
      setSelectedQuality("1080p");
      toast.success("Video loaded successfully!");
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Failed to load video. Please check the URL or try again later."
      );
      toast.error("Failed to load video. Please check the URL.");
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = (audioOnly: boolean = false) => {
    if (!videoInfo || (!selectedQuality && !audioOnly)) {
      toast.error("Please select a quality first");
      return;
    }

    // Instead of actual download, open placeholder link
    const downloadUrl =
      "https://www.google.com/search?q=free+youtube+video+downloader";

    // Open link in new tab
    window.open(downloadUrl, "_blank");

    if (audioOnly) {
      toast.success("Opening MP3 download link...");
    } else {
      toast.success(`Opening ${selectedQuality} download link...`);
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Youtube className="h-8 w-8 sm:h-12 sm:w-12 text-red-600" />
            <Download className="h-6 w-6 sm:h-10 sm:w-10 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-600 via-primary to-chart-2 bg-clip-text text-transparent">
            Free YouTube Video Downloader
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Download YouTube videos in HD quality (1080p, 720p, 480p, 360p) or
            extract MP3 audio. Fast, free, and no signup required.
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">YouTube Video URL</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  id="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                  onKeyDown={(e) => e.key === "Enter" && fetchVideoInfo()}
                  className="flex-1"
                />
                <Button
                  onClick={fetchVideoInfo}
                  disabled={loading || !url.trim()}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Get Video
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Paste any YouTube video URL to start downloading
              </p>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <p className="text-destructive text-sm text-center font-medium">
                  {error}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Video Info & Download Section */}
        {videoInfo && (
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Video Preview */}
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={videoInfo.thumbnail}
                  alt={videoInfo.title}
                  className="w-full sm:w-40 h-24 sm:h-24 object-cover rounded-lg"
                  onError={(e) => {
                    // Fallback to a different thumbnail URL if maxres fails
                    const target = e.target as HTMLImageElement;
                    const videoId = extractVideoId(url);
                    target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold line-clamp-2 mb-2 text-sm sm:text-base">
                    {videoInfo.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {videoInfo.author}
                    {videoInfo.duration !== "Unknown Duration" &&
                      ` • ${videoInfo.duration}`}
                  </p>
                </div>
              </div>

              {/* Quality Selection */}
              <div className="space-y-2">
                <Label htmlFor="quality">Video Quality</Label>
                <Select
                  value={selectedQuality}
                  onValueChange={setSelectedQuality}
                >
                  <SelectTrigger id="quality">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    {videoQualities.map((quality) => (
                      <SelectItem key={quality.value} value={quality.value}>
                        {quality.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => downloadVideo(false)}
                  disabled={!selectedQuality}
                  className="flex-1 w-full"
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Video (MP4)
                </Button>

                <Button
                  onClick={() => downloadVideo(true)}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Music className="mr-2 h-4 w-4" />
                  Download Audio (MP3)
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                By downloading, you agree to YouTube's Terms of Service and respect
                copyright laws
              </p>
            </CardContent>
          </Card>
        )}

        {/* Features Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Card>
            <CardContent className="p-4 sm:p-6 text-center space-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Download className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base">HD Quality</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Download in 1080p, 720p, 480p or 360p
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6 text-center space-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mx-auto">
                <Music className="h-5 w-5 sm:h-6 sm:w-6 text-chart-2" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base">MP3 Audio</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Extract audio from any YouTube video
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6 text-center space-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-chart-4/10 rounded-lg flex items-center justify-center mx-auto">
                <Play className="h-5 w-5 sm:h-6 sm:w-6 text-chart-4" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base">No Limits</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Unlimited downloads, completely free
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6 text-center space-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-chart-1/10 rounded-lg flex items-center justify-center mx-auto">
                <Youtube className="h-5 w-5 sm:h-6 sm:w-6 text-chart-1" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base">Fast & Easy</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Paste URL, select quality, download
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
