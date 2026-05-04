import React from 'react';

export default function Disclaimer() {
    return (
        <section className="bg-white pb-8 pt-4">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 border-t border-gray-100 pt-8">
                <div className="max-w-5xl mx-auto text-left md:text-center">
                    <h4
                        className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2"
                        style={{ fontFamily: 'Palanquin, sans-serif' }}
                    >
                        Terms & Conditions
                    </h4>
                    <p
                        className="text-[10px] sm:text-xs text-gray-400 leading-relaxed font-medium"
                        style={{ fontFamily: 'Palanquin, sans-serif' }}
                    >
                        Copym does not provide brokerage services, entitlement banking services, underwriting services,
                        entitlement recommendations, or entitlement advice to any person. Copym operates as a technology
                        platform focused on distributed ledger technology to improve efficiency, accessibility, and
                        transparency in financial technologies. T & C apply.
                    </p>
                </div>
            </div>
        </section>
    );
}
