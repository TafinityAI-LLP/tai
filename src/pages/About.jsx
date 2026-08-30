import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Shield, Lightbulb, Zap, Rocket } from 'lucide-react';

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const About = () => {
    const visionGoals = [
        { num: "01", title: "Lead in Workflow Automation", desc: "Become a trusted partner for businesses looking to automate operations and adopt intelligent workflows.", icon: <Zap size={24} /> },
        { num: "02", title: "Build a Tech Ecosystem", desc: "Develop innovative SaaS products and technology solutions that solve real-world problems at scale.", icon: <Rocket size={24} /> },
        { num: "03", title: "Develop Industry-Ready Talent", desc: "Build a strong training ecosystem that helps students bridge the gap between education and real-world tech careers.", icon: <Users size={24} /> }
    ];

    const credentials = [
        "Registered LLP", "GST Registration", "MSME / Udyam Registration", "Startup India Recognition", "AICTE-related internship registration/approval", "College & University MoUs"
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-wrapper"
        >
            <section className="about-hero">
                <div className="hero-glow"></div>
                <div className="container text-center">
                    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Building a <br /><span className="text-gradient-accent">Smarter Digital Future</span>
                        </h1>
                        <p className="text-xl text-secondary mb-10 max-w-3xl mx-auto">
                            Technology should solve problems—not create more of them. We believe businesses should not have to reshape their operations around generic software.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 relative">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                            <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
                            <p className="text-secondary text-lg mb-4">
                                Founded in 2026, TafinityAI was created with a simple objective: to make modern technology more accessible, practical, scalable, and valuable for businesses while contributing to the next generation of technology professionals.
                            </p>
                            <p className="text-secondary text-lg">
                                Our approach combines custom software development, workflow automation, AI-driven innovation, and technology consulting to help organizations reduce manual effort, improve efficiency, and build a stronger digital foundation.
                            </p>
                        </motion.div>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="glass-card p-10 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary blur-3xl opacity-20 rounded-full"></div>
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Target className="text-accent-color" /> Our Mission</h3>
                            <p className="text-secondary mb-4">
                                Make Technology Practical. Make Innovation Accessible.
                            </p>
                            <p className="text-secondary">
                                We help businesses use technology more effectively by delivering custom-built, modern, scalable, and cost-effective solutions built around the unique requirements of every client.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-black/20 border-y border-white/5 relative">
                <div className="container">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">The Future We're Building</h2>
                        <p className="text-secondary text-lg max-w-2xl mx-auto">
                            We are working toward three interconnected goals ensuring organizations adapt faster and automate smarter.
                        </p>
                    </motion.div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
                        {visionGoals.map((goal, idx) => (
                            <motion.div key={idx} variants={fadeIn} className="glass-card p-8 rounded-2xl flex flex-col pt-12 relative">
                                <div className="absolute -top-6 left-8 bg-hover w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-xl rotate-3">
                                    {goal.icon}
                                </div>
                                <div className="text-5xl font-black text-white/5 absolute top-4 right-6">{goal.num}</div>
                                <h3 className="text-xl font-bold mb-3 mt-4">{goal.title}</h3>
                                <p className="text-secondary text-sm leading-relaxed">{goal.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="py-24 relative overflow-hidden">
                <div className="hero-grid-pattern" style={{ opacity: 0.3, zIndex: -1 }}></div>
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-16">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                            <h2 className="text-4xl font-bold mb-6">Established on Trust</h2>
                            <p className="text-secondary text-lg mb-8">
                                TafinityAI LLP is a formally established technology organization committed to professional and responsible business practices. We maintain strict client confidentiality.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {credentials.map((cred, i) => (
                                    <div key={i} className="flex items-start gap-3 glass-card p-4 rounded-xl">
                                        <Shield className="text-accent-color shrink-0 mt-1" size={18} />
                                        <span className="text-sm font-medium">{cred}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="flex flex-col justify-center">
                            <h2 className="text-4xl font-bold mb-6">Giving Back Through Tech</h2>
                            <p className="text-secondary text-lg mb-6">
                                For us, technology is more than a business. TafinityAI was founded with a belief that innovation should create opportunities.
                            </p>
                            <div className="glass-card p-8 rounded-2xl border-l-4 border-accent-color bg-black/40">
                                <h4 className="text-xl font-semibold mb-3 flex items-center gap-3"><Lightbulb className="text-accent-color" /> Bridging the Gap</h4>
                                <p className="text-secondary italic">
                                    "We want to help bridge the gap between what students learn and what the industry expects. Because building the future of technology also means building the people who will create it."
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <style>{`
        .about-hero {
          padding-top: 10rem;
          padding-bottom: 5rem;
          position: relative;
        }
        .hero-glow {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 60%);
          z-index: -1;
          filter: blur(60px);
        }
        .bg-primary { background-color: var(--accent-color); }
        .bg-hover { background-color: var(--accent-hover); }
        .text-accent-color { color: var(--accent-color); }
        .text-secondary { color: var(--text-secondary); }
        .border-white-5 { border-color: rgba(255,255,255,0.05); }
        
        .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
        .py-24 { padding-top: 6rem; padding-bottom: 6rem; }
        .grid { display: grid; }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .md\\:grid-cols-2 { grid-template-columns: 1fr; }
        .md\\:grid-cols-3 { grid-template-columns: 1fr; }
        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        .gap-16 { gap: 4rem; }
        .gap-8 { gap: 2rem; }
        .gap-4 { gap: 1rem; }
        .gap-3 { gap: 0.75rem; }
        
        .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        .text-5xl { font-size: 3rem; line-height: 1; }
        .text-6xl { font-size: 3.75rem; line-height: 1; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .font-black { font-weight: 900; }
        
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-10 { margin-bottom: 2.5rem; }
        .mb-16 { margin-bottom: 4rem; }
        .mt-4 { margin-top: 1rem; }
        
        .max-w-4xl { max-width: 56rem; }
        .max-w-3xl { max-width: 48rem; }
        .max-w-2xl { max-width: 42rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .items-start { align-items: flex-start; }
        .justify-center { justify-content: center; }
        
        .p-4 { padding: 1rem; }
        .p-8 { padding: 2rem; }
        .p-10 { padding: 2.5rem; }
        .pt-12 { padding-top: 3rem; }
        
        .rounded-xl { border-radius: 0.75rem; }
        .rounded-2xl { border-radius: 1rem; }
        .rounded-full { border-radius: 9999px; }
        
        .border-l-4 { border-left-width: 4px; }
        .border-accent-color { border-color: var(--accent-color); }
        
        .bg-black\\/40 { background-color: rgba(0,0,0,0.4); }
        .bg-black\\/20 { background-color: rgba(0,0,0,0.2); }
        
        .text-sm { font-size: 0.875rem; }
        .text-lg { font-size: 1.125rem; }
        .text-xl { font-size: 1.25rem; }
        .text-2xl { font-size: 1.5rem; }
        
        .absolute { position: absolute; }
        .relative { position: relative; }
        .top-0 { top: 0; }
        .right-0 { right: 0; }
        .top-4 { top: 1rem; }
        .right-6 { right: 1.5rem; }
        .-top-6 { top: -1.5rem; }
        .left-8 { left: 2rem; }
        
        .w-64 { width: 16rem; }
        .h-64 { height: 16rem; }
        .w-16 { width: 4rem; }
        .h-16 { height: 4rem; }
        
        .blur-3xl { filter: blur(64px); }
        .opacity-20 { opacity: 0.2; }
        .shrink-0 { flex-shrink: 0; }
        .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
        .rotate-3 { transform: rotate(3deg); }
        .text-white\\/5 { color: rgba(255,255,255,0.05); }
        .italic { font-style: italic; }
      `}</style>
        </motion.div>
    );
};

export default About;
