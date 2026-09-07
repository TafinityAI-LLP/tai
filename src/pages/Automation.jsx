import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Workflow, Bot, Cpu, MoveRight, Mail, MessageSquare, Zap, Terminal, CheckCircle2, ChevronRight, Activity, Globe, Database, Network } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const N8NMockup = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-8 glass-card bg-[#0f172a] text-white/90 relative overflow-hidden w-full rounded-2xl border border-slate-700/50 shadow-2xl">
      {/* Background animated grid and glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150px] bg-orange-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 flex flex-col items-center gap-2 p-4 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700 min-w-[140px]">
        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-2">
          <Globe size={20} />
        </div>
        <span className="text-xs font-semibold text-slate-300">Webhook Trigger</span>
        <span className="text-[10px] text-slate-500">Listens for Website Data</span>
      </motion.div>

      <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="hidden lg:block relative z-10 text-slate-500">
        <ChevronRight size={24} />
      </motion.div>
      <div className="lg:hidden w-[2px] h-6 bg-gradient-to-b from-slate-500 to-transparent my-1"></div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="relative z-10 flex flex-col items-center gap-2 p-4 bg-slate-800/80 backdrop-blur-md rounded-xl border border-orange-500/30 min-w-[140px] shadow-[0_0_15px_rgba(249,115,22,0.1)]">
        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 mb-2">
          <Workflow size={20} />
        </div>
        <span className="text-xs font-semibold text-orange-300">Data Parser Node</span>
        <span className="text-[10px] text-orange-500/70">Extracts JSON fields</span>
      </motion.div>

      <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} className="hidden lg:block relative z-10 text-slate-500">
        <ChevronRight size={24} />
      </motion.div>
      <div className="lg:hidden w-[2px] h-6 bg-gradient-to-b from-slate-500 to-transparent my-1"></div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative z-10 flex flex-col items-center gap-2 p-4 bg-slate-800/80 backdrop-blur-md rounded-xl border border-purple-500/30 min-w-[140px] shadow-[0_0_15px_rgba(168,85,247,0.1)]">
        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
          <Bot size={20} />
        </div>
        <span className="text-xs font-semibold text-purple-300">OpenAI Action</span>
        <span className="text-[10px] text-purple-400/70">Score Lead Quality</span>
      </motion.div>

      <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} className="hidden lg:block relative z-10 text-slate-500">
        <ChevronRight size={24} />
      </motion.div>
      <div className="lg:hidden w-[2px] h-6 bg-gradient-to-b from-slate-500 to-transparent my-1"></div>

      <motion.div className="relative z-10 flex flex-col gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-row items-center gap-3 p-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
          <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
            <Database size={16} />
          </div>
          <div>
            <div className="text-xs font-semibold text-green-300">Update CRM</div>
            <div className="text-[9px] text-slate-500">If Score &gt; 80</div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-row items-center gap-3 p-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700/80">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
            <MessageSquare size={16} />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-300">Slack Notification</div>
            <div className="text-[9px] text-slate-500">Alert Sales Team</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const AgentMockup = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s < 4 ? s + 1 : 0));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { icon: <Terminal size={14} />, title: "Received User Goal:", detail: "Find all pending invoices and follow up.", color: "text-blue-400", bg: "bg-blue-400/10" },
    { icon: <Zap size={14} />, title: "Thinking...", detail: "I need to query QuickBooks API and draft emails via Gmail.", color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { icon: <Database size={14} />, title: "Tool Call: Accounting_API", detail: "Found 3 overdue invoices totaling $4,500.", color: "text-purple-400", bg: "bg-purple-400/10" },
    { icon: <Mail size={14} />, title: "Tool Call: Mail_Service", detail: "Drafted polite follow-ups for 3 clients.", color: "text-orange-400", bg: "bg-orange-400/10" },
    { icon: <CheckCircle2 size={14} />, title: "Task Completed", detail: "Sent emails successfully. Awaiting replies.", color: "text-green-400", bg: "bg-green-400/10" },
  ];

  return (
    <div className="flex flex-col bg-[#0b1121] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden w-full h-[380px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-blue-500/20 text-blue-400">
            <Bot size={14} />
          </div>
          <span className="text-sm font-semibold text-slate-200">Financial Ops Agent (AutoGPT)</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-hidden relative">
        <AnimatePresence>
          {steps.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: idx <= step ? 1 : 0,
                x: idx <= step ? 0 : -10,
                scale: idx === step ? 1.02 : 1
              }}
              className={`flex items-start gap-3 mb-4 ${idx > step ? 'hidden' : 'flex'}`}
            >
              <div className={`mt-0.5 w-6 h-6 rounded flex items-center justify-center shrink-0 ${s.bg} ${s.color}`}>
                {s.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-300">{s.title}</span>
                <span className={`text-sm ${idx === step ? 'text-slate-100' : 'text-slate-400'}`}>{s.detail}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {step < 4 && (
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-4 bg-slate-400 ml-9 mt-2"></motion.div>
        )}
      </div>
    </div>
  );
};

const EcosystemMap = () => {
  return (
    <div className="glass-card w-full p-6 lg:p-12 mt-12 bg-gradient-to-r from-[--bg-primary] to-[--bg-elevated] shadow-sm relative overflow-hidden rounded-[2rem]">
      <div className="text-center mb-8 relative z-10">
        <h3 className="text-2xl font-bold mb-2">The Automation <span className="text-gradient">Ecosystem</span></h3>
        <p className="text-sm text-[--text-secondary] max-w-xl mx-auto">See how deterministic workflows and autonomous AI blend to create an orchestra of digital productivity.</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 relative z-10">

        {/* Apps */}
        <div className="flex flex-col gap-3 items-center w-full lg:w-auto">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl shadow-sm text-sm font-semibold flex gap-2 items-center w-full max-w-[200px] justify-center"><Mail size={16} /> Gmail</div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl shadow-sm text-sm font-semibold flex gap-2 items-center w-full max-w-[200px] justify-center"><Database size={16} /> HubSpot CRM</div>
          <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl shadow-sm text-sm font-semibold flex gap-2 items-center w-full max-w-[200px] justify-center"><MessageSquare size={16} /> Slack</div>
        </div>

        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="hidden lg:flex"><Arrow /></motion.div>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="flex lg:hidden"><ArrowDown /></motion.div>

        {/* n8n Heart */}
        <div className="relative group perspective">
          <div className="w-32 h-32 rounded-3xl bg-[--accent-color] text-white flex flex-col items-center justify-center shadow-lg relative z-20 hover:scale-105 transition-transform duration-300">
            <Network size={36} className="mb-2" />
            <span className="font-bold tracking-wider">n8n.io</span>
            <span className="text-[9px] uppercase tracking-widest opacity-80 mt-1">Core Router</span>
          </div>
          {/* Ring glow */}
          <div className="absolute inset-0 rounded-3xl bg-[--accent-color] opacity-20 blur-xl animate-pulse"></div>
        </div>

        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="hidden lg:flex"><Arrow /></motion.div>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="flex lg:hidden"><ArrowDown /></motion.div>

        {/* AI Brain */}
        <div className="w-32 h-32 rounded-full border-2 border-[--accent-color] bg-[--bg-primary] flex flex-col items-center justify-center shadow-[0_0_30px_var(--accent-glow)] text-[--accent-color] z-20">
          <Cpu size={36} className="mb-2" />
          <span className="font-bold text-sm">AI Agents</span>
          <span className="text-[9px] text-[--text-secondary] mt-1 text-center px-2">Unstructured Data Processor</span>
        </div>

      </div>
    </div>
  )
}

const Arrow = () => (
  <div className="flex items-center gap-1 text-[--text-secondary]">
    <div className="w-8 h-[2px] bg-current rounded-full"></div>
    <MoveRight size={20} className="-ml-2" />
  </div>
);

const ArrowDown = () => (
  <div className="flex flex-col items-center gap-1 text-[--text-secondary]">
    <div className="w-[2px] h-8 bg-current rounded-full"></div>
    <Activity size={20} className="-mt-2 rotate-90" />
  </div>
);

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
      className="w-full bg-[--bg-primary] min-h-screen text-[--text-primary]"
    >
      <div className="container" style={{ paddingTop: 'clamp(3rem, 6vw, 6rem)', paddingBottom: 'clamp(3rem, 6vw, 6rem)' }}>
        {/* Hero Headers */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-balance leading-tight"
          >
            Intelligent <span className="text-gradient-accent">Automation & Agents.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-[--text-secondary] text-lg lg:text-xl max-w-2xl mx-auto"
          >
            We build robust enterprise systems by intertwining deterministic <strong>n8n</strong> logic bridges with autonomous <strong>AI Agents</strong> capable of making probabilistic decisions.
          </motion.p>
        </div>

        {/* Section 1: N8N Pipeline */}
        <div id="n8n" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 scroll-mt-24">
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 font-medium text-sm w-max mb-2">
              <GitBranch size={16} /> Workflows
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold">Deterministic Scale with <span className="text-orange-500">n8n</span>.</h2>
            <p className="text-[--text-secondary] text-lg leading-relaxed">
              Stop paying for overpriced SaaS integrators. We design and host bespoke <strong>n8n workflows</strong> that seamlessly bridge APIs together. It provides guaranteed, deterministic routing for mission-critical business data.
            </p>
            <ul className="flex flex-col gap-3 mt-2">
              <li className="flex items-center gap-3 font-medium"><CheckCircle2 size={18} className="text-[--accent-color]" /> Connect over 1,400+ Enterprise Apps natively.</li>
              <li className="flex items-center gap-3 font-medium"><CheckCircle2 size={18} className="text-[--accent-color]" /> Visual routing, conditionals, and error handling.</li>
              <li className="flex items-center gap-3 font-medium"><CheckCircle2 size={18} className="text-[--accent-color]" /> Lower latency and virtually zero hidden costs.</li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <N8NMockup />
          </div>
        </div>

        {/* Section 2: AI Agents */}
        <div id="ai-agents" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 scroll-mt-24">
          <div className="order-1 lg:order-1 relative">
            {/* Decorative background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/10 blur-[100px] rounded-full"></div>
            <AgentMockup />
          </div>
          <div className="flex flex-col gap-6 order-2 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 font-medium text-sm w-max mb-2">
              <Bot size={16} /> Autonomous Intelligence
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold">Agents that <span className="text-blue-500">think & execute</span>.</h2>
            <p className="text-[--text-secondary] text-lg leading-relaxed">
              While workflows do exactly what they're told, AI Agents can handle ambiguity. We develop custom LLM-powered workers that digest unstructured emails, surf the web, browse your CRM, and make human-like decisions to resolve tasks autonomously.
            </p>
            <ul className="flex flex-col gap-3 mt-2">
              <li className="flex items-center gap-3 font-medium"><CheckCircle2 size={18} className="text-[--accent-color]" /> Multimodal Analysis & Document processing.</li>
              <li className="flex items-center gap-3 font-medium"><CheckCircle2 size={18} className="text-[--accent-color]" /> Custom Tools integration via APIs.</li>
              <li className="flex items-center gap-3 font-medium"><CheckCircle2 size={18} className="text-[--accent-color]" /> Fully capable of autonomous ticket resolution.</li>
            </ul>
          </div>
        </div>

        {/* Section 3: The Ecosystem */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
          <EcosystemMap />
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Automation;
