"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';

const networks = [
  { name: "Ethereum", type: "Mainnet L1", tag: "Enterprise Standard" },
  { name: "Polygon", type: "PoS & zkEVM", tag: "High Throughput" },
  { name: "Arbitrum", type: "Optimistic Rollup", tag: "Low Latency" },
  { name: "Avalanche", type: "Subnets & C-Chain", tag: "Custom Compliance" },
  { name: "Base", type: "Coinbase L2", tag: "Institutional Access" },
  { name: "BNB Chain", type: "EVM Compatible", tag: "Global Ecosystem" }
];

export default function SupportedNetworks() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="relative w-fit mx-auto mb-3">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-tight text-black"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              Supported <span className="text-[#15a36e]">Networks</span>
            </h2>
          </div>
          <p
            className="text-sm sm:text-base text-neutral-600 leading-relaxed"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Deploy your branded tokenized assets across leading EVM-compatible networks, private subnets, and institutional permissioned chains.
          </p>
        </div>

        {/* Networks Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {networks.map((net, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-gray-200 bg-[#f9fafb] p-5 text-center hover:border-[#15a36e]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between items-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#15a36e]/10 border border-[#15a36e]/20 flex items-center justify-center text-[#15a36e] mb-3">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-black mb-1" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                {net.name}
              </h3>
              <span className="text-[11px] text-neutral-500 font-mono mb-2">{net.type}</span>
              <span className="text-[10px] font-semibold text-[#15a36e] bg-[#15a36e]/10 px-2 py-0.5 rounded-full">
                {net.tag}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
