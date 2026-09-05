import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="container" style={{ paddingTop: 'clamp(2.5rem, 5vw, 4.5rem)', paddingBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
        <div style={{ textAlign: 'center', margin: '0 auto 4rem', maxWidth: '600px' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '1rem' }}>Let's <span className="text-gradient-accent">Talk.</span></h1>
          <p style={{ color: 'var(--text-secondary)' }}>Ready to transform your ideas into reality? Fill out the form below and our team will get back to you within 24 hours.</p>
        </div>

        <div className="contact-wrapper">
          <form className="glass-card contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="john@example.com" />
            </div>
            <div className="form-group">
              <label>Enquiry Type</label>
              <select>
                <option>Software Development</option>
                <option>Automations & AI</option>
                <option>Internship Application</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Tell us about your project..." rows="5"></textarea>
            </div>
            <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Submit Request</button>
          </form>
        </div>
      </div>
      <style>{`
        .contact-wrapper {
          display: flex;
          justify-content: center;
          gap: 4rem;
        }
        .contact-form {
          width: 100%;
          max-width: 100%; max-width: 500px;
          padding: 3rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        .form-group input, .form-group textarea, .form-group select {
          width: 100%;
          padding: 1rem;
          background: rgba(255,255,255,0.7);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          color: var(--text-primary);
          font-family: inherit;
          transition: border-color var(--transition-fast);
        }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
          outline: none;
          border-color: var(--accent-color);
        }
      `}</style>
    </motion.div>
  );
};

export default Contact;
