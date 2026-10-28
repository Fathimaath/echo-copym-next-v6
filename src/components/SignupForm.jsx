"use client";
import React, { useState } from 'react';
import { FaCheckCircle, FaSpinner, FaArrowRight, FaCalendarAlt, FaExclamationCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        assetType: '',
        jurisdiction: ''
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const API_URL = process.env.NEXT_PUBLIC_LEADS_API_URL || 'https://api.copym.xyz/api';
    const calendarUrl = process.env.NEXT_PUBLIC_CALENDAR_URL || 'https://calendly.com/copym';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                interest: formData.role,
                role: formData.role,
                assetType: formData.assetType,
                jurisdiction: formData.jurisdiction,
                agreedToTerms: agreedToTerms
            };

            const res = await fetch(`${API_URL}/signup-submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.error || 'Failed to submit demo request. Please try again.');

            // Fire GA4 event demo_request
            if (typeof window !== 'undefined') {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: 'demo_request',
                    user_role: formData.role,
                    asset_type: formData.assetType || undefined,
                    jurisdiction: formData.jurisdiction || undefined,
                    company: formData.company || undefined
                });

                if (typeof window.gtag === 'function') {
                    window.gtag('event', 'demo_request', {
                        user_role: formData.role,
                        asset_type: formData.assetType || undefined,
                        jurisdiction: formData.jurisdiction || undefined,
                        company: formData.company || undefined
                    });
                }
            }

            setStatus('success');
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.message || 'Something went wrong. Please check your connection and try again.');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-white rounded-2xl p-8 sm:p-10 text-center shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-[#15a36e]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheckCircle className="w-8 h-8 text-[#15a36e]" />
                </div>
                <h3
                    className="text-2xl sm:text-3xl font-bold text-black mb-3"
                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                    Demo Request Received!
                </h3>
                <p
                    className="text-black/70 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed"
                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                    Thank you{formData.name ? `, ${formData.name}` : ''}. Our team will review your project details and get back to you within one business day.
                </p>

                {/* Calendar Booking Offer */}
                <div className="mt-6 pt-6 border-t border-gray-100 bg-gray-50/80 rounded-xl p-5 sm:p-6 text-left">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#15a36e]/15 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                                <FaCalendarAlt className="w-5 h-5 text-[#15a36e]" />
                            </div>
                            <div>
                                <h4 className="text-sm sm:text-base font-bold text-black" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                    Want to pick a time right away?
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                                    Skip the email back-and-forth and select a slot directly on our calendar.
                                </p>
                            </div>
                        </div>

                        <a
                            href={calendarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#23BD83] to-[#109261] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all flex-shrink-0 w-full sm:w-auto"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        >
                            <FaCalendarAlt className="w-3.5 h-3.5" />
                            <span>Book on Calendar</span>
                        </a>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="button"
                        onClick={() => {
                            setStatus('idle');
                            setFormData({
                                name: '',
                                email: '',
                                phone: '',
                                company: '',
                                role: '',
                                assetType: '',
                                jurisdiction: ''
                            });
                            setAgreedToTerms(false);
                            setErrorMessage('');
                        }}
                        className="text-xs text-gray-500 hover:text-black underline transition-colors"
                    >
                        Submit another request
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">

                {status === 'error' && errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
                        <FaExclamationCircle className="w-4 h-4 flex-shrink-0 text-red-500 mt-0.5" />
                        <div className="flex-1">
                            <span className="font-semibold block">Submission Error</span>
                            <span>{errorMessage}</span>
                        </div>
                    </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-black/70 uppercase tracking-wider mb-2">
                            Full Name <span className="text-[#15a36e]">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all text-sm"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        />
                    </div>

                    {/* Email Address */}
                    <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-black/70 uppercase tracking-wider mb-2">
                            Email Address <span className="text-[#15a36e]">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all text-sm"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-black/70 uppercase tracking-wider mb-2">
                            Phone Number <span className="text-black/30 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all text-sm"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        />
                    </div>

                    {/* Company */}
                    <div>
                        <label htmlFor="company" className="block text-xs font-semibold text-black/70 uppercase tracking-wider mb-2">
                            Company <span className="text-black/30 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            placeholder="Acme Corp"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all text-sm"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        />
                    </div>
                </div>

                {/* "I am" dropdown */}
                <div>
                    <label htmlFor="role" className="block text-xs font-semibold text-black/70 uppercase tracking-wider mb-2">
                        I am <span className="text-[#15a36e]">*</span>
                    </label>
                    <select
                        id="role"
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all text-sm"
                        style={{ fontFamily: 'Palanquin, sans-serif' }}
                    >
                        <option value="" disabled>Select your role</option>
                        <option value="Issuer / asset owner">Issuer / asset owner</option>
                        <option value="Institution or wealth platform">Institution or wealth platform</option>
                        <option value="Technology or infrastructure partner">Technology or infrastructure partner</option>
                        <option value="Investor (updates only)">Investor (updates only)</option>
                    </select>
                </div>

                {/* Optional fields: Asset Type and Jurisdiction */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="assetType" className="block text-xs font-semibold text-black/70 uppercase tracking-wider mb-2">
                            Asset Type <span className="text-black/30 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                            type="text"
                            id="assetType"
                            name="assetType"
                            placeholder="e.g. Real Estate, Commodities, Private Credit"
                            value={formData.assetType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all text-sm"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        />
                    </div>

                    <div>
                        <label htmlFor="jurisdiction" className="block text-xs font-semibold text-black/70 uppercase tracking-wider mb-2">
                            Jurisdiction <span className="text-black/30 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                            type="text"
                            id="jurisdiction"
                            name="jurisdiction"
                            placeholder="e.g. UAE, UK, EU, Singapore"
                            value={formData.jurisdiction}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all text-sm"
                            style={{ fontFamily: 'Palanquin, sans-serif' }}
                        />
                    </div>
                </div>

                {/* Terms agreement checkbox */}
                <label className="flex items-start gap-3 cursor-pointer pt-1">
                    <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-[#15a36e] focus:ring-[#15a36e] accent-[#15a36e]"
                    />
                    <span className="text-xs text-black/60 leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                        I agree to the{' '}
                        <Link href="/terms-of-services" className="text-[#15a36e] underline hover:no-underline font-medium">Terms of Service</Link>
                        {' '}and{' '}
                        <Link href="/privacy-policy" className="text-[#15a36e] underline hover:no-underline font-medium">Privacy Policy</Link>
                    </span>
                </label>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={status === 'submitting' || !agreedToTerms}
                    className="group w-full inline-flex items-center justify-between bg-gradient-to-r from-[#23BD83] to-[#109261] text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-md hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                    style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                    {status === 'submitting' ? (
                        <>
                            <span />
                            <span className="flex items-center gap-2">
                                <FaSpinner className="w-4 h-4 animate-spin" />
                                <span>Submitting Request...</span>
                            </span>
                            <span />
                        </>
                    ) : (
                        <>
                            <span className="pl-3">Book a Demo</span>
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                                <FaArrowRight className="w-3 h-3 text-[#109261]" />
                            </div>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
