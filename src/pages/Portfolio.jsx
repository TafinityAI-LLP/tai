import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles, Layers, Laptop, Smartphone, Bot, Database, Check } from 'lucide-react';
import SEO from '../components/SEO.jsx';

const DEFAULT_PORTFOLIO = [
    {
        id: 'port-1',
        title: 'Apex Cloud ERP & Real-Time Inventory',
        category: 'Enterprise Systems',
        desc: 'A unified enterprise resource planning ecosystem with real-time barcode scanning, dynamic purchase order pipelines, and multi-warehouse sync.',
        techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Redis'],
        gradient: 'from-blue-600 via-indigo-600 to-sky-500',
        stats: '150k+ Daily SKUs',
        link: '/schedule-meeting'
    },
    {
        id: 'port-2',
        title: 'NexaAI Autonomous Lead Scorer & Agent',
        category: 'AI & Automation',
        desc: 'LLM-driven autonomous customer qualification agent that enriches CRM prospects, schedules follow-ups, and auto-dispatches sales outreach.',
        techStack: ['Python', 'LangChain', 'n8n', 'FastAPI', 'Tailwind'],
        gradient: 'from-violet-600 via-purple-600 to-pink-500',
        stats: '4.8x Conversion Rate',
        link: '/schedule-meeting'
    },
    {
        id: 'port-3',
        title: 'Zenith Telehealth & Doctor Consultation App',
        category: 'Mobile Apps',
        desc: 'Cross-platform mobile application providing HIPAA-grade encrypted video calls, e-prescriptions, and smart appointment queueing.',
        techStack: ['Flutter', 'WebRTC', 'Laravel', 'MySQL', 'Firebase'],
        gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
        stats: '85k+ Mobile Users',
        link: '/schedule-meeting'
    },
    {
        id: 'port-4',
        title: 'OmniFlow Headless Commerce & B2B Portal',
        category: 'Web Apps & SaaS',
        desc: 'Ultra-fast Next.js storefront equipped with bulk wholesale pricing tiers, instant GST invoices, and dynamic payment orchestration.',
        techStack: ['Next.js', 'Stripe', 'GraphQL', 'TailwindCSS', 'AWS'],
        gradient: 'from-rose-600 via-pink-600 to-amber-500',
        stats: '<0.8s Page Speed',
        link: '/schedule-meeting'
    },
    {
        id: 'port-5',
        title: 'PulsePOS Offline-First Retail Billing',
        category: 'Enterprise Systems',
        desc: 'Zero-latency point of sale client engineered for high-volume retail, syncing with central cloud databases immediately upon reconnection.',
        techStack: ['Electron', 'React', 'SQLite', 'WebSockets', 'Node.js'],
        gradient: 'from-amber-600 via-orange-600 to-yellow-500',
        stats: '99.999% Reliability',
        link: '/schedule-meeting'
    },
    {
        id: 'port-6',
        title: 'Synapse Multi-Agent Workflow Engine',
        category: 'AI & Automation',
        desc: 'Custom self-hosted n8n workflow engine connecting 40+ legacy systems to streamline invoice approval chains and HR onboarding.',
        techStack: ['n8n', 'Node.js', 'Python', 'Docker', 'REST APIs'],
        gradient: 'from-cyan-600 via-blue-600 to-indigo-500',
        stats: '1.2M Actions / Mo',
        link: '/schedule-meeting'
    }
];

const Portfolio = () => {
    const [projects, setProjects] = useState(DEFAULT_PORTFOLIO);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetch('/api/portfolio')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setProjects(data);
                }
            })
            .catch(() => {
                // Keep default high-grade projects
            });
    }, []);

    const categories = ['All', 'Web Apps & SaaS', 'Mobile Apps', 'AI & Automation', 'Enterprise Systems'];

    const filteredProjects = selectedCategory === 'All'
        ? projects
        : projects.filter(p => {
            const cat = (p.category || p.techStack || '').toLowerCase();
            return cat.includes(selectedCategory.toLowerCase());
        });

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-slate-50/50 pb-20">
            <SEO />

            {/* HERO SECTION */}
            <section className="relative pt-24 sm:pt-32 md:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-transparent">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[300px] bg-gradient-to-r from-cyan-300/20 via-blue-400/15 to-indigo-300/20 blur-3xl rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 sm:mb-5 shadow-xs"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Crafted Digital Ecosystems &amp; Scalable Systems</span>
                    </motion.div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
                        Our <span className="text-gradient-accent">Portfolio.</span>
                    </h1>

                    <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        A showcase of bespoke enterprise web applications, high-performance mobile apps, and autonomous AI automation pipelines.
                    </p>

                    {/* CATEGORY FILTER BUTTONS */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
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

            {/* PORTFOLIO GRID */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                    {filteredProjects.map((proj, idx) => {
                        const gradient = proj.gradient || 'from-blue-600 to-indigo-600';
                        const stack = Array.isArray(proj.techStack)
                            ? proj.techStack
                            : typeof proj.techStack === 'string'
                            ? proj.techStack.split(',').map(s => s.trim())
                            : ['Enterprise Tech'];

                        return (
                            <motion.div
                                key={proj.id || idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.4, delay: idx * 0.06 }}
                                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                            >
                                <div>
                                    {/* Visual Banner Preview */}
                                    <div
                                        className={`h-48 sm:h-52 w-full relative overflow-hidden bg-gradient-to-br ${gradient} p-5 flex flex-col justify-between text-white`}
                                        style={proj.imageUrl ? { background: `url(${proj.imageUrl}) center/cover` } : {}}
                                    >
                                        <div className="flex items-center justify-between gap-2 z-10">
                                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/25 backdrop-blur-md text-white border border-white/20">
                                                {proj.category || 'Featured'}
                                            </span>

                                            {proj.stats && (
                                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/20 backdrop-blur-xs text-white">
                                                    {proj.stats}
                                                </span>
                                            )}
                                        </div>

                                        <div className="z-10 mt-auto">
                                            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white mb-2 shadow-xs group-hover:scale-110 transition-transform">
                                                <Layers className="w-5 h-5" />
                                            </div>
                                        </div>

                                        {/* Subtle decorative glow */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-4 sm:p-5 sm:pb-3">
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                                            {proj.title}
                                        </h3>

                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                                            {proj.description || proj.desc}
                                        </p>

                                        {/* Tech Stack Pills */}
                                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                                            {stack.slice(0, 4).map((t, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                            {stack.length > 4 && (
                                                <span className="text-[10px] text-slate-400 font-bold">
                                                    +{stack.length - 4}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer link */}
                                <div className="p-4 sm:p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-[11px] font-medium text-slate-400">
                                        Custom Architecture
                                    </span>

                                    <a
                                        href={proj.link || '/schedule-meeting'}
                                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition group/link"
                                    >
                                        <span>View System</span>
                                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                    </a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* BOTTOM CALLOUT */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18 text-center">
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-lg sm:text-2xl font-bold mb-2">
                            Have a custom product idea or complex workflow to automate?
                        </h3>
                        <p className="text-white/70 text-xs sm:text-sm max-w-xl mx-auto mb-6">
                            Let's architect a high-performance solution tailored to your exact operational requirements.
                        </p>
                        <a
                            href="/schedule-meeting"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-lg transition"
                        >
                            <span>Schedule Consultation</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Portfolio;
