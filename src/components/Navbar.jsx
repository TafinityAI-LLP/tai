import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Automation', path: '/automation' },
        { name: 'Internships', path: '/internships' },
    ];

    return (
        <header className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
            <div className="container nav-container">
                <NavLink to="/" className="brand" onClick={() => setIsOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="/logo.png" alt="TafinityAI Logo" height="32" style={{ objectFit: 'contain' }} />
                    <span className="brand-text">Tafinity<span className="text-gradient-accent">AI</span></span>
                </NavLink>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <ul className="nav-list">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
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
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="mobile-nav glass"
                    >
                        <ul className="mobile-nav-list">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <NavLink
                                        to={link.path}
                                        className="mobile-nav-link"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                            <li>
                                <NavLink
                                    to="/contact"
                                    className="mobile-nav-link text-gradient-accent"
                                    onClick={() => setIsOpen(false)}
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
          padding: 0.4rem 0;
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand {
          font-family: var(--font-display);
          font-size: 1.5rem;
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
          gap: 1.5rem;
        }
        .mobile-nav-link {
          font-size: 1.25rem;
          font-weight: 600;
        }

        @media (min-width: 768px) {
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
