import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, MonitorSmartphone, Workflow, GraduationCap, ArrowRight, Zap, Users, Globe, Clock, ShieldCheck, Calendar, Briefcase, Activity, Monitor, ShoppingBag, Database, TabletSmartphone, CreditCard, Layers, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const testimonials = [
  { text: "TafinityAI transformed our workflow automation. The results were astounding.", name: "Sarah J.", role: "CTO, TechCorp" },
  { text: "An absolute game-changer. The team's expertise in custom solutions is unmatched.", name: "Rajesh S.", role: "Founder, StartUp.in" },
  { text: "Scalable, secure, and delivered on time. We couldn't ask for a better tech partner.", name: "Michael T.", role: "Director, GlobalTech" },
  { text: "Their AI-driven approach significantly reduced our manual overhead by 70%.", name: "Priya M.", role: "Operations Head, FinServe" },
  { text: "The most reliable software development agency we have worked with.", name: "David L.", role: "CEO, Innovate" }
];

const Home = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const services = [
    { icon: <Monitor size={32} />, title: 'Website Development', desc: 'Striking, conversion-optimized landing pages and brand portfolios with 3D/animation.', link: '/services' },
    { icon: <MonitorSmartphone size={32} />, title: 'Android App Development', desc: 'Native and cross-platform apps for iOS and Android delivering unforgettable experiences.', link: '/services' },
    { icon: <TabletSmartphone size={32} />, title: 'Web + App Solutions', desc: 'Unified codebase solutions providing a seamless experience across all target platforms.', link: '/services' },
    { icon: <ShoppingBag size={32} />, title: 'E-Commerce Solutions', desc: 'High-conversion online stores engineered for scale with custom cart solutions.', link: '/services' },
    { icon: <CreditCard size={32} />, title: 'POS / Billing Solutions', desc: 'Fast, secure Point of Sale software focused on frictionless checkout and ledger management.', link: '/services' },
    { icon: <Database size={32} />, title: 'ERP Solutions', desc: 'Custom enterprise resource planning software tailored to automate your workflows.', link: '/services' },
    { icon: <Users size={32} />, title: 'CRM Solutions', desc: 'Intelligent customer relationship management to track leads and boost sales efficiency.', link: '/services' },
    { icon: <Layers size={32} />, title: 'Custom Solutions', desc: 'Powerful bespoke applications customized end-to-end to solve complex challenges.', link: '/services' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-wrapper"
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="container hero-grid">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-badge"
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', flexShrink: 0 }}></div>
              <span style={{ paddingTop: '1px' }}>OPEN FOR NEW PROJECTS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Build Smarter.<br />
              Automate Better.<br />
              <span className="text-gradient-accent">Grow Faster.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="hero-subtitle-wrapper"
            >
              <p className="hero-subtitle">
                Transforming ideas, challenges, and manual processes into practical, scalable digital solutions for Startups, SMBs, and Enterprises.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="hero-actions"
            >
              <Link to="/contact" className="btn-primary">
                Start a Project <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="btn-outline">
                Explore Services
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-visual hidden-mobile"
          >
            {/* Grid Pattern Background */}
            <div className="hero-grid-pattern hidden lg:block"></div>

            <div className="visual-circle-accent pulse"></div>

            <div className="decorative-card small-code-tag glass-card">
              <code><Code size={12} style={{ display: 'inline', marginRight: '4px' }} />&lt;code /&gt;</code>
            </div>

            <div className="decorative-card system-card glass-card">
              <div className="system-header">
                <div className="system-icon pulse"><Activity size={18} /></div>
                <div className="system-text">
                  <h4>System Active</h4>
                  <span className="status-go"><span className="dot"></span> All Systems Go</span>
                </div>
              </div>
              <div className="system-progress-bar">
                <div className="system-progress-fill"></div>
              </div>
              <div className="system-progress-text">Processing... <span>85%</span></div>
            </div>

            <div className="decorative-card perf-card glass-card">
              <div className="perf-icon-wrapper"><Zap size={24} className="text-black" /></div>
              <h3>99%</h3>
              <p>PERFORMANCE</p>
            </div>
          </motion.div>
        </div>

        <div style={{ position: 'absolute', bottom: '1.5rem', left: 0, right: 0, width: '100%', zIndex: 10 }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="hero-audience-banner"
            >
              {["STARTUPS", "SMALL & MEDIUM BIZ", "ENTERPRISES", "GLOBAL SCALING"].map((tag, i) => (
                <span key={i}><div className="audience-dot"></div> {tag}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Stats Section */}
      <section className="mission-section">
        <div className="container mission-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mission-content"
          >
            <h2>Make Technology Practical.<br /><span className="text-gradient-accent">Make Innovation Accessible.</span></h2>
            <p>Our mission is to help businesses use technology more effectively by delivering custom-built, modern, scalable, and cost-effective solutions.</p>
            <p>We automate manual processes, solve complex challenges, and make AI practical for real use cases. Building a smarter digital foundation for the future is our priority.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="stats-container"
          >
            {[
              { icon: <Activity size={24} />, value: "01", label: "Understand" },
              { icon: <Globe size={24} />, value: "02", label: "Strategize" },
              { icon: <Code size={24} />, value: "03", label: "Build" },
              { icon: <Workflow size={24} />, value: "04", label: "Automate" },
              { icon: <Zap size={24} />, value: "05", label: "Scale" }
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeIn} className="stat-card glass-card">
                <div className="stat-icon">{stat.icon}</div>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
                <div className="card-hover-effect"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="services-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="section-header"
          >
            <h2>What we do.</h2>
            <p>End-to-end technology solutions built around your business workflows.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="services-grid"
          >
            {services.map((svc, idx) => (
              <motion.div key={idx} variants={fadeIn} className="service-card glass-card">
                <div className="icon-wrapper glass">
                  {svc.icon}
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <Link to={svc.link} className="service-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.9rem', marginTop: '1rem', textDecoration: 'none' }}>
                  Know more <ArrowRight size={14} />
                </Link>
                <div className="card-hover-effect"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--bg-elevated)_0%,_transparent_70%)] opacity-50"></div>
        <div className="container text-center mb-16 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-secondary text-lg max-w-2xl mx-auto"
          >
            Trusted by visionary organizations to deliver robust technology solutions.
          </motion.p>
        </div>

        <div className="marquee-container relative flex overflow-hidden group py-4">
          {/* Fade masks for clean entry/exit */}
          <div className="absolute top-0 left-0 w-16 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="marquee-track">
            {/* Duplicate array for seamless infinite looping */}
            {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
              <div key={idx} className="testimonial-card glass-card">
                <div className="flex gap-1 text-yellow-400 mb-4 opacity-90">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-secondary text-[0.95rem] italic mb-6 leading-relaxed flex-grow">"{t.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-bold text-sm shrink-0 border border-slate-200 shadow-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-left flex-grow">
                    <h4 className="font-semibold text-[0.9rem] text-slate-900 leading-tight">{t.name}</h4>
                    <span className="text-[0.75rem] text-slate-500">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standalone Internships CTA */}
      <section className="internships-cta-section relative py-24">
        <div className="absolute inset-0 bg-blue-900/10 border-y border-white/5 py-12" style={{ backgroundColor: 'rgba(14, 165, 233, 0.03)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}></div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-12 glass-card p-12 rounded-3xl overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-glow rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2" style={{ background: 'var(--accent-glow)', filter: 'blur(60px)', position: 'absolute', right: 0, top: 0, width: '300px', height: '300px', opacity: 0.2, zIndex: 0 }}></div>

            <div className="w-full md:flex-1" style={{ zIndex: 1 }}>
              <div style={{ display: 'inline-flex', padding: '0.2rem 1rem', background: 'rgba(14, 165, 233, 0.15)', color: 'var(--accent-color)', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '1px' }}>
                For Students
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', lineHeight: 1.1 }}>Premium <br /><span className="text-gradient-accent">Internships.</span></h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.6, maxWidth: '500px' }}>
                Bridge the gap between academic theory and industry reality. Join our exclusive mentor-led training to gain hands-on experience with live real-world projects, SDLC, Git, and AI integrations.
              </p>

              <div className="relative w-full mb-10 flex items-center justify-between">
                <ul className="w-[60%] md:w-full flex-shrink-0" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1.25rem' }}>
                  {['MERN Stack', 'Real-world Projects', 'Git & SDLC', 'Career Guidance'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', fontWeight: 600 }}>
                      <ShieldCheck size={18} color="var(--accent-color)" /> {item}
                    </li>
                  ))}
                </ul>

                {/* Mobile Graphic Clone (50% scale, positioned to the right) */}
                <div className="md:hidden relative w-[40%] flex justify-end items-center right-[-5%] overflow-visible">
                  <div style={{ position: 'relative', width: '400px', aspectRatio: '1', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', transform: 'scale(0.5)', transformOrigin: 'right center' }}>
                    <div style={{ width: '80%', height: '80%', borderRadius: '50%', border: '1px dashed rgba(2, 132, 199, 0.2)', position: 'absolute', animation: 'spin 20s linear infinite' }}></div>
                    <div style={{ width: '60%', height: '60%', borderRadius: '50%', border: '1px dashed rgba(2, 132, 199, 0.1)', position: 'absolute', animation: 'spin 15s linear infinite reverse' }}></div>
                    <div className="glass-card" style={{ width: '140px', height: '140px', borderRadius: '50%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'absolute', zIndex: 2 }}>
                      <GraduationCap size={64} color="var(--accent-color)" />
                    </div>
                    <div className="glass-card" style={{ padding: '0.75rem 1.5rem', borderRadius: '100px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', position: 'absolute', top: '15%', right: '0%', zIndex: 3 }}>
                      <Code size={16} color="var(--accent-color)" /> <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Live Code</span>
                    </div>
                    <div className="glass-card" style={{ padding: '0.75rem 1.5rem', borderRadius: '100px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', position: 'absolute', bottom: '15%', left: '0%', zIndex: 3 }}>
                      <Briefcase size={16} color="var(--accent-color)" /> <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Industry Ready</span>
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/internships" className="btn-primary" style={{ display: 'inline-flex' }}>
                Explore Programs <ArrowRight size={18} />
              </Link>
            </div>

            <div className="hidden md:flex w-full md:flex-1 justify-center relative" style={{ zIndex: 1 }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '400px', aspectRatio: '1', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '80%', height: '80%', borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.2)', position: 'absolute', animation: 'spin 20s linear infinite' }}></div>
                <div style={{ width: '60%', height: '60%', borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.1)', position: 'absolute', animation: 'spin 15s linear infinite reverse' }}></div>
                <div className="glass-card" style={{ width: '140px', height: '140px', borderRadius: '50%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'absolute', zIndex: 2 }}>
                  <GraduationCap size={64} color="var(--accent-color)" />
                </div>
                <div className="glass-card" style={{ padding: '0.73.5rem 1.5rem', borderRadius: '100px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', position: 'absolute', top: '15%', right: '0%', zIndex: 3 }}>
                  <Code size={16} color="var(--accent-color)" /> <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Live Code</span>
                </div>
                <div className="glass-card" style={{ padding: '0.73.5rem 1.5rem', borderRadius: '100px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', position: 'absolute', bottom: '15%', left: '0%', zIndex: 3 }}>
                  <Briefcase size={16} color="var(--accent-color)" /> <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Industry Ready</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding-top: 5rem;
          padding-bottom: 5rem;
          overflow: hidden;
        }
        .hero-glow {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%; max-width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 60%);
          z-index: -1;
          filter: blur(60px);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
          gap: 2rem;
          align-items: center;
          width: 100%;
        }
        .hero-content {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 100%; max-width: 600px;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.1rem 0.6rem;
          border-radius: 100px;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          margin-bottom: 1.25rem;
          background: #000;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .hero h1 {
          font-size: clamp(3rem, 5vw, 5.5rem);
          margin-bottom: 2rem;
          line-height: 1.1;
        }
        .hero-subtitle-wrapper {
          border-left: 3px solid var(--accent-color);
          padding-left: 1.5rem;
          margin-bottom: 3rem;
        }
        .hero-subtitle {
          font-size: clamp(1.1rem, 1.8vw, 1.25rem);
          color: var(--text-secondary);
          max-width: 100%; max-width: 500px;
          line-height: 1.6;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: flex-start;
          margin-bottom: 3rem;
        }
        .hero-visual {
          position: relative;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .visual-circle-accent {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, var(--accent-light), var(--accent-hover));
          box-shadow: 
            0 10px 25px var(--accent-glow),
            inset -10px -10px 20px rgba(0,0,100,0.1),
            inset 10px 10px 20px rgba(255,255,255,0.8);
          top: 65%;
          left: 42%;
          z-index: 4;
        }
        .decorative-card {
          position: absolute;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          z-index: 2;
        }
        .small-code-tag {
          top: 10%;
          left: 30%;
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          border-radius: 20px;
        }
        .small-code-tag code { display: flex; align-items: center; }
        .system-card {
          top: 40%;
          left: 15%;
          padding: 1.5rem;
          width: 250px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          animation: float-system 6s ease-in-out infinite;
          z-index: 2;
        }
        .system-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .system-icon {
          width: 36px;
          height: 36px;
          background: var(--bg-secondary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-color);
        }
        .system-text h4 { font-size: 0.9rem; margin: 0; padding: 0; }
        .status-go { font-size: 0.75rem; color: var(--accent-hover); display: flex; align-items: center; gap: 0.3rem;}
        .status-go .dot { width: 6px; height: 6px; background: var(--accent-hover); border-radius: 50%; }
        .system-progress-bar {
          width: 100%;
          height: 4px;
          background: var(--border-light);
          border-radius: 2px;
          margin-bottom: 0.5rem;
        }
        .system-progress-fill {
          width: 85%;
          height: 100%;
          background: var(--accent-light);
          border-radius: 2px;
        }
        .system-progress-text {
          font-size: 0.7rem;
          color: var(--text-secondary);
          display: flex;
          justify-content: space-between;
        }
        .perf-card {
          top: 15%;
          left: 50%;
          padding: 2rem;
          text-align: center;
          animation: float-perf 7s ease-in-out infinite;
          z-index: 3;
        }
        .perf-icon-wrapper {
          width: 48px;
          height: 48px;
          background: var(--accent-color);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        .perf-card h3 { font-size: 2rem; margin-bottom: 0.2rem; }
        .perf-card p { font-size: 0.7rem; letter-spacing: 1px; color: var(--text-secondary); }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.2); }
          70% { box-shadow: 0 0 0 10px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
        @keyframes float-system {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes float-perf {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .hero-grid-pattern {
          position: absolute;
          inset: -100px;
          background-image: 
            linear-gradient(var(--border-light) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-light) 1px, transparent 1px);
          background-size: 20px 20px;
          mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%);
          -webkit-mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%);
          z-index: 0;
          opacity: 0.6;
        }
        
        .hero-audience-banner {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 0.5rem 0; /* Reduced padding to make it a thin ribbon */
          border-top: 1px solid rgba(255,255,255,0.05);
          width: 100%;
          font-size: 0.6rem;
          letter-spacing: 2px;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .hero-audience-banner span {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .audience-dot {
          width: 6px;
          height: 6px;
          background-color: var(--accent-light);
          opacity: 0.8;
        }
        .mission-section {
          padding: 2rem 0;
          background: linear-gradient(110deg, var(--bg-primary) 45%, #0284c7 100%);
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
          position: relative;
          overflow: hidden;
        }
        .mission-section::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -10%;
          width: 100%; max-width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          pointer-events: none;
        }
        .mission-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
          gap: 4rem;
          align-items: center;
        }
        .mission-content h2 {
          font-size: clamp(2rem, 3.5vw, 3rem);
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }
        .mission-content p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .mission-content p:last-child {
          margin-bottom: 0;
        }
        .stats-container {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-auto-rows: minmax(100px, auto);
          gap: 1rem;
        }
        .stat-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(12px);
          padding: 1.25rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
        }
        .stat-card:hover {
          transform: translateY(-5px) scale(1.02);
          background: rgba(2, 132, 199, 0.1);
          border-color: rgba(56, 189, 248, 0.5);
          box-shadow: 0 10px 40px rgba(2, 132, 199, 0.15);
        }
        
        /* Bento box layout configurations */
        .stat-card:nth-child(1) { grid-column: span 3; grid-row: span 1; }
        .stat-card:nth-child(2) { grid-column: span 3; grid-row: span 2; }
        .stat-card:nth-child(3) { grid-column: span 3; grid-row: span 2; }
        .stat-card:nth-child(4) { grid-column: span 3; grid-row: span 1; }
        .stat-card:nth-child(5) { grid-column: span 6; display: flex; flex-direction: row; align-items: center; justify-content: flex-start; gap: 2rem; padding: 1.5rem 2rem; background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(2, 132, 199, 0.1)); }
        
        .stat-card:nth-child(5) .stat-icon { margin-bottom: 0; }
        .stat-card:nth-child(5) h3 { margin-bottom: 0; font-size: 2.2rem; }
        .stat-card:nth-child(5) p { margin-top: 4px; }

        .stat-icon {
          color: var(--accent-hover);
          margin-bottom: 0.8rem;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.5);
          border-radius: 10px;
          padding: 6px;
        }
        .stat-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1;
          margin-bottom: 0.2rem;
          font-family: var(--font-display);
        }
        .stat-card p {
          font-size: 0.70rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 700;
          color: var(--accent-color);
        }
        @media (max-width: 600px) {
          .stats-container { display: flex; flex-direction: column; }
          .stat-card:nth-child(5) { flex-direction: column; text-align: center; justify-content: center; align-items: center; gap: 0.5rem; }
        }

        @media (max-width: 991px) {
          .hero-grid {
            display: flex;
            flex-direction: column;
            margin-top: 3rem;
            gap: 3rem;
          }
          .hero-content {
            align-items: center;
            text-align: center;
            order: 2;
          }
          .hero .hidden-mobile {
            display: flex !important;
            order: 1;
            transform: scale(0.05);
            transform-origin: center center;
            margin-top: -100px;
            margin-bottom: -70px; /* Push text down by relaxing bounding box pull */
            width: 100%;
            justify-content: center;
          }
          .hero-subtitle-wrapper {
            border-left: none;
            padding-left: 0;
          }
          .hero-actions {
            justify-content: center;
          }
          .hidden-mobile {
            display: none !important;
          }
          .mission-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
        }
        @media (max-width: 768px) {
          .hero-audience-banner {
            flex-wrap: nowrap;
            gap: 0.5rem;
            justify-content: space-between;
            overflow: visible;
            margin-left: -1.5rem;
            margin-right: -1.5rem;
            width: calc(100% + 3rem);
            padding: 0 0.5rem;
            transform: none;
            left: auto;
          }
          .hero-audience-banner span {
            font-size: 0.45rem;
            white-space: nowrap;
          }
        }
        @media (max-width: 576px) {
          .hero-audience-banner span {
            font-size: 0.4rem;
          }
          .hero-audience-banner {
            gap: 0.2rem;
            padding: 0 0.2rem;
          }
        }
        .services-section {
          padding: 4.5rem 0;
          position: relative;
        }
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .section-header h2 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .section-header p {
          color: var(--text-secondary);
          font-size: 1.2rem;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .service-card {
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          transition: transform var(--transition-smooth), border-color var(--transition-fast);
        }
        .service-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255, 255, 255, 0.1);
        }
        
        /* Testimonials Marquee CSS */
        .marquee-container {
          width: 100%;
        }
        .marquee-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: slide-left 40s linear infinite;
        }
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
        .testimonial-card {
          width: 100%; max-width: 350px;
          padding: 2rem;
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.06);
          border-color: var(--accent-color);
        }
        @keyframes slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.333% - 0.66rem)); } /* -33% of 3 arrays minus partial gap offset */
        }
        .icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: var(--accent-light);
        }
        .service-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .service-card p {
          color: var(--text-secondary);
        }
        .card-hover-effect {
          position: absolute;
          inset: 0;
          background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), var(--accent-glow), transparent 40%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .service-card:hover .card-hover-effect {
          opacity: 1;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
};

export default Home;
