import React from 'react';

export default function CoraNotification() {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm flex flex-col items-center">
        {/* Notification Card - Semi-Transparent Background */}
        <div className="w-11/12 h-40 bg-gray-900 bg-opacity-80 rounded-2xl shadow-lg border border-gray-700 flex flex-col px-5 py-4 relative z-10">
          {/* Left Side: Upward Triangles */}
          <div className="absolute left-4 top-4 bottom-4 flex flex-col space-y-1">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${i === 0 ? 'bg-green-500' : 'bg-gray-600'} rounded-full`}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="ml-12 mt-2 flex items-center">
            {/* Icon */}
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 text-white font-medium text-sm">Cora AI</div>
            <div className="text-green-400 text-sm ml-1">is up</div>
            <div className="text-green-400 font-bold text-sm">+3.63%</div>
          </div>

          {/* Description */}
          <div className="mt-4 ml-12 text-gray-300 text-xs leading-tight">
            Cora AI's performance has improved significantly after the release of its new intelligent features.
          </div>
        </div>
      </div>
    </div>
  );
}