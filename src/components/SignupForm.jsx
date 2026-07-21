"use client";
import React, { useState } from 'react';
import { FaDownload, FaCheckCircle, FaSpinner, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

export default function SignupForm() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', interest: '' });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const API_URL = process.env.NEXT_PUBLIC_LEADS_API_URL || 'http://localhost/copym-blog-api/api';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setError('');

        try {
            const res = await fetch(`${API_URL}/signup-submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, agreedToTerms: agreedToTerms }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to submit');
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', company: '', interest: '' });
            setAgreedToTerms(false);
        } catch (err) {
            setStatus('idle');
            setError(err.message || 'Something went wrong. Please try again.');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-white rounded-2xl p-8 sm:p-10 text-center shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-[#15a36e]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheckCircle className="w-8 h-8 text-[#15a36e]" />
                </div>
                <h3
                    className="text-2xl font-bold text-black mb-3"
                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                    You&apos;re on the list!
                </h3>
                <p
                    className="text-black/60 text-sm mb-6"
                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                    Thank you for signing up for early access. We&apos;ll notify you as soon as CopyM launches.
                </p>
                <div className="inline-flex items-center gap-2 text-[#15a36e] text-xs font-semibold uppercase tracking-wider">
                    <FaDownload className="w-3 h-3" />
                    <span>Stay Tuned for Updates</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-black/70 uppercase tracking-wider mb-2">
                            Full Name <span className="text-[#15a36e]">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all text-sm"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-black/70 uppercase tracking-wider mb-2">
                            Email Address <span className="text-[#15a36e]">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all text-sm"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-black/70 uppercase tracking-wider mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all text-sm"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        />
                    </div>

                    <div>
                        <label htmlFor="company" className="block text-xs font-semibold text-black/70 uppercase tracking-wider mb-2">
                            Company <span className="text-black/30">(optional)</span>
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all text-sm"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="interest" className="block text-xs font-semibold text-black/70 uppercase tracking-wider mb-2">
                        I am a <span className="text-[#15a36e]">*</span>
                    </label>
                    <select
                        id="interest"
                        name="interest"
                        required
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all text-sm"
                        style={{ fontFamily: 'Palanquin, sans-serif' }}
                    >
                        <option value="" disabled>Select your interest</option>
                        <option value="issuer">Issuer — I want to tokenize assets</option>
                        <option value="investor">Investor — I want to invest in tokenized assets</option>
                    </select>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-[#15a36e] focus:ring-[#15a36e] accent-[#15a36e]"
                    />
                    <span className="text-xs text-black/50" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                        I agree to the{' '}
                        <Link href="/terms-of-services" className="text-[#15a36e] underline hover:no-underline">Terms of Service</Link>
                        {' '}and Privacy Policy
                    </span>
                </label>

                <button
                    type="submit"
                    disabled={status === 'submitting' || !agreedToTerms}
                    className="group w-full inline-flex items-center justify-between bg-gradient-to-r from-[#23BD83] to-[#109261] text-white px-6 py-3 rounded-full font-bold text-sm shadow-md hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                    {status === 'submitting' ? (
                        <>
                            <span />
                            <span className="flex items-center gap-2">
                                <FaSpinner className="w-4 h-4 animate-spin" />
                                <span>Submitting...</span>
                            </span>
                            <span />
                        </>
                    ) : (
                        <>
                            <span className="pl-3">Get Early Access</span>
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                                <FaArrowRight className="w-3 h-3 text-[#109261]" />
                            </div>
                        </>
                    )}
                </button>

                {error && (
                    <p className="text-red-500 text-xs text-center">{error}</p>
                )}
            </form>
        </div>
    );
}
