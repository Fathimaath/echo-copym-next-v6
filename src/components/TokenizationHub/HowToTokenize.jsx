"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';



export default function HowToTokenize() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = React.useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });

  const steps = [
    {
      step: '1',
      title: 'ONBOARD THE ASSET',
      description: 'The issuer provides documents and the legal structure, prepared with its advisers. CopyM records and verifies them in the platform.'
    },
    {
      step: '2',
      title: 'ISSUE TOKENS',
      description: 'CopyM deploys permissioned tokens with transfer rules; the issuer approves the terms.'
    },
    {
      step: '3',
      title: 'ONBOARD INVESTORS',
      description: 'KYC/AML and eligibility checks run through the platform. Only verified wallets can hold the tokens.'
    },
    {
      step: '4',
      title: 'MANAGE AND TRANSFER',
      description: 'Permissioned transfers, distributions and reporting. Secondary transfers run only through licensed venues where legally permitted.'
    }
  ];

  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = stepRefs.current[activeStep];
      if (activeEl) {
        setIndicatorStyle({
          top: activeEl.offsetTop,
          height: activeEl.offsetHeight
        });
      }
    };

    updateIndicator();

    // Recalculate on resize
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeStep]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="relative bg-white pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="relative w-fit mx-auto mb-4">
            <h2 className="inline-flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-bold uppercase leading-tight pb-2 !mb-0" style={{ fontFamily: 'Palanquin, sans-serif' }}>
              <span className="text-black">HOW TO</span> <span className="text-[#15a36e]">TOKENIZE</span> <span className="text-black">ASSETS</span>
            </h2>
          </div>
        </div>

        {/* Main Content Card */}
        <div
          className="bg-white rounded-lg border border-gray-100 overflow-hidden"
          style={{ boxShadow: '0px 4px 48.9px 0px #BDE3D5' }}
        >
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Left Column: Steps */}
            <div className="flex-1 flex flex-col relative">
              {/* Moving Indicator */}
              <motion.div
                className="absolute left-0 w-[6px] bg-[#15a36e] z-20"
                animate={{
                  top: indicatorStyle.top,
                  height: indicatorStyle.height
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />

              {steps.map((step, index) => (
                <div
                  key={index}
                  ref={el => stepRefs.current[index] = el}
                  onClick={() => setActiveStep(index)}
                  className={`p-4 sm:p-6 md:p-8 border-l-[6px] border-transparent cursor-pointer transition-all duration-300 relative group
                    ${index !== steps.length - 1 ? 'border-b border-gray-100' : ''}
                    ${activeStep === index ? 'bg-emerald-50/30' : 'hover:bg-gray-50/50'}`}
                >
                  <h3 className={`text-lg sm:text-xl font-bold mb-2 tracking-wider flex items-center gap-3 transition-colors duration-300
                    ${activeStep === index ? 'text-[#10b981]' : 'text-gray-400 group-hover:text-gray-600'}`}
                    style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold border transition-colors duration-300 shrink-0
                      ${activeStep === index ? 'bg-[#10b981] text-white border-[#10b981]' : 'bg-transparent text-gray-400 border-gray-300 group-hover:border-gray-400'}`}>
                      {step.step}
                    </span>
                    <span>{step.title}</span>
                  </h3>
                  <p className={`text-sm sm:text-base leading-relaxed font-medium transition-colors duration-300 pl-0 sm:pl-9
                    ${activeStep === index ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-500'}`}
                    style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column: Laptop Mockup */}
            <div className="flex-1 bg-white flex items-center justify-center p-6 sm:p-10 md:p-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative w-full max-w-lg"
              >
                <div className="relative z-10">
                  <img
                    src="/assets/Images/dashboard_screen.avif"
                    alt="Dashboard Screenshot"
                    className="w-full h-auto object-contain rounded-lg transform scale-110"
                    style={{ filter: 'drop-shadow(0 20px 40px rgba(21, 163, 110, 0.4))' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
