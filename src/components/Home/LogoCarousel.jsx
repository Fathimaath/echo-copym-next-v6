'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from '../Image';

const LogoCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = (event) => setPrefersReducedMotion(event.matches);

    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  const logos = [
    { src: "/assets/svg/Fireblocks.svg", alt: "Fireblocks" },
    { src: "/assets/svg/Sumsub_idtw6qkLj7_1.svg", alt: "Sumsub" },
    { src: "/assets/blockchains/solana.png", alt: "Solana" },
    { src: "/assets/blockchains/ethereum-eth-logo.svg", alt: "Ethereum" },
    { src: "/assets/svg/masdarr.svg", alt: "Masdar" },
    { src: "/assets/blockchains/arbitrum-arb-logo-full.svg", alt: "Arbitrum" },
    { src: "/assets/blockchains/aws-svgrepo-com.svg", alt: "AWS" },
    { src: "/assets/blockchains/Base_Logo_0.svg", alt: "Base" },
    { src: "/assets/blockchains/plume logo.jpg", alt: "Plume" },
    { src: "/assets/blockchains/Polygon.avif", alt: "Polygon" },
    { src: "/assets/blockchains/canton-logo-black.svg", alt: "Canton" },
  ];

  // Duplicate logos 3 times for seamless loop (reduced from 7)
  const duplicatedLogos = [...logos, ...logos, ...logos];

  const togglePause = () => setIsPaused(prev => !prev);

  return (
    <section className="w-full bg-white border-t border-gray-200 overflow-hidden -mt-px">
      <style>{`
        @keyframes logo-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
      <div className="w-full">
        <div className="bg-white shadow-sm overflow-hidden">
          <div className="relative w-full overflow-hidden">
            <div
              ref={marqueeRef}
              className="flex items-center py-1"
              style={{
                width: "200%",
                animation: `logo-marquee 20s linear infinite`,
                animationPlayState: isPaused || prefersReducedMotion ? 'paused' : 'running',
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {duplicatedLogos.map((logo, idx) => (
                <div key={`${logo.alt}-${idx}`} className="flex-shrink-0 px-6 sm:px-8 md:px-10 lg:px-12 flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    className={`${['Base', 'Plume', 'Canton'].includes(logo.alt)
                      ? 'h-3 sm:h-5 md:h-6 lg:h-7'
                      : 'h-7 sm:h-9 md:h-11 lg:h-12'
                      } w-auto object-contain max-w-[120px] sm:max-w-[140px] md:max-w-[160px]`}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="absolute bottom-2 right-2 z-10 bg-white/80 hover:bg-white text-gray-700 rounded-full w-7 h-7 flex items-center justify-center text-xs shadow transition-opacity opacity-30 hover:opacity-100 focus-visible:opacity-100"
              onClick={togglePause}
              aria-label={isPaused ? 'Play marquee animation' : 'Pause marquee animation'}
            >
              {isPaused ? '▶' : '⏸'}
            </button>
          </div>
        </div>
        {/* Premium Faded Green Separator Line */}
        <div
          className="w-full h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #15a36e 50%, transparent 100%)'
          }}
        ></div>
      </div>
    </section>
  );
};

export default LogoCarousel;
