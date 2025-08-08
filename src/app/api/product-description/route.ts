import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "@/lib/rate-limiter";

// Helper function to handle errors
const handleError = (error: unknown) => {
  console.error("Product Description API Error:", error);
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

// Product Description Generation Endpoint
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
      productName,
      keyFeatures,
      targetAudience,
      tone,
    } = await req.json();

    const systemPrompt = `You are an expert e-commerce copywriter specializing in creating compelling product descriptions that convert browsers into buyers. Your task is to generate a professional, benefit-driven product description based on the provided information.

**Instructions:**
1. **Analyze the inputs:** Consider the product name, key features, target audience, and desired tone.
2. **Create a compelling headline:** Start with an engaging product headline that captures attention.
3. **Structure the description effectively:**
   - Lead with the main benefit or unique selling proposition
   - Transform features into customer benefits (what it means for them)
   - Use persuasive language that creates desire and urgency
   - Address potential customer concerns or objections
   - End with a strong call to action
4. **Match the tone:** Ensure the language and style align with the specified tone (${tone}).
5. **Optimize for conversion:**
   - Use power words that motivate action
   - Include social proof elements when appropriate
   - Create urgency without being pushy
   - Focus on outcomes and experiences, not just specifications
6. **Format for readability:**
   - Use short paragraphs (2-3 sentences max)
   - Include bullet points for key features if beneficial
   - Ensure the description is scannable and easy to read
7. **Target audience consideration:** Tailor the language and focus areas to resonate with ${targetAudience || "general consumers"}.
8. **Output:** Return ONLY the product description text. Do not include JSON formatting, quotes, or additional explanations.

Example structure:
[Compelling Headline]

[Opening hook that states main benefit]

[Paragraph expanding on key benefits and how they solve problems]

[Feature highlights with benefit translations]

[Trust/credibility elements]

[Call to action]`;

    const userPrompt = `
**Product Name:** ${productName}
**Key Features & Specifications:** ${keyFeatures}
**Target Audience:** ${targetAudience || "General consumers"}
**Desired Tone:** ${tone}

Please create a compelling, conversion-focused product description that highlights benefits, addresses customer needs, and motivates purchase decisions.
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
        const simplePrompt = `Write a ${tone} product description for ${productName}. Features: ${keyFeatures}. Target audience: ${targetAudience || "general consumers"}. Focus on benefits and conversion.`;
        const encodedPrompt = encodeURIComponent(simplePrompt);
        
        const getResponse = await fetch(`https://text.pollinations.ai/${encodedPrompt}?json=true&referrer=aitoolbox.software`, {
          headers: getAuthHeaders(),
        });
        
        if (!getResponse.ok) {
          throw new Error(`Failed to generate product description: ${getResponse.status} ${getResponse.statusText}`);
        }
        
        const textResult = await getResponse.text();
        return NextResponse.json({
          success: true,
          data: textResult,
        });
      }
      
      throw new Error(`Failed to generate product description: ${response.status} ${response.statusText}`);
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
