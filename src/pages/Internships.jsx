import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, GraduationCap } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Internships = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div className="container" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div className="internship-header text-center">
          <GraduationCap size={64} style={{ color: 'var(--accent-color)', margin: '0 auto 1.5rem' }} />
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Premium <span className="text-gradient-accent">Internships.</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Designed to help students transition from academic learning to real-world industry environments. Gain exposure to development practices, AI, automation, teamwork, and professional environments.
          </p>
        </div>

        <div className="programs-wrapper">
          <div className="program-card glass-card" id="diploma">
            <h2>Diploma Program</h2>
            <p className="duration">Duration: 3 Months</p>
            <ul className="benefits-list">
              <li><CheckCircle2 color="var(--accent-color)" size={20} /> SDLC & Best Practices</li>
              <li><CheckCircle2 color="var(--accent-color)" size={20} /> Git & GitHub Workflow</li>
              <li><CheckCircle2 color="var(--accent-color)" size={20} /> Mentor-Led Training</li>
              <li><CheckCircle2 color="var(--accent-color)" size={20} /> Career Guidance</li>
            </ul>
            <button className="btn-outline w-full">Apply for Diploma</button>
          </div>

          <div className="program-card glass-card pro" id="btech">
            <div className="badge text-gradient-accent">Most Popular</div>
            <h2>B.Tech Program</h2>
            <p className="duration">Duration: 6 Months</p>
            <ul className="benefits-list">
              <li><CheckCircle2 color="var(--text-primary)" size={20} /> Real-world & Live Projects</li>
              <li><CheckCircle2 color="var(--text-primary)" size={20} /> AI & Automation Exposure</li>
              <li><CheckCircle2 color="var(--text-primary)" size={20} /> Team Collaboration Workflows</li>
              <li><CheckCircle2 color="var(--text-primary)" size={20} /> Advanced Git & Code Reviews</li>
              <li><CheckCircle2 color="var(--text-primary)" size={20} /> Interview Prep & Placement Ready</li>
            </ul>
            <button className="btn-primary w-full" style={{ position: 'relative', zIndex: 2 }}>Apply for B.Tech</button>
            <div className="pro-glow"></div>
          </div>
        </div>
      </div>

      <style>{`
        .internship-header { margin-bottom: 5rem; text-align: center; }
        .programs-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .program-card {
          padding: 3rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .program-card.pro {
          border-color: rgba(139, 92, 246, 0.5);
          overflow: hidden;
        }
        .program-card h2 { font-size: 2rem; margin-bottom: 0.5rem; }
        .duration { color: var(--text-secondary); margin-bottom: 2rem; font-weight: 500; }
        .benefits-list { margin-bottom: 3rem; flex: 1; }
        .benefits-list li {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        .w-full { width: 100%; justify-content: center; z-index: 2; position: relative; }
        .badge {
          position: absolute;
          top: 0; right: 0;
          background: rgba(139, 92, 246, 0.1);
          padding: 0.5rem 1rem;
          border-bottom-left-radius: 16px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .pro-glow {
          position: absolute;
          bottom: 0; right: 0;
          width: 200px; height: 200px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          z-index: 0;
          pointer-events: none;
        }

        @media (min-width: 768px) {
          .programs-wrapper { flex-direction: row; }
        }
      `}</style>
    </motion.div>
  );
};

export default Internships;
