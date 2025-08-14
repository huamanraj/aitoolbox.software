"use client";

import React, { useState,JSX } from 'react';
import CodeExplainerInput from './code-explainer-input';
import CodeExplainerOutput from './code-explainer-output';
import NativeBannerAd from '@/components/NativeBannerAd';

interface FormData {
  code: string;
  language: string;
  level: string;
}

export default function CodeExplainerClient(): JSX.Element {
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFormData, setCurrentFormData] = useState<FormData | null>(null);

  return (
    <>
      {/* Input Component */}
      <CodeExplainerInput
        explanation={explanation}
        setExplanation={setExplanation}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
        setError={setError}
        currentFormData={currentFormData}
        setCurrentFormData={setCurrentFormData}
      />
      

      {/* Output Component */}
      <CodeExplainerOutput
        explanation={explanation}
        setExplanation={setExplanation}
        isLoading={isLoading}
        error={error}
        currentFormData={currentFormData}
        setIsLoading={setIsLoading}
        setError={setError}
      />
      {/* Ad Banner */}
        <NativeBannerAd />

    </>
  );
}