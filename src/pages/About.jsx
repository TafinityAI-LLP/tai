import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import {
    Zap, Code2, Globe, Users, ShieldCheck, ArrowRight,
    Cpu, Layers, Workflow, GraduationCap, Target, TrendingUp,
    Rocket, Building2, Factory, BarChart3, CheckCircle2,
    Award, Landmark, FileText, BookOpen, Sparkles
} from 'lucide-react';

const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const services = [
    {
        icon: <Workflow className="w-6 h-6" />,
        title: 'Workflow Automation & AI',
        desc: 'We help businesses identify repetitive manual processes and transform them into resilient automated pipelines—reducing overhead and eliminating human error.',
    },
    {
        icon: <Code2 className="w-6 h-6" />,
        title: 'Custom Software Development',
        desc: 'Web applications, cross-platform mobile apps, cloud ERP, CRM suites, and custom REST/GraphQL APIs—engineered from scratch for peak performance.',
    },
    {
        icon: <Globe className="w-6 h-6" />,
        title: 'Enterprise IT Consulting',
        desc: 'We evaluate your legacy architecture, identify systemic bottlenecks, and formulate scalable cloud roadmaps to future-proof your digital operations.',
    },
    {
        icon: <GraduationCap className="w-6 h-6" />,
        title: 'Internship & Talent Mentorship',
        desc: 'Hands-on programs bridging academic theories with enterprise production workflows—covering SDLC, Git, modern frameworks, and applied AI systems.',
    },
];

const whyUs = [
    {
        icon: <Layers className="w-5 h-5 text-blue-600" />,
        title: 'Custom-Built, Not Cookie-Cutter',
        desc: 'Your business is unique. We examine your operational bottlenecks before writing a line of code—fitting technology to your workflows, not forcing you into generic templates.',
    },
    {
        icon: <Target className="w-5 h-5 text-blue-600" />,
        title: 'End-to-End Technology Partner',
        desc: 'From initial architecture blueprints through production deployment and 24/7 observability—we handle the full lifecycle so your team can focus on growth.',
    },
    {
        icon: <Cpu className="w-5 h-5 text-blue-600" />,
        title: 'Modern Architecture by Design',
        desc: 'We leverage cloud-native services, event-driven microservices, and applied AI models designed to scale seamlessly with zero technical debt.',
    },
    {
        icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
        title: 'Engineered for High Scale',
        desc: 'Software must never become a ceiling to your growth. We implement robust data architectures and caching layers designed for high concurrency.',
    },
    {
        icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
        title: 'Clear, Measurable ROI',
        desc: 'Every system we build delivers quantifiable business value—cutting server overhead, automating manual hours, and optimizing conversions.',
    },
];

const visionGoals = [
    {
        num: '01',
        icon: <Workflow className="w-5 h-5" />,
        title: 'Pioneer Workflow Automation',
        desc: 'Establish ourselves as India’s leading enterprise partner for self-hosted automation, intelligent document processing, and multi-agent AI ecosystems.',
    },
    {
        num: '02',
        icon: <Layers className="w-5 h-5" />,
        title: 'Build Scalable SaaS Platforms',
        desc: 'Develop modular, industry-specific SaaS solutions that solve complex accounting, logistics, and resource planning challenges globally.',
    },
    {
        num: '03',
        icon: <GraduationCap className="w-5 h-5" />,
        title: 'Empower Next-Gen Engineering Talent',
        desc: 'Bridge the academic-to-industry gap by mentoring ambitious developers with enterprise-grade repositories, code reviews, and production deployments.',
    },
];

const approachSteps = [
    { num: '01', label: 'Understand & Discover', desc: 'We dissect your business models, existing software bottlenecks, database schemas, and end-user personas.', icon: <BookOpen className="w-5 h-5" /> },
    { num: '02', label: 'Strategize & Blueprint', desc: 'We architect a clear technical roadmap, microservice boundary specification, and delivery timeline.', icon: <Target className="w-5 h-5" /> },
    { num: '03', label: 'Build & Iterate', desc: 'Our engineering team develops modular, clean, and tested codebases with weekly staged progress demos.', icon: <Code2 className="w-5 h-5" /> },
    { num: '04', label: 'Automate & Integrate', desc: 'We wire up event triggers, automated database reconciliations, and third-party webhook integrations.', icon: <Cpu className="w-5 h-5" /> },
    { num: '05', label: 'Deploy & Scale', desc: 'Containerized CI/CD releases with proactive telemetry, monitoring, and horizontal scaling capabilities.', icon: <TrendingUp className="w-5 h-5" /> },
];

const businessTiers = [
    { icon: <Rocket className="w-6 h-6" />, title: 'Startups', desc: 'Transform innovative concepts into robust MVPs with rapid iteration and cloud-native architecture.' },
    { icon: <Building2 className="w-6 h-6" />, title: 'Mid-Market SMBs', desc: 'Automate labor-intensive paper and spreadsheet workflows to unlock sustainable margin expansion.' },
    { icon: <Factory className="w-6 h-6" />, title: 'Enterprises', desc: 'Modernize monolithic legacy infrastructure with secure microservices, ERP integrations, and custom AI.' },
    { icon: <Globe className="w-6 h-6" />, title: 'Industry-Agnostic', desc: 'Our bespoke architectural methodology delivers high-impact results across healthcare, fintech, and retail.' },
];

const trustCredentials = [
    { icon: <Award className="w-5 h-5 text-blue-600" />, label: 'Registered LLP Enterprise' },
    { icon: <FileText className="w-5 h-5 text-blue-600" />, label: 'Full GST Compliance' },
    { icon: <ShieldCheck className="w-5 h-5 text-blue-600" />, label: 'MSME / Udyam Certification' },
    { icon: <Landmark className="w-5 h-5 text-blue-600" />, label: 'Startup India Recognized' },
    { icon: <GraduationCap className="w-5 h-5 text-blue-600" />, label: 'AICTE Internship Partner' },
    { icon: <BookOpen className="w-5 h-5 text-blue-600" />, label: 'University & College MoUs' },
];

const About = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            <SEO />

            {/* ─── 1. HERO / WHO WE ARE ───────────────────────────────────────────── */}
            <section className="relative pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-20 bg-gradient-to-b from-sky-50/70 via-slate-50/40 to-white overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[320px] bg-gradient-to-r from-sky-300/20 via-blue-400/15 to-indigo-300/15 blur-3xl rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
                        
                        {/* Left Column: Heading & Narrative */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInLeft}
                            className="lg:col-span-7"
                        >
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                                <span>WHO WE ARE &bull; TAFINITYAI</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-5">
                                Technology should solve problems—<br className="hidden sm:inline" />
                                <span className="text-gradient-accent">not create more.</span>
                            </h1>

                            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                                <p>
                                    At TafinityAI, we believe businesses should never have to compromise or contort their operations around rigid, generic software. Instead, high-grade technology must be architected around the business.
                                </p>
                                <p>
                                    Founded with a clear purpose, TafinityAI was established to make advanced technology practical, scalable, and cost-effective—while building India's premier technical mentorship ecosystem.
                                </p>
                                <p>
                                    Our multidisciplinary team unifies custom software engineering, automated n8n workflows, intelligent AI agents, and cloud architecture to deliver measurable competitive advantages for our clients worldwide.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Column: Interactive Quote & Timeline Stat Card */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInRight}
                            className="lg:col-span-5"
                        >
                            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-blue-100 shadow-xl shadow-blue-500/5 relative overflow-hidden">
                                
                                {/* Handwritten Quote Header */}
                                <motion.div
                                    animate={{ y: [-3, 3, -3] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                    className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-sky-50/60 border border-blue-100/70"
                                >
                                    <p className="text-sm sm:text-base font-bold text-blue-800 leading-snug">
                                        "Technology built around your business—not the other way around."
                                    </p>
                                    <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1.5">
                                        — The TafinityAI Manifesto
                                    </span>
                                </motion.div>

                                {/* Vertical Timeline Stats */}
                                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-sky-400 before:to-blue-200">
                                    {[
                                        { value: '2026', label: 'Established & Growing', desc: 'Registered enterprise LLP' },
                                        { value: '100%', label: 'Custom Architecture', desc: 'Zero generic templates' },
                                        { value: 'End-to-End', label: 'Dedicated Partnership', desc: 'From problem to production' },
                                        { value: 'Global-Ready', label: 'India-First Talent', desc: 'Enterprise-grade code quality' },
                                    ].map((stat, i) => (
                                        <div key={i} className="relative group">
                                            {/* Bullet Node */}
                                            <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-blue-600 group-hover:scale-125 group-hover:bg-blue-600 transition-all duration-200 shadow-xs" />
                                            
                                            <div>
                                                <div className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                                                    {stat.value}
                                                </div>
                                                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-0.5">
                                                    {stat.label}
                                                </div>
                                                <div className="text-xs text-slate-500 mt-0.5">
                                                    {stat.desc}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ─── 2. WHAT WE DO (Core Capabilities) ────────────────────────── */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
                    >
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
                            WHAT WE DO
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                            Our Core Capabilities
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                            Bespoke software systems designed to solve real business pain points, automate workflows, and accelerate commercial growth.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
                    >
                        {services.map((svc, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeIn}
                                whileHover={{ y: -4 }}
                                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-4">
                                        {svc.icon}
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2">
                                        {svc.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        {svc.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── 3. OUR MISSION ────────────────────────────────────────────── */}
            <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-slate-50 to-sky-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                        
                        {/* Mission Left Checklist */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInLeft}
                            className="lg:col-span-7"
                        >
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
                                OUR MISSION
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                                Make Technology Practical. <br />
                                <span className="text-gradient-accent">Make Innovation Accessible.</span>
                            </h2>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                                We help modern businesses unlock their full operational potential through high-performance software, thoughtful engineering, and seamless automation.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    'Automate repetitive and manual business processes',
                                    'Resolve complex systemic architecture bottlenecks',
                                    'Deploy practical, high-ROI AI agents for real work',
                                    'Deliver scalable codebases with zero bloat',
                                    'Tailor every solution to client operational reality',
                                    'Build robust foundations for future digital expansion',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-white/70 border border-slate-200/60 shadow-2xs">
                                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                        <span className="text-xs font-medium text-slate-700 leading-snug">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Mission Right Cards (Clean, Responsive Glass Cards) */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="lg:col-span-5 space-y-4"
                        >
                            {[
                                {
                                    icon: <Zap className="w-5 h-5 text-blue-600" />,
                                    label: 'Automation First',
                                    desc: 'We identify manual choke points before writing code, prioritizing rapid operational time savings.'
                                },
                                {
                                    icon: <Users className="w-5 h-5 text-blue-600" />,
                                    label: 'Client-Centric Engineering',
                                    desc: 'Every technical architectural decision is made to optimize your business metrics, not our preferences.'
                                },
                                {
                                    icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
                                    label: 'Enterprise Reliability',
                                    desc: 'Fault-tolerant schemas, automated CI/CD pipelines, and proactive observability built into day one.'
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeIn}
                                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                                            {item.label}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ─── 4. OUR VISION ─────────────────────────────────────────────── */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
                    >
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
                            OUR VISION
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                            Building a Smarter Digital Future
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                            A global technology ecosystem where businesses automate seamlessly, and the next generation of engineers develops real production expertise.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {visionGoals.map((goal, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeIn}
                                whileHover={{ y: -5 }}
                                className="p-6 sm:p-8 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
                            >
                                <span className="absolute top-4 right-6 text-5xl font-black text-slate-200/60 select-none pointer-events-none">
                                    {goal.num}
                                </span>

                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-6">
                                        {goal.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        {goal.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        {goal.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── 5. WHY TAFINITYAI ─────────────────────────────────────────── */}
            <section className="py-12 sm:py-16 md:py-20 bg-slate-50/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
                    >
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
                            WHY TAFINITYAI
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                            The Difference That Matters
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                    >
                        {whyUs.map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeIn}
                                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── 6. OUR APPROACH (Responsive Interactive Timeline) ─────────── */}
            <section className="py-14 sm:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
                    >
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
                            HOW WE WORK
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">Approach</span>
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
                            A disciplined, repeatable delivery methodology designed for transparent progress and high-velocity launches.
                        </p>
                    </motion.div>

                    {/* Timeline List (100% Mobile & Tablet Responsive) */}
                    <div className="space-y-6 sm:space-y-8 relative before:absolute before:left-4 sm:before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-sky-400 before:via-blue-600 before:to-transparent">
                        {approachSteps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className="relative pl-12 sm:pl-16 group"
                            >
                                {/* Step Number Node Badge */}
                                <div className="absolute left-0 sm:left-2 top-3 w-8 h-8 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white font-black text-xs flex items-center justify-center shadow-lg shadow-sky-500/30 ring-4 ring-slate-900 group-hover:scale-110 transition-transform">
                                    {step.num}
                                </div>

                                {/* Step Content Card */}
                                <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-sky-500/40 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="text-sky-400">
                                            {step.icon}
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold text-white">
                                            {step.label}
                                        </h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 7. WHO WE SERVE (Business Tiers) ─────────────────────────── */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
                    >
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
                            WHO WE SERVE
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                            Tailored for Every Stage of Growth
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                            Whether you're bootstrapping an MVP or modernizing an enterprise operation, our team adapts to your velocity.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
                    >
                        {businessTiers.map((tier, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeIn}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mx-auto mb-4">
                                        {tier.icon}
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 mb-2">
                                        {tier.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        {tier.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── 8. TRUST & CREDENTIALS ───────────────────────────────────── */}
            <section className="py-12 sm:py-16 md:py-20 bg-slate-50/70 border-t border-slate-200/70">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                        
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInLeft}
                            className="lg:col-span-6"
                        >
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
                                BUILT ON TRUST
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                                A Formally Established, <br />
                                <span className="text-gradient-accent">Professional Organization.</span>
                            </h2>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                                TafinityAI LLP operates with strict adherence to corporate governance, client non-disclosure agreements, and transparent commercial contracts.
                            </p>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                Furthermore, our industry mentorship programs are backed by formal registrations, preparing talented developers for high-performing engineering careers.
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                        >
                            {trustCredentials.map((cred, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={fadeIn}
                                    className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3 hover:border-blue-300 transition-colors"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                        {cred.icon}
                                    </div>
                                    <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                                        {cred.label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ─── 9. CALL TO ACTION ────────────────────────────────────────── */}
            <section className="py-14 sm:py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-center shadow-xl relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
                                The Future We're Building Together.
                            </h2>
                            <p className="text-white/70 text-xs sm:text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                                Whether you need an automated n8n workflow, an enterprise SaaS platform, or technical consultation—our engineering team is ready.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <Link
                                    to="/schedule-meeting"
                                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs sm:text-sm shadow-lg transition flex items-center justify-center gap-2"
                                >
                                    <span>Schedule a Meeting</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    to="/services"
                                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition flex items-center justify-center"
                                >
                                    Explore Services
                                </Link>
                            </div>

                            <p className="text-[11px] text-white/50 italic mt-6">
                                Build Smarter. Automate Better. Grow Faster. &bull; TafinityAI LLP
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default About;
