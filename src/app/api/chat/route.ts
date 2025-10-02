import {NextResponse} from 'next/server';

//Pollinations AI API base URL and model recommendations for text
const POLLINATIONS_TEXT_API_URL='https://text.pollinations.ai/';

export async function POST(request: Request){
    try{
        const {question, context}= await request.json();

        if(!question || !context){
            return NextResponse.json({error: 'Missing question or document context.'},{status: 400});
        }

        //1. Construct the Contextual Prompt (The RAG instruction)
        const systemPrompt= "You are a higly analytical and precise Q&A system. Your SOLE function is to analyze the provided text and answer the user's question. You MUST NOT engage in conversation, ask follow-up questions, or provide a menu of options.";
        

        const userContent = `
### DOCUMENT TEXT ###
${context}
---
### USER COMMAND ###
Analyze the document text above and immediately provide a complete answer to the following question:

Question: ${question}

---
### RULES ###
1. The response must be a direct answer or summary.
2. DO NOT respond with a menu of options (e.g., "Quick explainer," "Brainstorming," etc.).
3. DO NOT use external knowledge.
4. If the answer is not in the DOCUMENT TEXT, respond ONLY with: 'I am sorry, but the answer to your question is not explicitly found in the provided document text.'
        User Question: ${question}
        `.trim();

        const payload = {
            // Use the model parameter here
            "model": "mistral", // or "openai" based on what you prefer
            "messages": [
                { "role": "system", "content": systemPrompt },
                { "role": "user", "content": userContent }
            ],
            // Optional parameters
            "temperature": 0.0, // RAG tasks benefit from low temperature
            "private": true
        };
        //  Encode the prompt for the Pollinations GET API
       // const encodedPrompt = encodeURIComponent(fullPrompt);
        //  Call Pollinations AI 
        const url= `${POLLINATIONS_TEXT_API_URL}openai`;

        const timeout = 60000; // 60 seconds

    //  Setup the AbortController
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
        const aiResponse= await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
        });
        clearTimeout(id);
        //const rawText = await aiResponse.text();

        if(!aiResponse.ok){
            // attempt to read error message if available
            const errorText= await aiResponse.text();
            console.error(`Pollinations API Error: Status ${aiResponse.status} - Body:`, errorText);
            throw new Error(`AI API call failed with status ${aiResponse.status}. AI service response: ${errorText.substring(0,100)}...`);
        }
        const result = await aiResponse.json();
        
        // Extract the content from the OpenAI-compatible response structure
        const rawAnswerText = result?.choices?.[0]?.message?.content;
         // Final check for a non-text response body (like an HTML error page)
        if (!rawAnswerText) {
             console.error('Pollinations API returned non-text/empty body:', result);
             throw new Error('AI API returned an invalid or empty response.');
        }
        // 4. Get the raw text response
        //const rawAnswerText= await aiResponse.text();

        // 5. Return the AI's answer
        return NextResponse.json({answer: rawAnswerText.trim()}, {status: 200});
    } catch(error: any){
        console.error('AI Chat Processing Error:', error);
        const errorMessage = error.message || (error.name === 'TypeError' ? 'Network or Timeout Error (fetch failed)' : 'Unknown API Error');
        return NextResponse.json({error: `Could not process AI repsonse: ${errorMessage}`}, {status: 500});
    }
}