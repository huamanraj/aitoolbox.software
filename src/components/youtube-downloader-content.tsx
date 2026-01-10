"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, Music, Youtube, Play, Shield } from "lucide-react";

export function YouTubeDownloaderContent() {
  return (
    <div className="max-w-7xl mx-auto py-16 space-y-16">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">
          Download YouTube Videos in HD Quality - Free & Fast
        </h2>
        
        <p className="text-lg leading-relaxed">
          Need to save YouTube videos for offline viewing? Our <strong>free YouTube downloader</strong> makes it incredibly easy to download any YouTube video in multiple qualities, from 1080p Full HD down to 360p for smaller file sizes. Whether you want to save educational content, music videos, tutorials, or entertainment, our tool provides a simple, fast solution with no signup required.
        </p>

        <p className="text-lg leading-relaxed">
          Unlike many YouTube downloaders that limit quality or require subscriptions, our tool offers completely unlimited downloads in HD quality. You can also extract audio as MP3 files, perfect for music, podcasts, or any audio content you want to save. All processing happens securely, and we never store your downloads or data.
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Why Use Our YouTube Video Downloader?
        </h3>

        <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Download className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Multiple HD Qualities</h4>
                  <p className="text-muted-foreground text-sm">
                    Choose from 1080p Full HD, 720p HD, 480p SD, or 360p to balance quality and file size. Download exactly what you need for your device and storage space.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Music className="h-6 w-6 text-chart-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">MP3 Audio Extraction</h4>
                  <p className="text-muted-foreground text-sm">
                    Extract audio from any YouTube video and save as MP3. Perfect for music, podcasts, audiobooks, or any content where you only need the audio.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Play className="h-6 w-6 text-chart-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Fast & Simple</h4>
                  <p className="text-muted-foreground text-sm">
                    Just paste the YouTube URL, select your preferred quality, and click download. No complex steps, no confusing options—just straightforward video downloading.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-chart-1 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Safe & Private</h4>
                  <p className="text-muted-foreground text-sm">
                    We don't store your downloads, track your activity, or require personal information. Your privacy is protected, and all downloads are processed securely.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          How to Download YouTube Videos
        </h3>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <h5 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Youtube className="h-5 w-5 text-primary" />
            Step-by-Step Guide
          </h5>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Step 1:</strong> Copy the YouTube video URL from your browser's address bar</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Step 2:</strong> Paste the URL into our downloader and click "Get Video"</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Step 3:</strong> Select your preferred video quality (1080p, 720p, 480p, or 360p)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Step 4:</strong> Click "Download Video (MP4)" or "Download Audio (MP3)" to save</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span><strong>Step 5:</strong> Your video/audio will be saved to your device's download folder</span>
            </li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Understanding Video Quality Options
        </h3>

        <p className="leading-relaxed">
          Choosing the right quality depends on your needs, device, and available storage:
        </p>

        <div className="space-y-6 my-8">
          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">1080p (Full HD)</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Best for:</strong> Large screens, TVs, high-quality viewing • <strong>File size:</strong> Largest • <strong>Quality:</strong> Maximum detail and clarity, 1920x1080 pixels. Perfect when you want the best possible quality and have plenty of storage space.
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">720p (HD)</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Best for:</strong> Computer monitors, tablets • <strong>File size:</strong> Medium-large • <strong>Quality:</strong> Great balance of quality and file size, 1280x720 pixels. Recommended for most downloads where you want HD quality without excessive file sizes.
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">480p (SD)</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Best for:</strong> Phones, limited storage • <strong>File size:</strong> Medium-small • <strong>Quality:</strong> Good quality for smaller screens, 854x480 pixels. Ideal when storage space is limited but you still want decent quality.
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h5 className="font-semibold text-lg mb-3">360p</h5>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Best for:</strong> Very limited storage, background playback • <strong>File size:</strong> Smallest • <strong>Quality:</strong> Basic quality, 640x360 pixels. Good for podcasts or content where video quality isn't critical.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Frequently Asked Questions
        </h3>

        <div className="space-y-6 my-8">
          <div>
            <h5 className="font-semibold text-lg mb-2">Is it legal to download YouTube videos?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Downloading YouTube videos for personal, offline viewing of content you own or have permission to download is generally acceptable. However, you should always respect copyright laws and YouTube's Terms of Service. Never redistribute downloaded content or use it commercially without permission.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Does this work with all YouTube videos?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our downloader works with most public YouTube videos. Age-restricted videos, private videos, and videos with specific copyright protections may not be downloadable. The available quality options depend on what the original video provides.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Do you store my downloaded videos?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No. We don't store any downloaded videos or track your downloads. All processing happens in real-time, and files are delivered directly to your device. We respect your privacy and don't collect unnecessary data.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Why choose MP3 audio extraction?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              MP3 audio extraction is perfect for music videos, podcasts, audiobooks, lectures, or any content where you only need the audio. Audio files are much smaller than videos, saving storage space and bandwidth. Great for listening on the go.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">How long do downloads take?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Download speed depends on your internet connection and the file size. Once you click download, the file is prepared and sent to your browser, usually taking just a few seconds to a couple of minutes for HD videos.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Can I download YouTube playlists?</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Currently, you need to download videos individually by pasting each URL. For playlists, copy and paste each video URL separately to download them one by one.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">
          Start Downloading YouTube Videos Today
        </h3>

        <p className="leading-relaxed">
          Whether you need to save educational content for studying, download music videos for offline enjoyment, or archive important content, our free YouTube downloader provides a fast, reliable solution. With support for multiple HD qualities and MP3 audio extraction, you have complete flexibility in how you save and enjoy YouTube content.
        </p>

        <p className="leading-relaxed font-semibold">
          Scroll up now and paste any YouTube URL to start downloading—completely free, no signup required, unlimited downloads.
        </p>
      </article>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-red-600/10 via-primary/10 to-chart-2/10 rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Youtube className="h-10 w-10 text-red-600" />
          <Download className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-4">
          Download YouTube Videos Now
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Free HD downloads with multiple quality options. No signup, no limits, instant downloads.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          <Download className="mr-2 h-4 w-4" />
          Start Downloading
        </button>
      </div>
    </div>
  );
}
