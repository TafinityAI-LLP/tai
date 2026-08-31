import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const CaseStudies = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-wrapper">
            <div className="container" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="hero-pill">Success Stories</motion.div>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Case <span className="text-gradient-accent">Studies.</span></h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                        Discover how we architect scalable, high-performance solutions to resolve complex business challenges globally.
                    </p>
                </div>

                <div className="case-list">
                    {/* Case 1 */}
                    <div className="case-card glass-card">
                        <div className="case-content">
                            <span className="industry-tag">Retail / E-Commerce</span>
                            <h2>Scaling a National Retailer</h2>
                            <p>How we rebuilt a monolithic e-commerce application into a headless microservices architecture that handled 5x traffic during peak season without downtime.</p>

                            <div className="metrics">
                                <div className="metric">
                                    <h4 className="text-gradient">300%</h4>
                                    <span>Performance Boost</span>
                                </div>
                                <div className="metric">
                                    <h4 className="text-gradient">zero</h4>
                                    <span>Downtime Incidents</span>
                                </div>
                            </div>

                            <button className="read-more">Read Full Study <ArrowUpRight size={16} /></button>
                        </div>
                        <div className="case-visual">
                            <div className="visual-block" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)' }}></div>
                        </div>
                    </div>

                    {/* Case 2 */}
                    <div className="case-card glass-card">
                        <div className="case-visual">
                            <div className="visual-block" style={{ background: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)' }}></div>
                        </div>
                        <div className="case-content">
                            <span className="industry-tag">Healthcare</span>
                            <h2>Automating Patient Workflows</h2>
                            <p>Implementing N8N and secure AI endpoints to reduce manual patient intake entry by 80%, ensuring 100% HIPAA compliance while cutting operational costs.</p>

                            <div className="metrics">
                                <div className="metric">
                                    <h4 className="text-gradient-accent">-80%</h4>
                                    <span>Manual Entry Time</span>
                                </div>
                                <div className="metric">
                                    <h4 className="text-gradient-accent">$40k</h4>
                                    <span>Monthly Savings</span>
                                </div>
                            </div>

                            <button className="read-more">Read Full Study <ArrowUpRight size={16} /></button>
                        </div>
                    </div>
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

            @media (min-width: 900px) {
                .case-card { grid-template-columns: 1fr 1fr; }
            }
          `}</style>
        </motion.div>
    );
}

export default CaseStudies;
