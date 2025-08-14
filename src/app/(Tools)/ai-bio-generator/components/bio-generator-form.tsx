"use client";

import { useState } from "react";

type Props = {
  onGenerate: (input: string) => void;
};

const BioGeneratorForm = ({ onGenerate }: Props) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onGenerate(input);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your details..."
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        Generate Bio
      </button>
    </form>
  );
};

export default BioGeneratorForm;
