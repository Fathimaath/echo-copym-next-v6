const ColourfulIcon = '/SVG/Colourfulicon.svg';
const WatchSVG = '/SVG/watch.svg';
const qrcode = '/SVG/qrcode.svg';
import { Apple } from 'lucide-react';
import Link from 'next/link';
import Image from '../Image';

function WatchImage() {
  return (
    <div className="relative w-full m-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      <Image src={WatchSVG} alt="Watch illustration" width={512} height={512} className="w-full h-auto" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 z-10 drop-shadow-2xl">
          <div className="relative w-full aspect-[9/18]">
            <img
              src="/assets/Images/mock2.webp"
              alt="App Mockup"
              width={288}
              height={576}
              className="w-[100%] h-[100%] object-contain mx-auto translate-y-2"
              loading="lazy"
            />
            {/* Illustrative Label */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap pointer-events-none">
              <span className="inline-flex items-center rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white px-2.5 py-0.5 text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase shadow-md">
                Illustrative
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DownloadButtons() {
  return (
    <>
      {/* App Store */}
      <button type="button" className="flex items-center bg-black border border-white/30 rounded-lg px-2 lg:px-3 py-1 gap-2 lg:gap-3 hover:scale-105 transition-transform w-[160px] lg:w-[170px] h-[50px] lg:h-[54px] group cursor-pointer">
        <Apple className="text-white text-[26px] lg:text-[28px] group-hover:text-white/90" />
        <div className="flex flex-col items-start justify-center">
          <span className="text-xs sm:text-xs lg:text-[11px] text-white/80 leading-none mb-0.5" style={{ fontFamily: 'Palanquin, sans-serif' }}>Get it on</span>
          <span className="text-[16px] lg:text-[19px] text-white font-bold leading-none" style={{ fontFamily: 'Palanquin, sans-serif' }}>App Store</span>
        </div>
      </button>
      {/* Google Play */}
      <button type="button" className="flex items-center bg-black border border-white/30 rounded-lg px-2 lg:px-3 py-1 gap-2 lg:gap-3 hover:scale-105 transition-transform w-[160px] lg:w-[170px] h-[50px] lg:h-[54px] group cursor-pointer">
        <Image src={ColourfulIcon} alt="" width={24} height={24} className="w-[24px] h-[24px] lg:w-[26px] lg:h-[26px]" />
        <div className="flex flex-col items-start justify-center">
          <span className="text-xs sm:text-xs lg:text-[11px] text-white/80 leading-none mb-0.5" style={{ fontFamily: 'Palanquin, sans-serif' }}>Get it on</span>
          <span className="text-[16px] lg:text-[19px] text-white font-bold leading-none" style={{ fontFamily: 'Palanquin, sans-serif' }}>Google Play</span>
        </div>
      </button>
    </>
  );
}

export default function TrackYourCrypto() {
  return (
    <section className="relative py-0 bg-black">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 md:h-16 bg-gradient-to-t from-white/10 to-transparent rounded-t-[28px] sm:rounded-t-[40px] md:rounded-t-[60px]"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 relative z-10 pb-12 lg:pb-16 pt-10 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-6 lg:items-center">
          {/* Heading & Description */}
          <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 space-y-2 sm:space-y-3 lg:space-y-4 text-left w-full">
            <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-white leading-tight" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              <span className="text-white">Get </span><span className="text-[#15a36e]">CopyM</span> <span className="text-white">on Your Preferred Platforms</span>
            </h2>
            <p className="text-sm lg:text-base text-white font-normal leading-relaxed lg:leading-snug max-w-2xl" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              Access your CopyM account across devices with a unified, secure experience. <br />
              Stay connected to your real-world asset activity, insights, and portfolio context—anytime, anywhere. <br />
              <br />
              <span className="text-[#15a36e] font-semibold">Available on iOS, Android, Windows, and macOS</span>
            </p>
            <div className="pt-1">
              <Link
                href="/white-label/"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-neutral-300 hover:text-[#15a36e] transition-colors"
                style={{ fontFamily: 'Palanquin, sans-serif' }}
              >
                <span>Looking for a branded portal for your own clients? Explore our White-label platform</span>
                <span className="text-[#15a36e]">→</span>
              </Link>
            </div>
          </div>

          {/* Watch Image / Phone Mockup */}
          <div className="order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2 flex justify-center lg:justify-end items-center my-6 lg:my-0 lg:pr-8">
            <WatchImage />
          </div>

          {/* Download Buttons + QR Code */}
          <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-2 lg:pt-0 w-full">
            <div className="flex flex-row lg:flex-col justify-center sm:justify-start gap-3 w-full sm:w-auto">
              <DownloadButtons />
            </div>
            <div className="flex-shrink-0 flex justify-center">
              <Image src={qrcode} alt="QR Code" width={160} height={160} className="w-28 h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}