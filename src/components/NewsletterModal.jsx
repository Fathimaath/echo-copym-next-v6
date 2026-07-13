"use client";
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, AlertCircle } from 'lucide-react';

export default function NewsletterModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!consent) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
      setConsent(false);
    } catch {
      setStatus('error');
    }
  }, [consent]);

  const handleClose = () => {
    setStatus('idle');
    setEmail('');
    setConsent(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#15a36e]/15 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#15a36e]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                Stay in the Loop
              </h3>
              <p className="text-sm text-gray-400" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                Subscribe to our newsletter for the latest updates on tokenization and real-world assets.
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#15a36e]/15 flex items-center justify-center">
                  <Check className="w-7 h-7 text-[#15a36e]" />
                </div>
                <p className="text-white font-semibold mb-1" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  You&apos;re subscribed!
                </p>
                <p className="text-sm text-gray-400" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                  Thank you for joining. We&apos;ll keep you updated.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-5 px-6 py-2 rounded-full bg-[#15a36e] text-white text-sm font-semibold hover:bg-[#128a5c] transition-colors"
                  style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#15a36e] focus:ring-1 focus:ring-[#15a36e] transition-colors disabled:opacity-50"
                  style={{ fontFamily: 'Palanquin, sans-serif' }}
                />

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    disabled={status === 'loading'}
                    className="mt-0.5 accent-[#15a36e]"
                  />
                  <span className="text-xs text-gray-400 leading-relaxed" style={{ fontFamily: 'Palanquin, sans-serif' }}>
                    I agree to the{' '}
                    <a href="/terms-of-services" className="text-[#15a36e] underline hover:no-underline">
                      Privacy Policy
                    </a>
                    {' '}and consent to receive updates.
                  </span>
                </label>

                {status === 'error' && (
                  <div className="flex items-center gap-1.5 text-red-400 text-xs">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{consent ? 'Something went wrong.' : 'Please agree to the privacy policy.'}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 rounded-xl bg-[#15a36e] text-white font-semibold text-sm hover:bg-[#128a5c] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Palanquin, sans-serif' }}
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
