"use client";
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function DownloadCTA() {
    const router = useRouter();
    return (
        <section className="w-full bg-white py-2 sm:py-3 lg:py-4">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
                <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 opacity-10">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <path fill="#15a36e" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.6,34.3C59,45.5,47.1,54.2,35.1,61.8C23.1,69.4,11,75.9,-0.6,77.2C-12.2,78.5,-24.7,74.6,-36.4,68.5C-48.1,62.4,-59,54.1,-67.6,43.5C-76.2,32.9,-82.5,20,-83.1,6.8C-83.7,-6.4,-78.6,-19.9,-70.4,-31.4C-62.2,-42.9,-50.9,-52.4,-39.3,-59.3C-27.7,-66.2,-15.8,-70.5,-2.6,-69.5C10.6,-68.5,23.6,-62.2,30.5,-83.6L44.7,-76.4Z" transform="translate(100 100)" />
                        </svg>
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="text-center lg:text-left">
                            <p className="text-base sm:text-lg md:text-xl text-white font-semibold" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                Questions or partnership? We&apos;d like to hear from you.
                            </p>
                            <p className="text-sm text-white/60 mt-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                Have a question about tokenization or interested in partnering with us? Reach out to our team.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => router.push('/about#contact-info')}
                            className="group inline-flex items-center justify-center gap-2 px-6 py-3 font-bold bg-gradient-to-r from-[#23BD83] to-[#109261] text-white rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all flex-shrink-0 cursor-pointer"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        >
                            <span>Contact Us</span>
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                                <FaArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#109261]" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
