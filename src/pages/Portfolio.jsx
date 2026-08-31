import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const Portfolio = () => {
    const projects = [
        { title: 'Fintech Dashboard UX', tag: 'Web App', img: 'linear-gradient(135deg, #0ea5e9, #3b82f6)', desc: 'Real-time analytics portal.' },
        { title: 'Retail POS System', tag: 'Desktop', img: 'linear-gradient(135deg, #10b981, #059669)', desc: 'Inventory sync & billing.' },
        { title: 'E-Comm Mobile App', tag: 'Mobile', img: 'linear-gradient(135deg, #ec4899, #be185d)', desc: 'Cross-platform shopping app.' },
        { title: 'ERP Platform', tag: 'Enterprise', img: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', desc: 'Multi-tenant workforce app.' },
        { title: 'AI Marketing Tool', tag: 'SaaS', img: 'linear-gradient(135deg, #f59e0b, #d97706)', desc: 'Gen-AI automated campaigns.' },
        { title: 'Logistics Tracker', tag: 'Web App', img: 'linear-gradient(135deg, #14b8a6, #0f766e)', desc: 'Fleet mapping architecture.' },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-wrapper">
            <div className="container" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="hero-pill">Featured Work</motion.div>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Our <span className="text-gradient-accent">Portfolio.</span></h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                        A glimpse into the digital ecosystems, scalable architectures, and beautiful interfaces we've crafted.
                    </p>
                </div>

                <div className="portfolio-grid">
                    {projects.map((proj, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="portfolio-card glass-card"
                        >
                            <div className="portfolio-img" style={{ background: proj.img }}>
                                <div className="portfolio-overlay">
                                    <button className="btn-icon"><ExternalLink size={20} /></button>
                                </div>
                            </div>
                            <div className="portfolio-info">
                                <span className="portfolio-tag">{proj.tag}</span>
                                <h3>{proj.title}</h3>
                                <p>{proj.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        .portfolio-card {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transition: transform 0.3s ease;
        }
        .portfolio-card:hover {
          transform: translateY(-5px);
        }
        .portfolio-img {
          width: 100%;
          height: 220px;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        .portfolio-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .portfolio-card:hover .portfolio-overlay {
          opacity: 1;
        }
        .btn-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #fff;
          color: #0f172a;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transform: scale(0.8);
          transition: transform 0.3s ease;
        }
        .portfolio-card:hover .btn-icon {
          transform: scale(1);
        }
        .portfolio-info { padding: 0 0.5rem 0.5rem; }
        .portfolio-tag {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-color);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          display: inline-block;
        }
        .portfolio-info h3 { font-size: 1.3rem; margin-bottom: 0.25rem; color: var(--text-primary); }
        .portfolio-info p { color: var(--text-secondary); font-size: 0.95rem; }
      `}</style>
        </motion.div>
    );
};

export default Portfolio;
