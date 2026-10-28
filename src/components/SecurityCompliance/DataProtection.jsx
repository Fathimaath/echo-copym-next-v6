"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, FileText } from 'lucide-react';
import Image from '@/components/Image';

export default function DataProtectionAndDisclosure() {
  return (
    <section className="py-16 sm:py-20 bg-[#0a0d14] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* 6. Data Protection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-7 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-transparent mb-6 flex-shrink-0 flex items-center justify-start">
                <Image
                  src="/icons/Tokenization/ticon4.avif"
                  alt="Data Protection & Privacy"
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                />
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-3"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                Data Protection &amp; Privacy
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 font-normal">
                Personal identification data collected during onboarding is encrypted and stored in compliance with applicable data protection standards. CopyM does not sell, monetize, or share client identity records with unauthorized third parties.
              </p>
            </div>

            <Link
              href="/privacy-policy/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#15a36e] hover:underline"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              <FileText className="w-4 h-4" />
              <span>Read our complete Privacy Policy &rarr;</span>
            </Link>
          </motion.div>

          {/* 7. Responsible Disclosure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-7 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-transparent mb-6 flex-shrink-0 flex items-center justify-start">
                <Image
                  src="/icons/Tokenization/shield.avif"
                  alt="Responsible Disclosure"
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                />
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-3"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                Responsible Disclosure
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 font-normal">
                We take platform security seriously and welcome vulnerability reports from independent security researchers and white-hat community members.
              </p>
              
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 mb-6">
                <p className="text-xs text-neutral-300">
                  Found a security issue? Please report it directly to:
                </p>
                <a
                  href="mailto:security@copym.xyz"
                  className="text-sm font-mono font-bold text-[#15a36e] hover:underline block mt-1"
                >
                  security@copym.xyz
                </a>
              </div>
            </div>

            <a
              href="/.well-known/security.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-400 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              <span>View security.txt policy</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
