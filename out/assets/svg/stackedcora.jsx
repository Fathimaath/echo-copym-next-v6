import React from 'react';

export default function StepRectangles() {
  return (
    <div className="bg-transparent flex items-center justify-center p-2">
      <div className="relative w-full max-w-sm flex flex-col items-center">
        {/* Card 1 - Top (Longest, Tallest) */}
        <div className="w-11/12 h-14 bg-gray-900 rounded-full shadow-lg border border-gray-700 flex items-center px-4 relative z-20">
          <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1 text-white font-medium text-sm">Price alert</div>
          <div className="text-green-400 text-xs ml-1">↗</div>
          <div className="ml-3 w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center text-black">
            <span className="text-xs font-bold">₿</span>
          </div>
        </div>

        {/* Card 2 - Middle (Shorter width, same height, visible overlap) */}
        <div className="-mt-4 w-10/12 h-14 bg-gray-900 rounded-full shadow-md border border-gray-700 flex items-center px-4 relative z-10">
          <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1 text-gray-300 font-medium text-sm">Market news</div>
          <div className="ml-3 w-7 h-7 bg-gray-600 rounded-full flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
            </svg>
          </div>
        </div>

        {/* Card 3 - Bottom (Shortest width, same height, visible) */}
        <div className="-mt-4 w-9/12 h-14 bg-gray-900 rounded-full shadow-sm border border-gray-700 flex items-center px-4 relative z-0">
          <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V7z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1 text-gray-400 font-medium text-sm">Portfolio update</div>
          <div className="ml-3 w-7 h-7 bg-purple-500 rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}