"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldAlert } from 'lucide-react';
import Image from '@/components/Image';

export default function OurRole() {
  return (
    <section className="py-16 sm:py-20 bg-white text-black border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
        
        <div className="text-center mb-10 sm:mb-12">
          <div className="relative w-fit mx-auto mb-3">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-tight text-black"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              Our Role &amp; <span className="text-[#15a36e]">Licensing Status</span>
            </h2>
          </div>
          <p
            className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
          >
            Clear legal boundaries separating technology provision from regulated financial activities.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-[#f9fafb] border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-transparent flex items-center justify-center flex-shrink-0">
              <Image
                src="/icons/Tokenization/tiicon1.png"
                alt="Corporate Status"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#15a36e]">Corporate Status</span>
              <h3 className="text-xl sm:text-2xl font-bold text-black" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                CopyM Limited &mdash; Masdar City Free Zone (Licence No. MC 14225)
              </h3>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
            <p className="bg-white p-4 rounded-xl border border-gray-200">
              CopyM Limited is a technology company licensed by Masdar City Free Zone, Abu Dhabi (Licence No. MC 14225). We provide software and technology infrastructure for tokenizing real-world assets.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <span className="text-xs font-bold text-neutral-900 block mb-2 uppercase tracking-wide">
                  What CopyM Does:
                </span>
                <ul className="space-y-2 text-xs text-neutral-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#15a36e] flex-shrink-0 mt-0.5" />
                    <span>Technology infrastructure &amp; smart contracts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#15a36e] flex-shrink-0 mt-0.5" />
                    <span>Branded issuance &amp; investor management console</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#15a36e] flex-shrink-0 mt-0.5" />
                    <span>On-chain transfer restriction &amp; compliance tooling</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <span className="text-xs font-bold text-neutral-900 block mb-2 uppercase tracking-wide">
                  What CopyM Does Not Do:
                </span>
                <ul className="space-y-2 text-xs text-neutral-600">
                  <li className="flex items-start gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Does not provide brokerage or investment banking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Does not provide investment advice or recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Does not hold custody or possession of investor funds</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="pt-2 text-neutral-500 text-xs italic">
              All regulated activities &mdash; including capital solicitation, investor fund custody, and secondary transaction venues &mdash; are carried out exclusively by licensed partner institutions where legally permitted.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
