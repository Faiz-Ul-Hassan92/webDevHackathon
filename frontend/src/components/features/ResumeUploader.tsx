'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
//import { api } from '@/lib/api'; // We will create this next

interface ResumeUploaderProps {
  onUploadSuccess: (data: any) => void;
}

export default function ResumeUploader({ onUploadSuccess }: ResumeUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const processFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send to FastAPI
      const response = await fetch('http://localhost:8000/api/v1/resume/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      onUploadSuccess(data);
    } catch (err) {
      setError('Error analyzing resume. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200
          ${isDragging 
            ? 'border-blue-500 bg-blue-50/50' 
            : 'border-gray-300 hover:border-gray-400 bg-white'
          }
        `}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center animate-pulse">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              <p className="mt-4 text-sm font-medium text-gray-600">
                AI is reading your resume...
              </p>
              <p className="text-xs text-gray-400">This might take a few seconds</p>
            </div>
          ) : (
            <>
              <div className="p-4 bg-blue-50 rounded-full">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-gray-700">
                  Drop your Resume here
                </p>
                <p className="text-sm text-gray-500">
                  or click to browse (PDF only)
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
    </div>
  );
}