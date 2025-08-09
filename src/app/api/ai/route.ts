import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "@/lib/rate-limiter";

// Helper function to handle errors
const handleError = (error: unknown) => {
  console.error("AI API Error:", error);
  return NextResponse.json(
    { error: "An error occurred while processing your request" },
    { status: 500 }
  );
};

// Check if API token is configured
const POLLINATIONS_API_TOKEN = process.env.POLLINATIONS_API_TOKEN;

// Helper to add auth token to URLs
const addAuthToUrl = (url: string) => {
  const finalUrl = new URL(url);
  if (POLLINATIONS_API_TOKEN) {
    finalUrl.searchParams.append('token', POLLINATIONS_API_TOKEN);
  }
  return finalUrl.toString();
};

// Helper to get auth headers
const getAuthHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };
  if (POLLINATIONS_API_TOKEN) {
    headers["Authorization"] = `Bearer ${POLLINATIONS_API_TOKEN}`;
  }
  return headers;
};

// Image Generation Endpoint
export async function POST(req: NextRequest) {
  // Rate limiting by IP
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1"
  const allowed = rateLimiter(ip, 1, 1000); // 1 request per 1 second

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { type, ...body } = await req.json();

    switch (type) {
      case "image": {
        const { prompt, options = {} } = body;
        // Construct the Pollinations image URL with parameters
        const params = new URLSearchParams({
          ...options,
          nologo: "true", // Hide Pollinations branding
        });
        
        const encodedPrompt = encodeURIComponent(prompt);
        const baseUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?${params}`;
        const imageUrl = addAuthToUrl(baseUrl);
        
        // Fetch the image and return as base64
        const response = await fetch(imageUrl);
        const imageBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(imageBuffer).toString('base64');
        
        return NextResponse.json({ 
          success: true, 
          data: `data:image/jpeg;base64,${base64Image}` 
        });
      }

      case "logo": {
        const { prompt, model = "flux", options = {} } = body;
        
        // Enhanced prompt for high-quality logo generation
        const logoPrompt = `${prompt}. High-quality professional logo design, clean vector-style, transparent background, scalable graphics, sharp edges, perfect for business use, premium quality, commercial-grade logo, 4K resolution`;
        
        // Construct the Pollinations image URL with logo-optimized parameters
        const params = new URLSearchParams({
          model: model,
          width: "1024",
          height: "1024",
          steps: "50", // Higher steps for better quality
          seed: Math.floor(Math.random() * 1000000).toString(),
          nologo: "true",
          enhance: "true",
          safe: "true",
          ...options,
        });
        
        const encodedPrompt = encodeURIComponent(logoPrompt);
        const baseUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?${params}`;
        const imageUrl = addAuthToUrl(baseUrl);
        
        // Return the direct image URL for logos
        return NextResponse.json({ 
          success: true, 
          imageUrl: imageUrl,
          prompt: logoPrompt
        });
      }

      case "chat": {
        const { prompt, options = {} } = body;
        // Handle chat/text generation
        const response = await fetch("https://text.pollinations.ai/openai", {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            model: options.model || "openai",
            messages: options.messages || [
              { role: "user", content: prompt }
            ],
            ...options
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Pollinations API Error:", response.status, errorText);
          return NextResponse.json(
            { error: `API request failed: ${response.status}` },
            { status: response.status }
          );
        }

        const data = await response.json();
        
        // Validate response structure
        if (!data || !data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
          console.error("Invalid API response structure:", data);
          return NextResponse.json(
            { error: "Invalid response from AI service" },
            { status: 500 }
          );
        }

        const firstChoice = data.choices[0];
        if (!firstChoice || !firstChoice.message || !firstChoice.message.content) {
          console.error("Invalid choice structure:", firstChoice);
          return NextResponse.json(
            { error: "Invalid response format from AI service" },
            { status: 500 }
          );
        }

        return NextResponse.json({ 
          success: true, 
          data: firstChoice.message.content 
        });
      }

      case "audio": {
        const { prompt, options = {} } = body;
        // Handle text-to-speech
        const response = await fetch("https://text.pollinations.ai/openai", {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            model: "openai-audio",
            messages: [{ role: "user", content: prompt }],
            voice: options.voice || "nova",
            ...options
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Pollinations Audio API Error:", response.status, errorText);
          return NextResponse.json(
            { error: `Audio API request failed: ${response.status}` },
            { status: response.status }
          );
        }

        const data = await response.json();
        
        // Validate response structure
        if (!data || !data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
          console.error("Invalid audio API response structure:", data);
          return NextResponse.json(
            { error: "Invalid response from audio service" },
            { status: 500 }
          );
        }

        const firstChoice = data.choices[0];
        if (!firstChoice || !firstChoice.message || !firstChoice.message.audio || !firstChoice.message.audio.data) {
          console.error("Invalid audio choice structure:", firstChoice);
          return NextResponse.json(
            { error: "Invalid audio response format" },
            { status: 500 }
          );
        }

        return NextResponse.json({ 
          success: true, 
          data: firstChoice.message.audio.data // Returns base64 audio
        });
      }

      default:
        return NextResponse.json(
          { error: "Invalid request type" },
          { status: 400 }
        );
    }
  } catch (error) {
    return handleError(error);
  }
}

// Get available models
export async function GET(_req: NextRequest) {
  try {
    const [imageModels, textModels] = await Promise.all([
      fetch(addAuthToUrl("https://image.pollinations.ai/models")).then(res => res.json()),
      fetch(addAuthToUrl("https://text.pollinations.ai/models")).then(res => res.json())
    ]);

    return NextResponse.json({
      success: true,
      data: {
        image: imageModels,
        text: textModels
      }
    });
  } catch (error) {
    return handleError(error);
  }
}