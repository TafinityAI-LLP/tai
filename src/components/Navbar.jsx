import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown, Monitor, MonitorSmartphone, TabletSmartphone, ShoppingBag, CreditCard, Database, Users, Layers, LayoutGrid, Workflow, Bot, GraduationCap, Briefcase, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            if (window.scrollY > 20) setIsOpen(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Automation', path: '/automation' },
        { name: 'Internships', path: '/internships' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Resources', path: '/blog' },
    ];

    const servicesMenu = [
        { id: 'websites', title: 'Website Development', desc: 'Breathtaking Animations, SEO Optimized', icon: <Monitor size={20} color="#3b82f6" />, iconBg: '#eff6ff' },
        { id: 'mobile', title: 'Android App Development', desc: 'Offline First, Fast Cross-Platform UI', icon: <MonitorSmartphone size={20} color="#10b981" />, iconBg: '#ecfdf5' },
        { id: 'webapp', title: 'Web + App Solutions', desc: 'Progressive Web Apps, Unified Arch', icon: <TabletSmartphone size={20} color="#8b5cf6" />, iconBg: '#f3e8ff' },
        { id: 'ecommerce', title: 'E-Commerce Solutions', desc: 'Headless Commerce, Inventory Sync', icon: <ShoppingBag size={20} color="#ec4899" />, iconBg: '#fdf2f8' },
        { id: 'pos', title: 'POS / Billing Solutions', desc: 'Barcode Integration, Offline Syncing', icon: <CreditCard size={20} color="#f97316" />, iconBg: '#fff7ed' },
        { id: 'erp', title: 'ERP Solutions', desc: 'Inventory Management, HR & Payroll', icon: <Database size={20} color="#14b8a6" />, iconBg: '#f0fdfa' },
        { id: 'crm', title: 'CRM Solutions', desc: 'Lead Scoring, Automated Email Flows', icon: <Users size={20} color="#ef4444" />, iconBg: '#fef2f2' },
        { id: 'custom', title: 'Custom Solutions', desc: 'Bespoke Architecture, API Connect', icon: <Layers size={20} color="#6366f1" />, iconBg: '#e0e7ff' },
    ];

    const automationMenu = [
        { id: 'n8n', title: 'N8N Workflow Mastery', desc: 'Connect 500+ apps without writing a single line of backend code', icon: <Workflow size={20} color="#8b5cf6" />, iconBg: '#f3e8ff' },
        { id: 'ai-agents', title: 'Autonomous AI Agents', desc: 'LLM-powered agents to completely automate your data entry', icon: <Bot size={20} color="#0ea5e9" />, iconBg: '#e0f2fe' }
    ];

    const internshipMenu = [
        { id: 'diploma', title: 'Diploma Program', desc: '3 Months: SDLC & Real-world Workflows for college transitions', icon: <GraduationCap size={20} color="#f59e0b" />, iconBg: '#fef3c7' },
        { id: 'btech', title: 'B.Tech Program (Pro)', desc: '6 Months: Live Projects, Placement Ready & Real-world workflows', icon: <Briefcase size={20} color="#10b981" />, iconBg: '#ecfdf5' }
    ];

    const resourcesMenu = [
        { path: '/case-studies', title: 'Case Studies', desc: 'Deep dives into architectural solutions', icon: <LayoutGrid size={20} color="#3b82f6" />, iconBg: '#eff6ff' },
        { path: '/portfolio', title: 'Our Portfolio', desc: 'Browse our past featured work', icon: <Layers size={20} color="#10b981" />, iconBg: '#ecfdf5' },
        { path: '/blog', title: 'Insights & Blog', desc: 'Technical tutorials from our engineers', icon: <Database size={20} color="#f59e0b" />, iconBg: '#fef3c7' }
    ];

    return (
        <header className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
            <div className="container nav-container">
                <NavLink to="/" className="brand" onClick={() => setIsOpen(false)} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
                    <img src="/logo.png" alt="TafinityAI Logo" className="h-8 md:h-9 w-auto" style={{ objectFit: 'contain' }} />
                    <span className="brand-text">Tafinity<span className="text-gradient-accent">AI</span></span>
                </NavLink>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <ul className="nav-list">
                        {navLinks.map((link) => {
                            const isDropdown = ['Services', 'Automation', 'Internships', 'Resources'].includes(link.name);
                            return (
                                <li key={link.name} className={isDropdown ? 'nav-item has-dropdown' : 'nav-item'}>
                                    {isDropdown ? (
                                        <NavLink to={link.path} className={({ isActive }) => `flex items-center gap-1 ${isActive ? 'active-link' : 'nav-link'}`} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', cursor: 'pointer' }}>
                                            {link.name} <ChevronDown size={14} className="dropdown-arrow" />
                                        </NavLink>
                                    ) : (
                                        <NavLink
                                            to={link.path}
                                            className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
                                        >
                                            {link.name}
                                        </NavLink>
                                    )}

                                    {link.name === 'Services' && (
                                        <div className="megamenu">
                                            <div className="megamenu-left">
                                                <div className="mega-title">Services</div>
                                                <p className="mega-desc">Empowering businesses through secure automation, digital identity verification, and intelligent workflow solutions.</p>
                                                <NavLink to="/services" className="mega-link">View all Services <ArrowRight size={14} /></NavLink>
                                                <div style={{ marginTop: 'auto', alignSelf: 'flex-start', opacity: 0.05, transform: 'translate(-20px, 20px)' }}>
                                                    <LayoutGrid size={120} />
                                                </div>
                                            </div>
                                            <div className="megamenu-right">
                                                {servicesMenu.map(svc => (
                                                    <Link to={`/services#${svc.id}`} key={svc.id} className="mega-service-item">
                                                        <div className="mega-icon-box" style={{ background: svc.iconBg }}>{svc.icon}</div>
                                                        <div className="mega-service-text">
                                                            <span className="mega-service-title">{svc.title}</span>
                                                            <span className="mega-service-desc">{svc.desc}</span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {link.name === 'Automation' && (
                                        <div className="megamenu">
                                            <div className="megamenu-left">
                                                <div className="mega-title">Automation</div>
                                                <p className="mega-desc">Unleash the power of N8N workflows and Custom AI Agents to completely automate data entry and support.</p>
                                                <NavLink to="/automation" className="mega-link">Explore Automation <ArrowRight size={14} /></NavLink>
                                                <div style={{ marginTop: 'auto', alignSelf: 'flex-start', opacity: 0.05, transform: 'translate(-20px, 20px)' }}>
                                                    <Zap size={120} />
                                                </div>
                                            </div>
                                            <div className="megamenu-right" style={{ gridTemplateColumns: '1fr' }}>
                                                {automationMenu.map(svc => (
                                                    <Link to={`/automation#${svc.id}`} key={svc.id} className="mega-service-item" style={{ padding: '16px' }}>
                                                        <div className="mega-icon-box" style={{ background: svc.iconBg }}>{svc.icon}</div>
                                                        <div className="mega-service-text">
                                                            <span className="mega-service-title">{svc.title}</span>
                                                            <span className="mega-service-desc">{svc.desc}</span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {link.name === 'Internships' && (
                                        <div className="megamenu">
                                            <div className="megamenu-left">
                                                <div className="mega-title">Internships</div>
                                                <p className="mega-desc">Help students transition from academic learning to real-world industry environments globally.</p>
                                                <NavLink to="/internships" className="mega-link">Join Programs <ArrowRight size={14} /></NavLink>
                                                <div style={{ marginTop: 'auto', alignSelf: 'flex-start', opacity: 0.05, transform: 'translate(-20px, 20px)' }}>
                                                    <GraduationCap size={120} />
                                                </div>
                                            </div>
                                            <div className="megamenu-right" style={{ gridTemplateColumns: '1fr' }}>
                                                {internshipMenu.map(svc => (
                                                    <Link to={`/internships#${svc.id}`} key={svc.id} className="mega-service-item" style={{ padding: '16px' }}>
                                                        <div className="mega-icon-box" style={{ background: svc.iconBg }}>{svc.icon}</div>
                                                        <div className="mega-service-text">
                                                            <span className="mega-service-title">{svc.title}</span>
                                                            <span className="mega-service-desc">{svc.desc}</span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {link.name === 'Resources' && (
                                        <div className="megamenu">
                                            <div className="megamenu-left">
                                                <div className="mega-title">Resources</div>
                                                <p className="mega-desc">Explore our technical insights, view our past success stories, and discover pricing plans engineered for scale.</p>
                                                <NavLink to="/blog" className="mega-link">Read our Blog <ArrowRight size={14} /></NavLink>
                                                <div style={{ marginTop: 'auto', alignSelf: 'flex-start', opacity: 0.05, transform: 'translate(-20px, 20px)' }}>
                                                    <LayoutGrid size={120} />
                                                </div>
                                            </div>
                                            <div className="megamenu-right">
                                                {resourcesMenu.map(svc => (
                                                    <Link to={svc.path} key={svc.path} className="mega-service-item">
                                                        <div className="mega-icon-box" style={{ background: svc.iconBg }}>{svc.icon}</div>
                                                        <div className="mega-service-text">
                                                            <span className="mega-service-title">{svc.title}</span>
                                                            <span className="mega-service-desc">{svc.desc}</span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <div className="nav-actions">
                    <NavLink to="/contact" className="btn-primary desktop-btn">
                        Get in touch <ArrowRight size={16} />
                    </NavLink>
                    <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} color="var(--text-primary)" /> : <Menu size={24} color="var(--text-primary)" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mobile-nav glass"
                    >
                        <ul className="mobile-nav-list" style={{ padding: '0 2rem' }}>
                            {navLinks.map((link) => {
                                const menuMap = {
                                    'Services': servicesMenu,
                                    'Automation': automationMenu,
                                    'Internships': internshipMenu,
                                    'Resources': resourcesMenu
                                };
                                const subItems = menuMap[link.name];

                                return (
                                    <li key={link.name} style={{ width: '100%', textAlign: 'center' }}>
                                        {subItems ? (
                                            <details className="mobile-details" style={{ width: '100%' }}>
                                                <summary className="mobile-nav-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', listStyle: 'none' }}>
                                                    {link.name} <ChevronDown size={14} />
                                                </summary>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem', padding: '1.25rem', background: 'rgba(2,132,199,0.04)', borderRadius: '16px' }}>
                                                    {subItems.map(sub => (
                                                        <NavLink
                                                            key={sub.id || sub.path}
                                                            to={sub.path || `/${link.name.toLowerCase()}#${sub.id}`}
                                                            onClick={() => setIsOpen(false)}
                                                            style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', padding: '0.25rem 0' }}
                                                        >
                                                            {sub.title}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            </details>
                                        ) : (
                                            <NavLink
                                                to={link.path}
                                                className="mobile-nav-link"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {link.name}
                                            </NavLink>
                                        )}
                                    </li>
                                )
                            })}
                            <li style={{ width: '100%', textAlign: 'center', marginTop: '1rem' }}>
                                <NavLink
                                    to="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="btn-primary"
                                    style={{ display: 'flex', justifyContent: 'center', padding: '1rem', width: '100%' }}
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
            <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          padding: 0.75rem 0;
          border-bottom: 1px solid transparent;
        }
        .navbar.scrolled {
          padding: 0.2rem 0;
        }
        .nav-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.05em;
        }
        .desktop-nav {
          display: none;
        }
        .nav-list {
          display: flex;
          gap: 2rem;
        }
        .nav-link {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .nav-link:hover, .active-link {
          color: var(--text-primary);
        }
        .active-link { font-weight: 600; font-family: system-ui, -apple-system, sans-serif; }
        
        .nav-item {
          /* Position static so megamenu anchors to nav-container */
        }
        .dropdown-arrow {
          margin-left: 2px;
          position: relative;
          top: 2px;
          transition: transform 0.3s ease;
        }
        .has-dropdown { position: static; }
        .has-dropdown:hover .dropdown-arrow {
          transform: rotate(180deg);
        }
                .megamenu::before {
          content: '';
          position: absolute;
          bottom: 100%;
          left: 0;
          right: 0;
          height: 3rem; /* Sturdy bridge reaching back up to the nav-links */
          background: transparent;
        }
        .megamenu {
          position: absolute;
          top: calc(100% + 1.5rem);
          left: 50%;
          transform: translateX(-50%);
          width: 100vw; max-width: 900px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          border: 1px solid var(--border-color);
          display: none;
          padding: 0;
          z-index: 100;
          display: none;
        }
        .has-dropdown:hover .megamenu {
          display: flex;
        }
        .megamenu-left {
          width: 35%;
          background: #f8fafc;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
        }
        .mega-title {
          font-size: 1.7rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 1rem;
        }
        .mega-desc {
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .mega-link {
          color: var(--primary-color, #0ea5e9);
          font-weight: 700;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .mega-link:hover {
          color: #0284c7;
        }
        .megamenu-right {
          width: 65%;
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem 1rem;
        }
        .mega-service-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          text-decoration: none;
          padding: 8px;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .mega-service-item:hover {
          background: #f8fafc;
        }
        .mega-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .mega-service-text {
          display: flex;
          flex-direction: column;
        }
        .mega-service-title {
          color: #0f172a;
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 4px;
          transition: color 0.2s;
        }
        .mega-service-item:hover .mega-service-title {
          color: var(--primary-color, #0ea5e9);
        }
        .mega-service-desc {
          color: #64748b;
          font-size: 0.8rem;
          line-height: 1.4;
        }

        .desktop-btn { display: none; }
        .mobile-toggle { display: block; z-index: 1001; }
        
        .mobile-nav {
          position: absolute;
          top: 100%; left: 0; right: 0;
          padding: 1.5rem 0;
          border-top: 1px solid var(--border-color);
        }
        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }
        .mobile-nav-link {
          font-size: 1.15rem;
          font-weight: 500;
          color: var(--text-primary);
        }
        details.mobile-details summary::-webkit-details-marker {
          display: none;
        }

        @media (min-width: 992px) {
          .desktop-nav { display: block; }
          .desktop-btn { display: inline-flex; }
          .mobile-toggle { display: none; }
          .mobile-nav { display: none !important; }
        }
      `}</style>
        </header>
    );
};

export default Navbar;
