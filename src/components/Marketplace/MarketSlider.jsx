"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  GiRoundStar,
  GiChart,
  GiShield,
  GiGlobe,
  GiPerson
} from "react-icons/gi";
import Link from "next/link";
import { Player } from '@lottiefiles/react-lottie-player';

import ChromaGrid from "@/components/ChromaGrid";

// Import Lottie JSON file
import marketplace3rd from '@/../public/lotties/Marketplace-3rd.json';

// Custom CSS for hiding scrollbars
const scrollbarHideStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

// --- Asset data for ChromaGrid ----
const mockAssets = [
  {
    id: "real-estate-1",
    title: "Premium Office Building",
    subtitle: "Real Estate Investment",
    location: "New York, USA",
    roi: "8.5% ROI",
    expectedRoi: "8.5%",
    image: "/assets/Images/premium-office-building-1.png",
    url: "/market/real-estate/",
    description: "A Class A office building in Manhattan's financial district, offering stable rental income and long-term appreciation potential.",
    marketCap: "$25M",
    riskLevel: "Low-Medium",
    minInvestment: "$10,000",
    price: 25000000,
    category: "Real Estate"
  },
  {
    id: "art-1",
    title: "Digital Art Collection",
    subtitle: "Art Investment",
    location: "Digital",
    roi: "Variable ROI",
    expectedRoi: "Variable",
    image: "/assets/Images/digital-art-collection-1.png",
    url: "/market/art/",
    description: "Curated collection of digital artworks from emerging and established artists, leveraging blockchain technology for provenance.",
    marketCap: "$5M",
    riskLevel: "Medium-High",
    minInvestment: "$1,000",
    price: 5000000,
    category: "Art"
  },
  {
    id: "commodities-1",
    title: "Gold Reserve",
    subtitle: "Commodities Investment",
    location: "Switzerland",
    roi: "5.2% ROI",
    expectedRoi: "5.2%",
    image: "/assets/Images/gold-reserve.png",
    url: "/market/gold/",
    description: "Physical gold reserves stored in Swiss vaults, providing a hedge against inflation and economic uncertainty.",
    marketCap: "$50M",
    riskLevel: "Low",
    minInvestment: "$5,000",
    price: 50000000,
    category: "Commodities"
  },
  {
    id: "infrastructure-1",
    title: "Solar Farm Project",
    subtitle: "Infrastructure Investment",
    location: "Arizona, USA",
    roi: "7.3% ROI",
    expectedRoi: "7.3%",
    image: "/assets/Images/solar-farm-project-2.png",
    url: "/market/carbon-credits/",
    description: "Large-scale solar energy project generating clean electricity and carbon credits, with government incentives.",
    marketCap: "$15M",
    riskLevel: "Medium",
    minInvestment: "$25,000",
    price: 15000000,
    category: "Infrastructure"
  },
  {
    id: "startups-1",
    title: "Tech Startup Equity",
    subtitle: "Startup Investment",
    location: "San Francisco, USA",
    roi: "High Risk/Reward",
    expectedRoi: "High Risk/Reward",
    image: "/assets/Images/tech-2.png",
    url: "/market/private-equity/",
    description: "Early-stage technology startup with innovative AI solutions, offering high growth potential in emerging markets.",
    marketCap: "$2M",
    riskLevel: "High",
    minInvestment: "$50,000",
    price: 2000000,
    category: "Startup"
  },
  {
    id: "real-estate-2",
    title: "Luxury Apartment Complex",
    subtitle: "Real Estate Investment",
    location: "Miami, USA",
    roi: "6.8% ROI",
    expectedRoi: "6.8%",
    image: "/assets/Images/apartment-complex.png",
    url: "/market/real-estate/",
    description: "Premium residential complex in Miami Beach, featuring luxury amenities and high-end rental units.",
    marketCap: "$30M",
    riskLevel: "Medium",
    minInvestment: "$15,000",
    price: 30000000,
    category: "Real Estate"
  }
];

// --- Theme and Routing (unchanged) ---
const theme = {
  greenIcon: '#15a36e',
  blueButton: '#255f99',
  whiteText: '#ffffff',
};

// Assets are formatted for ChromaGrid
const allCardData = mockAssets;

// ====================================================================
// --- THE ENHANCED ASSET CARD COMPONENT WITH BOLDER DESIGN ---
// ====================================================================
const AssetCard = ({ card, layoutId, isPopup = false }) => {
  const handleNavigate = (link) => {
    console.log(`Navigating to ${link}`);
    // Your navigation logic here
  };

  return (
    <motion.div
      layoutId={layoutId}
      className="w-full h-[400px] rounded-lg flex flex-col justify-end overflow-hidden shadow-2xl relative bg-black group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Enhanced Aura Effect on Hover */}
      <div className="absolute inset-0 bg-green-500/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      <motion.img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Enhanced Gradient for Better Readability */}
      <div className={`absolute inset-0 bg-gradient-to-t z-10 ${isPopup ? 'from-black/95 via-black/80' : 'from-black/90 via-black/70'} to-transparent`} />

      {/* Removed Blue Header - Cleaner Design */}
      <div className="relative z-20 p-6 space-y-4 text-white">
        <h3 className="text-2xl font-bold leading-tight dm-sans">{card.title}</h3>
        <div className="flex flex-col gap-2 text-base font-semibold border-t border-b border-white/20 py-3">
          <p className="flex items-center gap-2"><span className="text-green-400">📍</span>{card.location}</p>
          <p className="flex items-center gap-2"><GiChart size={20} className="text-green-400" />{card.expectedRoi} ROI</p>
        </div>
        <div className="flex items-end justify-between pt-2">
          <div>
            <p className="text-sm opacity-70">Price</p>
            <p className="text-2xl font-bold">${card.price.toLocaleString()}</p>
          </div>
          <motion.button
            className="px-6 py-3 text-white rounded-lg font-semibold shadow-lg text-sm bg-green-500 hover:bg-green-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate(card.link);
            }}
          >
            Invest
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ====================================================================
// --- ENHANCED MARKETPLACE GLIMPSE COMPONENT ---
// ====================================================================
const MarketplaceGlimpse = () => {

  return (
    <div className="w-full">
      <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyles }} />
      {/* PART 2: ChromaGrid Section - The Centerpiece Refactor */}
      <section className="relative bg-black">
        {/* Main Content with Curved Background - HomePage Style */}
        <div className="relative z-10 bg-black pt-6 sm:pt-8 md:pt-12 lg:pt-16 pb-4 sm:pb-6 overflow-hidden">

          {/* Content Container */}
          <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
            {/* Single Lottie Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative flex justify-center items-center w-full"
            >
              <div className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <Player
                  autoplay
                  loop
                  src={marketplace3rd}
                  className="w-full h-full object-contain"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default MarketplaceGlimpse;