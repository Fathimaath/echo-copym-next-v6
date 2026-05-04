"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from '@/components/Image'; // Import our AVIF-compatible Image component

export default function PassUnlocksSection() {
  const benefits = [
    {
      title: "Token-gated content",
      description: "Token-gated content and insider market reports",
      icon: "/assets/Images/icons/Access1.png"
    },
    {
      title: "Lower platform",
      description: "Lower platform trading fees",
      icon: "/assets/Images/icons/t4.png"
    },
    {
      title: "Limited-edition NFT",
      description: "Limited-edition NFT collectibles",
      icon: "/assets/Images/icons/Access3.png"
    },
    {
      title: "Invitations to Meetups",
      description: "Invitations to COPYM IRL meetups and global summits",
      icon: "/assets/Images/icons/Access4.png"
    },
    {
      title: "Early access",
      description: "Early access to new asset tokenizations",
      icon: "/assets/Images/icons/Access5.png"
    },
    {
      title: "Governance voting",
      description: "Governance voting rights in COPYM DAO decisions",
      icon: "/assets/Images/icons/Access6.png"
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-20">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight uppercase mb-3 sm:mb-4 md:mb-5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <span className="text-black">EVERYTHING YOUR </span>
            <span className="text-[#15a36e]">PASS UNLOCKS</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-gray-600 leading-relaxed max-w-6xl mx-auto px-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Discover the exclusive benefits and features that come with your COPYM Access Pass.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black border border-[#15a36e]/30 rounded-lg p-6 sm:p-8 hover:border-[#15a36e] transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[#15a36e] font-semibold text-lg sm:text-xl mb-3 text-center dm-sans">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-white/80 text-sm sm:text-base text-center leading-relaxed dm-sans">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

