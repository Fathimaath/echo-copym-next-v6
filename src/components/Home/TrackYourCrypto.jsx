const ColourfulIcon = '/SVG/Colourfulicon.svg';
const WatchSVG = '/SVG/watch.svg';
const qrcode = '/SVG/qrcode.svg';
import { Apple } from 'lucide-react';
import Image from '../Image';

function WatchImage() {
  return (
    <div className="relative w-full m-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      <Image src={WatchSVG} alt="Watch illustration" width={512} height={512} className="w-full h-auto" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 z-10 drop-shadow-2xl">
          <div className="relative w-full aspect-[9/18]">
            <img
              src="/assets/Images/mock2.png"
              alt="App Mockup"
              width={288}
              height={576}
              className="w-[100%] h-[100%] object-contain mx-auto translate-y-2"
            />
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
          <span className="text-[9px] lg:text-[10px] text-white/80 leading-none mb-0.5" style={{ fontFamily: 'Palanquin, sans-serif' }}>Get it on</span>
          <span className="text-[16px] lg:text-[19px] text-white font-bold leading-none" style={{ fontFamily: 'Palanquin, sans-serif' }}>App Store</span>
        </div>
      </button>
      {/* Google Play */}
      <button type="button" className="flex items-center bg-black border border-white/30 rounded-lg px-2 lg:px-3 py-1 gap-2 lg:gap-3 hover:scale-105 transition-transform w-[160px] lg:w-[170px] h-[50px] lg:h-[54px] group cursor-pointer">
        <Image src={ColourfulIcon} alt="" width={24} height={24} className="w-[24px] h-[24px] lg:w-[26px] lg:h-[26px]" />
        <div className="flex flex-col items-start justify-center">
          <span className="text-[9px] lg:text-[10px] text-white/80 leading-none mb-0.5" style={{ fontFamily: 'Palanquin, sans-serif' }}>Get it on</span>
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

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 relative z-10 pb-0 mt-0">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-4 lg:items-center">
          {/* Mobile Heading */}
          <div className="lg:hidden space-y-2 sm:space-y-3 text-left w-full mt-10">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              <span className="text-white">Get </span><span className="text-[#15a36e]">CopyM</span> <span className="text-white">on Your Preferred Platform </span>
            </h2>
            <p className="text-sm text-white font-normal leading-relaxed max-w-2xl" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              Access your Copym account across devices with a unified, secure experience. <br />
              Stay connected to your real-world asset activity, insights, and portfolio context—anytime, anywhere. <br />
              <br />
              <span className="text-[#15a36e] font-semibold">Available on iOS, Android, Windows, and macOS</span>
            </p>
          </div>

          {/* Watch Image */}
          <div className="flex justify-center lg:justify-end items-center lg:pr-8">
            <WatchImage />
          </div>

          {/* Desktop Heading + Buttons + QR */}
          <div className="hidden lg:block space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl lg:text-[32px] font-bold text-white leading-tight" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                <span className="text-white">Get </span><span className="text-[#15a36e]">CopyM</span> <span className="text-white">on Your Preferred Platforms</span>
              </h2>
              <p className="text-sm lg:text-base text-white font-normal leading-snug" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                Access your Copym account across devices with a unified, secure experience. <br />
                Stay connected to your real-world asset activity, insights, and portfolio context—anytime, anywhere.<br />
                <br />
                <span className="text-[#15a36e] font-semibold">Available on iOS, Android, Windows, and macOS</span>
              </p>
            </div>
            <div className="flex flex-row items-center justify-start gap-6">
              <div className="flex flex-col gap-3">
                <DownloadButtons />
              </div>
              <div className="flex-shrink-0">
                <Image src={qrcode} alt="QR Code" width={160} height={160} className="w-32 h-32 xl:w-40 xl:h-40" />
              </div>
            </div>
          </div>

          {/* Mobile Buttons + QR */}
          <div className="lg:hidden flex flex-col items-center w-full pt-4 space-y-6">
            <div className="flex flex-row justify-center gap-3 w-full">
              <DownloadButtons />
            </div>
            <div className="flex justify-center">
              <Image src={qrcode} alt="QR Code" width={112} height={112} className="w-28 h-28" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}