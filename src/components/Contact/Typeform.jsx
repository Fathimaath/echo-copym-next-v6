"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GiCheckMark,
  GiPerson,
  GiHouse,

  GiShield
} from "react-icons/gi";

/**
 * Copym — RWA Tokenized Marketplace
 * Typeform-style form
 * - First screen: "Get Started" prompt
 * - Then form with Back button and OK
 * - Updated to match AccessPage theme structure
 * - No progress bar
 */

const THEME = {
  pageBg: "bg-white",
  ctaGrad: "bg-gradient-to-r from-emerald-500 to-blue-500 text-white",
  ctaHover: "hover:from-emerald-600 hover:to-blue-600 transform hover:scale-[1.02] active:scale-[0.98]",
  ring: "focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2",
  inputFocus: "focus:border-emerald-500 focus:bg-white focus:shadow-lg",
  accent: {
    deep: "#059669",
    mid: "#10b981",
    light: "#34d399",
    ultraLight: "#ecfdf5",
  },
};

const steps = [
  {
    id: "tokenGoal",
    label: "What are your Tokenization goals?",
    helper: "Choose the area you want to tokenize with Copym",
    type: "segmented",
    icon: GiHouse,
    required: true,
    options: [
      "Tokenize Real Estate",
      "Tokenize Debt / Credit",
      "Tokenize Commodities",
      "Tokenize Art / Collectibles",
      "Tokenize Infrastructure",
      "Other",
    ],
  },
  {
    id: "contactInfo",
    label: "Your Contact Information",
    type: "group",
    icon: GiPerson,
    required: true,
    fields: [
      { key: "firstName", label: "First Name", required: true },
      { key: "lastName", label: "Last Name", required: true },
      { key: "email", label: "Email", required: true },
      { key: "phone", label: "Phone Number", required: false },
    ],
  },
  {
    id: "companyInfo",
    label: "Company Information",
    type: "group",
    icon: GiHouse,
    required: true,
    fields: [
      { key: "companyName", label: "Company Name", required: true },
      { key: "title", label: "Your Title", required: true },
      { key: "website", label: "Website", required: true },
    ],
  },
  {
    id: "industry",
    label: "What Industry is your company in?",
    type: "segmented",
    icon: GiHouse,
    required: true,
    options: [
      "Real Estate",
      "Private Credit",
      "Treasury Bills",
      "Commodities",
      "Art / Collectibles",
      "Energy / Infrastructure",
      "Other",
    ],
  },
  {
    id: "companyDetails",
    label: "Tell us about your company",
    type: "textarea",
    icon: GiHouse,
    required: true,
    placeholder: "Brief summary about your company, traction, and funding raised to date..."
  },

  {
    id: "companyStatus",
    label: "Company Status",
    type: "group",
    icon: GiShield,
    required: true,
    fields: [
      { key: "incUS", label: "Incorporated in U.S?", type: "segmented", options: ["Yes", "No"], required: true },
      { key: "productAvailable", label: "Product available in market?", type: "segmented", options: ["Yes", "No"], required: true },
      { key: "revenue", label: "Generating revenue?", type: "segmented", options: ["Yes", "No"], required: true },
    ],
  },
  {
    id: "raiseStructure",
    label: "How would you like to structure your raise on Copym?",
    type: "segmented",
    icon: GiCheckMark,
    required: true,
    options: [
      "Tokenized Equity",
      "Tokenized Debt",
      "Revenue Share",
      "SAFE / SAFT",
      "SPV",
      "Other",
    ],
  },
];

const initialForm = {
  tokenGoal: "",
  contactInfo: { firstName: "", lastName: "", email: "", phone: "" },
  companyInfo: { companyName: "", title: "", website: "" },
  industry: "",
  companyDetails: "",

  companyStatus: { incUS: "", productAvailable: "", revenue: "" },
  raiseStructure: "",
};

export default function Typeform() {
  const [form, setForm] = useState(initialForm);
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); // Controls landing vs form

  const step = useMemo(() => steps[stepIndex], [stepIndex]);

  const setValue = (id, value) => setForm(prev => ({ ...prev, [id]: value }));
  const setContactInfo = (k, v) =>
    setForm(prev => ({ ...prev, contactInfo: { ...prev.contactInfo, [k]: v } }));
  const setCompanyInfo = (k, v) =>
    setForm(prev => ({ ...prev, companyInfo: { ...prev.companyInfo, [k]: v } }));

  const setCompanyStatus = (k, v) =>
    setForm(prev => ({ ...prev, companyStatus: { ...prev.companyStatus, [k]: v } }));

  const validateCurrent = () => {
    setError("");
    if (step.required) {
      if (step.type === "group") {
        for (const f of step.fields) {
          if (f.required) {
            let value;
            if (step.id === "contactInfo") {
              value = form.contactInfo[f.key];
            } else if (step.id === "companyInfo") {
              value = form.companyInfo[f.key];

            } else if (step.id === "companyStatus") {
              value = form.companyStatus[f.key];
            }

            if (!value) {
              setError(`${f.label} is required.`);
              return false;
            }
          }
        }
      } else if (!form[step.id]) {
        setError("This question is required.");
        return false;
      }
    }
    if (typeof step.validate === "function") {
      if (!step.validate(form[step.id])) {
        setError("Please enter a valid value.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrent()) return;
    if (stepIndex < steps.length - 1) setStepIndex(i => i + 1);
    else setSubmitted(true);
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(i => i - 1);
    else setShowForm(false); // Go back to landing
  };

  return (
    <div className="min-h-[300px] text-white flex items-center justify-center px-1 sm:px-4 relative">
      {/* White Background */}
      <div className="absolute inset-0 bg-white"></div>

      <div className="relative w-full max-w-5xl group transition-all duration-500 overflow-hidden z-10">
        {/* Removed Silk Background */}



        {/* Main Content */}
        <div className="min-h-[200px] pt-4 sm:pt-6 relative z-10 px-1 sm:px-4">
          <AnimatePresence mode="wait">
            {!showForm ? (
              // Enhanced Landing Screen with AccessPage-inspired styling
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="w-full relative group"
              >


                {/* Text Content - Centered */}
                <div className="max-w-3xl mx-auto text-center mb-7 px-2 relative z-10">
                  <p className="text-base sm:text-lg text-black leading-relaxed mb-4" style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}>
                    This form takes only <span className="font-bold">2 minutes</span> to complete and will capture all the information needed for your<br />
                    tokenization journey.
                  </p>

                  <p className="text-base sm:text-lg text-black leading-relaxed" style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}>
                    Join the future of Real World Asset tokenization with Copym.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center px-2">
                  <motion.button
                    onClick={() => setShowForm(true)}
                    className="group inline-flex items-center justify-between min-w-[160px] sm:min-w-[180px] bg-[#15a36e] border border-[#15a36e] hover:bg-[#12a062] rounded-full p-1 transition-all duration-300 w-fit cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="pl-4 pr-2 text-white font-semibold text-sm sm:text-base" style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}>
                      GET STARTED
                    </span>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center transition-all duration-300">
                      <svg
                        className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#15a36e]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            ) : !submitted ? (
              // Enhanced Form Screen
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
                    <span className="text-sm font-medium text-black/70 text-center sm:text-left" style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}>
                      Question {stepIndex + 1} of {steps.length}
                    </span>
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                      <div className="h-2 w-full sm:w-36 bg-black/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[#15a36e] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="text-xs font-medium text-black" style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}>
                        {Math.round(((stepIndex + 1) / steps.length) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back Button + Question */}
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-center sm:text-left">
                    <motion.button
                      onClick={handleBack}
                      className="p-3 rounded-2xl hover:bg-white/10 border border-white/20 transition-all hover:shadow-md flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-black text-sm">←</span>
                    </motion.button>

                    <div className="flex-1 min-w-[220px]">
                      <h2 className="text-2xl sm:text-3xl font-black text-black leading-tight uppercase" style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}>{step.label}</h2>
                      {step.helper && (
                        <p className="text-base text-black/70 mt-2" style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}>{step.helper}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <Question
                    step={step}
                    value={form[step.id]}

                    onChange={setValue}

                    onContactInfoChange={setContactInfo}
                    onCompanyInfoChange={setCompanyInfo}
                    onCompanyStatusChange={setCompanyStatus}
                  />
                </div>

                {error && (
                  <motion.div
                    className="mb-6 p-4 bg-red-100 border border-red-300 rounded-2xl flex items-center gap-3 text-left"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">⚠</span>
                    </div>
                    <span className="text-red-700 font-medium" style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}>{error}</span>
                  </motion.div>
                )}

                {/* Enhanced Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3">
                  {step.type === "segmented" && (
                    <motion.button
                      onClick={handleNext}
                      disabled={!form[step.id]}
                      className={`w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#15a36e] text-white font-bold text-lg shadow-xl hover:bg-[#12a062] transition-all duration-200 ${!form[step.id] ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
                        }`}
                      style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}
                      whileHover={form[step.id] ? { scale: 1.05 } : {}}
                      whileTap={form[step.id] ? { scale: 0.95 } : {}}
                    >
                      OK ✓
                    </motion.button>
                  )}

                  {["text", "email", "url", "number", "textarea", "group"].includes(step.type) && (
                    <motion.button
                      onClick={handleNext}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#15a36e] text-white font-bold text-lg shadow-xl hover:bg-[#12a062] transition-all duration-200"
                      style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {stepIndex === steps.length - 1 ? "Submit Application" : "Continue →"}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ) : (
              <ThankYou />
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

function Question({ step, value, address, onChange, onAddressChange, onContactInfoChange, onCompanyInfoChange, onCompanyStatusChange }) {
  return (
    <>
      {/* Enhanced text / email / url / number inputs */}
      {["text", "email", "url", "number"].includes(step.type) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type={step.type}
            value={value || ""}
            onChange={(e) =>
              onChange(
                step.id,
                step.type === "number" ? e.target.value.replace(/[^0-9.]/g, "") : e.target.value
              )
            }
            className="w-full px-6 py-5 text-base sm:text-lg rounded-2xl bg-white border-2 border-white/20 placeholder-black/50 text-black outline-none focus:border-[#15a36e] focus:bg-white transition-all duration-200"
            style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}
            placeholder="Type your answer..."
            autoFocus
          />
        </motion.div>
      )}

      {/* Enhanced textarea */}
      {step.type === "textarea" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <textarea
            rows={6}
            value={value || ""}
            onChange={(e) => onChange(step.id, e.target.value)}
            className="w-full px-6 py-5 text-base sm:text-lg rounded-2xl bg-white border-2 border-white/20 placeholder-black/50 text-black outline-none resize-none focus:border-[#15a36e] focus:bg-white transition-all duration-200"
            style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}
            placeholder={step.placeholder || "Share your thoughts here..."}
            autoFocus
          />
        </motion.div>
      )}

      {/* Enhanced segmented buttons */}
      {step.type === "segmented" && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          {step.options.map((opt, index) => {
            const active = value === opt;
            return (
              <motion.button
                key={opt}
                onClick={() => onChange(step.id, opt)}
                className={`w-full text-left px-6 sm:px-10 lg:px-12 py-4 rounded-2xl border-2 transition-all duration-200 text-base sm:text-lg font-medium ${active
                  ? "border-[#15a36e] bg-[#15a36e] text-white shadow-lg transform scale-[1.02]"
                  : "border-white/20 bg-white hover:bg-[#15a36e] hover:border-[#15a36e] hover:text-white hover:shadow-md hover:scale-[1.01] text-black"
                  }`}
                style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: active ? 1.02 : 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <span>{opt}</span>
                  {active && (
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-[#15a36e] text-sm">✓</span>
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      )}

      {/* Enhanced grouped fields */}
      {step.type === "group" && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          {step.fields.map((f, index) => {
            // Get the appropriate value and onChange function based on step type
            let fieldValue = "";
            let onChangeFunction = null;

            if (step.id === "contactInfo") {
              fieldValue = value?.[f.key] || "";
              onChangeFunction = (e) => onContactInfoChange(f.key, e.target.value);
            } else if (step.id === "companyInfo") {
              fieldValue = value?.[f.key] || "";
              onChangeFunction = (e) => onCompanyInfoChange(f.key, e.target.value);

            } else if (step.id === "companyStatus") {
              fieldValue = value?.[f.key] || "";
              onChangeFunction = (val) => onCompanyStatusChange(f.key, val);
            }

            // Handle segmented fields within groups
            if (f.type === "segmented") {
              return (
                <motion.div key={f.key} className="sm:col-span-2">
                  <label className="block text-black/80 text-sm font-medium mb-3" style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}>{f.label}</label>
                  <div className="flex flex-wrap gap-3">
                    {f.options.map((opt) => {
                      const active = fieldValue === opt;
                      return (
                        <motion.button
                          key={opt}
                          onClick={() => onChangeFunction(opt)}
                          className={`px-8 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${active
                            ? "border-[#15a36e] bg-[#15a36e] text-white shadow-lg"
                            : "border-white/20 bg-white hover:bg-[#15a36e] hover:border-[#15a36e] hover:text-white text-black"
                            }`}
                          style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {opt}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            }

            // Handle regular input fields
            return (
              <motion.input
                key={f.key}
                type={f.key === "email" ? "email" : "text"}
                value={fieldValue}
                onChange={onChangeFunction}
                placeholder={f.label}
                className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-white/20 placeholder-black/50 text-black outline-none focus:border-[#15a36e] focus:bg-white transition-all duration-200 text-base sm:text-lg"
                style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              />
            );
          })}
        </motion.div>
      )}
    </>
  );
}

function ThankYou() {
  return (
    <motion.div
      key="thankyou"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center max-w-4xl mx-auto"
    >
      <motion.div
        className="mx-auto w-24 h-24 rounded-3xl bg-[#15a36e] grid place-items-center shadow-2xl mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <GiCheckMark className="w-12 h-12 text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-3xl sm:text-4xl font-black mb-4 text-black uppercase" style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}>
          Application Submitted! 🎉
        </h2>
        <p className="text-lg sm:text-xl text-black/80 mb-6 leading-relaxed" style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}>
          Thank you for your interest in tokenizing with{" "}
          <span className="text-[#15a36e] font-bold">Copym</span>
        </p>

        <div className="bg-white rounded-2xl p-6 border border-white/20">
          <h3 className="font-semibold text-black mb-2" style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}>What happens next?</h3>
          <div className="flex flex-col items-center space-y-2 text-black/80" style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}>
            <div className="flex items-center gap-3">
              <span>Our team will review your application within 24 hours</span>
            </div>
            <div className="flex items-center gap-3">
              <span>We'll schedule a consultation call to discuss your tokenization goals</span>
            </div>
            <div className="flex items-center gap-3">
              <span>You'll receive a personalized tokenization strategy</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-black/60 mt-6" style={{ fontFamily: "var(--font-palanquin), Palanquin, sans-serif" }}>
          Questions? Contact us at{" "}
          <a href="mailto:support@copym.xyz" className="text-[#15a36e] hover:underline font-medium">
            support@copym.xyz
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}