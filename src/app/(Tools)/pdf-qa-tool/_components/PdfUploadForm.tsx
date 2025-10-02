'use client';

import React, {useCallback, useRef} from 'react';
import {Upload, X, Loader2} from 'lucide-react';

interface PdfUploadFormProps {
    onTextExtracted: (text: string) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
}

const PdfUploadForm: React.FC<PdfUploadFormProps> = ({
    onTextExtracted,
    isLoading,
    setIsLoading,
    error,
    setError
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = useCallback(async (file: File) => {
        setError(null);
        // 1.Validation
        if (file.type !== 'application/pdf') {
            setError('Invalid file type. Please upload a .pdf file.');
            return;
        }
        setIsLoading(true);
        
        try{
            // 2. Send to Backend Parsing Endpoint
            const formData = new FormData();
            formData.append('pdfFile', file);

            const response = await fetch('/api/parse-pdf', {
                method: 'POST',
                body: formData
            });
            let result;
            try {
            result = await response.json(); // read once
            } catch {
            const text = await response.text(); // fallback if not JSON
            throw new Error("Server did not return valid JSON: " + text);
            }
            if (!response.ok) {
                throw new Error(result.error || 'PDF parsing failed on server.');
            }
              //const {text} = await response.json();

              if(!result.text || result.text.trim().length === 0) {
                    throw new Error('Could not extract any meaningful text from the PDF.');
              }
              // 3. Success
                onTextExtracted(result.text); 
            } catch(err: any){
                console.error('Upload Error:', err);
                setError(err.message || 'An unknown error occurred during upload.');
            } finally{
                //Reset file input for next use
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
            }, [onTextExtracted, setError, setIsLoading, fileInputRef]);

            const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
                event.preventDefault();
                event.stopPropagation();
                if (isLoading) return;

                const file = event.dataTransfer.files?.[0];
                if (file){
                    processFile(file);  
                }
            }, [isLoading, processFile]);

            const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
                event.preventDefault();
                event.stopPropagation();
                if (isLoading) return;
            },[isLoading]);
            return(
                <div 
                className="p-10 border-2 border-dashed border-neutral-700 rounded-lg
                text-center cursor-pointer hover:border-neutral-500 transition-colors
                "
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input type="file" accept=".pdf" className="hidden" ref={fileInputRef} onChange={handleFileChange} disabled={isLoading}/>
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center">
                        <Loader2 className="h-8 h-8 animate-spin text-neutral-50"/>
                        <p className="mt-3 text-lg text-neutral-400">Processing PDF...</p>
                        <p className="text-sm text-neutral-500">Extracting text on the server.</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Upload className="h-10 w-10 text-neutral-50"/>
                        <p className="mt-4 text-xl font-semibold text-neutral-50">
                            Drag & Drop PDF here
                        </p>
                        <p className="mt-1 text-neutral-400">or click to browse (.pdf only)</p>
                    </div>
                )}
                {error && (
                    <div className="mt-4 p-3 bg-red-900/50 border border-red-700 text-red-300 flex items-center justify-between text-sm">
                        <span>Error: {error}</span>
                        <X className="h-4 w-4 cursor-pointer" onClick={(e) => {e.stopPropagation(); setError(null); }} />
                    </div>
                )}

            </div>
            );
        };
export default PdfUploadForm;