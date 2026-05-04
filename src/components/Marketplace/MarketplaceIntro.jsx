import React from 'react';
import HomeCycle from '@/components/HomeCycle';

export default function MarketplaceIntro() {
    return (
        <section className="w-full bg-white py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative w-fit mb-6 mx-auto">
                        <h2 className="inline-flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-bold uppercase leading-tight pb-2" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                            <span className="text-black">What is the</span> <span className="text-[#10b981]">CopyM Marketplace</span> <span className="text-black">?</span>
                        </h2>
                    </div>
                    <div className="text-lg text-gray-800 leading-relaxed font-medium" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                        <p>
                            The CopyM Marketplace is a secure, blockchain-powered venue where real-world and digital assets are <br className="hidden sm:block" />
                            brought on-chain, discovered and traded. It connects asset owners, investors and infrastructure partners <br className="hidden sm:block" />
                            in one transparent ecosystem, enabling seamless entitlement, trading and settlement.
                        </p>
                    </div>
                </div>

                {/* Cycle Animation */}
                <div className="w-full flex justify-center mt-8">
                    <HomeCycle />
                </div>
            </div>
        </section>
    );
}
