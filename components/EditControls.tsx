
import React from 'react';

interface EditControlsProps {
  originalImageUrl: string;
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  onReset: () => void;
  isLoading: boolean;
}

export const EditControls: React.FC<EditControlsProps> = ({
  originalImageUrl,
  prompt,
  setPrompt,
  onGenerate,
  onReset,
  isLoading,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6 shadow-lg h-full flex flex-col">
      <div>
        <h2 className="text-lg font-semibold text-gray-300 mb-2">Original Image</h2>
        <div className="aspect-square w-full rounded-md overflow-hidden ring-2 ring-gray-700">
          <img src={originalImageUrl} alt="Original" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="flex-grow flex flex-col">
        <label htmlFor="prompt" className="block text-lg font-semibold text-gray-300 mb-2">
          Editing Prompt
        </label>
        <textarea
          id="prompt"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="block w-full text-sm text-gray-200 bg-gray-700 rounded-lg border border-gray-600 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 p-3 flex-grow"
          placeholder="e.g., 'add a birthday hat on the cat'"
          disabled={isLoading}
        ></textarea>
      </div>

      <div className="space-y-3">
        <button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full inline-flex justify-center items-center px-5 py-3 text-base font-medium text-center text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-500/50 disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-200"
        >
          {isLoading ? (
            <>
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Edit'
          )}
        </button>
        <button
          onClick={onReset}
          disabled={isLoading}
          className="w-full inline-flex justify-center items-center px-5 py-3 text-base font-medium text-center text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 focus:ring-4 focus:ring-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          Upload New Image
        </button>
      </div>
    </div>
  );
};
