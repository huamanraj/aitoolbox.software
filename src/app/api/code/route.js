
export async function POST(request) {
  try {
    const { code, language, level } = await request.json();

    if (!code || !language || !level) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: code, language, and level are required' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create a detailed prompt for the AI
    const prompt = `Explain this ${language} code for a ${level.toLowerCase()} programmer:

Code:
\`\`\`${language.toLowerCase()}
${code}
\`\`\`

Please provide a ${level.toLowerCase()}-level explanation that includes:
1. What the code does overall
2. How each part works
3. Key concepts and patterns used
${level === 'Beginner' ? '4. Basic terminology explanations' : ''}
${level === 'Advanced' || level === 'Expert' ? '4. Performance considerations and best practices' : ''}

Make the explanation clear, detailed, and educational.`;
    // Call the Pollinations AI API
    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'CodeExplainer/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Pollinations API returned ${response.status}: ${response.statusText}`);
    }

    const explanation = await response.text();

    return new Response(
      JSON.stringify({ 
        data: explanation,
        success: true 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Code explanation error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to generate code explanation. Please try again.',
        success: false 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}