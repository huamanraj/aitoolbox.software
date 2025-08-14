import React from "react";

type Props = {
  output: string;
  isLoading: boolean;
};

const BioGeneratorOutput: React.FC<Props> = ({ output, isLoading }) => {
  return (
    <div className="mt-4">
      {isLoading ? (
        <p className="bg-yellow-100 p-3 rounded text-yellow-800">Generating...</p>
      ) : (
        <p className="bg-gray-100 p-3 rounded">{output || "Your bio will appear here."}</p>
      )}
    </div>
  );
};

export default BioGeneratorOutput;
