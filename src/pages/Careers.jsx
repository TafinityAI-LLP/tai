import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Send, ChevronRight, GraduationCap, Code, Server, Smartphone, Megaphone, X, Paperclip, Upload, Mail, User, Phone, Globe } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const jobs = [
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Developer (MERN)',
    type: 'Full-time',
    location: 'New Delhi / Remote',
    department: 'Engineering',
    icon: <Code size={24} className="text-blue-500" />,
    desc: 'Build scalable web applications and enterprise systems using React, Node.js, and MongoDB. Experience with AWS and Docker is a plus.',
    responsibilities: [
      'Develop responsive dynamic frontend web apps using React and modern CSS architecture.',
      'Build robust and secure Node.js backend RESTful APIs connecting to MongoDB.',
      'Participate in architecture design processes for scaling our software solutions.',
      'Collaborate closely with UI/UX designers and product managers.'
    ],
    requirements: [
      '2+ years of professional experience with the MERN stack.',
      'Strong proficiency in modern JavaScript (ES6+) and TypeScript.',
      'Solid understanding of Git, CI/CD pipelines, and cloud hosting (AWS/DigitalOcean).',
      'Excellent problem-solving skills and ability to work in a fast-paced environment.'
    ]
  },
  {
    id: 'ai-engineer',
    title: 'AI/ML Engineer',
    type: 'Full-time',
    location: 'New Delhi / Remote',
    department: 'AI & Automation',
    icon: <Server size={24} className="text-purple-500" />,
    desc: 'Design and deploy custom LLM agents and multi-agent pipelines. Experience with Python, LangChain, and OpenAI APIs is required.',
    responsibilities: [
      'Build and experiment with multi-agent systems via LangChain and LlamaIndex.',
      'Integrate popular Large Language Models (OpenAI, Anthropic, open-source) into B2B workflows.',
      'Fine-tune open-source models for highly specific enterprise internal data.',
      'Deploy machine learning models securely to production endpoints.'
    ],
    requirements: [
      'Strong background in Python and backend data streaming architecture.',
      'Proven experience building tools around LLMs and vector databases (Pinecone, Milvus).',
      'Familiarity with containerization (Docker/Kubernetes).',
      'Degree in Computer Science, Mathematics, or a related field.'
    ]
  },
  {
    id: 'growth-marketer',
    title: 'Growth Marketing Manager',
    type: 'Full-time',
    location: 'Remote',
    department: 'Marketing',
    icon: <Megaphone size={24} className="text-orange-500" />,
    desc: 'Drive B2B lead generation through SEO, content marketing, and automated outreach strategies. Familiarity with n8n is highly preferred.',
    responsibilities: [
      'Develop and execute outbound and inbound marketing strategies for B2B channels.',
      'Automate lead pipelines utilizing n8n, Make, or Zapier integrations with CRM systems.',
      'Analyze traffic, engagement, and conversion metrics to optimize ROI.',
      'Manage content creation ranging from blog posts to case studies.'
    ],
    requirements: [
      '3+ years in B2B marketing, preferably within the SaaS or AI agency space.',
      'Strong capabilities in SEO optimization and cold-email infrastructural setup.',
      'Deep analytical mindset with proficiency in Google Analytics, Search Console, etc.',
      'Creative problem solver, energetic, and highly articulate.'
    ]
  }
];

const internships = [
  {
    id: 'intern-frontend',
    title: 'Frontend Engineering Intern',
    type: 'Internship (6 Months)',
    location: 'Remote',
    department: 'Engineering',
    icon: <Smartphone size={24} className="text-green-500" />,
    desc: 'Work directly with senior developers to build stunning React and Tailwind interfaces. Outstanding interns will be offered full-time roles.',
    responsibilities: [
      'Translate UI/UX wireframes into polished, responsive React components.',
      'Fix frontend bugs and actively participate in code-review sessions.',
      'Implement fluid animations and screen transitions using Framer Motion.',
      'Learn and adapt to our global design system requirements.'
    ],
    requirements: [
      'Familiarity with HTML, CSS (Tailwind), JavaScript, and React basics.',
      'A strong portfolio of personal or academic web projects.',
      'Keen eye for design details and micro-interactions.',
      'Availability to dedicate 20-30 hours a week.'
    ]
  },
  {
    id: 'intern-business',
    title: 'Business Development Intern',
    type: 'Internship (3 Months)',
    location: 'New Delhi (Hybrid)',
    department: 'Sales',
    icon: <Briefcase size={24} className="text-pink-500" />,
    desc: 'Learn the ins and outs of B2B IT sales, client relationship management, and CRM automation tools.',
    responsibilities: [
      'Identify and research potential client leads via LinkedIn and other platforms.',
      'Assist in drafting outreach strategies and setting up cold campaigns.',
      'Sit in on client discovery calls to learn pitch dynamics and requirement gathering.',
      'Maintain and update data strictly within our internal CRM.'
    ],
    requirements: [
      'Currently pursuing a degree in Business, Economics, or related fields.',
      'Impeccable written and verbal English communication.',
      'A hunger to learn about tech sales, AI, and enterprise automation.',
      'Highly organized and detail-oriented.'
    ]
  }
];

const Careers = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('jobs');
  const [selectedRole, setSelectedRole] = useState(null);
  const [isApplyMode, setIsApplyMode] = useState(false);

  useEffect(() => {
    if (location.hash && !selectedRole) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
      }
    } else if (!selectedRole) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location, selectedRole]);

  // Handle scroll locking when modal is open
  useEffect(() => {
    if (selectedRole) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsApplyMode(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedRole]);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    // Fallback mailto logic if real API is missing, though we mock the UI here.
    // The user wanted the input fields and upload UI.
    const subject = encodeURIComponent(`Application for ${selectedRole.title}`);
    const body = encodeURIComponent(`Hi TafinityAI Team,\n\nPlease find my application attached for the role of ${selectedRole.title}.`);
    window.location.href = `mailto:info@tafinityai.com?subject=${subject}&body=${body}`;
    setSelectedRole(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full bg-[--bg-primary] min-h-screen text-[--text-primary]"
    >
      <div className="container" style={{ paddingTop: 'clamp(7rem, 10vw, 9rem)', paddingBottom: 'clamp(3rem, 6vw, 6rem)' }}>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[200px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 font-medium text-sm w-max mb-6">
            <GraduationCap size={16} /> Join the Vision
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-balance leading-tight"
          >
            Build the future of <span className="text-gradient">Intelligence.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-[--text-secondary] text-lg lg:text-xl max-w-2xl mx-auto"
          >
            At TafinityAI, we are looking for relentlessly curious minds to build cutting-edge software and autonomous systems. Explore our open roles and internship programs.
          </motion.p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 mb-12 relative z-10 w-full px-2">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-2 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-[11px] sm:text-base transition-all duration-300 ${activeTab === 'jobs' ? 'bg-[--accent-color] text-white shadow-[0_4px_20px_var(--accent-glow)] scale-100 sm:scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
          >
            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> <span className="truncate">Open Positions</span>
          </button>
          <button
            onClick={() => setActiveTab('internships')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-2 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-[11px] sm:text-base transition-all duration-300 ${activeTab === 'internships' ? 'bg-orange-500 text-white shadow-[0_4px_20px_rgba(249,115,22,0.3)] scale-100 sm:scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
          >
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> <span className="truncate">Internship Programs</span>
          </button>
        </div>

        {/* Listing Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'jobs' && (
              <motion.div
                key="jobs"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.map((job, idx) => (
                    <motion.div
                      key={job.id}
                      onClick={() => setSelectedRole(job)}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                      className="glass-card p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800 group cursor-pointer"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            {job.icon}
                          </div>
                          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded-md">{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-[--accent-color] bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">{job.department}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[--accent-color] transition-colors">{job.title}</h3>
                        <p className="text-sm text-[--text-secondary] mb-6 line-clamp-3 leading-relaxed">{job.desc}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
                        <span className="text-xs text-slate-500 font-medium">{job.location}</span>
                        <div className="text-sm font-semibold text-[--accent-color] group-hover:text-blue-700 dark:group-hover:text-blue-400 flex items-center gap-1 transition-colors">
                          View Details <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'internships' && (
              <motion.div
                key="internships"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {internships.map((intern, idx) => (
                    <motion.div
                      key={intern.id}
                      onClick={() => setSelectedRole(intern)}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                      className="glass-card p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800 group cursor-pointer"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            {intern.icon}
                          </div>
                          <span className="text-[10px] uppercase tracking-wider font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-md">{intern.type}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-[--accent-color] bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">{intern.department}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[--accent-color] transition-colors">{intern.title}</h3>
                        <p className="text-sm text-[--text-secondary] mb-6 line-clamp-3 leading-relaxed">{intern.desc}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
                        <span className="text-xs text-slate-500 font-medium">{intern.location}</span>
                        <div className="text-sm font-semibold text-[--accent-color] group-hover:text-blue-700 dark:group-hover:text-blue-400 flex items-center gap-1 transition-colors">
                          View Details <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Culture / Outro */}
        <div className="mt-24 p-8 glass-card bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 rounded-[2rem] text-center max-w-3xl mx-auto border border-blue-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none"></div>

          <Send size={32} className="text-[--accent-color] mx-auto mb-4 relative z-10" />
          <h3 className="text-2xl font-bold mb-3 relative z-10">Don't see a fit?</h3>
          <p className="text-[--text-secondary] mb-6 text-sm relative z-10">
            We are always on the lookout for extraordinary talent. Send us an open application with your resume and a brief intro about what you can build.
          </p>
          <button
            onClick={() => { setSelectedRole({ title: 'Open Application', department: 'General', type: 'Any Mode', location: 'Anywhere', desc: 'Apply with an open role.', responsibilities: [], requirements: [] }); setIsApplyMode(true); }}
            className="btn-primary relative z-10 shadow-lg"
          >
            Submit Open Application
          </button>
        </div>

      </div>

      {/* Application Modal Overlay */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedRole(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-3xl max-h-[100vh] h-full md:h-auto md:max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-none md:rounded-2xl shadow-2xl relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedRole(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-[--text-primary] rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              {!isApplyMode ? (
                /* --- 1. Detail View --- */
                <div className="p-6 md:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs uppercase tracking-wider font-bold text-[--accent-color] bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-md">{selectedRole.department}</span>
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-500 bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-md">{selectedRole.type}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 pr-10">{selectedRole.title}</h2>
                  <p className="text-lg text-[--text-secondary] mb-8">{selectedRole.desc}</p>

                  {selectedRole.responsibilities && selectedRole.responsibilities.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Key Responsibilities</h3>
                      <ul className="space-y-3">
                        {selectedRole.responsibilities.map((res, i) => (
                          <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400">
                            <span className="text-[--accent-color] mt-1">✓</span> {res}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedRole.requirements && selectedRole.requirements.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Requirements</h3>
                      <ul className="space-y-3">
                        {selectedRole.requirements.map((req, i) => (
                          <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400">
                            <span className="text-[--accent-color] mt-1">✓</span> {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-8 flex flex-col items-center justify-center gap-6 border-t border-slate-100 dark:border-slate-800 mt-8">
                    <div className="w-full flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-500">{selectedRole.location}</span>
                      <button
                        onClick={() => setIsApplyMode(true)}
                        className="btn-primary flex items-center gap-2"
                      >
                        Apply for this role <ChevronRight size={18} />
                      </button>
                    </div>
                    {/* Branding Watermark */}
                    <p className="text-[10px] md:text-xs text-slate-400/80 dark:text-slate-500 font-semibold tracking-widest uppercase flex items-center gap-1.5 opacity-60 pb-2">
                      POWERED BY <span className="font-extrabold text-slate-800 dark:text-slate-300">Tafinity<span className="text-[--accent-color]">AI</span></span>
                    </p>
                  </div>
                </div>
              ) : (
                /* --- 2. Application Form View --- */
                <div className="p-6 md:p-10 flex flex-col min-h-0 relative">
                  <button onClick={() => setIsApplyMode(false)} className="absolute top-10 left-6 md:left-10 text-sm font-semibold text-slate-500 hover:text-[--accent-color] transition-colors flex items-center gap-1">
                    <ChevronRight size={16} className="rotate-180" /> Back to details
                  </button>
                  <div className="mt-10 mb-8">
                    <h2 className="text-3xl font-bold mb-2">Apply for {selectedRole.title}</h2>
                    <p className="text-[--text-secondary]">Submit your details and upload your resume to apply.</p>
                  </div>

                  <form onSubmit={handleApplySubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                        <div className="relative">
                          <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input required type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[--accent-color]/50 transition-shadow" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input required type="email" placeholder="john@example.com" className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[--accent-color]/50 transition-shadow" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
                        <div className="relative">
                          <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input required type="tel" placeholder="+91 98765 43210" className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[--accent-color]/50 transition-shadow" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">LinkedIn / Portfolio</label>
                        <div className="relative">
                          <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input type="url" placeholder="https://linkedin.com/in/..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[--accent-color]/50 transition-shadow" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Current CTC (LPA)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                          <input required type="number" step="0.1" min="0" placeholder="e.g. 4.5" className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[--accent-color]/50 transition-shadow" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Expected CTC (LPA)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                          <input required type="number" step="0.1" min="0" placeholder="e.g. 6.0" className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[--accent-color]/50 transition-shadow" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Upload Resume / CV <span className="text-red-500">*</span></label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-slate-400" />
                            <p className="mb-2 text-sm text-slate-500 dark:text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">PDF, DOCX, or DOC (MAX. 5MB)</p>
                          </div>
                          <input id="resume-upload" type="file" className="hidden" accept=".pdf,.doc,.docx" required />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Cover Letter (Optional)</label>
                      <textarea rows="4" placeholder="Tell us why you're a great fit for this role..." className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[--accent-color]/50 transition-shadow resize-none"></textarea>
                    </div>

                    <div className="pt-8 flex flex-col items-center justify-center gap-8 border-t border-slate-100 dark:border-slate-800 mt-4">
                      <div className="w-full flex justify-end">
                        <button type="submit" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
                          <Send size={18} /> Submit Application
                        </button>
                      </div>

                      {/* Branding Watermark */}
                      <p className="text-[10px] md:text-xs text-slate-400/80 dark:text-slate-500 font-semibold tracking-widest uppercase flex items-center gap-1.5 opacity-60 pb-2">
                        POWERED BY <span className="font-extrabold text-slate-800 dark:text-slate-300">Tafinity<span className="text-[--accent-color]">AI</span></span>
                      </p>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Careers;
