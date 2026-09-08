import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const CaseStudies = () => {
    const [cases, setCases] = useState([]);
    useEffect(() => {
        fetch('/api/casestudies').then(r => r.json()).then(d => { if (d && d.length) setCases(d) });
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-wrapper">
            <div className="container" style={{ paddingTop: 'clamp(2.5rem, 5vw, 4.5rem)', paddingBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="hero-pill">Success Stories</motion.div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '1rem' }}>Case <span className="text-gradient-accent">Studies.</span></h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '700px', margin: '0 auto' }}>
                        Discover how we architect scalable, high-performance solutions to resolve complex business challenges globally.
                    </p>
                </div>

                <div className="case-list">
                    {cases.length === 0 && <p className="text-center w-full py-10 opacity-50">Loading Case Studies...</p>}
                    {cases.map((study, idx) => (
                        <div key={study.id || idx} className="case-card glass-card">
                            {idx % 2 !== 0 && (
                                <div className="case-visual hidden lg:block">
                                    <div className="visual-block" style={{ background: study.imageUrl ? `url(${study.imageUrl}) center/cover` : 'linear-gradient(135deg, #f0fdfa, #ccfbf1)' }}></div>
                                </div>
                            )}

                            <div className="case-content">
                                <span className="industry-tag">{study.tags || 'Technology'}</span>
                                <h2>{study.title}</h2>
                                <p>{study.challenge || study.solution || 'A transformative enterprise digital success story by Tafinity.'}</p>

                                <div className="metrics">
                                    <div className="metric">
                                        <h4 className="text-gradient">{study.result || '100%'}</h4>
                                        <span>Target KPI Delivered</span>
                                    </div>
                                </div>

                                <button className="read-more">Read Full Study <ArrowUpRight size={16} /></button>
                            </div>

                            <div className={`case-visual ${idx % 2 !== 0 ? 'lg:hidden' : ''}`}>
                                <div className="visual-block" style={{ background: study.imageUrl ? `url(${study.imageUrl}) center/cover` : 'linear-gradient(135deg, #1e293b, #0f172a)' }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
            .case-list { display: flex; flexDirection: column; gap: 4rem; }
            .case-card {
                display: grid;
                grid-template-columns: 1fr;
                gap: 2rem;
                padding: 1rem;
                border-radius: 24px;
            }
            .case-content { padding: 2rem; display: flex; flex-direction: column; justify-content: center; }
            .industry-tag { color: var(--primary-color); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 1rem; letter-spacing: 1px; }
            .case-content h2 { font-size: 2.2rem; color: var(--text-primary); margin-bottom: 1rem; }
            .case-content p { color: var(--text-secondary); font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; }
            .metrics { display: flex; gap: 3rem; margin-bottom: 2.5rem; }
            .metric h4 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.25rem; }
            .metric span { color: var(--text-secondary); font-size: 0.9rem; font-weight: 500; text-transform: uppercase; }
            
            .read-more { 
               background: transparent; border: none; color: var(--text-primary); font-weight: 600; 
               display: flex; alignItems: center; gap: 8px; cursor: pointer; padding: 0; font-size: 1rem;
               align-self: flex-start; transition: color 0.2s;
            }
            .read-more:hover { color: var(--primary-color); }

            .case-visual { padding: 1rem; min-height: 350px; }
            .visual-block { width: 100%; height: 100%; border-radius: 16px; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05); }

            @media (min-width: 992px) {
                .case-card { grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); }
            }
          `}</style>
        </motion.div>
    );
}

export default CaseStudies;
