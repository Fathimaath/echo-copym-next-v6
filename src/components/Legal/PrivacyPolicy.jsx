"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicyClient = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                        Privacy Policy
                    </h1>
                    <p className="text-gray-500 text-sm font-medium" style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}>
                        Last updated: January 2026
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="prose prose-lg max-w-none text-gray-700 space-y-10"
                    style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                        <p className="text-base leading-relaxed">
                            CopyM Limited ("we", "us", "our") respects your privacy. This Privacy Policy explains what personal data we collect when you use the CopyM tokenization platform (the "Platform"), how we use it, and the rights you have over it. By using the Platform you agree to the practices described in this policy.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Data We Collect</h2>
                        <p className="text-base leading-relaxed">
                            We collect information you provide directly, including your name, email address, government-issued identification and selfie submitted for KYC verification, source-of-funds information, wallet addresses, and any documents you upload to the Platform. We also automatically collect technical data such as IP address, browser type, device identifiers, and usage logs when you interact with the Platform.
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Data</h2>
                        <p className="text-base leading-relaxed">
                            We use your personal data to operate the Platform, verify your identity, process investments and token transactions, provide customer support, prevent fraud and money laundering, comply with legal obligations, and improve our services. We do not sell your personal data.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Sharing and Disclosure</h2>
                        <p className="text-base leading-relaxed">
                            We share personal data only with service providers who help us operate the Platform (such as identity verification and e-signature providers), with Issuers of assets you invest in to the extent needed to administer your investment, with regulators and law enforcement where required by law, and in connection with a merger, sale, or transfer of our business.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
                        <p className="text-base leading-relaxed">
                            We retain personal data only as long as necessary to provide the Platform and comply with legal, accounting, and anti-money-laundering requirements. Verification documents are retained in accordance with applicable regulations even after you close your account.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
                        <p className="text-base leading-relaxed">
                            We implement appropriate technical and organizational measures, including encryption in transit and at rest, access controls, and regular security reviews, to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
                        <p className="text-base leading-relaxed">
                            Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict processing of your personal data, and to withdraw consent at any time. To exercise these rights, contact us at <a href="mailto:Support@copym.xyz" className="text-[#10b981] font-semibold hover:underline">Support@copym.xyz</a>.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies</h2>
                        <p className="text-base leading-relaxed">
                            We use cookies and similar technologies to keep you signed in, remember preferences, and understand how the Platform is used. You can control cookies through your browser settings.
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Transfers</h2>
                        <p className="text-base leading-relaxed">
                            Your personal data may be processed in countries other than your own. We ensure appropriate safeguards are in place for any international transfer of personal data.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children</h2>
                        <p className="text-base leading-relaxed">
                            The Platform is not intended for individuals under 18 years of age. We do not knowingly collect personal data from children.
                        </p>
                    </section>

                    {/* Section 11 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
                        <p className="text-base leading-relaxed">
                            We may update this Privacy Policy from time to time. Material changes will be communicated to you before they take effect. Continued use of the Platform after changes take effect constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    {/* Section 12 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
                        <p className="text-base leading-relaxed">
                            If you have questions about this Privacy Policy or our data practices, contact us at <a href="mailto:Support@copym.xyz" className="text-[#10b981] font-semibold hover:underline">Support@copym.xyz</a>.
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicyClient;
