import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Workflow, Bot, Cpu, MoveRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Automation = () => {
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
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="page-wrapper"
    >
      <div className="container" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Intelligent <span className="text-gradient-accent">Automation.</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Unleash the power of N8N workflows and Custom AI Agents to completely automate your data entry, marketing, and customer support.
          </p>
        </div>

        <div className="auto-features">
          <motion.div
            id="n8n"
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="feature-box glass-card"
          >
            <Workflow size={48} className="text-gradient-accent" style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }} />
            <h3>N8N Workflow Mastery</h3>
            <p>Connect over 500+ apps without writing a single line of backend code. Whether it's syncing your CRM with your marketing platform or handling automated invoicing, we design robust N8N pipelines that never sleep.</p>
          </motion.div>

          <motion.div
            id="ai-agents"
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="feature-box glass-card"
          >
            <Bot size={48} className="text-gradient-accent" style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }} />
            <h3>Autonomous AI Agents</h3>
            <p>Deploy LLM-powered agents that can read emails, query your proprietary databases, and autonomously perform tasks like lead qualification, drafting responses, and scheduling meetings.</p>
          </motion.div>
        </div>

        <div className="workflow-demo glass">
          <div className="demo-step"><Cpu size={24} /> <span>Trigger (New Lead)</span></div>
          <MoveRight className="demo-arrow" />
          <div className="demo-step"><Bot size={24} /> <span>AI Qualification</span></div>
          <MoveRight className="demo-arrow" />
          <div className="demo-step active"><Workflow size={24} /> <span>CRM Update / Slack Alert</span></div>
        </div>
      </div>

      <style>{`
        .auto-features {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 5rem;
        }
        .feature-box {
          padding: 3rem;
        }
        .feature-box h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .feature-box p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }
        .workflow-demo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 3rem;
          border-radius: 16px;
          flex-wrap: wrap;
        }
        .demo-step {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-color);
          border-radius: 100px;
          font-weight: 500;
        }
        .demo-step.active {
          border-color: var(--accent-color);
          background: var(--accent-glow);
          color: var(--accent-hover);
        }
        .demo-arrow { color: var(--text-secondary); }
        
        @media (min-width: 768px) {
          .auto-features { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </motion.div>
  );
};

export default Automation;
