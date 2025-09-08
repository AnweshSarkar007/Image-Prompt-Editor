import React from 'react';
import type { EditedImage } from '../types';
import { Loader } from './Loader';
import { IconAlertTriangle, IconSparkles } from './Icon';

interface ImageViewerProps {
  editedImageResult: EditedImage | null;
  isLoading: boolean;
  error: string | null;
}

const Placeholder: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
    <IconSparkles className="w-16 h-16 mb-4 text-gray-600" />
    <h3 className="text-xl font-semibold text-gray-400">Your edited image will appear here</h3>
    <p className="mt-2 max-w-sm">
      Once you provide a prompt and click "Generate Edit", the AI-powered result will be displayed.
    </p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-red-400 bg-red-900/20 p-6 rounded-lg">
      <IconAlertTriangle className="w-16 h-16 mb-4" />
      <h3 className="text-xl font-semibold text-red-300">An Error Occurred</h3>
      <p className="mt-2 max-w-md">{message}</p>
    </div>
);

export const ImageViewer: React.FC<ImageViewerProps> = ({ editedImageResult, isLoading, error }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg w-full h-full p-4 flex items-center justify-center aspect-square">
      <div className="w-full h-full relative flex items-center justify-center">
        {isLoading && <Loader />}
        {!isLoading && error && <ErrorDisplay message={error} />}
        {!isLoading && !error && !editedImageResult && <Placeholder />}
        {!isLoading && !error && editedImageResult && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            {editedImageResult.imageUrl ? (
              <div className="w-full flex-grow rounded-md overflow-hidden ring-2 ring-gray-700" style={{ minHeight: 0 }}>
                <img
                  src={editedImageResult.imageUrl}
                  alt="Edited result"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-4">
                <IconAlertTriangle className="w-16 h-16 mb-4 text-yellow-500" />
                <h3 className="text-xl font-semibold text-gray-400">No Image Generated</h3>
                <p className="mt-2 max-w-sm">
                  The model provided a text-only response. See below for details.
                </p>
              </div>
            )}
            {editedImageResult.text && (
              <div className="w-full flex-shrink-0 max-h-[30%] overflow-y-auto">
                <p className="text-sm text-gray-300 bg-gray-700/50 p-3 rounded-md w-full text-left">
                  <strong className="text-gray-200 block mb-1 font-semibold">AI Response:</strong>
                  <span className="whitespace-pre-wrap">{editedImageResult.text}</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};