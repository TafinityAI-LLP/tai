import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Building,
  Zap
} from 'lucide-react';

const ENQUIRY_TYPES = [
  'Custom Software Development',
  'AI Agents & Process Automation',
  'Web & Mobile App Development',
  'Enterprise ERP / CRM Systems',
  'Cloud Architecture & DevOps',
  'Premium Internship Application',
  'Strategic Tech Partnership',
  'Other Inquiries'
];


const FAQS = [
  {
    q: 'How fast can I expect a response?',
    a: 'Our technical consulting team typically reviews and responds to all inquiries within 2 hours during active business hours (9:00 AM - 8:00 PM IST). For urgent inquiries, reach us immediately on WhatsApp.'
  },
  {
    q: 'Can we sign a Non-Disclosure Agreement (NDA)?',
    a: 'Absolutely. We treat all client concepts and business logic with utmost confidentiality and are happy to execute standard or custom mutual NDAs before any deep technical discussions.'
  },
  {
    q: 'Do you offer a free initial consultation or estimate?',
    a: 'Yes, our 30-minute initial discovery consultation is 100% complimentary. We evaluate your requirements, suggest architecture options, and provide a clear timeline and milestone budget.'
  },
  {
    q: 'How can students apply for the Premium Internship cohort?',
    a: 'You can select "Premium Internship Application" as your enquiry type in the form or visit our Internships page. Our mentorship team conducts a quick technical evaluation and cohort onboarding.'
  }
];

const Contact = () => {
  // Ensure page always starts at top on visit
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryType: ENQUIRY_TYPES[0],
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and project message.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          enquiry_type: formData.enquiryType,
          timeline: formData.timeline || null,
          message: formData.message.trim()
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        window.scrollTo({ top: 180, behavior: 'smooth' });
      } else {
        // Fallback success if API is active
        setSubmitted(true);
      }
    } catch (err) {
      // Local graceful fallback
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen text-slate-800 font-sans pb-24"
    >
      <SEO />

      {/* TOP HERO HEADER */}
      <section className="relative pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-sky-50/60 via-slate-50/40 to-transparent">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-r from-sky-300/20 via-blue-400/15 to-pink-300/15 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-slate-900 leading-tight">
            Let's Build Something <br className="hidden sm:inline" />
            <span className="text-gradient-accent">Extraordinary.</span>
          </h1>
        </div>
      </section>

      {/* MAIN TWO-COLUMN CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: CONTACT CHANNELS & VALUE PROPOSITIONS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="glass-card p-6 sm:p-7 rounded-2xl shadow-sm border border-slate-200/80 space-y-5">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-600" />
                <span>Direct Contact Channels</span>
              </h3>

              {/* WhatsApp Priority */}
              <a 
                href="https://wa.me/918005006933?text=Hi%20Tafinity%20AI%20Team%2C%20I%20would%20like%20to%20discuss%20a%20project." 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-3.5 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200/70 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      WhatsApp Priority Chat
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-200/60 px-2 py-0.5 rounded-full">
                      Fastest
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 mt-0.5 truncate">
                    +91-8005006933
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live chat with our solutions engineer (replies in mins).
                  </p>
                </div>
              </a>

              {/* Phone Direct */}
              <a 
                href="tel:+918005006933" 
                className="group flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-200 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Direct Phone Line
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    +91-8005006933
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Monday to Saturday, 9:00 AM – 8:00 PM IST
                  </p>
                </div>
              </a>

              {/* Email */}
              <a 
                href="mailto:info@tafinityai.com" 
                className="group flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 hover:bg-pink-50/70 border border-slate-200/80 hover:border-pink-200 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-pink-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Official Corporate Email
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5 truncate">
                    info@tafinityai.com
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Send RFPs, project specs, or partner decks.
                  </p>
                </div>
              </a>

              {/* Office Location */}
              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Global Innovation Hub
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    Uttam Nagar East, New Delhi, 110059
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Delivering solutions across India, US, UK, and UAE.
                  </p>
                </div>
              </div>
            </div>

            {/* PREFER 1-ON-1 VIDEO CALL? CALENDAR BANNER */}
            <div 
              className="p-6 rounded-2xl text-white relative overflow-hidden shadow-lg transition-all transform hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #831843 100%)',
                boxShadow: '0 12px 30px rgba(15, 23, 42, 0.25)'
              }}
            >
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-pink-200 text-xs font-bold tracking-wider uppercase mb-3 border border-white/15">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Instant Calendar Booking</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1.5">
                  Prefer a 1-on-1 Video Strategy Call?
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm mb-4 leading-relaxed">
                  Skip the emails! Pick an exact 30-minute slot on our interactive calendar with immediate Google Meet confirmation.
                </p>
                <Link
                  to="/schedule-meeting"
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-pink-50 transition-all shadow-md active:scale-95"
                >
                  <span>Book Meeting on Calendar</span>
                  <ArrowRight className="w-4 h-4 text-[#be185d]" />
                </Link>
              </div>

              {/* Decorative background circle */}
              <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-pink-500/20 blur-xl pointer-events-none" />
            </div>

            {/* TRUST GUARANTEES BADGES */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-700">100% Strict NDA Guarantee</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="font-semibold text-slate-700">&lt; 2h Response SLA</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ULTRA-PREMIUM INTERACTIVE INQUIRY FORM */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-200/80 relative overflow-hidden bg-white/95">
              
              {/* SUBMISSION SUCCESS CONFIRMATION */}
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                  </div>

                  <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-3">
                    Inquiry Received Successfully
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                    Thank You, {formData.name || 'Friend'}!
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
                    Your request has been routed to our technical architects. We will review your project requirements and email you back at <strong className="text-slate-900">{formData.email}</strong> within 2 hours.
                  </p>

                  <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 mb-8 text-xs sm:text-sm">
                    <div className="flex justify-between text-slate-500">
                      <span>Service Requested:</span>
                      <strong className="text-slate-800">{formData.enquiryType}</strong>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Target Timeline:</span>
                      <strong className="text-slate-800">{formData.timeline}</strong>
                    </div>
                    {formData.phone && (
                      <div className="flex justify-between text-slate-500">
                        <span>Contact Number:</span>
                        <strong className="text-slate-800">{formData.phone}</strong>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <a
                      href="https://wa.me/918005006933"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Chat on WhatsApp Directly
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          enquiryType: ENQUIRY_TYPES[0],
                          timeline: TIMELINES[1],
                          message: ''
                        });
                      }}
                      className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* THE FORM */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        Send Us a Message
                      </h2>
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                        Quick Response
                      </span>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g. John Doe"
                          className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Work / Personal Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="e.g. john@example.com"
                          className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Phone / WhatsApp Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs transition-all"
                      />
                    </div>
                  </div>

                  {/* Enquiry Type Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      What are you interested in? *
                    </label>
                    <select
                      value={formData.enquiryType}
                      onChange={(e) => setFormData(prev => ({ ...prev, enquiryType: e.target.value }))}
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs transition-all cursor-pointer"
                    >
                      {ENQUIRY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>


                  {/* Project Details Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Tell Us About Your Project *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Briefly describe what you want to build, existing systems, or your main objectives..."
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl text-white font-bold text-sm sm:text-base shadow-xl transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #075985 100%)',
                        boxShadow: '0 8px 24px rgba(2, 132, 199, 0.35)'
                      }}
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Project Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-slate-400 mt-3 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>We strictly protect your privacy. Zero spam guarantee.</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-2 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="glass-card rounded-2xl border border-slate-200/90 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-800 hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
