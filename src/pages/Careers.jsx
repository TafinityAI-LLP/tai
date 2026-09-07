import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Send, ChevronRight, GraduationCap, Code, Server, Smartphone, Megaphone } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const jobs = [
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Developer (MERN)',
    type: 'Full-time',
    location: 'New Delhi / Remote',
    department: 'Engineering',
    icon: <Code size={24} className="text-blue-500" />,
    desc: 'Build scalable web applications and enterprise systems using React, Node.js, and MongoDB. Experience with AWS and Docker is a plus.'
  },
  {
    id: 'ai-engineer',
    title: 'AI/ML Engineer',
    type: 'Full-time',
    location: 'New Delhi / Remote',
    department: 'AI & Automation',
    icon: <Server size={24} className="text-purple-500" />,
    desc: 'Design and deploy custom LLM agents and multi-agent pipelines. Experience with Python, LangChain, and OpenAI APIs is required.'
  },
  {
    id: 'growth-marketer',
    title: 'Growth Marketing Manager',
    type: 'Full-time',
    location: 'Remote',
    department: 'Marketing',
    icon: <Megaphone size={24} className="text-orange-500" />,
    desc: 'Drive B2B lead generation through SEO, content marketing, and automated outreach strategies. Familiarity with n8n is highly preferred.'
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
    desc: 'Work directly with senior developers to build stunning React and Tailwind interfaces. Outstanding interns will be offered full-time roles.'
  },
  {
    id: 'intern-business',
    title: 'Business Development Intern',
    type: 'Internship (3 Months)',
    location: 'New Delhi (Hybrid)',
    department: 'Sales',
    icon: <Briefcase size={24} className="text-pink-500" />,
    desc: 'Learn the ins and outs of B2B IT sales, client relationship management, and CRM automation tools.'
  }
];

const Careers = () => {
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

  const handleApply = (roleTitle) => {
    const subject = encodeURIComponent(`Application for ${roleTitle}`);
    const body = encodeURIComponent(`Hi TafinityAI Team,\n\nI am writing to express my interest in the ${roleTitle} role.\n\nPlease find my resume and portfolio attached below.\n\nBest regards,\n[Your Name]`);
    window.location.href = `mailto:info@tafinityai.com?subject=${subject}&body=${body}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full bg-[--bg-primary] min-h-screen text-[--text-primary]"
    >
      <div className="container" style={{ paddingTop: 'clamp(3rem, 6vw, 6rem)', paddingBottom: 'clamp(3rem, 6vw, 6rem)' }}>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24 relative">
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

        {/* Job Listings Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Briefcase className="text-[--accent-color]" /> Open Positions
            </h2>
            <div className="h-[1px] bg-slate-200 dark:bg-slate-800 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-800 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {job.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[--accent-color] bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">{job.department}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded-md">{job.type}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                  <p className="text-sm text-[--text-secondary] mb-6 line-clamp-3 leading-relaxed">{job.desc}</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
                  <span className="text-xs text-slate-500 font-medium">{job.location}</span>
                  <button onClick={() => handleApply(job.title)} className="text-sm font-semibold text-[--accent-color] group-hover:text-blue-700 dark:group-hover:text-blue-400 flex items-center gap-1 transition-colors">
                    Apply Now <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Internship Section */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <GraduationCap className="text-[--accent-color]" /> Internship Programs
            </h2>
            <div className="h-[1px] bg-slate-200 dark:bg-slate-800 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {internships.map((intern, idx) => (
              <motion.div
                key={intern.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-800 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {intern.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[--accent-color] bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">{intern.department}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-md">{intern.type}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{intern.title}</h3>
                  <p className="text-sm text-[--text-secondary] mb-6 line-clamp-3 leading-relaxed">{intern.desc}</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
                  <span className="text-xs text-slate-500 font-medium">{intern.location}</span>
                  <button onClick={() => handleApply(intern.title)} className="text-sm font-semibold text-[--accent-color] group-hover:text-blue-700 dark:group-hover:text-blue-400 flex items-center gap-1 transition-colors">
                    Apply Now <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Culture / Outro */}
        <div className="mt-24 p-8 glass-card bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 rounded-[2rem] text-center max-w-3xl mx-auto border border-blue-100 dark:border-slate-700">
          <Send size={32} className="text-[--accent-color] mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">Don't see a fit?</h3>
          <p className="text-[--text-secondary] mb-6 text-sm">
            We are always on the lookout for extraordinary talent. Send us an open application with your resume and a brief intro about what you can build.
          </p>
          <button
            onClick={() => handleApply('Open Application')}
            className="btn-primary"
          >
            Submit Open Application
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default Careers;
