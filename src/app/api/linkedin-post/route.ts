import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "@/lib/rate-limiter";

// Helper function to handle errors
const handleError = (error: unknown) => {
  console.error("LinkedIn Post API Error:", error);
  const message = error instanceof Error ? error.message : "An unexpected error occurred";
  return NextResponse.json(
    { error: message },
    { status: 500 }
  );
};

// Check if API token is configured - optional but recommended
const POLLINATIONS_API_TOKEN = process.env.POLLINATIONS_API_TOKEN;

if (!POLLINATIONS_API_TOKEN) {
  console.warn("Warning: POLLINATIONS_API_TOKEN is not configured in environment variables - using anonymous access");
}

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

// LinkedIn Post Generation Endpoint
export async function POST(req: NextRequest) {
  // Rate limiting by IP
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const allowed = rateLimiter(ip, 1, 1000); // 1 request per 1 second

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const {
      topic,
      tone,
      keyPoints,
    } = await req.json();

    const systemPrompt = `You are an expert LinkedIn content creator and professional networking specialist. Your task is to generate engaging, professional LinkedIn posts that drive engagement and build meaningful connections.

**Instructions:**
1. **Analyze the inputs:** Carefully consider the topic, tone, and key points provided.
2. **Create an engaging hook:** Start with a compelling first line that captures attention and encourages reading.
3. **Structure the post properly:**
   - Use short paragraphs (2-3 sentences max) for readability
   - Include personal insights and authentic storytelling
   - Make it conversational and professional
   - End with a call to action or question to encourage engagement
4. **Optimize for LinkedIn algorithm:**
   - Keep the post between 1,000-3,000 characters for optimal engagement
   - Include 5-10 relevant hashtags at the end
   - Use line breaks to improve readability
5. **Match the tone:** Ensure the language and style match the specified tone (${tone}).
6. **Include key points:** Incorporate any specific details, achievements, or hashtags mentioned.
7. **Output Format:** Return ONLY the LinkedIn post text. Do not include any JSON formatting, quotes, or additional text. Return the post content directly.

Example output:
🎉 Exciting news to share! After months of hard work and dedication, I'm thrilled to announce that our team has successfully launched our new product.

This journey has been incredible - from the initial brainstorming sessions to late-night coding sessions, every challenge has made us stronger. We've learned that innovation isn't just about great ideas; it's about execution, teamwork, and relentless focus on our users' needs.

The response so far has been overwhelming, and I'm grateful for the support from our amazing community. This is just the beginning of what we're building together.

What's the most challenging project you've worked on recently? I'd love to hear your experiences!

#ProductLaunch #Innovation #Teamwork #StartupLife #TechCommunity #ProfessionalGrowth #Leadership #Success`;

    const userPrompt = `
**Topic:** ${topic}
**Tone:** ${tone}
**Key Points/Keywords:** ${keyPoints || "None provided"}

Please generate a professional LinkedIn post based on the above information. The post should be engaging, authentic, and optimized for LinkedIn's algorithm.
`;

    // Following Pollinations API documentation for Text-To-Text via POST
    const response = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        model: "openai", // Using default model from Pollinations
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        referrer: "aitoolbox.software", // Adding referrer for better rate limits
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Pollinations API Error:", errorText);
      
      // Try the GET endpoint as a fallback for simple text generation
      if (response.status === 404) {
        console.log("POST endpoint not found, trying GET endpoint as fallback...");
        
        // Construct a simplified prompt for the GET endpoint
        const simplePrompt = `Generate a ${tone} LinkedIn post about ${topic}. ${keyPoints ? `Include: ${keyPoints}` : ''} Return only the post text, no JSON formatting.`;
        const encodedPrompt = encodeURIComponent(simplePrompt);
        
        const getResponse = await fetch(`https://text.pollinations.ai/${encodedPrompt}?json=true&referrer=aitoolbox.software`, {
          headers: getAuthHeaders(),
        });
        
        if (!getResponse.ok) {
          throw new Error(`Failed to generate LinkedIn post: ${getResponse.status} ${getResponse.statusText}`);
        }
        
        const textResult = await getResponse.text();
        return NextResponse.json({
          success: true,
          data: textResult,
        });
      }
      
      throw new Error(`Failed to generate LinkedIn post: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Handle different response structures from Pollinations API
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      return NextResponse.json({
        success: true,
        data: data.choices[0].message.content,
      });
    } else if (data.content) {
      // Some Pollinations endpoints return content directly
      return NextResponse.json({
        success: true,
        data: data.content,
      });
    } else {
      console.error("Unexpected response structure:", data);
      // Attempt to return whatever we got if it might be useful
      if (typeof data === 'string') {
        return NextResponse.json({
          success: true,
          data: data,
        });
      } else {
        return NextResponse.json({
          success: true,
          data: JSON.stringify(data),
        });
      }
    }

  } catch (error) {
    return handleError(error);
  }
} 