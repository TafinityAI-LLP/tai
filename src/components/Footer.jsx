import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <img src="/logo.png" alt="TafinityAI Logo" height="32" style={{ objectFit: 'contain' }} />
              <h2 style={{ marginBottom: 0 }}>Tafinity<span className="text-gradient-accent">AI</span></h2>
            </div>
            <p className="footer-desc">
              Building smarter, automating better, and growing faster. Making technology scalable and practical for Startups, SMBs, and Enterprises.
            </p>
          </div>

          <div className="footer-links-group">
            <h4>Solutions</h4>
            <ul>
              <li><NavLink to="/services">Workflow Automation</NavLink></li>
              <li><NavLink to="/services">Custom Software</NavLink></li>
              <li><NavLink to="/services">IT Consulting</NavLink></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Company</h4>
            <ul>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/internships">Internship Program</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Tafinity<span className="text-gradient-accent">AI</span>. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        .footer {
          border-top: 1px solid var(--border-color);
          padding: 5rem 0 2rem;
          background-color: var(--bg-secondary);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }
        .footer-brand h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .footer-desc {
          color: var(--text-secondary);
          max-width: 300px;
        }
        .footer-links-group h4 {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }
        .footer-links-group ul {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-links-group a {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .footer-links-group a:hover {
          color: var(--accent-light);
        }
        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
