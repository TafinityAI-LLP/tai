import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Send, ChevronRight, GraduationCap, Code, Server, 
  X, Upload, Mail, User, Phone, Globe, Sparkles, CheckCircle2, 
  Clock, MapPin, DollarSign, ArrowRight, Zap, Rocket, Award, 
  Search, FileText, Check, AlertCircle, HeartHandshake, ShieldCheck
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

const Careers = () => {
  const locationParams = useLocation();
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'jobs' | 'internships'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [isApplyMode, setIsApplyMode] = useState(false);
  
  // Application Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio_url: '',
    experience: '',
    message: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch Jobs and Internships from API
  useEffect(() => {
    fetch('/api/jobs')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length) setJobs(d); })
      .catch(err => console.error('Error fetching jobs:', err));

    fetch('/api/internships')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length) setInternships(d); })
      .catch(err => console.error('Error fetching internships:', err));
  }, []);

  // Handle URL hash scrolling
  useEffect(() => {
    if (locationParams.hash && !selectedRole) {
      const id = locationParams.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
      }
    } else if (!selectedRole) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [locationParams, selectedRole]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedRole) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsApplyMode(false);
      setSubmitSuccess(false);
      setSubmitError('');
      setResumeFile(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        portfolio_url: '',
        experience: '',
        message: ''
      });
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedRole]);

  // File drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setSubmitError('Please upload a valid PDF or Word document (.pdf, .doc, .docx).');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setSubmitError('File size exceeds 15MB limit. Please upload a smaller file.');
      return;
    }
    setSubmitError('');
    setResumeFile(file);
  };

  // Submit application directly to Laravel API
  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setSubmitError('Please attach your resume/CV to submit your application.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('role_title', selectedRole?.title || 'Open Application');
      data.append('role_type', selectedRole?.isInternship ? 'internship' : 'job');
      data.append('portfolio_url', formData.portfolio_url || '');
      data.append('experience', formData.experience || '');
      data.append('message', formData.message || '');
      data.append('resume', resumeFile);

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: data
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application. Please try again.');
      }

      setSubmitSuccess(true);
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmitError(err.message || 'Something went wrong while submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Combined and filtered roles
  const combinedRoles = [
    ...jobs.map(j => ({ ...j, isInternship: false, displayCategory: 'Full-time' })),
    ...internships.map(i => ({ ...i, isInternship: true, displayCategory: 'Internship' }))
  ];

  const filteredRoles = combinedRoles.filter(role => {
    if (activeTab === 'jobs' && role.isInternship) return false;
    if (activeTab === 'internships' && !role.isInternship) return false;
    
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = role.title?.toLowerCase().includes(q);
      const matchTrack = role.track?.toLowerCase().includes(q) || role.type?.toLowerCase().includes(q);
      const matchDesc = role.description?.toLowerCase().includes(q) || role.syllabus?.toLowerCase().includes(q);
      const matchLocation = role.location?.toLowerCase().includes(q);
      return matchTitle || matchTrack || matchDesc || matchLocation;
    }
    return true;
  });

  // Perks / Culture highlights
  const perks = [
    {
      icon: <Zap className="w-6 h-6 text-fuchsia-500" />,
      title: 'Frontier AI & Autonomous Systems',
      desc: 'Build with cutting-edge LLMs, multi-agent pipelines, vector databases, and real-time inference engines.'
    },
    {
      icon: <Rocket className="w-6 h-6 text-blue-500" />,
      title: 'Extreme Ownership & Impact',
      desc: 'Zero micromanagement or red tape. Architect end-to-end features and ship code straight to production.'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-500" />,
      title: 'Competitive Compensation & Rewards',
      desc: 'Top-tier salary packages, rapid appraisal cycles, performance incentives, and attractive internship stipends.'
    },
    {
      icon: <Globe className="w-6 h-6 text-cyan-500" />,
      title: 'Remote-First Flexibility',
      desc: 'Work from wherever you are most productive. Flexible working hours that respect your rhythm and deep work.'
    },
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      title: 'Continuous Learning & Upskilling',
      desc: 'Company-sponsored AI certifications, research access, paid conference tickets, and hackathons.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-500" />,
      title: 'Modern Engineering Culture',
      desc: 'Clean PR reviews, automated CI/CD pipelines, high code standards, and transparent feedback loops.'
    }
  ];

  // Hiring process steps
  const hiringSteps = [
    {
      num: '01',
      title: 'Submit Application',
      desc: 'Upload your resume and share your GitHub/portfolio. Takes under 2 minutes.',
      time: 'Instant'
    },
    {
      num: '02',
      title: 'Profile & Code Review',
      desc: 'Our engineering leadership evaluates your past projects and problem-solving skills.',
      time: '24-48 Hours'
    },
    {
      num: '03',
      title: 'Technical & Culture Jam',
      desc: 'A friendly 45-minute virtual conversation diving into architecture, coding, and team fit.',
      time: 'Day 3-5'
    },
    {
      num: '04',
      title: 'Offer & Welcome Kit',
      desc: 'Competitive offer letter, personalized onboarding plan, and direct integration with the team.',
      time: 'Day 7'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="w-full bg-[--bg-primary] min-h-screen text-[--text-primary] selection:bg-fuchsia-500 selection:text-white"
    >
      <SEO />

      {/* Hero Section */}
      <div className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-fuchsia-600/15 via-blue-600/15 to-purple-600/10 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute top-12 left-10 w-72 h-72 bg-fuchsia-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-50 dark:bg-fuchsia-950/40 border border-fuchsia-200 dark:border-fuchsia-800/60 text-fuchsia-600 dark:text-fuchsia-400 font-semibold text-xs md:text-sm tracking-wide uppercase mb-6 shadow-sm"
          >
            <Sparkles size={16} className="text-fuchsia-500 animate-pulse" />
            <span>We Are Actively Hiring • Join TafinityAI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.15]"
          >
            Build the Future of <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500">
              Autonomous Intelligence.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-[--text-secondary] max-w-2xl mx-auto leading-relaxed mb-10"
          >
            We are assembling a high-caliber team of engineers, researchers, and creators to build autonomous agents, intelligent enterprise workflows, and scalable cloud platforms.
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto pt-2"
          >
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-sm text-center">
              <span className="block text-2xl md:text-3xl font-extrabold text-fuchsia-600 dark:text-fuchsia-400">100%</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Remote / Flexible</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-sm text-center">
              <span className="block text-2xl md:text-3xl font-extrabold text-blue-600 dark:text-blue-400">Top 1%</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Engineering Culture</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-sm text-center">
              <span className="block text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">Fast-Track</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Career Growth</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-sm text-center">
              <span className="block text-2xl md:text-3xl font-extrabold text-purple-600 dark:text-purple-400">24-48h</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Application Review</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Roles Section */}
      <div id="openings" className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Navigation & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          {/* Tab Buttons */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md shadow-fuchsia-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Openings ({combinedRoles.length})
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                activeTab === 'jobs'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md shadow-fuchsia-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Briefcase size={16} /> Full-Time ({jobs.length})
            </button>
            <button
              onClick={() => setActiveTab('internships')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                activeTab === 'internships'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap size={16} /> Internships ({internships.length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by role, skills, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Roles Listing Grid */}
        <div className="min-h-[380px]">
          {filteredRoles.length === 0 ? (
            <div className="text-center py-20 px-4 rounded-3xl bg-slate-50/50 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-800">
              <Briefcase size={44} className="mx-auto text-slate-400 mb-3 opacity-60" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Matching Positions Found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                We couldn't find any openings matching your query "{searchQuery}". You can submit an open application and we'll keep your profile on file.
              </p>
              <button
                onClick={() => {
                  setSelectedRole({ title: 'Open Application (General)', isInternship: false, description: 'General candidate submission for future opportunities.' });
                  setIsApplyMode(true);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-sm shadow-md hover:scale-105 transition-transform"
              >
                Submit Open Application
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRoles.map((role, idx) => (
                <motion.div
                  key={`${role.isInternship ? 'intern' : 'job'}-${role.id || idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative p-7 rounded-3xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 hover:border-fuchsia-500/50 dark:hover:border-fuchsia-500/50 hover:shadow-xl hover:shadow-fuchsia-500/5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  onClick={() => setSelectedRole(role)}
                >
                  {/* Subtle hover gradient indicator */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/5 group-hover:bg-fuchsia-500/10 rounded-tr-3xl rounded-bl-full transition-colors pointer-events-none"></div>

                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
                        role.isInternship 
                          ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/40' 
                          : 'bg-fuchsia-50 dark:bg-fuchsia-950/40 text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-200/60 dark:border-fuchsia-800/40'
                      }`}>
                        {role.isInternship ? 'Internship Program' : (role.type || 'Full-time')}
                      </span>

                      {role.track && (
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-700/60 px-2.5 py-1 rounded-md">
                          {role.track}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2.5 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
                      {role.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed">
                      {role.description || role.syllabus || 'Join our engineering team to build scalable, AI-powered digital infrastructure.'}
                    </p>

                    {/* Meta Info Badges */}
                    <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/40 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                        <MapPin size={14} className="text-fuchsia-500" />
                        {role.location || 'Remote (Global)'}
                      </span>
                      {(role.salary || role.duration) && (
                        <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/40 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                          {role.salary ? (
                            <>
                              <DollarSign size={14} className="text-emerald-500" />
                              {role.salary}
                            </>
                          ) : (
                            <>
                              <Clock size={14} className="text-blue-500" />
                              {role.duration}
                            </>
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                      {role.startDate ? `Starts: ${role.startDate}` : 'Immediate Joining'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRole(role);
                        setIsApplyMode(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold text-xs tracking-wide shadow-md shadow-fuchsia-500/20 group-hover:scale-105 transition-all"
                    >
                      Apply Now <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Perks & Culture Grid */}
        <div className="mt-24 pt-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-fuchsia-500 uppercase tracking-widest block mb-2">Why TafinityAI</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Engineered for High Autonomy & Rapid Growth
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
              We operate with high agency, small focused squads, and deep technological curiosity. Here is what you get when you build with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, i) => (
              <div 
                key={i} 
                className="p-7 rounded-3xl bg-white/60 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {perk.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{perk.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Step Transparent Hiring Roadmap */}
        <div className="mt-28 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
            <span className="text-xs font-extrabold text-fuchsia-400 uppercase tracking-widest block mb-2">Fast & Respectful Process</span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Our 4-Step Hiring Roadmap</h2>
            <p className="text-sm text-slate-300">
              We respect your time. No 8-round fatigue or algorithmic trick questions. Real discussions on engineering, ownership, and collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {hiringSteps.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-fuchsia-400">{step.num}</span>
                    <span className="text-[11px] font-semibold text-slate-400 bg-white/10 px-2 py-0.5 rounded-md">{step.time}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Don't see a fit? Open Application Banner */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-blue-500/10 border border-fuchsia-500/20 text-center max-w-3xl mx-auto">
          <Send size={32} className="text-fuchsia-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Don't See Your Exact Role?</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-lg mx-auto">
            We are always eager to meet high-agency builders, backend hackers, and creative designers. Submit an open application and tell us what you'd love to build with us.
          </p>
          <button
            onClick={() => {
              setSelectedRole({
                title: 'General Open Application',
                isInternship: false,
                location: 'Remote',
                description: 'Open candidacy submission for future and bespoke engineering/design opportunities at TafinityAI.'
              });
              setIsApplyMode(true);
            }}
            className="px-7 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-lg shadow-fuchsia-500/25 transition-transform hover:scale-105"
          >
            Submit Open Application
          </button>
        </div>

      </div>

      {/* Role Details & Direct Application Modal */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 md:p-6 bg-slate-950/75 backdrop-blur-md"
            onClick={() => setSelectedRole(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedRole(null)}
                className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-full transition-colors z-20"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Success View */}
              {submitSuccess ? (
                <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 shadow-inner animate-bounce">
                    <CheckCircle2 size={42} />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Application Received</span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                    Thank You, {formData.name || 'Candidate'}!
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
                    Your application and resume for <strong className="text-slate-900 dark:text-white">{selectedRole?.title}</strong> have been received by our recruitment team.
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-500 dark:text-slate-400 max-w-md w-full mb-8 text-left space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-fuchsia-500 shrink-0" />
                      <span>Review timeline: <strong>24 to 48 hours</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-blue-500 shrink-0" />
                      <span>We will contact you via: <strong>{formData.email}</strong></span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="px-8 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:scale-105 transition-transform"
                  >
                    Done & Browse More Roles
                  </button>
                </div>
              ) : !isApplyMode ? (
                /* --- Mode 1: Detailed Role Description --- */
                <div className="p-6 md:p-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
                      selectedRole.isInternship 
                        ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400' 
                        : 'bg-fuchsia-50 dark:bg-fuchsia-950/40 text-fuchsia-600 dark:text-fuchsia-400'
                    }`}>
                      {selectedRole.isInternship ? 'Internship Program' : (selectedRole.type || 'Full-time')}
                    </span>
                    {selectedRole.track && (
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                        {selectedRole.track}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-3 pr-10">
                    {selectedRole.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                      <MapPin size={14} className="text-fuchsia-500" />
                      {selectedRole.location || 'Remote'}
                    </span>
                    {(selectedRole.salary || selectedRole.duration) && (
                      <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                        {selectedRole.salary ? (
                          <>
                            <DollarSign size={14} className="text-emerald-500" />
                            {selectedRole.salary}
                          </>
                        ) : (
                          <>
                            <Clock size={14} className="text-blue-500" />
                            {selectedRole.duration}
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Role Overview</h4>
                      <p className="whitespace-pre-wrap">{selectedRole.description || selectedRole.syllabus || 'No specific description provided.'}</p>
                    </div>

                    {selectedRole.syllabus && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Program Curriculum & Learning Track</h4>
                        <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
                          {selectedRole.syllabus}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-400">
                      ⚡ Applications are reviewed on a rolling basis.
                    </div>
                    <button
                      onClick={() => setIsApplyMode(true)}
                      className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-md shadow-fuchsia-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
                    >
                      Apply For This Position <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                /* --- Mode 2: Real Application & Resume Upload Form --- */
                <div className="p-6 md:p-10">
                  <button
                    onClick={() => {
                      setIsApplyMode(false);
                      setSubmitError('');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 mb-4 transition-colors"
                  >
                    <ChevronRight size={14} className="rotate-180" /> Back to Role Details
                  </button>

                  <div className="mb-6">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-fuchsia-100 dark:bg-fuchsia-950 text-fuchsia-700 dark:text-fuchsia-300">
                      Candidate Application
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                      {selectedRole.title}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Fill out your details and upload your resume. Submissions land directly in the recruitment portal.
                    </p>
                  </div>

                  {submitError && (
                    <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <form onSubmit={handleApplySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name *</label>
                        <div className="relative">
                          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            required
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address *</label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            required
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone / WhatsApp *</label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            required
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40"
                          />
                        </div>
                      </div>

                      {/* Portfolio / LinkedIn */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Portfolio / GitHub / LinkedIn</label>
                        <div className="relative">
                          <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="url"
                            placeholder="https://github.com/username"
                            value={formData.portfolio_url}
                            onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Experience or Graduation Year */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Total Experience / Current Role / Graduation Year
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2 years as Full-Stack Dev OR Final year B.Tech 2026"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40"
                      />
                    </div>

                    {/* Resume Upload Dropzone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                        <span>Upload Resume / CV *</span>
                        <span className="text-[10px] text-slate-400 font-normal">PDF, DOC, DOCX up to 15MB</span>
                      </label>

                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center ${
                          isDragging
                            ? 'border-fuchsia-500 bg-fuchsia-50/50 dark:bg-fuchsia-950/20'
                            : resumeFile
                            ? 'border-emerald-400 dark:border-emerald-700 bg-emerald-50/40 dark:bg-emerald-950/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-fuchsia-400 bg-slate-50/60 dark:bg-slate-800/40'
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileInputChange}
                          className="hidden"
                        />

                        {resumeFile ? (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center shrink-0">
                              <FileText size={20} />
                            </div>
                            <div className="text-left">
                              <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[240px]">
                                {resumeFile.name}
                              </p>
                              <p className="text-[10px] text-slate-500">
                                {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setResumeFile(null);
                              }}
                              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-400 hover:text-rose-500 transition-colors ml-2"
                              title="Remove file"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-7 h-7 text-fuchsia-500 mb-2" />
                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-bold">Click to upload</span> or drag and drop your resume
                            </p>
                            <p className="text-[10px] text-slate-400 mt-1">
                              Supported formats: PDF, DOCX (Max 15MB)
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Short Message / Cover Note */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Why are you excited to build with us? (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Share a quick highlight of what you love building or notable projects..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 resize-none"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 disabled:opacity-50 text-white font-extrabold text-sm shadow-lg shadow-fuchsia-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Uploading Application & Resume...</span>
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            <span>Submit Application Directly</span>
                          </>
                        )}
                      </button>
                      <p className="text-[10px] text-center text-slate-400 mt-2">
                        🔒 Your resume and contact data are securely stored for TafinityAI recruitment.
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
