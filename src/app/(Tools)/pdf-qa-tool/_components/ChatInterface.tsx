'use client';

import React, {useState, useEffect, useRef} from 'react';
import {Send, RefreshCw, Loader2} from 'lucide-react';


type ConversationMessage = {
    role: 'user' | 'ai';
    text: string;
};

interface ChatInterfaceProps {
    extractedText: string;
    conversationHistory: ConversationMessage[];
    addMessage: (message: ConversationMessage) => void;
    onReset: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
   extractedText,
   conversationHistory,
   addMessage,
   onReset,
}) => {
    const [currentQuestion, setCurrentQuestion]= useState('');
    const [isWaitingForAI, setIsWaitingForAI]= useState(false);
    const [chatError, setChatError]= useState<string | null>(null);
    const messagesEndRef=useRef<HTMLDivElement>(null);

    //Auto-scroll to the bottom on new message
    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [conversationHistory]);

    const handleQuestionSubmit= async(e:React.FormEvent)=>{
        e.preventDefault();
        if(!currentQuestion.trim() || isWaitingForAI) return;

        const userQuestion= currentQuestion.trim();
        setCurrentQuestion('');
        setChatError(null);
        setIsWaitingForAI(true);
        addMessage({role: 'user', text: userQuestion});

        try{
            // 1. Call Backend Chat Endpoint
            const response= await fetch('api/chat',{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    question: userQuestion,
                    context: extractedText,
                }),
            });
            if(!response.ok){
                const errorData= await response.json();
                throw new Error(errorData.error || 'AI request failed.');
            }

            const {answer}= await response.json();

            // 2. Add AI Response
            addMessage({role: 'ai', text: answer || "I couldn't generate a response based on the document."});

        } catch(err: any){
            console.error('Chat Error:', err);
            setChatError(err.message || 'Failed to connect to AI service');
            addMessage({role: 'ai', text: 'Error: Failed to get an answer. Please try again.'});   
        } finally{
            setIsWaitingForAI(false);
        }
    };
      
            return(
                <div 
                className="flex flex-col h-[70vh] relative"
            >
               <div className="p-4 border-b border-neutral-700 flex justify-between items-center">
                <p className="text-sm text-neutral-400 italic">
                    Context Loaded: **{extractedText.length>50 ? extractedText.substring(0,50) + '...' : 'PDF Text'}**
                </p>
                <button
                    onClick={onReset}
                    className="text-sm text-red-500 hover:text-red-400 transition-colors flex items-center"
                    disabled={isWaitingForAI}
                >
                    <RefreshCw className="h-4 w-4 mr-1"/> New Document
                </button>
                </div>

                {/* Message History */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-900/50">
                {conversationHistory.length === 0 && (
                    <p className="text-center text-neutral-500 pt-10">
                        The document is loaded. Ask your first question!
                    </p>
                )}
                {conversationHistory.map((msg, index)=>(
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-3/4 p-3 rounded-lg text-sm shadow-md ${
                            msg.role === 'user'
                                ? 'bg-neutral-50 text-neutral-900 rounded-br-none'
                                : 'bg-neutral-700 text-neutral-50 rounded-tl-none'
                        }`}>
                            {msg.text}
                        </div>
                        </div>
                ))}
                {isWaitingForAI && (
                    <div className="flex justify-start">
                        <div className="max-w-3/4 p-3 rounded-lg rounded-tl-none bg-neutral-700 text-neutral-50 text-sm flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2"/>
                        AI is thinking...
                    </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleQuestionSubmit} className="p-4 border-t border-neutral-700">
                    {chatError && (
                        <p className="text-red-500 text-xs mb-2">Error: {chatError}</p>
                    )}
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={currentQuestion}
                            onChange={(e)=> setCurrentQuestion(e.target.value)}
                            placeholder="Ask a question based on the document..."
                            className="flex-1 p-3 bg-neutral-900 border border-neutral-700 text-neutral-50 focus:border-neutral-500 focus:ring-0 outline-none transition-colors"
                            disabled={isWaitingForAI}
                            />
                        <button
                            type="submit"
                            className={`p-3 border border-neutral-700 transition-colors ${
                                isWaitingForAI
                                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                                    : 'bg-neutral-50 text-neutral-900 hover:bg-neutral-200'
                            }`}
                            disabled={isWaitingForAI}
                            >
                                <Send className="h-5 w-5"/>
                            </button>
                    </div>
                </form>
            </div>
            );
        };
export default ChatInterface;