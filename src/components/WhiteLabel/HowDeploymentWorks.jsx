"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Palette, FileCode2, Link2, Rocket, Clock } from 'lucide-react';

const steps = [
  {
    step: "01",
    icon: Compass,
    title: "Discovery",
    desc: "Asset structuring alignment, regulatory scope review, jurisdiction analysis, and technical architecture blueprint."
  },
  {
    step: "02",
    icon: Palette,
    title: "Configuration & branding",
    desc: "Domain setup, brand guidelines application, user interface customization, and permission rule presets."
  },
  {
    step: "03",
    icon: FileCode2,
    title: "Smart contracts",
    desc: "ERC-3643 permissioned token contracts deployed with transfer rules, with optional independent third-party audit."
  },
  {
    step: "04",
    icon: Link2,
    title: "Integrations",
    desc: "Connecting selected institutional custody (or MPC self-custody), KYC/AML identity providers, and fiat/stablecoin rails."
  },
  {
    step: "05",
    icon: Rocket,
    title: "Launch & support",
    desc: "End-to-end sandbox testing, mainnet deployment, operational hand-off, administrator training, and ongoing SLA maintenance."
  }
];

export default function HowDeploymentWorks() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#0a0d14] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="relative w-fit mx-auto mb-3">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-tight text-white"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              How Deployment <span className="text-[#15a36e]">Works</span>
            </h2>
          </div>
          <p
            className="text-sm sm:text-base text-neutral-400 leading-relaxed"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            A structured five-phase deployment process from discovery to operational go-live.
          </p>

          <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
            <Clock className="w-3.5 h-3.5 text-[#15a36e]" />
            <span>Typical timeline: <strong>4&ndash;8 weeks</strong> depending on scope and partner readiness</span>
          </div>
        </div>

        {/* 5 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#15a36e]/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#15a36e] px-2 py-0.5 rounded bg-[#15a36e]/10 border border-[#15a36e]/20">
                      Step {item.step}
                    </span>
                    <Icon className="w-5 h-5 text-neutral-400" />
                  </div>
                  <h3
                    className="text-base font-bold text-white mb-2 leading-snug"
                    style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs text-neutral-400 leading-relaxed font-normal"
                    style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
