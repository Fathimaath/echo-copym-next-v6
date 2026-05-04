const ColourfulIcon = '/SVG/Colourfulicon.svg';
import { QrCodeIcon } from '@heroicons/react/24/outline';
const WatchSVG = '/SVG/watch.svg';
const qrcode = '/SVG/qrcode.svg';
import { FaApple } from 'react-icons/fa';
import Image from 'next/image';

export default function TrackYourCrypto() {
  return (
    <section className="relative py-0 bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20"></div>
      </div>
      {/* Shorten the fade overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 md:h-16 bg-gradient-to-t from-white/10 to-transparent rounded-t-[28px] sm:rounded-t-[40px] md:rounded-t-[60px]"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 relative z-10 pb-0 mt-0">
        {/* Mobile/Tablet Layout (sm, md) - Vertical Stack like the image */}
        <div className="flex flex-col lg:hidden items-start text-left space-y-6 sm:space-y-8 md:space-y-10">
          {/* Title - Moved to Top */}
          <div className="space-y-2 sm:space-y-3 text-left w-full mt-10">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-[32px] font-bold text-white leading-tight" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              <span className="text-white">Get </span><span className="text-[#15a36e]">CopyM</span> <span className="text-white">on Your Preferred Platform </span>
            </h2>
            <p className="text-sm text-white font-normal leading-relaxed max-w-2xl" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              Access your Copym account across devices with a unified, secure experience. <br />
              Stay connected to your real-world asset activity, insights, and portfolio context—anytime, anywhere. <br />
              <br />
              <span className="text-[#15a36e] font-semibold">Available on iOS, Android, Windows, and macOS</span>
            </p>
          </div>

          {/* Watch SVG Background with Phone Video Overlay - Moved to Middle */}
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md flex justify-center items-center mx-auto pt-0">
            {/* Watch SVG - Static Background */}
            <div className="relative w-72 sm:w-80 md:w-96">
              <Image
                src={WatchSVG}
                alt="Watch illustration"
                width={384}
                height={384}
                className="w-full h-auto"
              />
              {/* Video Phone Overlay - Positioned on top of Watch SVG */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-40 sm:w-48 md:w-56 z-10 drop-shadow-2xl">
                  <div className="relative w-full aspect-[9/18]">
                    {/* Single Mockup Image */}
                    <Image
                      src="/assets/Images/mock2.png"
                      alt="App Mockup"
                      width={224}
                      height={448}
                      className="w-[100%] h-[100%] object-contain mx-auto translate-y-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Section - Buttons Row then QR Code */}
          <div className="flex flex-col items-center w-full pt-4 space-y-6">
            {/* Buttons Row */}
            <div className="flex flex-row justify-center gap-3 w-full">
              {/* Google Play */}
              <a href="#" className="flex items-center bg-black border border-white/30 rounded-lg px-2 py-1 gap-2 hover:scale-105 transition-transform w-[160px] h-[50px] group">
                <Image src={ColourfulIcon} alt="Google Play" width={24} height={24} className="w-[24px] h-[24px]" />
                <div className="flex flex-col items-start justify-center">
                  <span className="text-[9px] text-white/80 leading-none mb-0.5" style={{ fontFamily: 'Palanquin, sans-serif' }}>Get it on</span>
                  <span className="text-[16px] text-white font-bold leading-none" style={{ fontFamily: 'Palanquin, sans-serif' }}>Google Play</span>
                </div>
              </a>

              {/* App Store */}
              <a href="#" className="flex items-center bg-black border border-white/30 rounded-lg px-2 py-1 gap-2 hover:scale-105 transition-transform w-[160px] h-[50px] group">
                <FaApple className="text-white text-[26px] group-hover:text-white/90" />
                <div className="flex flex-col items-start justify-center">
                  <span className="text-[9px] text-white/80 leading-none mb-0.5" style={{ fontFamily: 'Palanquin, sans-serif' }}>Get it on</span>
                  <span className="text-[16px] text-white font-bold leading-none" style={{ fontFamily: 'Palanquin, sans-serif' }}>App Store</span>
                </div>
              </a>
            </div>

            {/* QR Code - Centered Below */}
            <div className="flex justify-center">
              <Image
                src={qrcode}
                alt="QR Code"
                width={112}
                height={112}
                className="w-28 h-28"
              />
            </div>
          </div>
        </div>

        {/* Desktop Layout (lg+) - More compact Horizontal Layout */}
        <div className="hidden lg:grid grid-cols-2 gap-4 lg:gap-4 items-center">
          {/* Left Side - Watch SVG with Overlaid Mobile */}
          <div className="flex justify-center lg:justify-end items-center relative order-2 lg:order-1 mt-0 lg:pr-8">
            {/* Watch SVG - Static Background */}
            <div className="relative w-full m-auto max-w-sm sm:max-w-md lg:max-w-lg">
              <Image
                src={WatchSVG}
                alt="Watch illustration"
                width={512}
                height={512}
                className="w-full h-auto"
              />

              {/* Video Phone Overlay - Positioned on top of Watch SVG */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 z-10 drop-shadow-2xl">
                  <div className="relative w-full aspect-[9/18]">
                    {/* Single Mockup Image */}
                    <Image
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
          </div>

          {/* Right Side - Marketing Content */}
          <div className="space-y-3 sm:space-y-4 text-left order-1 lg:order-2">
            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-[32px] font-bold text-white leading-tight" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                <span className="text-white">Get </span><span className="text-[#15a36e]">CopyM</span> <span className="text-white">on Your Preferred Platforms</span>
              </h2>
              <p className="text-xs sm:text-xs md:text-sm lg:text-base text-white font-normal leading-snug" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                Access your Copym account across devices with a unified, secure experience. <br />
                Stay connected to your real-world asset activity, insights, and portfolio context—anytime, anywhere.<br />
                <br />
                <span className="text-[#15a36e] font-semibold">Available on iOS, Android, Windows, and macOS</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Download Buttons Area */}
              <div className="flex flex-row items-center justify-start gap-6">
                {/* Download Buttons Stack */}
                <div className="flex flex-col gap-3">
                  <a href="#" className="flex items-center bg-black border border-white/30 rounded-lg px-3 py-1 gap-3 hover:scale-105 transition-transform w-[170px] h-[54px] group">
                    <FaApple className="text-white text-[28px] group-hover:text-white/90" />
                    <div className="flex flex-col items-start justify-center">
                      <span className="text-[10px] text-white/80 leading-none mb-0.5" style={{ fontFamily: 'Palanquin, sans-serif' }}>Get it on</span>
                      <span className="text-[19px] text-white font-bold leading-none" style={{ fontFamily: 'Palanquin, sans-serif' }}>App Store</span>
                    </div>
                  </a>
                  <a href="#" className="flex items-center bg-black border border-white/30 rounded-lg px-3 py-1 gap-3 hover:scale-105 transition-transform w-[170px] h-[54px] group">
                    <Image src={ColourfulIcon} alt="Google Play" width={26} height={26} className="w-[26px] h-[26px]" />
                    <div className="flex flex-col items-start justify-center">
                      <span className="text-[10px] text-white/80 leading-none mb-0.5" style={{ fontFamily: 'Palanquin, sans-serif' }}>Get it on</span>
                      <span className="text-[19px] text-white font-bold leading-none" style={{ fontFamily: 'Palanquin, sans-serif' }}>Google Play</span>
                    </div>
                  </a>
                </div>

                {/* QR Code */}
                <div className="flex-shrink-0">
                  <Image
                    src={qrcode}
                    alt="QR Code"
                    width={160}
                    height={160}
                    className="w-32 h-32 xl:w-40 xl:h-40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}