import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, TrendingUp, Layers, Cpu, ShieldCheck, X, Sparkles, Filter } from 'lucide-react';
import SEO from '../components/SEO.jsx';

const DEFAULT_CASE_STUDIES = [
    {
        id: 'cs-1',
        title: 'Enterprise Workflow Automation & Real-Time Sync',
        tags: 'AI & Automation',
        challenge: 'A multi-branch retail network was losing 25+ hours weekly per store on manual inventory reconciliations, multi-vendor order routing, and spreadsheet data entry.',
        solution: 'Architected an event-driven n8n workflow pipeline integrated with an AI agent for OCR receipt parsing, automated ERP stock balancing, and webhook alerts to regional managers.',
        result: '88% Overhead Reduction',
        secondaryResult: '<2s Processing Latency',
        clientType: 'National Retail & Distribution Corp',
        metrics: [
            { label: 'Time Saved / Week', value: '140+ Hrs' },
            { label: 'Error Rate Dropped', value: '99.4%' },
            { label: 'Sync Latency', value: '<2s' },
        ],
        techStack: ['n8n', 'Python OCR', 'PostgreSQL', 'Docker', 'REST Webhooks'],
        accentGradient: 'from-blue-600 to-cyan-500'
    },
    {
        id: 'cs-2',
        title: 'Scalable Telemedicine & Health Records System',
        tags: 'Custom Software',
        challenge: 'A healthcare consortium required an airtight HIPAA-ready patient consultation portal supporting live video appointments, encrypted EHR transmission, and automated slot allocations.',
        solution: 'Built a decoupled React/Node microservice architecture with WebRTC video tunnels, role-based encryption schemas, and a responsive doctor scheduling dashboard.',
        result: '450k+ Consultations',
        secondaryResult: '99.99% Uptime',
        clientType: 'Digital Health Network',
        metrics: [
            { label: 'Active Monthly Patients', value: '180,000+' },
            { label: 'Average Wait Time', value: '<3 Mins' },
            { label: 'Platform Availability', value: '99.99%' },
        ],
        techStack: ['React', 'Node.js', 'WebRTC', 'TailwindCSS', 'Redis'],
        accentGradient: 'from-emerald-600 to-teal-500'
    },
    {
        id: 'cs-3',
        title: 'Smart Logistics Fleet & Dispatch Orchestration',
        tags: 'Enterprise ERP',
        challenge: 'A national cargo logistics company struggled with unoptimized dispatch routes, delayed proof-of-delivery receipts, and disconnected driver dispatch coordination.',
        solution: 'Developed an end-to-end driver mobile application and central dispatch console with real-time GPS telemetry, geofence trip triggers, and automated bill-of-lading invoices.',
        result: '+310% Delivery Speed',
        secondaryResult: '100% Paperless',
        clientType: 'Express Freight Logistics',
        metrics: [
            { label: 'Route Efficiency', value: '+34%' },
            { label: 'Daily Shipments Tracked', value: '25,000+' },
            { label: 'Fuel Cost Savings', value: '18.5%' },
        ],
        techStack: ['React Native', 'Laravel API', 'PostGIS', 'WebSockets', 'AWS'],
        accentGradient: 'from-indigo-600 to-violet-500'
    },
    {
        id: 'cs-4',
        title: 'Autonomous Multi-Agent Customer Support Suite',
        tags: 'AI & Automation',
        challenge: 'A fast-growing fintech company faced 8+ hours ticket resolution backlogs during market hours, resulting in low CSAT scores and high tier-1 support costs.',
        solution: 'Deployed custom LLM agents equipped with vector databases and internal knowledge bases to autonomously resolve tier-1 queries, dispute claims, and verify KYC credentials.',
        result: '72% Auto-Resolved',
        secondaryResult: '4.9/5 CSAT Score',
        clientType: 'Neo-Banking Fintech Group',
        metrics: [
            { label: 'Instant First Response', value: '<5 Sec' },
            { label: 'First Contact Resolution', value: '72%' },
            { label: 'Support Cost Saved', value: '62%' },
        ],
        techStack: ['LangChain', 'OpenAI / Claude', 'Pinecone', 'Python FastApi', 'Next.js'],
        accentGradient: 'from-pink-600 to-rose-500'
    }
];

const CaseStudies = () => {
    const [cases, setCases] = useState(DEFAULT_CASE_STUDIES);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeModalStudy, setActiveModalStudy] = useState(null);

    useEffect(() => {
        fetch('/api/casestudies')
            .then(r => r.json())
            .then(d => {
                if (Array.isArray(d) && d.length > 0) {
                    setCases(d);
                }
            })
            .catch(() => {
                // Keep default high-grade case studies
            });
    }, []);

    const categories = ['All', 'AI & Automation', 'Custom Software', 'Enterprise ERP'];

    const filteredCases = selectedCategory === 'All'
        ? cases
        : cases.filter(c => (c.tags || '').toLowerCase().includes(selectedCategory.toLowerCase()) ||
            (c.tags || '').toLowerCase() === selectedCategory.toLowerCase());

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-slate-50/50 pb-20">
            <SEO />

            {/* HERO SECTION */}
            <section className="relative pt-24 sm:pt-32 md:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-transparent">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[300px] bg-gradient-to-r from-sky-300/20 via-blue-400/15 to-indigo-300/20 blur-3xl rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 sm:mb-5 shadow-xs"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Proven Client Outcomes &amp; Engineering Masterclasses</span>
                    </motion.div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
                        Case <span className="text-gradient-accent">Studies.</span>
                    </h1>

                    <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Discover how we engineer high-performance systems, scale automated pipelines, and deliver measurable business value globally.
                    </p>

                    {/* FILTER TABS */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-600'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CASE STUDIES LIST */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
                <div className="space-y-10 sm:space-y-14 md:space-y-16">
                    {filteredCases.map((study, idx) => {
                        const isEven = idx % 2 === 0;
                        const gradient = study.accentGradient || 'from-blue-600 to-cyan-500';

                        return (
                            <motion.div
                                key={study.id || idx}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: idx * 0.08 }}
                                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                                    
                                    {/* VISUAL / KPI HIGHLIGHT BLOCK (Reorders on desktop for alternation, always on top for mobile) */}
                                    <div className={`lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-gradient-to-br ${gradient} text-white relative overflow-hidden ${
                                        !isEven ? 'lg:order-2' : 'lg:order-1'
                                    }`}>
                                        {/* Subtle background circuit watermark */}
                                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                                        
                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between gap-3 mb-6">
                                                <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/25">
                                                    {study.tags || 'Case Study'}
                                                </span>
                                                <span className="text-xs font-medium text-white/80">
                                                    {study.clientType || 'Enterprise Client'}
                                                </span>
                                            </div>

                                            <div className="mt-4 sm:mt-6">
                                                <p className="text-xs uppercase tracking-widest text-white/75 font-semibold mb-1">
                                                    Headline Outcome
                                                </p>
                                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-3">
                                                    {study.result || '100% KPI'}
                                                </h3>
                                                {study.secondaryResult && (
                                                    <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-white/15 text-white backdrop-blur-xs">
                                                        {study.secondaryResult}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* METRICS ROW */}
                                        <div className="relative z-10 mt-8 pt-6 border-t border-white/20">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                                                {(study.metrics || [
                                                    { label: 'Uptime', value: '99.9%' },
                                                    { label: 'Speed', value: '<100ms' }
                                                ]).map((m, mIdx) => (
                                                    <div key={mIdx} className="bg-black/15 rounded-xl p-2.5 sm:p-3 backdrop-blur-xs">
                                                        <div className="text-sm sm:text-base font-extrabold text-white leading-tight">
                                                            {m.value}
                                                        </div>
                                                        <div className="text-[10px] sm:text-[11px] text-white/75 font-medium leading-tight mt-0.5">
                                                            {m.label}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* CONTENT BLOCK */}
                                    <div className={`lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between ${
                                        !isEven ? 'lg:order-1' : 'lg:order-2'
                                    }`}>
                                        <div>
                                            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4 group-hover:text-blue-600 transition-colors">
                                                {study.title}
                                            </h2>

                                            <div className="space-y-3.5 mb-6">
                                                <div className="flex items-start gap-2.5">
                                                    <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                                                        <span className="text-[10px] font-black">!</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">The Challenge:</h4>
                                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-0.5">
                                                            {study.challenge || 'Resolving bottlenecks in operational speed and scale.'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-2.5">
                                                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">Architected Solution:</h4>
                                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-0.5">
                                                            {study.solution || 'Implemented automated pipelines with custom fault-tolerant services.'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* TECH TAGS */}
                                            {study.techStack && (
                                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6">
                                                    {study.techStack.map((tech, tIdx) => (
                                                        <span
                                                            key={tIdx}
                                                            className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <button
                                                onClick={() => setActiveModalStudy(study)}
                                                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group/btn cursor-pointer"
                                            >
                                                <span>Explore Architecture Breakdown</span>
                                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                            </button>

                                            <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">
                                                Case Ref: #{study.id || idx + 101}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* ARCHITECTURE DETAIL MODAL */}
            <AnimatePresence>
                {activeModalStudy && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col"
                        >
                            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                        {activeModalStudy.tags || 'Case Study Breakdown'}
                                    </span>
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                                        {activeModalStudy.title}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setActiveModalStudy(null)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm">
                                <div>
                                    <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1">
                                        Client Problem Domain
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        {activeModalStudy.challenge}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1">
                                        Technical Implementation &amp; Architecture
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        {activeModalStudy.solution}
                                    </p>
                                </div>

                                {activeModalStudy.metrics && (
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
                                            Audited Deliverables
                                        </h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {activeModalStudy.metrics.map((m, idx) => (
                                                <div key={idx} className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                                                    <div className="text-base font-black text-blue-700">{m.value}</div>
                                                    <div className="text-xs text-slate-600">{m.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                                <span className="text-xs text-slate-500 font-medium">Ready for similar transformation?</span>
                                <a
                                    href="/schedule-meeting"
                                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition"
                                >
                                    Book Strategy Call
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CaseStudies;
