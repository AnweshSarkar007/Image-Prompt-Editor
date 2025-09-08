
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { EditControls } from './components/EditControls';
import { ImageViewer } from './components/ImageViewer';
import { editImageWithGemini } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import type { EditedImage } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [editedImageResult, setEditedImageResult] = useState<EditedImage | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setEditedImageResult(null);
    setError(null);
    setPrompt('');
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !prompt.trim()) {
      setError('Please upload an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImageResult(null);

    try {
      const { base64, mimeType } = await fileToBase64(originalImage);
      const result = await editImageWithGemini(base64, mimeType, prompt);
      setEditedImageResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalImageUrl(null);
    setEditedImageResult(null);
    setPrompt('');
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {!originalImageUrl ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3 flex-shrink-0">
              <EditControls
                originalImageUrl={originalImageUrl}
                prompt={prompt}
                setPrompt={setPrompt}
                onGenerate={handleGenerate}
                onReset={handleReset}
                isLoading={isLoading}
              />
            </div>
            <div className="w-full lg:w-2/3">
              <ImageViewer
                editedImageResult={editedImageResult}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
