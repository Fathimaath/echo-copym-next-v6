import React from 'react';

export default function StepRectangles() {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm flex flex-col items-center">
        {/* Top Card - Sharp, Clear */}
        <div className="w-full h-16 bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-full shadow-lg border border-gray-700 flex items-center px-4 mb-2 relative z-10">
          {/* Left Icon - AI / Assistant Icon */}
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM13 9h-2v2h2V9z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Text - "Meet Cora – your intelligent companion" */}
          <div className="ml-3 flex-1 text-white font-medium text-sm truncate">
            Meet Cora – your intelligent companion
          </div>

          {/* Right Icon - Sparkles or Star (to indicate smart/ai) */}
          <div className="text-blue-400 text-xs ml-1">
            ✨
          </div>

          <div className="ml-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        {/* Middle Card - Blurred, Faded, Offset */}
        <div className="absolute top-16 left-0 w-full h-14 bg-gray-900 bg-opacity-60 backdrop-blur-sm rounded-full shadow-md flex items-center px-4 z-0 opacity-70 blur-sm">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1 text-gray-300 font-medium text-xs">End-of-day update</div>
          <div className="ml-4 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
            </svg>
          </div>
        </div>

        {/* Bottom Layer - Depth Blur */}
        <div className="absolute top-20 left-0 w-full h-12 bg-gray-800 bg-opacity-40 rounded-full blur-sm opacity-30"></div>
      </div>
    </div>
  );
}