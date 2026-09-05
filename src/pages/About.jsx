import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Zap, Code2, Globe, Users, ShieldCheck, ArrowRight,
    Cpu, Layers, Workflow, GraduationCap, Target, TrendingUp,
    Rocket, Building2, Factory, BarChart3, CheckCircle2,
    Award, Landmark, FileText, BookOpen
} from 'lucide-react';

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const services = [
    {
        icon: <Workflow size={28} />,
        title: 'Workflow Automation & AI',
        desc: 'We help businesses identify repetitive processes and transform them into smarter, automated workflows—reducing manual work, minimizing errors, and unlocking measurable business value.',
    },
    {
        icon: <Code2 size={28} />,
        title: 'Custom Software Development',
        desc: 'Websites, web apps, mobile apps, ERP, CRM, business management systems, APIs—we build around your specific requirements from concept to deployment and beyond.',
    },
    {
        icon: <Globe size={28} />,
        title: 'IT Consulting',
        desc: 'We help organizations understand their technology requirements, evaluate opportunities, identify inefficiencies, and turn complex challenges into clear, actionable strategies.',
    },
    {
        icon: <GraduationCap size={28} />,
        title: 'Internship & Industry Training',
        desc: 'Mentor-led programs designed to bridge the gap between academic learning and industry expectations—with real projects, SDLC, Git, AI exposure and career guidance.',
    },
];

const whyUs = [
    {
        icon: <Layers size={22} />,
        title: 'Custom-Built, Not One-Size-Fits-All',
        desc: 'Your business is unique. We understand your requirements before designing solutions—technology that fits your business, not the other way around.',
    },
    {
        icon: <Target size={22} />,
        title: 'End-to-End Technology Partner',
        desc: 'From problem to solution, design to deployment, and beyond—one partner for the entire technology journey, no fragmented coordination.',
    },
    {
        icon: <Cpu size={22} />,
        title: 'Modern by Design',
        desc: 'We embrace modern software engineering, cloud, AI, and automation practices to build solutions prepared for both today\'s needs and tomorrow\'s opportunities.',
    },
    {
        icon: <TrendingUp size={22} />,
        title: 'Built to Scale',
        desc: 'Solutions become a limitation when they don\'t grow with you. We design with scalability, maintainability, and future expansion built in from day one.',
    },
    {
        icon: <BarChart3 size={22} />,
        title: 'Value-Driven',
        desc: 'High-quality tech should deliver meaningful business value. We build the right solution—balancing quality, performance, scalability, and cost.',
    },
];

const visionGoals = [
    {
        num: '01',
        icon: <Workflow size={22} />,
        title: 'Lead in Workflow Automation',
        desc: 'Become a trusted technology partner for businesses looking to automate operations and adopt intelligent workflows.',
    },
    {
        num: '02',
        icon: <Layers size={22} />,
        title: 'Build a Technology Ecosystem',
        desc: 'Develop innovative SaaS products and technology solutions that solve real-world business problems at scale.',
    },
    {
        num: '03',
        icon: <GraduationCap size={22} />,
        title: 'Develop Industry-Ready Talent',
        desc: 'Build a strong training ecosystem that helps Indian students bridge the academic-to-industry gap in technology careers.',
    },
];

const approachSteps = [
    { num: '01', label: 'Understand', desc: 'We start by understanding your business, objectives, processes, users, and challenges.', icon: <BookOpen size={20} /> },
    { num: '02', label: 'Strategize', desc: 'We identify the right technology approach and define a practical roadmap for solving the problem.', icon: <Target size={20} /> },
    { num: '03', label: 'Build', desc: 'Our team designs and develops a custom solution aligned with your requirements.', icon: <Code2 size={20} /> },
    { num: '04', label: 'Automate', desc: 'Wherever possible, we eliminate repetitive work through workflow automation and intelligent technology.', icon: <Cpu size={20} /> },
    { num: '05', label: 'Scale', desc: 'We build with the future in mind, allowing your technology to evolve as your business grows.', icon: <TrendingUp size={20} /> },
];

const businessTiers = [
    { icon: <Rocket size={24} />, title: 'Startups', desc: 'Turn ideas into scalable digital products and establish the right technology foundation from the very beginning.' },
    { icon: <Building2 size={24} />, title: 'Small & Medium Businesses', desc: 'Replace manual processes, improve operational efficiency, and adopt technology that supports sustainable growth.' },
    { icon: <Factory size={24} />, title: 'Enterprises', desc: 'Modernize workflows, integrate systems, automate operations, and develop scalable solutions for complex environments.' },
    { icon: <Globe size={24} />, title: 'Industry-Agnostic', desc: 'Our custom approach lets us understand and solve technology challenges across any business domain.' },
];

const trustCredentials = [
    { icon: <Award size={20} />, label: 'Registered LLP' },
    { icon: <FileText size={20} />, label: 'GST Registration' },
    { icon: <ShieldCheck size={20} />, label: 'MSME / Udyam Registration' },
    { icon: <Landmark size={20} />, label: 'Startup India Recognition' },
    { icon: <GraduationCap size={20} />, label: 'AICTE Internship Registration' },
    { icon: <BookOpen size={20} />, label: 'College & University MoUs' },
];

const About = () => {
    return (
        <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>


            {/* ─── WHO WE ARE ───────────────────────────────────────────── */}
            <section style={{ paddingTop: '10rem', paddingBottom: '3.5rem', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '3.5rem', alignItems: 'center' }}>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInLeft}>
                            <span style={{ color: 'var(--accent-color)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>WHO WE ARE</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                                Technology should solve problems—<span style={{ background: 'linear-gradient(135deg, var(--accent-hover), var(--accent-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>not create more.</span>
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                                At TafinityAI, we believe businesses should not have to reshape their operations around generic software. Instead, technology should be designed around the business.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                                Founded in 2026, TafinityAI was created with a simple objective: to make modern technology more accessible, practical, scalable, and valuable for businesses—while contributing to the next generation of technology professionals.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8 }}>
                                Our approach combines custom software development, workflow automation, AI-driven innovation, and technology consulting to help organizations reduce manual effort, improve efficiency, and build a stronger digital foundation.
                            </p>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRight} style={{ paddingLeft: 'min(5%, 2rem)', borderLeft: '1px solid rgba(15, 23, 42, 0.05)' }}>
                            <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.25, color: 'var(--text-primary)', marginBottom: '3rem', letterSpacing: '-0.02em', position: 'relative' }}>
                                "Technology built <br className="hidden md:block" /><span style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--accent-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>around your business</span>—<br className="hidden md:block" />not the other way around."
                                <span style={{ position: 'absolute', top: '-1.5rem', left: '-1rem', fontSize: '5rem', color: 'rgba(2, 132, 199, 0.08)', fontFamily: 'serif', zIndex: -1 }}>"</span>
                            </p>

                            <div className="relative mt-8 md:mt-0 pt-4 md:pt-0">
                                {/* The Axis Line - Vertical on all devices */}
                                <div className="absolute left-[9px] top-[15px] bottom-[15px] w-[2px] bg-gradient-to-b from-[var(--accent-color)] to-transparent md:to-[var(--bg-secondary)] rounded-full z-0 block" />

                                <div className="flex flex-col gap-6 md:gap-8 relative z-10">
                                    {[
                                        { value: '2026', label: 'Founded' },
                                        { value: '100%', label: 'Custom Solutions' },
                                        { value: 'End-to-End', label: 'Tech Partnership' },
                                        { value: 'India-First', label: 'Global-Ready' },
                                    ].map((stat, i) => (
                                        <div key={i} className="group flex flex-row items-center gap-5 md:gap-6 relative cursor-default text-left" style={{ padding: '0.25rem 0' }}
                                            onMouseEnter={e => {
                                                const dot = e.currentTarget.querySelector('.timeline-dot');
                                                if (dot) {
                                                    dot.style.background = 'var(--accent-color)';
                                                    dot.style.transform = 'scale(1.2)';
                                                    dot.style.boxShadow = '0 0 15px var(--accent-color)';
                                                }
                                            }}
                                            onMouseLeave={e => {
                                                const dot = e.currentTarget.querySelector('.timeline-dot');
                                                if (dot) {
                                                    dot.style.background = 'var(--bg-primary)';
                                                    dot.style.transform = 'scale(1)';
                                                    dot.style.boxShadow = '0 0 10px rgba(56,189,248,0.3)';
                                                }
                                            }}
                                        >
                                            <div className="timeline-dot w-5 h-5 rounded-full bg-[var(--bg-primary)] border-[4px] border-[var(--accent-light)] shadow-[0_0_10px_rgba(56,189,248,0.3)] z-10 transition-all duration-300 shrink-0" />
                                            <div>
                                                <div style={{ fontSize: 'clamp(1.5rem, 5vw, 1.85rem)', fontFamily: 'var(--font-display)' }} className="font-black text-[var(--text-primary)] leading-none mb-1 md:mb-1.5 tracking-tight">{stat.value}</div>
                                                <div className="text-[0.68rem] md:text-[0.85rem] text-[var(--accent-color)] font-bold uppercase tracking-widest leading-snug">{stat.label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── WHAT WE DO ───────────────────────────────────────────── */}
            <section style={{ padding: '3.5rem 0', background: 'var(--bg-primary)' }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <span style={{ color: 'var(--accent-color)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>WHAT WE DO</span>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Our Core Capabilities</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>End-to-end technology solutions built around your business workflows, not around our products.</p>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.75rem' }}>
                        {services.map((svc, idx) => (
                            <motion.div key={idx} variants={fadeIn} whileHover={{ y: -6 }} style={{ padding: '2.5rem', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-light)', transition: 'border-color 0.3s, box-shadow 0.3s', cursor: 'default' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(2,132,199,0.10)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(2,132,199,0.1)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)', marginBottom: '1.5rem' }}>
                                    {svc.icon}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.75rem' }}>{svc.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.75 }}>{svc.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── MISSION ──────────────────────────────────────────────── */}
            <section style={{ padding: '3.5rem 0', background: 'linear-gradient(110deg, var(--bg-primary) 45%, #0284c7 100%)', position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '3.5rem', alignItems: 'center' }}>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInLeft}>
                            <span style={{ color: 'var(--accent-color)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>OUR MISSION</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                                Make Technology Practical.<br />
                                <span style={{ background: 'linear-gradient(135deg, var(--accent-hover), var(--accent-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Make Innovation Accessible.</span>
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                                Our mission is to help businesses use technology more effectively by delivering custom-built, modern, scalable, and cost-effective solutions.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                {[
                                    'Automate manual and repetitive business processes',
                                    'Solve complex business problems through technology',
                                    'Make AI and automation practical for real business use cases',
                                    'Deliver high-quality software without unnecessary complexity',
                                    'Build solutions around the unique requirements of every client',
                                    'Help organizations establish scalable digital foundations',
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                        <CheckCircle2 size={18} color="var(--accent-color)" style={{ flexShrink: 0, marginTop: '3px' }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                            {[
                                { icon: <Zap size={20} />, label: 'Automation-First Approach', desc: 'We identify automation opportunities before writing a single line of code.' },
                                { icon: <Users size={20} />, label: 'Client-Centric Development', desc: 'Every decision is grounded in your business context, not industry templates.' },
                                { icon: <ShieldCheck size={20} />, label: 'Quality & Reliability', desc: 'Built-in best practices, security, and performance from the ground up.' },
                            ].map((item, i) => (
                                <motion.div key={i} variants={fadeIn} style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', padding: '1.75rem', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid var(--border-light)', borderRadius: '20px' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(2,132,199,0.12)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)', flexShrink: 0 }}>{item.icon}</div>
                                    <div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>{item.label}</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── VISION ───────────────────────────────────────────────── */}
            <section style={{ padding: '3.5rem 0', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <span style={{ color: 'var(--accent-color)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>OUR VISION</span>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Building a Smarter Digital Future</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.7 }}>
                            A technology ecosystem where businesses automate, innovate, and scale—while the next generation of professionals gains the practical skills to succeed.
                        </p>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}>
                        {visionGoals.map((goal, idx) => (
                            <motion.div key={idx} variants={fadeIn} whileHover={{ y: -6 }} style={{ padding: '2.5rem', background: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-light)', position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.3s, border-color 0.3s', cursor: 'default' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(2,132,199,0.10)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 900, color: 'var(--border-light)', lineHeight: 1 }}>{goal.num}</div>
                                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(2,132,199,0.1)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)', marginBottom: '1.5rem' }}>{goal.icon}</div>
                                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.75rem' }}>{goal.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>{goal.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── WHY TAFINITYAI ───────────────────────────────────────── */}
            <section style={{ padding: '3.5rem 0', background: 'var(--bg-primary)' }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <span style={{ color: 'var(--accent-color)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>WHY TAFINITYAI</span>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em' }}>The Difference That Matters</h2>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
                        {whyUs.map((item, idx) => (
                            <motion.div key={idx} variants={fadeIn} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '20px', border: '1px solid var(--border-light)', transition: 'border-color 0.3s', cursor: 'default' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-color)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-light)'}
                            >
                                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(2,132,199,0.1)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)' }}>{item.icon}</div>
                                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── OUR APPROACH ─────────────────────────────────────────── */}
            <section style={{ padding: '3.5rem 0 8rem', background: 'linear-gradient(160deg, #0f172a 0%, #0c2340 50%, #0f172a 100%)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '100%', maxWidth: '900px', height: '500px', background: 'radial-gradient(ellipse, rgba(2,132,199,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>HOW WE WORK</span>
                        <h2 style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', marginBottom: '1rem' }}>
                            Our <span style={{ background: 'linear-gradient(90deg,#38bdf8,#0284c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Approach</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>A structured, repeatable cycle that delivers quality outcomes every time.</p>
                    </motion.div>

                    <div style={{ position: 'relative' }}>
                        <div className='timeline-spine-line' style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', transform: 'translateX(-50%)', background: 'linear-gradient(180deg, transparent, rgba(56,189,248,0.35) 15%, rgba(2,132,199,0.35) 85%, transparent)', borderRadius: '2px' }} />
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {approachSteps.map((step, idx) => {
                                const isLeft = idx % 2 === 0;
                                return (
                                    <motion.div key={idx} variants={fadeIn} className='timeline-grid'>
                                        {isLeft ? (
                                            <div className='timeline-col-left'>
                                                <div style={{ position: 'relative', maxWidth: '400px', width: '100%', padding: '2rem 2rem 2rem 2.25rem', background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '20px', backdropFilter: 'blur(10px)', overflow: 'hidden', transition: 'all 0.3s', cursor: 'default' }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(2,132,199,0.12)'; e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(2,132,199,0.2)'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.045)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.boxShadow = 'none'; }}
                                                >
                                                    <span style={{ position: 'absolute', top: '-0.5rem', right: '1rem', fontSize: '5.5rem', fontWeight: 900, color: 'rgba(56,189,248,0.06)', lineHeight: 1, userSelect: 'none', fontFamily: 'var(--font-display)' }}>{step.num}</span>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.85rem', marginBottom: '0.85rem' }}>
                                                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(56,189,248,0.15)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', flexShrink: 0 }}>{step.icon}</div>
                                                        <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff' }}>{step.label}</h3>
                                                    </div>
                                                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>{step.desc}</p>
                                                </div>
                                            </div>
                                        ) : <div />}
                                        <div className='timeline-spine'>
                                            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg,#38bdf8,#0284c7)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 8px rgba(56,189,248,0.1), 0 0 24px rgba(2,132,199,0.5)', zIndex: 2, flexShrink: 0 }}>
                                                <span style={{ color: '#fff', fontSize: '0.65rem', fontWeight: 800 }}>{step.num}</span>
                                            </div>
                                        </div>
                                        {!isLeft ? (
                                            <div className='timeline-col-right'>
                                                <div style={{ position: 'relative', maxWidth: '400px', padding: '2rem 2rem 2rem 2.25rem', background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '20px', backdropFilter: 'blur(10px)', overflow: 'hidden', transition: 'all 0.3s', cursor: 'default' }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(2,132,199,0.12)'; e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(2,132,199,0.2)'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.045)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.boxShadow = 'none'; }}
                                                >
                                                    <span style={{ position: 'absolute', top: '-0.5rem', right: '1rem', fontSize: '5.5rem', fontWeight: 900, color: 'rgba(56,189,248,0.06)', lineHeight: 1, userSelect: 'none', fontFamily: 'var(--font-display)' }}>{step.num}</span>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.85rem', marginBottom: '0.85rem' }}>
                                                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(56,189,248,0.15)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', flexShrink: 0 }}>{step.icon}</div>
                                                        <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff' }}>{step.label}</h3>
                                                    </div>
                                                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>{step.desc}</p>
                                                </div>
                                            </div>
                                        ) : <div />}
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── BUSINESS TIERS ───────────────────────────────────────── */}
            <section style={{ padding: '3.5rem 0', background: 'var(--bg-primary)' }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <span style={{ color: 'var(--accent-color)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>WHO WE SERVE</span>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Built for Businesses at Every Stage</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
                            Whether you're building your first product or modernizing an enterprise operation, we adapt to where you are.
                        </p>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1.5rem' }}>
                        {businessTiers.map((tier, idx) => (
                            <motion.div key={idx} variants={fadeIn} whileHover={{ y: -5 }} style={{ padding: '2.5rem 2rem', background: 'var(--bg-secondary)', borderRadius: '22px', border: '1px solid var(--border-light)', textAlign: 'center', transition: 'all 0.3s', cursor: 'default' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.background = 'var(--bg-primary)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.background = 'var(--bg-secondary)'; }}
                            >
                                <div style={{ width: '58px', height: '58px', borderRadius: '18px', background: 'rgba(2,132,199,0.1)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)', margin: '0 auto 1.5rem' }}>{tier.icon}</div>
                                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.75rem' }}>{tier.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>{tier.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── TRUST & CREDENTIALS ──────────────────────────────────── */}
            <section style={{ padding: '3.5rem 0', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '3.5rem', alignItems: 'center' }}>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInLeft}>
                            <span style={{ color: 'var(--accent-color)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>BUILT ON TRUST</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                                A Formally Established,<br />
                                <span style={{ background: 'linear-gradient(135deg, var(--accent-hover), var(--accent-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Professional Organization.</span>
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                                TafinityAI LLP is committed to professional and responsible business practices. We maintain strict client confidentiality and do not publicly disclose client names or project details without appropriate authorization.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8 }}>
                                For us, technology is more than a business. Our internship and training initiatives are part of our commitment to giving back—helping students gain exposure to real-world technology, development practices, AI, and professional environments.
                            </p>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem' }}>
                            {trustCredentials.map((cred, idx) => (
                                <motion.div key={idx} variants={fadeIn} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.85rem', padding: '1.23.5rem 1.5rem', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                                    <div style={{ color: 'var(--accent-color)', flexShrink: 0 }}>{cred.icon}</div>
                                    <span style={{ fontSize: '0.88rem', fontWeight: 600, lineHeight: 1.4 }}>{cred.label}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── CTA ──────────────────────────────────────────────────── */}
            <section style={{ padding: '3.5rem 0', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '100%', maxWidth: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(2,132,199,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ textAlign: 'center', padding: '2rem 5%', background: 'var(--bg-secondary)', borderRadius: '32px', border: '1px solid var(--border-light)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--accent-color), var(--accent-light))' }} />
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                            The Future We're{' '}
                            <span style={{ background: 'linear-gradient(135deg, var(--accent-hover), var(--accent-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Building Together.</span>
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 2.5rem' }}>
                            Whether you need to automate a workflow, build a custom application, develop an ERP or CRM, or identify the right technology strategy—we're here to help.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6.5rem 2rem', background: 'var(--accent-color)', color: '#fff', borderRadius: '100px', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 4px 14px rgba(2,132,199,0.35)', transition: 'all 0.2s' }}>
                                Start a Project <ArrowRight size={16} />
                            </Link>
                            <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6.5rem 2rem', border: '1px solid var(--border-color)', borderRadius: '100px', fontWeight: 500, fontSize: '0.95rem', textDecoration: 'none', color: 'var(--text-primary)', transition: 'all 0.2s' }}>
                                View Services
                            </Link>
                        </div>
                        <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                            Build Smarter. Automate Better. Grow Faster. — <strong>TafinityAI LLP</strong>
                        </p>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default About;
