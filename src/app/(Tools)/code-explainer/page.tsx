import React,{JSX} from 'react';
import { Code } from 'lucide-react';
import CodeExplainerClient from './code-explainer-client';

export default function CodeExplainerPage(): JSX.Element {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Section - Server-side rendered for SEO */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          AI Code Explainer Tool
        </h1>
        <p className="text-lg text-zinc-600 mb-6">
          Struggling to understand complex code? Our AI Code Explainer breaks down any code snippet into clear, easy-to-understand explanations. Whether you're learning a new programming language, debugging existing code, or trying to understand someone else's implementation - our tool provides detailed explanations tailored to your skill level.
        </p>
      </div>

      {/* Interactive Components - Client-side */}
      <CodeExplainerClient />

      {/* Description Section - Server-side rendered for SEO */}
      <article className="prose max-w-none mb-8 mt-12">
        <div className="bg-zinc-50 p-6 border rounded-md mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <Code className="h-5 w-5 text-primary" />
            Why Use Our Code Explainer?
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Understand complex algorithms and data structures</li>
            <li>Learn best practices and coding patterns</li>
            <li>Get explanations tailored to your skill level</li>
            <li>Support for multiple programming languages</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border p-4 rounded-md">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <Code className="h-4 w-4 text-blue-600" />
              <span>Instant Analysis</span>
            </h3>
            <p>
              Simply paste your code, select the language and your skill level, and get a comprehensive explanation in seconds. Perfect for learning and debugging.
            </p>
          </div>
          <div className="border p-4 rounded-md">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <Code className="h-4 w-4 text-green-600" />
              <span>Adaptive Explanations</span>
            </h3>
            <p>
              Our AI adjusts the complexity of explanations based on your selected skill level, from beginner-friendly to expert-level technical details.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            <Code className="h-4 w-4 text-zinc-600" />
            Tips for Better Code Explanations
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Select the correct programming language for accurate analysis</li>
            <li>Choose your skill level to get appropriately detailed explanations</li>
            <li>Include relevant comments in your code for better context</li>
            <li>For large codebases, focus on specific functions or methods</li>
          </ul>
          <p className="mt-4 text-sm text-zinc-500 flex items-center gap-2">
            <Code className="h-3 w-3" />
            Our AI analyzes code structure, syntax, and patterns to provide comprehensive explanations that help you understand and learn from the code.
          </p>
        </div>
      </article>
    </div>
  );
}