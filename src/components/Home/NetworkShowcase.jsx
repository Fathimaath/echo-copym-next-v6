import React from 'react';

export default function NetworkShowcase() {
  return (
    <section className="relative w-full py-10 sm:py-16 md:py-20 lg:py-20 bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        <div className="bg-black rounded-md overflow-hidden shadow-xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-contain"
            style={{ maxHeight: '520px' }}
          >
            <source src="/assets/videos/copymflows.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

