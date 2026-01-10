import { NextResponse } from 'next/server';
import { Innertube } from 'youtubei.js/web.bundle';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Extract video ID from URL
    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    // Initialize Innertube
    const youtube = await Innertube.create({
      lang: 'en',
      location: 'US',
      retrieve_player: false,
    });

    // Get video info
    const info = await youtube.getInfo(videoId);

    // Extract available formats
    const formats = info.streaming_data?.adaptive_formats || [];
    
    const videoFormats = formats
      .filter((format: any) => format.has_video && format.has_audio)
      .map((format: any) => ({
        itag: format.itag,
        quality: format.quality_label || format.quality,
        mimeType: format.mime_type,
        url: format.decipher(youtube.session.player),
      }))
      .sort((a: any, b: any) => {
        const qualityOrder: Record<string, number> = { '1080p': 4, '720p': 3, '480p': 2, '360p': 1 };
        return (qualityOrder[b.quality] || 0) - (qualityOrder[a.quality] || 0);
      });

    const audioFormat = formats.find((format: any) => format.has_audio && !format.has_video);

    return NextResponse.json({
      title: info.basic_info.title,
      thumbnail: info.basic_info.thumbnail?.[0]?.url,
      duration: info.basic_info.duration,
      author: info.basic_info.author,
      formats: videoFormats,
      audioUrl: audioFormat ? audioFormat.decipher(youtube.session.player) : null,
    });
  } catch (error) {
    console.error('YouTube API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video information' },
      { status: 500 }
    );
  }
}

function extractVideoId(url: string): string | null {
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
}
