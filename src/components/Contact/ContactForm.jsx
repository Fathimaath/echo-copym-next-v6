"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Building2, MapPin, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    role: 'issuer', // 'issuer' | 'partner' | 'investor' | 'other'
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_LEADS_API_URL || 'http://localhost/copym-blog-api/api';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Validation
    if (!formData.name.trim() || !formData.company.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/contact-submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          companyName: formData.company,
          email: formData.email,
          role: formData.role,
          message: formData.message,
          source: 'contact-page',
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit form. Please try again.');
      }

      setStatus('success');
      setFormData({
        name: '',
        company: '',
        email: '',
        role: 'issuer',
        message: '',
      });
    } catch (err) {
      // If endpoint is not reachable locally/cors, still show helpful message
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again later.');
    }
  };

  const roles = [
    { id: 'issuer', label: 'Issuer / Asset Owner' },
    { id: 'partner', label: 'Partner' },
    { id: 'investor', label: 'Investor' },
    { id: 'other', label: 'Other' },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column: Contact Info & Masdar Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col space-y-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15a36e]/10 border border-[#15a36e]/20 text-[#15a36e] text-xs font-semibold uppercase tracking-wider mb-4">
              Get in Touch
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              Let’s Build the Future of <span className="text-[#15a36e]">RWA Tokenization</span>
            </h2>
            <p
              className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed"
              style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
            >
              Whether you are an asset owner structuring a new issuance, an institutional partner integrating infrastructure, or an investor seeking compliance-first access, our team is ready to connect.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Email item */}
            <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-[#15a36e]/10 flex items-center justify-center flex-shrink-0 text-[#15a36e]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">Direct Email</p>
                <a
                  href="mailto:support@copym.xyz"
                  className="text-sm sm:text-base font-semibold text-gray-900 hover:text-[#15a36e] transition-colors"
                >
                  support@copym.xyz
                </a>
              </div>
            </div>

            {/* Address item */}
            <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-[#15a36e]/10 flex items-center justify-center flex-shrink-0 text-[#15a36e]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">Headquarters</p>
                <p className="text-sm sm:text-base font-semibold text-gray-900">
                  CopyM Limited
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                  Smart Station, First Floor, Incubator Building, Masdar City, Abu Dhabi, UAE
                </p>
              </div>
            </div>

            {/* License item */}
            <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-[#15a36e]/10 flex items-center justify-center flex-shrink-0 text-[#15a36e]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">Regulatory Registration</p>
                <p className="text-sm font-semibold text-gray-900">
                  Masdar City Free Zone
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  Licence No. MC 14225
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right column: The Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8 md:p-10"
        >
          {status === 'success' ? (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#15a36e]/15 text-[#15a36e] flex items-center justify-center mb-5">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3
                className="text-2xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                Message Received
              </h3>
              <p
                className="text-gray-600 text-sm sm:text-base max-w-md mx-auto mb-6"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                Thank you for reaching out to CopyM. A member of our team will review your inquiry and respond within 1 business day.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="px-6 py-2.5 rounded-full bg-[#15a36e] text-white font-semibold text-sm hover:bg-[#128a5c] transition-all"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name & Company row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5"
                    style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    disabled={status === 'loading'}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all disabled:opacity-50 text-sm"
                    style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5"
                    style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                  >
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Organization name"
                    disabled={status === 'loading'}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all disabled:opacity-50 text-sm"
                    style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                  Business Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  disabled={status === 'loading'}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all disabled:opacity-50 text-sm"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                />
              </div>

              {/* Role selection: I am: issuer / partner / investor / other */}
              <div>
                <label
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                  I am a: <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {roles.map((r) => {
                    const isSelected = formData.role === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleRoleChange(r.id)}
                        disabled={status === 'loading'}
                        className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border text-center transition-all ${
                          isSelected
                            ? 'bg-[#15a36e] text-white border-[#15a36e] shadow-sm'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                        }`}
                        style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                      >
                        {r.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, goals, or partnership inquiry..."
                  disabled={status === 'loading'}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15a36e] focus:border-transparent transition-all disabled:opacity-50 text-sm resize-y"
                  style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
                />
              </div>

              {/* Error message */}
              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3 rounded-full bg-gradient-to-r from-[#23BD83] to-[#109261] text-white font-bold text-sm sm:text-base hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 cursor-pointer shadow-md"
                style={{ fontFamily: 'var(--font-palanquin), Palanquin, sans-serif' }}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 text-[#109261]" />
                    </div>
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
