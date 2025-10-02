'use client';

import {useState} from 'react';
import PdfUploadForm from './_components/PdfUploadForm';
import ChatInterface from './_components/ChatInterface';

type ConversationMessage={
    role: 'user' | 'ai';
    text : string;
};

export default function PdfQAToolPage() {
    const [extractedText, setExtractedText]= useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState<string | null>(null);
    const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);

    const handleTextExtraction = (text: string) => {
        setExtractedText(text);
        setError(null);
    };

    //function to add a new message to the chat history
    const addMessage=(message:ConversationMessage)=>{
        setConversationHistory((prev) => [...prev, message]);
    };
    const handleReset = () => {
        setExtractedText(null);
        setConversationHistory([]);
        setError(null);
    };

    return(
        <div className="min-h-screen bg-neutral-900 text-neutral-50 p-4 md:p-8">
        <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
                PDF Knowledge Extractor
            </h1>
            <p className="text-lg text-neutral-400 mt-2">
                Ask questions. Get answers. Straight from your document.
            </p>
            </header>
        
        <main className="max-w-4xl mx-auto border-neutral-700 bg-neutral-800 shadow-2xl">
            {extractedText ? (
                <ChatInterface
                    extractedText={extractedText}
                    conversationHistory={conversationHistory}
                    addMessage={addMessage}
                    onReset={handleReset}
                />
            ): (
                <PdfUploadForm
                    onTextExtracted={handleTextExtraction}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    error={error}
                    setError={setError}
                />
            )}
        </main>
        <section className="max-w-4xl mx-auto mt-16 text-neutral-400 leading-relaxed">
            <h2 className="text-3xl font-bold text-neutral-50 mb-4">
                Unleash the Power of Your Documents: The PDF Knowledge Extractor
            </h2>
            <p className="mb-4">
                In the age of information, data is often trapped within static file formats.
                Our PDF Knowledge Extractor revolutionizes how you interact with your documentation,
                reports, and research papers. Instead of endless scrolling and maunal searching,
                you can simply ask a question and receive a precise, context-driven answer-guaranteed
                to be derived only from the text you provide.
            </p>
            <p className="mb-4">
                Built on the powerful Next.js framework, this tool offers blazing-fast performance,
                leveraging Server-Side Rendering (SSR) for optimal loading and search engine
                visibility. We use advanced open-source AI models, like those accessible through
                the Pollinations API, to ensure this essential technology remains free and open
                to all users.
            </p>
            <h3 className="text-xl font-bold text-neutral-50 mt-6 mb-3">
                How It Works: Precision meets Privacy
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                    **Deep Parsing:** The moment your PDF is uploaded, our server-side engine extracts the raw
                text content, creating a pure knowledge base. 
                </li>
                <li>
                    **Contextual Restriction:** Your question, along with the entire document text,
                    is packaged into a highly specific prompt. The AI is strictly instructed to 
                    act as a Retrival-Augmented Generation (RAG) system, preventing it from 
                    drawing on external knowledge.
                </li>
                <li>
                    **Monochromatic Mastery:** The clean, monochromatic UI ensures a distraction-free,
                    professional experience, consistent with the edgy design of the platform.
                </li>
            </ul>
        </section>
        </div>
    );
}