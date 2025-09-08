
import React from 'react';
import { IconPhotoEdit } from './Icon';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 md:px-8 flex items-center gap-3">
         <IconPhotoEdit className="w-8 h-8 text-cyan-400" />
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
          Gemini AI Image Editor
        </h1>
      </div>
    </header>
  );
};
