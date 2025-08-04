"use client";
import { useState } from "react";

export default function CodeExplainer() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleExplain = () => {
    // Mocked output (you'll use real AI later)
    setExplanation(`This code defines a function and prints something to console.
This is a placeholder response.`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Code Explainer</h1>
      <textarea
        rows="10"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className="w-full p-3 border border-gray-300 rounded mb-4"
      ></textarea>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleExplain}
      >
        Explain Code
      </button>

      {explanation && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Explanation:</h2>
          <p className="whitespace-pre-line">{explanation}</p>
        </div>
      )}
    </div>
  );
}
