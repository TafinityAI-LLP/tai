import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Code, MonitorSmartphone, Workflow, GraduationCap, ArrowRight, Zap, Users, Globe, Clock, ShieldCheck, Calendar, Briefcase, Activity, Monitor, ShoppingBag, Database, TabletSmartphone, CreditCard, Layers, Star, Bot, Sparkles, BrainCircuit, Cpu, FileText, MessageSquare, Layout, MoveRight, Check, ShoppingCart, Smartphone, Receipt, LayoutGrid, Eye, ExternalLink, ChevronLeft, ChevronRight, FileCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import HeroGraphic from '../components/HeroGraphic.jsx';
import TechHero from '../components/TechHero.jsx';
import ProjectDetailsModal from '../components/ProjectDetailsModal.jsx';
import ProjectEnquiryModal from '../components/ProjectEnquiryModal.jsx';
import ImageLightboxModal from '../components/ImageLightboxModal.jsx';
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};


const Home = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const [slideTick, setSlideTick] = useState(0);

  const [blogPosts, setBlogPosts] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [clientLogos, setClientLogos] = useState([]);

  // Modals for Recent Projects
  const [selectedProjectForDetails, setSelectedProjectForDetails] = useState(null);
  const [selectedProjectForEnquiry, setSelectedProjectForEnquiry] = useState(null);
  const [lightboxImage, setLightboxImage] = useState({ isOpen: false, url: '', title: '' });

  // Slider controls for Recent Projects (Desktop & Mobile)
  const projectsSliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateSliderButtons = () => {
    if (projectsSliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = projectsSliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollProjectsSlider = (direction) => {
    if (projectsSliderRef.current) {
      const cardWidth = window.innerWidth < 640 ? 300 : 360;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      projectsSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(updateSliderButtons, 350);
    }
  };

  useEffect(() => {
    fetch('/api/blogs').then(r => r.json()).then(d => { if (d && d.length) setBlogPosts(d) });
    fetch('/api/casestudies').then(r => r.json()).then(d => { if (d && d.length) setCaseStudies(d) });
    fetch('/api/portfolio').then(r => r.json()).then(d => { if (d && d.length) setPortfolioProjects(d) });
    fetch('/api/testimonials').then(r => r.json()).then(d => { if (d && d.length) setTestimonials(d) });
    fetch('/api/public/client-logos').then(r => r.json()).then(d => { setClientLogos(Array.isArray(d) ? d : []); }).catch(() => setClientLogos([]));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideTick(prev => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const curBlog = blogPosts.length ? blogPosts[slideTick % blogPosts.length] : { title: 'Discover the Future of AI Automations' };
  const curCs = caseStudies.length ? caseStudies[slideTick % caseStudies.length] : { id: 0, title: '', client: '', result: ' ', tags: '' };

  // ─── Commercial Packages & Pricing Data ───
  const [selectedPricingCategory, setSelectedPricingCategory] = useState('All');

  const pricingCategories = [
    { id: 'All', label: 'All', icon: <LayoutGrid size={15} /> },
    { id: 'Website', label: 'Website', icon: <Globe size={15} /> },
    { id: 'E-Commerce', label: 'E-Commerce', icon: <ShoppingCart size={15} /> },
    { id: 'Android App', label: 'Android App', icon: <Smartphone size={15} /> },
    { id: 'Web + App', label: 'Web + App', icon: <TabletSmartphone size={15} /> },
    { id: 'POS / Billing', label: 'POS / Billing', icon: <Receipt size={15} /> },
    { id: 'CRM', label: 'CRM', icon: <Users size={15} /> },
    { id: 'ERP', label: 'ERP', icon: <Database size={15} /> },
    { id: 'Custom Solution', label: 'Custom Solution', icon: <Zap size={15} /> },
  ];

  const pricingPackages = [
    {
      id: 'website',
      category: 'Website',
      icon: <Globe size={22} />,
      iconColor: '#2563eb',
      iconBg: '#eff6ff',
      title: 'Website',
      tagline: 'Professional website to grow your business online.',
      originalPrice: '₹19,999',
      price: '₹14,999',
      priceType: 'One-time setup',
      badge: null,
      contactSales: false,
      includes: [
        'Domain & Hosting (1 Year)',
        'SSL Certificate',
        'Business Email',
        'Responsive Design',
        'Basic SEO',
      ],
      maintenance: '1 Year Maintenance Included',
      theme: 'blue',
      btnText: 'Get Started',
    },
    {
      id: 'ecommerce',
      category: 'E-Commerce',
      icon: <ShoppingCart size={22} />,
      iconColor: '#0ea5e9',
      iconBg: '#e0f2fe',
      title: 'E-Commerce',
      tagline: 'Online store to sell products and grow your business.',
      originalPrice: '₹24,999',
      price: '₹19,999',
      priceType: 'One-time setup',
      badge: 'MOST POPULAR',
      badgeTheme: 'cyan',
      contactSales: false,
      includes: [
        'Product Management',
        'Shopping Cart',
        'Payment Gateway',
        'Order Management',
        'Admin Dashboard',
      ],
      maintenance: '1 Year Maintenance Included',
      theme: 'popular',
      btnText: 'Get Started',
    },
    {
      id: 'android',
      category: 'Android App',
      icon: <Smartphone size={22} />,
      iconColor: '#10b981',
      iconBg: '#ecfdf5',
      title: 'Android App',
      tagline: 'Powerful Android app for your business or startup.',
      originalPrice: '₹27,999',
      price: '₹24,999',
      priceType: 'One-time setup',
      badge: null,
      contactSales: false,
      includes: [
        'Custom UI Design',
        'Admin Panel',
        'API Integration',
        'Push Notifications',
        'Play Store Upload',
      ],
      maintenance: '1 Year Maintenance Included',
      theme: 'emerald',
      btnText: 'Get Started',
    },
    {
      id: 'webapp',
      category: 'Web + App',
      icon: <TabletSmartphone size={22} />,
      iconColor: '#8b5cf6',
      iconBg: '#f3e8ff',
      title: 'Web + App',
      tagline: 'Complete solution with website and Android app.',
      originalPrice: '₹35,000',
      price: '₹27,999',
      priceType: 'One-time setup',
      badge: 'BEST VALUE',
      badgeTheme: 'purple',
      contactSales: false,
      includes: [
        'Website + Android App',
        'Domain, Hosting & SSL',
        'Business Email',
        'Admin Panel',
        'Play Store Upload',
      ],
      maintenance: '1 Year Maintenance Included',
      theme: 'bestvalue',
      btnText: 'Get Started',
    },
    {
      id: 'pos',
      category: 'POS / Billing',
      icon: <Receipt size={22} />,
      iconColor: '#f59e0b',
      iconBg: '#fffbeb',
      title: 'POS / Billing',
      tagline: 'Easy billing and inventory management solution.',
      originalPrice: '₹34,999',
      price: '₹29,999',
      priceType: 'One-time setup',
      badge: null,
      contactSales: false,
      includes: [
        'Billing & Invoicing',
        'Product & Stock Mgmt.',
        'Barcode Support',
        'Sales Reports',
        'Customer Management',
        'Backup & Restore',
      ],
      maintenance: '1 Year Maintenance Included',
      theme: 'amber',
      btnText: 'Get Started',
    },
    {
      id: 'custom',
      category: 'Custom Solution',
      icon: <Zap size={22} />,
      iconColor: '#e11d48',
      iconBg: '#fff1f2',
      title: 'Custom Solution',
      tagline: 'Tailor-made software built as per your requirements.',
      originalPrice: null,
      price: 'Get a Quote',
      priceType: 'One-time or Custom',
      badge: null,
      contactSales: true,
      includes: [
        'Custom Features',
        'Scalable & Secure',
        'Third-party Integration',
        'Ongoing Support',
        'Maintenance',
        'On-time Delivery',
      ],
      maintenance: '1 Year Maintenance Included',
      theme: 'rose',
      btnText: 'Contact Sales',
    },
    {
      id: 'crm',
      category: 'CRM',
      icon: <Users size={22} />,
      iconColor: '#6366f1',
      iconBg: '#e0e7ff',
      title: 'CRM',
      tagline: 'Manage leads, follow-ups, and customer relationships at scale.',
      originalPrice: null,
      price: 'Contact Sales',
      priceType: 'Custom pricing',
      badge: null,
      contactSales: true,
      includes: [
        'Lead & Contact Management',
        'Pipeline & Deal Tracking',
        'Activity & Follow-up Logs',
        'Custom Reports & Analytics',
        'Role-based Access Control',
        'API & Third-party Integration',
      ],
      maintenance: null,
      theme: 'indigo',
      btnText: 'Contact Sales',
    },
    {
      id: 'erp',
      category: 'ERP',
      icon: <Database size={22} />,
      iconColor: '#0891b2',
      iconBg: '#ecfeff',
      title: 'ERP',
      tagline: 'End-to-end enterprise resource planning for growing businesses.',
      originalPrice: null,
      price: 'Contact Sales',
      priceType: 'Custom pricing',
      badge: null,
      contactSales: true,
      includes: [
        'Inventory & Procurement',
        'Finance & Accounting',
        'HR & Payroll',
        'Sales & Purchase Orders',
        'Multi-branch Support',
        'Custom Module Development',
      ],
      maintenance: null,
      theme: 'cyan',
      btnText: 'Contact Sales',
    },
  ];

  const filteredPricingPackages = selectedPricingCategory === 'All'
    ? pricingPackages
    : pricingPackages.filter(pkg => pkg.category === selectedPricingCategory);

  const services = [
    {
      icon: <Monitor size={30} />,
      title: 'Website Development',
      desc: 'Striking, conversion-optimized landing pages and brand portfolios with 3D/animation.',
      desktopDesc: 'We architect responsive, high-performance web experiences utilizing modern frameworks like React and Next.js. Expect flawless load times.',
      link: '/services',
      previewImage: '/images/services/website-dev.jpg',
      previewBadge: 'Responsive Web UI',
    },
    {
      icon: <MonitorSmartphone size={30} />,
      title: 'Android App Development',
      desc: 'Native and cross-platform apps for iOS and Android delivering unforgettable experiences.',
      desktopDesc: 'From native Kotlin to hybrid React Native solutions, we build secure, scalable mobile applications. Our development lifecycle emphasizes seamless UI/UX.',
      link: '/services',
      previewImage: '/images/services/android-app.jpg',
      previewBadge: 'Mobile App Ecosystem',
    },
    {
      icon: <TabletSmartphone size={30} />,
      title: 'Web + App Solutions',
      desc: 'Unified codebase solutions providing a seamless experience across all target platforms.',
      desktopDesc: 'Achieve true platform symmetry through unified Progressive Web Apps (PWA) and multi-targeting architectures for maximum efficiency.',
      link: '/services',
      previewImage: '/images/services/webapp-sync.jpg',
      previewBadge: 'Cross-Platform Sync',
    },
    {
      icon: <ShoppingBag size={30} />,
      title: 'E-Commerce Solutions',
      desc: 'High-conversion online stores engineered for scale with custom cart solutions.',
      desktopDesc: 'Maximize your ROI with headless e-commerce platforms featuring integrated payment gateways and dynamic inventory management algorithms.',
      link: '/services',
      previewImage: '/images/services/ecommerce.jpg',
      previewBadge: 'E-Commerce Storefront',
    },
    {
      icon: <CreditCard size={30} />,
      title: 'POS / Billing Solutions',
      desc: 'Fast, secure Point of Sale software focused on frictionless checkout and ledger management.',
      desktopDesc: 'Optimize your retail and operational accounting with our robust modern POS systems. We provide barcode integrations and real-time cloud synching.',
      link: '/services',
      previewImage: '/images/services/pos-billing.jpg',
      previewBadge: 'Cloud POS Terminal',
    },
    {
      icon: <Database size={30} />,
      title: 'ERP Solutions',
      desc: 'Custom enterprise resource planning software tailored to automate your workflows.',
      desktopDesc: 'Centralize your organizational data across HR, Finance, and Supply Chain. Our custom ERP solutions dismantle data silos with actionable business APIs.',
      link: '/services',
      previewImage: '/images/services/erp-solutions.jpg',
      previewBadge: 'Enterprise ERP Suite',
    },
    {
      icon: <Users size={30} />,
      title: 'CRM Solutions',
      desc: 'Intelligent customer relationship management to track leads and boost sales efficiency.',
      desktopDesc: 'Foster deeper client engagements with tailored CRM dashboards. Track pipeline stages natively and automate follow-up communications.',
      link: '/services',
      previewImage: '/images/services/crm-solutions.jpg',
      previewBadge: 'CRM Sales Pipeline',
    },
    {
      icon: <Layers size={30} />,
      title: 'Custom Solutions',
      desc: 'Powerful bespoke applications customized end-to-end to solve complex challenges.',
      desktopDesc: 'Need something entirely unique? We tackle edge-case architectural difficulties by developing robust custom services from the ground up.',
      link: '/services',
      previewImage: '/images/services/custom-ai.jpg',
      previewBadge: 'Autonomous AI Mesh',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-wrapper"
    >
      <SEO />
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="container hero-grid">
          {/* Left Column: Premium formatted Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-content"
          >
            {/* Status Pill Badge */}
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>OPEN FOR NEW PROJECTS</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title">
              Build Smarter.<br />
              Automate Better.<br />
              <span className="text-gradient-accent">Grow Faster.</span>
            </h1>

            {/* Subtitle with Left Border Accent */}
            <div className="hero-subtitle-wrapper">
              <p className="hero-subtitle">
                Transforming ideas, challenges, and manual processes into practical, scalable digital solutions for Startups, SMBs, and Enterprises.
              </p>
            </div>

            {/* CTA Action Buttons */}
            <div className="hero-actions">
              <Link to="/contact" className="btn-hero-primary">
                Start a Project <ArrowRight size={18} className="btn-arrow-icon" />
              </Link>
              <Link to="/services" className="btn-hero-secondary">
                Explore Services
              </Link>
            </div>
          </motion.div>

          {/* Right column has TechHero (with keyboard, mouse & live code editor) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-tech-right"
            style={{ width: '100%' }}
          >
            <TechHero />
          </motion.div>
        </div>

        <div style={{ position: 'absolute', bottom: '1.5rem', left: 0, right: 0, width: '100%', zIndex: 10 }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="hero-audience-banner"
            >
              {["STARTUPS", "SMALL & MEDIUM BIZ", "ENTERPRISES", "GLOBAL SCALING"].map((tag, i) => (
                <span key={i}><div className="audience-dot"></div> {tag}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Stats Section */}
      <section className="mission-section">
        <div className="container mission-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mission-content"
          >
            <h2>Make Technology Practical.<br /><span className="text-gradient-accent">Make Innovation Accessible.</span></h2>
            <p>Our mission is to help businesses use technology more effectively by delivering custom-built, modern, scalable, and cost-effective solutions.</p>
            <p>We automate manual processes, solve complex challenges, and make AI practical for real use cases. Building a smarter digital foundation for the future is our priority.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="stats-container"
          >
            {[
              { icon: <Activity size={24} />, value: "01", label: "Understand" },
              { icon: <Globe size={24} />, value: "02", label: "Strategize" },
              { icon: <Code size={24} />, value: "03", label: "Build" },
              { icon: <Workflow size={24} />, value: "04", label: "Automate" },
              { icon: <Zap size={24} />, value: "05", label: "Scale" }
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeIn} className="stat-card glass-card">
                <div className="stat-icon">{stat.icon}</div>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
                <div className="card-hover-effect"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section (Sticky Stacking Cards) */}
      <section className="services-section relative w-full pt-20 pb-40">
        <div className="container relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">What we do.</h2>
            <p className="text-lg md:text-xl text-[--text-secondary] max-w-2xl mx-auto">End-to-end technology solutions built around your business workflows.</p>
          </motion.div>

          {/* Stacking Cards Container */}
          <div className="flex flex-col relative w-full">
            {services.map((svc, idx) => (
              <div
                key={idx}
                className="w-full sticky mb-10 md:mb-16 card-stack-wrapper"
                style={{
                  '--card-idx': idx,
                  zIndex: idx + 10
                }}
              >
                <div
                  className="w-full flex flex-col lg:flex-row items-start lg:items-center p-7 sm:p-10 lg:p-12 min-h-[310px] border border-white/90 bg-gradient-to-r from-[#d9edfd] via-[#e8f4fe] to-[#cde7fc] backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(2,132,199,0.18)] rounded-3xl md:rounded-[2.5rem] overflow-hidden group relative"
                >
                  {/* Organic Flowing Wave Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1000 360">
                    <path d="M420 0 C 580 140, 750 200, 1000 130" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="3" />
                    <path d="M300 360 C 480 230, 700 80, 1000 50" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
                    <path d="M150 360 C 420 280, 680 150, 950 0" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
                  </svg>

                  {/* Ambient Glowing Orbs / Spheres */}
                  <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-sky-300/25 rounded-full blur-[90px] pointer-events-none"></div>
                  <div className="absolute right-12 top-6 w-20 h-20 rounded-full bg-gradient-to-br from-sky-400/40 to-blue-600/30 blur-[1px] shadow-lg pointer-events-none hidden sm:block"></div>
                  <div className="absolute right-6 bottom-8 w-12 h-12 rounded-full bg-gradient-to-br from-sky-300/50 to-blue-500/40 blur-[0.5px] shadow-md pointer-events-none hidden sm:block"></div>

                  {/* Left Content Area */}
                  <div className="flex-1 pr-0 lg:pr-10 relative z-10 w-full">
                    {/* Vibrant Cyan/Blue Rounded Icon Box */}
                    <div className="w-14 h-14 md:w-16 md:h-16 mb-5 bg-gradient-to-br from-[#0284c7] to-[#0369a1] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/30 border border-sky-400/40 group-hover:scale-105 transition-transform duration-300">
                      {React.cloneElement(svc.icon, { size: 30 })}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2.5 text-slate-950 tracking-tight leading-tight">
                      {svc.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg font-medium text-slate-800 mb-2.5 leading-snug max-w-xl">
                      {svc.desc}
                    </p>

                    {/* Paragraph / Desktop Description (Hidden on mobile cards as requested) */}
                    {svc.desktopDesc && (
                      <p className="hidden md:block text-sm sm:text-[0.95rem] text-slate-600 mb-6 leading-relaxed max-w-xl font-normal">
                        {svc.desktopDesc}
                      </p>
                    )}

                    {/* Mobile / Tablet Inline Image Preview (Only on < lg screens) */}
                    <div className="block lg:hidden my-5 w-full rounded-2xl overflow-hidden border border-white/80 shadow-[0_10px_30px_rgba(2,132,199,0.18)] relative aspect-[16/10] bg-slate-950">
                      <img 
                        src={svc.previewImage} 
                        alt={svc.title}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium border border-white/10">
                          {svc.previewBadge || svc.title}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-sky-500 text-white text-[10px] font-bold">
                          Live UI
                        </span>
                      </div>
                    </div>

                    {/* Explore Service Button (Pill matching Image 2) */}
                    <Link 
                      to={svc.link} 
                      className="inline-flex items-center gap-2 font-bold text-sm sm:text-base text-sky-600 bg-white px-6 py-2.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.22)] hover:bg-sky-50 transition-all border border-sky-100/90 w-fit group/btn"
                    >
                      Explore Service <ArrowRight size={17} className="text-sky-500 group-hover/btn:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>

                  {/* Right Content Area: Realistic 3D Monitor Showcase with Premium UI Preview Image */}
                  <div className="hidden lg:flex w-full lg:w-[48%] justify-end items-center relative z-10 pl-4">
                    {/* 3D Modern Monitor Container */}
                    <div className="relative w-full max-w-[430px] filter drop-shadow-[0_25px_35px_rgba(2,132,199,0.25)] transform hover:scale-[1.02] transition-transform duration-500">
                      {/* Monitor Screen Frame */}
                      <div className="rounded-[22px] border-[5px] border-[#1e293b] bg-[#0f172a] shadow-2xl overflow-hidden ring-1 ring-sky-400/40">
                        {/* Monitor Top Window Bar */}
                        <div className="px-4 py-2 bg-[#1e293b] flex items-center justify-between border-b border-slate-700/60">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                          </div>
                          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#0f172a] text-[11px] font-mono text-sky-300 border border-sky-500/25 shadow-inner">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>{svc.previewBadge || svc.title}</span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">Live Preview</div>
                        </div>

                        {/* Screen Inner Area: High-Res Service Image with Glare and Badges */}
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950 group/preview">
                          <img 
                            src={svc.previewImage} 
                            alt={svc.title}
                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/preview:scale-105"
                            loading="lazy"
                          />
                          {/* Glare overlay */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-black/30 pointer-events-none"></div>
                          {/* Floating bottom badge */}
                          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
                            <span className="px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-medium border border-white/10 shadow-lg">
                              {svc.title}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-sky-500 text-white text-[10px] font-bold shadow-md">
                              Interactive UI
                            </span>
                          </div>
                        </div>

                        {/* Monitor Aluminum Chin */}
                        <div className="h-6 bg-gradient-to-b from-[#cbd5e1] via-[#e2e8f0] to-[#94a3b8] flex items-center justify-center border-t border-slate-700/50 shadow-inner">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-500/30"></div>
                        </div>
                      </div>

                      {/* Monitor Metallic Tapered Stand */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-7 bg-gradient-to-b from-[#94a3b8] to-[#cbd5e1] shadow-inner" style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }}></div>
                        <div className="w-32 h-2.5 rounded-full bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 shadow-md border border-slate-300/40"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Teaser Section */}
      <section className="py-24 relative overflow-hidden bg-[#1ba1e2] text-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--accent-glow)_0%,_transparent_50%)] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_blue_0%,_transparent_50%)] opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-[var(--bg-primary)] to-transparent pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent pointer-events-none z-0"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16 items-center">
            {/* 1. Badge & Heading (Mobile Top, Desktop Top-Left) */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="lg:col-start-1 lg:row-start-1 w-full flex flex-col"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-slate-900 font-bold text-sm mb-6 border border-white/30 backdrop-blur-sm shadow-sm w-fit">
                <Sparkles size={16} /> Autonomous Agents
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-6 lg:mb-4 text-transparent [-webkit-text-stroke:0.5px_black] md:[-webkit-text-stroke:1px_black] !font-sans tracking-tight leading-tight">
                Automate <span>Everything.</span>
              </h2>
            </motion.div>

            {/* 2. Rotating Technologies Ecosystem (Software Development Technologies Orbit) */}
            <div className="w-full flex justify-center lg:col-start-2 lg:row-start-1 lg:row-span-2 my-8 lg:my-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-[20rem] sm:max-w-[24rem] aspect-square flex items-center justify-center select-none"
              >
                {/* Ambient Soft Glow Rings */}
                <div className="absolute inset-0 bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>

                {/* ── OUTER ORBIT: Core Backend, Frontend & Cloud Technologies (Clockwise) ── */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80">
                  <div className="w-full h-full border border-white/35 rounded-full animate-[spin_36s_linear_infinite] relative">
                    {[
                      { 
                        name: 'React', 
                        angle: 0,
                        svg: (
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="-11.5 -10.23 23 20.46" fill="none">
                            <circle cx="0" cy="0" r="2.05" fill="#06b6d4"/>
                            <g stroke="#06b6d4" strokeWidth="1" fill="none">
                              <ellipse rx="11" ry="4.2"/>
                              <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                              <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                            </g>
                          </svg>
                        )
                      },
                      { 
                        name: 'Python', 
                        angle: 60,
                        svg: (
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                            <path d="M11.9 2c-4.5 0-4.2 2-4.2 2l.01 2h4.25v.6H6.2S2 6.1 2 10.6s3.65 4.4 3.65 4.4h1.1v-1.5s-.1-1.8 1.8-1.8h4.2s1.7 0 1.7-1.7V4S14.9 2 11.9 2zm-2.3 1.3a.8.8 0 110 1.6.8.8 0 010-1.6z" fill="#387eb8"/>
                            <path d="M12.1 22c4.5 0 4.2-2 4.2-2l-.01-2H12v-.6h5.8s4.2.5 4.2-4-3.65-4.4-3.65-4.4h-1.1v1.5s.1 1.8-1.8 1.8H11.4s-1.7 0-1.7 1.7v5.9S9.1 22 12.1 22zm2.3-1.3a.8.8 0 110-1.6.8.8 0 010 1.6z" fill="#eab308"/>
                          </svg>
                        )
                      },
                      { 
                        name: 'Node.js', 
                        angle: 120,
                        svg: (
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" fill="#22c55e" fillOpacity="0.2" stroke="#16a34a" strokeWidth="2"/>
                            <path d="M12 7v10M8.5 9l3.5 2 3.5-2" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round"/>
                          </svg>
                        )
                      },
                      { 
                        name: 'Docker', 
                        angle: 180,
                        svg: (
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24" fill="#0284c7">
                            <path d="M22.5 10.5c-.3-.2-1.2-.4-2.1-.2-.2-.5-.5-.9-.9-1.2l-.5.3c.1.4.1.8 0 1.1-.5.7-1.3 1.1-2.2 1.1H1.5C.7 11.6 0 12.3 0 13.1c0 3.3 2.5 6.6 6.5 6.6 4.7 0 7.8-2.6 9.3-5.7.9.1 2.3.2 3.5-.8 1.4-1.2 1.7-2.6 1.7-2.6l-1.5-.1h3zm-13.8-3h-2v2h2v-2zm-3 0h-2v2h2v-2zm6 0h-2v2h2v-2zm3 0h-2v2h2v-2zm-6-3h-2v2h2V4.5zm3 0h-2v2h2V4.5zm-6 0h-2v2h2V4.5z"/>
                          </svg>
                        )
                      },
                      { 
                        name: 'AWS', 
                        angle: 240,
                        svg: (
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                            <path d="M6.5 16.5c-2.5 0-4.5-2-4.5-4.5 0-2.2 1.6-4 3.7-4.4C6.4 4.7 9 2.5 12 2.5c3.7 0 6.7 3 6.9 6.7 1.8.4 3.1 2 3.1 3.8 0 2.2-1.8 4-4 4H6.5z" stroke="#f97316" strokeWidth="2" fill="#f97316" fillOpacity="0.2"/>
                            <path d="M7 18.5c3 1.5 7 1.5 10 0" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        )
                      },
                      { 
                        name: 'TypeScript', 
                        angle: 300,
                        svg: (
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="4" fill="#2563eb"/>
                            <path d="M4 10.5h6v1.8H7.9V18H6.1v-5.7H4v-1.8zm7.5 5.5c.5.7 1.3 1.1 2.3 1.1 1.2 0 1.9-.6 1.9-1.5 0-.8-.5-1.2-1.6-1.5l-.8-.2c-1.7-.5-2.6-1.3-2.6-2.7 0-1.7 1.4-2.8 3.5-2.8 1.4 0 2.5.5 3.2 1.4l-1.1 1.2c-.5-.6-1.2-.9-2.1-.9-1 0-1.7.5-1.7 1.3 0 .7.5 1.1 1.5 1.4l.8.2c1.9.5 2.8 1.3 2.8 2.8 0 1.9-1.5 3-3.8 3-1.7 0-3-.6-3.8-1.7l1.3-1.1z" fill="#fff"/>
                          </svg>
                        )
                      },
                    ].map((tech, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 pointer-events-none"
                        style={{ transform: `rotate(${tech.angle}deg)` }}
                      >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                          {/* Outer counter-rotation cancels out spoke angle */}
                          <div style={{ transform: `rotate(-${tech.angle}deg)` }}>
                            {/* Inner reverse spin continuously cancels out the orbit rotation */}
                            <div className="animate-[spin_36s_linear_infinite_reverse]">
                              <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_6px_22px_rgba(7,30,60,0.18)] flex items-center gap-1.5 hover:scale-110 transition-transform cursor-pointer group">
                                {tech.svg}
                                <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 tracking-tight whitespace-nowrap">
                                  {tech.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── INNER ORBIT: Modern Frameworks & Data Stack (Counter-Clockwise) ── */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 sm:w-52 h-44 sm:h-52">
                  <div className="w-full h-full border border-white/25 rounded-full animate-[spin_24s_linear_infinite_reverse] relative">
                    {[
                      { 
                        name: 'Next.js', 
                        angle: 45,
                        svg: (
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="11" fill="#0f172a"/>
                            <path d="M14.8 16.5l-6-8.2h-1.6v7.4h1.5v-5.3l5.5 7.6c.2-.5.4-1 .6-1.5z" fill="#fff"/>
                            <path d="M15.2 8.3h1.5v5.8h-1.5z" fill="#fff"/>
                          </svg>
                        )
                      },
                      { 
                        name: 'Postgres', 
                        angle: 135,
                        svg: (
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C7 2 3 5 3 9c0 2.5 1.5 4.8 4 6.2V21l4-2.5 1 .5c0 0 3 .5 6-1 2.5-1.2 3-4 3-7 0-5-4.5-9-10-9z" stroke="#4f46e5" strokeWidth="1.8" fill="#4f46e5" fillOpacity="0.15" strokeLinecap="round"/>
                            <circle cx="9" cy="8.5" r="1" fill="#4f46e5"/>
                            <path d="M14 11.5c-1 1-3 1-4 0" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        )
                      },
                      { 
                        name: 'Flutter', 
                        angle: 225,
                        svg: (
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                            <path d="M14.3 2.5L4.5 12.3l3.1 3.1L19.5 3.5h-5.2z" fill="#38bdf8"/>
                            <path d="M14.3 11.5l-4.5 4.5 4.5 4.5h5.2l-6.8-6.8 2.6-2.2h-1z" fill="#0284c7"/>
                            <path d="M12.3 16l2 2 4.5-4.5h-4.5l-2 2.5z" fill="#0369a1"/>
                          </svg>
                        )
                      },
                      { 
                        name: 'GraphQL', 
                        angle: 315,
                        svg: (
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                            <polygon points="12,2 21,7.2 21,17.8 12,23 3,17.8 3,7.2" stroke="#e11d48" strokeWidth="1.6" fill="#e11d48" fillOpacity="0.15"/>
                            <polygon points="12,6 18,9.5 18,16.5 12,20 6,16.5 6,9.5" stroke="#e11d48" strokeWidth="1.2"/>
                            <circle cx="12" cy="2" r="1.8" fill="#e11d48"/>
                            <circle cx="21" cy="7.2" r="1.8" fill="#e11d48"/>
                            <circle cx="21" cy="17.8" r="1.8" fill="#e11d48"/>
                            <circle cx="12" cy="23" r="1.8" fill="#e11d48"/>
                            <circle cx="3" cy="17.8" r="1.8" fill="#e11d48"/>
                            <circle cx="3" cy="7.2" r="1.8" fill="#e11d48"/>
                          </svg>
                        )
                      },
                    ].map((tech, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 pointer-events-none"
                        style={{ transform: `rotate(${tech.angle}deg)` }}
                      >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                          {/* Outer counter-rotation cancels out spoke angle */}
                          <div style={{ transform: `rotate(-${tech.angle}deg)` }}>
                            {/* Inner spin matches inner orbit speed in opposite direction */}
                            <div className="animate-[spin_24s_linear_infinite]">
                              <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/70 shadow-[0_4px_14px_rgba(7,30,60,0.14)] flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer group">
                                {tech.svg}
                                <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 whitespace-nowrap">
                                  {tech.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── CENTER AI CORE ── */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-24 sm:h-32 bg-white rounded-full shadow-[0_0_55px_rgba(255,255,255,0.7),0_12px_36px_rgba(7,30,60,0.18)] flex flex-col items-center justify-center z-20 border-4 border-white/85">
                  <BrainCircuit className="w-10 h-10 sm:w-13 sm:h-13 text-slate-900 drop-shadow-sm animate-pulse" />
                  <span className="text-[8.5px] sm:text-[10px] font-black text-slate-900 tracking-wider uppercase mt-1">
                    TAI CORE
                  </span>
                </div>
              </motion.div>
            </div>

            {/* 3. Paragraph & Button (Mobile Bottom, Desktop Bottom-Left) */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="lg:col-start-1 lg:row-start-2 w-full flex flex-col"
            >
              <p className="text-base md:text-xl text-slate-900 mb-8 leading-relaxed max-w-xl">
                Supercharge your business workflows with custom AI Agents and seamless integrations. Stop doing repetitive tasks manually and let intelligent systems handle the heavy lifting while you focus on growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/automation" className="btn-primary flex items-center justify-center gap-2 mt-4 hover:shadow-[0_4px_25px_rgba(255,255,255,0.2)] w-fit">
                  Explore AI Solutions <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Radiant Commercial Pricing & Packages Section (Above Work & Insights) ── */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-white via-[#f0f6fc] to-[#e4eef9]/70">
        {/* Chamkta Ambient Glow Lights */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-sky-400/15 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-purple-500/12 rounded-full blur-[160px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[320px] bg-sky-300/20 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="container relative z-10">
          {/* Section Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/25 text-sky-700 text-xs font-bold tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(2,132,199,0.12)]">
              <Sparkles size={13} className="text-amber-500" />
              Transparent Pricing
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
              Simple Plans.{' '}
              <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                Built for Growth.
              </span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Clear upfront pricing with 1 year of free maintenance included. No hidden charges.
            </p>
          </motion.div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto py-2 px-1 mb-10 scrollbar-none no-scrollbar">
            {pricingCategories.map(cat => {
              const isActive = selectedPricingCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedPricingCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white shadow-[0_6px_22px_rgba(2,132,199,0.45)] ring-2 ring-sky-400/50 scale-105'
                      : 'bg-white/95 backdrop-blur-md text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200/90 hover:border-sky-300 shadow-sm hover:shadow'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {filteredPricingPackages.map((pkg) => {
              const isPopular = pkg.theme === 'popular';
              const isBestValue = pkg.theme === 'bestvalue';

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className={`group relative rounded-[26px] p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2.5 ${
                    isPopular
                      ? 'bg-gradient-to-b from-white via-sky-50/40 to-white border-2 border-sky-400 shadow-[0_12px_35px_rgba(14,165,233,0.18)] ring-4 ring-sky-400/10 hover:shadow-[0_24px_55px_rgba(14,165,233,0.28)]'
                      : isBestValue
                      ? 'bg-gradient-to-b from-white via-purple-50/40 to-white border-2 border-purple-400 shadow-[0_12px_35px_rgba(168,85,247,0.18)] ring-4 ring-purple-400/10 hover:shadow-[0_24px_55px_rgba(168,85,247,0.28)]'
                      : 'bg-white border border-slate-200/90 shadow-[0_4px_22px_rgba(0,0,0,0.04)] hover:border-sky-400/70 hover:shadow-[0_18px_45px_rgba(2,132,199,0.13)]'
                  }`}
                >
                  {/* Floating Glowing Top Badge */}
                  {pkg.badge && (
                    <div className={`absolute -top-3.5 right-6 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-md z-10 ${
                      pkg.badgeTheme === 'cyan'
                        ? 'bg-gradient-to-r from-blue-600 to-sky-500 shadow-[0_0_18px_rgba(14,165,233,0.65)] border border-sky-300/50'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_0_18px_rgba(168,85,247,0.65)] border border-purple-300/50'
                    }`}>
                      {pkg.badge}
                    </div>
                  )}

                  {/* Top Content */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: pkg.iconBg, color: pkg.iconColor }}
                      >
                        {pkg.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">{pkg.title}</h3>
                    <p className="text-xs text-slate-500 font-medium mb-6 min-h-[34px] leading-relaxed">{pkg.tagline}</p>

                    {/* Price Block */}
                    <div className="mb-6 pb-6 border-b border-slate-100">
                      {pkg.originalPrice ? (
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xs font-semibold text-slate-400 line-through">{pkg.originalPrice}</span>
                          <span className="text-3xl font-black text-slate-900 tracking-tight">{pkg.price}</span>
                        </div>
                      ) : (
                        <div className="text-2xl font-black text-slate-900 tracking-tight mb-1">{pkg.price}</div>
                      )}
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{pkg.priceType}</span>
                    </div>

                    {/* Feature Checklist */}
                    <ul className="space-y-3 mb-6">
                      {pkg.includes.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium leading-tight">
                          <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={11} className="stroke-[3]" />
                          </div>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="pt-2">
                    {pkg.maintenance && (
                      <div className="mb-4 px-3 py-1.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-700 text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm">
                        <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                        {pkg.maintenance}
                      </div>
                    )}

                    <Link
                      to={pkg.contactSales ? "/contact" : `/contact?plan=${pkg.id}`}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                        isPopular
                          ? 'bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-[0_6px_22px_rgba(2,132,199,0.38)] hover:shadow-[0_8px_28px_rgba(2,132,199,0.55)]'
                          : isBestValue
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-[0_6px_22px_rgba(168,85,247,0.38)] hover:shadow-[0_8px_28px_rgba(168,85,247,0.55)]'
                          : 'border border-slate-300 hover:border-sky-500 hover:bg-sky-50 text-slate-800 hover:text-sky-700 shadow-sm'
                      }`}
                    >
                      {pkg.btnText} <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Combined Insights & Work Section (Bento Box) */}
      <section className="py-24 relative bg-[--bg-secondary]">
        <div className="container relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center md:text-left mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Work & Insights.</h2>
            <p className="text-lg text-[--text-secondary] max-w-2xl">Proven results, deep industry knowledge, and thought leadership consolidated.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* 1. Case Study Masterclass Block (Span 8 - Replaced Featured Projects as requested) */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={fadeIn} 
              transition={{ delay: 0.1 }} 
              className="md:col-span-8 bg-gradient-to-br from-[#101438] via-[#1e144a] to-[#2e1065] rounded-[2rem] p-6 sm:p-8 md:p-10 relative overflow-hidden group text-white shadow-xl border border-indigo-500/25 flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-500/20 rounded-full blur-[90px] pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-500/15 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white backdrop-blur-md font-bold text-xs uppercase tracking-widest mb-5 border border-white/20 shadow-sm">
                    <Star size={13} className="text-yellow-400" /> Case Study Masterclass
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={curCs.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 leading-tight text-white drop-shadow-sm">
                        {curCs.title || 'Migrated Legacy Tech Debt 6'}
                      </h3>
                      <p className="text-blue-100/90 text-sm sm:text-base max-w-xl mb-6 leading-relaxed font-light">
                        Deployed specialized architecture for <strong className="text-white font-semibold">{curCs.client || 'Corp Solutions Inc.'}</strong> successfully integrating {(curCs.tags || 'Cloud & Fullstack').replace(/,/g, ' & ')} solutions driving critical business metrics.
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <Link 
                    to="/portfolio" 
                    className="inline-flex items-center gap-2 bg-white text-indigo-950 font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-[0_4px_16px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_24px_rgba(255,255,255,0.3)] hover:bg-slate-100 w-fit"
                  >
                    Read the Study <ArrowRight size={17} />
                  </Link>
                </div>

                {/* Right Result Percentage Dial */}
                <div className="flex items-center justify-center shrink-0 mx-auto lg:mx-0">
                  <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border border-white/25 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center p-4 text-center shadow-[0_0_40px_rgba(139,92,246,0.25)] group-hover:bg-white/10 group-hover:scale-105 transition-all duration-700">
                    <div className="absolute inset-0 rounded-full border-t-2 border-purple-400/90 animate-[spin_5s_linear_infinite]"></div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={curCs.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center justify-center"
                      >
                        <span className="text-2xl md:text-4xl font-black text-white drop-shadow-md tracking-tighter text-center leading-none mb-1">
                          {curCs.result ? curCs.result.split(' ')[0] : 'Over'}
                        </span>
                        <span className="text-[9px] md:text-[10px] text-blue-200 font-bold uppercase tracking-[0.16em] leading-tight text-center">
                          {curCs.result ? curCs.result.split(' ').slice(1).join(' ') : '400% PERFORMANCE BOOST'}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 2. Latest Insight (Span 4) */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={fadeIn} 
              transition={{ delay: 0.2 }} 
              className="md:col-span-4 bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 md:p-10 relative group overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-sky-500/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 bg-slate-100 w-fit px-3 py-1.5 rounded-lg border border-slate-200">
                  <FileText size={14} className="text-emerald-500" />
                  Latest Insight
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 line-clamp-4 text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                  {curBlog.title || 'Advanced Architecture Principles 6'}
                </h3>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold text-slate-500 pt-4 border-t border-slate-100">
                <span>5 min read</span>
                <MoveRight size={18} className="group-hover:translate-x-1 transition-transform text-sky-600" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Projects Section (Slider on Desktop & Mobile) */}
      {recentProjects.length > 0 && (
        <section className="py-24 relative bg-slate-50/50 overflow-hidden">
          <div className="container relative z-10">
            {/* Section Header with Slider Navigation Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 text-pink-700 font-bold text-xs uppercase tracking-wider mb-4 border border-pink-200/60">
                  <Sparkles size={14} /> Latest Deployments
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-3 text-slate-900">Recent Projects</h2>
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl">
                  Explore our recent enterprise systems, web platforms, and mobile apps built with precision.
                </p>
              </div>

              {/* Slider Navigation Arrows (Deep Magenta Theme) */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollProjectsSlider('left')}
                  disabled={!canScrollLeft}
                  className="w-11 h-11 rounded-full border border-pink-500/40 bg-pink-50/70 text-pink-700 hover:bg-gradient-to-r hover:from-[#be185d] hover:to-[#9d174d] hover:text-white hover:border-transparent disabled:opacity-35 disabled:hover:bg-pink-50/70 disabled:hover:text-pink-700 flex items-center justify-center transition-all duration-300 shadow-sm transform active:scale-90"
                  aria-label="Previous Projects"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollProjectsSlider('right')}
                  disabled={!canScrollRight}
                  className="w-11 h-11 rounded-full text-white shadow-md transition-all duration-300 flex items-center justify-center transform active:scale-90 disabled:opacity-40"
                  style={{
                    background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
                    boxShadow: '0 4px 14px rgba(190, 24, 93, 0.35)'
                  }}
                  aria-label="Next Projects"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Slider Container (Desktop & Mobile Swipeable) */}
            <div 
              ref={projectsSliderRef}
              onScroll={updateSliderButtons}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-1 no-scrollbar"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {recentProjects.map((proj, idx) => {
                const isApp = proj.project_type === 'mobile_app' || 
                  proj.category?.toLowerCase().includes('app') || 
                  proj.category?.toLowerCase().includes('mobile');

                return (
                  <motion.div 
                    key={proj.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(idx * 0.08, 0.4) }}
                    className="w-[285px] xs:w-[310px] sm:w-[335px] md:w-[345px] shrink-0 snap-center sm:snap-start bg-white backdrop-blur-md rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.05)] border border-slate-200/90 hover:shadow-[0_20px_50px_rgba(190,24,93,0.22)] hover:border-pink-500/50 transition-all duration-300 group flex flex-col"
                  >
                    {/* Main Image with Full-screen Lightbox Click */}
                    <div 
                      className="h-52 w-full relative overflow-hidden bg-slate-950 cursor-pointer group/img"
                      onClick={() => setLightboxImage({ isOpen: true, url: proj.image_url, title: proj.title })}
                    >
                      {proj.image_url ? (
                        <img 
                          src={proj.image_url} 
                          alt={proj.title} 
                          className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-700" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-pink-600 via-rose-600 to-slate-900 flex items-center justify-center text-white/70 text-sm">
                          No Preview Available
                        </div>
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                        <span className="px-3 py-1 bg-slate-950/85 backdrop-blur-md rounded-xl text-[11px] font-bold text-white shadow-md border border-pink-500/30 flex items-center gap-1.5">
                          {isApp ? <Smartphone size={12} className="text-pink-400" /> : <Globe size={12} className="text-cyan-400" />}
                          {proj.category || 'Technology'}
                        </span>
                        
                        <span className="opacity-0 group-hover/img:opacity-100 transition-opacity px-2 py-0.5 bg-black/80 backdrop-blur-md text-white text-[10.5px] font-semibold rounded-lg shadow-md border border-white/10">
                          🔍 Fullscreen
                        </span>
                      </div>

                      {/* Hover Overlay Hint */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-3.5">
                        <span className="text-white text-[11px] font-medium">Click image for fullscreen preview</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-pink-600 transition-colors line-clamp-1">
                        {proj.title}
                      </h3>
                      
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-2 flex-1 font-normal">
                        {proj.summary}
                      </p>

                      {/* Card Action Buttons (EXACTLY 2 BUTTONS IN MAGENTA THEME) */}
                      <div className="pt-4 border-t border-slate-100 mt-auto flex items-center gap-2.5">
                        {/* 1. Enquiry Button (Solid Deep Magenta) */}
                        <button
                          onClick={() => setSelectedProjectForEnquiry(proj)}
                          className="flex-1 py-2.5 px-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all transform hover:scale-[1.02] active:scale-95"
                          style={{
                            background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
                            boxShadow: '0 4px 14px rgba(190, 24, 93, 0.35)'
                          }}
                        >
                          <MessageSquare size={13} /> Enquiry
                        </button>

                        {/* 2. View Project Button (Deep Magenta Themed Outlined/Glass) */}
                        <button
                          onClick={() => setSelectedProjectForDetails(proj)}
                          className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1 border border-pink-500/50 bg-pink-50/70 text-pink-700 hover:bg-gradient-to-r hover:from-[#be185d] hover:to-[#9d174d] hover:text-white hover:border-transparent shadow-sm"
                        >
                          <Eye size={13} /> View Project
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Project Details Modal (View Project Case Study) */}
          <ProjectDetailsModal
            isOpen={!!selectedProjectForDetails}
            onClose={() => setSelectedProjectForDetails(null)}
            project={selectedProjectForDetails}
            onOpenLightbox={(url, title) => setLightboxImage({ isOpen: true, url, title })}
            onOpenEnquiry={(proj) => {
              setSelectedProjectForDetails(null);
              setSelectedProjectForEnquiry(proj);
            }}
          />

          {/* Project Enquiry Modal (Deep Magenta Theme) */}
          <ProjectEnquiryModal
            isOpen={!!selectedProjectForEnquiry}
            onClose={() => setSelectedProjectForEnquiry(null)}
            project={selectedProjectForEnquiry}
          />

          {/* Full-Screen Image Lightbox Modal */}
          <ImageLightboxModal
            isOpen={lightboxImage.isOpen}
            onClose={() => setLightboxImage({ isOpen: false, url: '', title: '' })}
            imageUrl={lightboxImage.url}
            title={lightboxImage.title}
          />
        </section>
      )}

      {/* ── Client & Partner Logos Section (Only Renders When Database Has Logos) ── */}
      {clientLogos.length > 0 && (
        <section 
          className="pt-16 sm:pt-20 pb-14 sm:pb-16 mt-8 sm:mt-12 relative overflow-hidden border-y border-pink-500/15"
          style={{ backgroundColor: '#f8fafc' }}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-32 bg-pink-500/10 blur-[110px] pointer-events-none"></div>

          <div className="container relative z-10 text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 font-bold text-[11px] uppercase tracking-wider mb-2.5 border border-pink-200/60 shadow-sm">
              <Sparkles size={12} className="text-pink-600" /> Trusted Enterprise Partners & Clients
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Powering Innovative Brands Worldwide
            </h3>
          </div>

          {/* Continuous Infinite Sliding Ribbon */}
          <div className="logo-ribbon-container relative flex overflow-hidden py-3 mt-2 sm:mt-4 group">
            {/* Edge Fade Gradients for seamless infinity entry/exit */}
            <div className="absolute top-0 left-0 w-24 sm:w-48 h-full bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-24 sm:w-48 h-full bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none"></div>

            {/* Marquee Track (Smooth Infinite Glide) */}
            <div className="logo-ribbon-track flex items-center gap-6 sm:gap-8">
              {Array(Math.max(2, Math.ceil(12 / clientLogos.length)) * 2).fill(clientLogos).flat().map((logo, idx) => {
                const Tag = logo.website_url ? 'a' : 'div';
                return (
                  <Tag
                    key={`${logo.id || idx}-${idx}`}
                    {...(logo.website_url ? { href: logo.website_url, target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="shrink-0 flex items-center justify-center h-20 sm:h-24 md:h-28 w-auto min-w-[140px] sm:min-w-[170px] max-w-[240px] px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group/card cursor-pointer"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid rgba(190, 24, 93, 0.45)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#be185d';
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(190, 24, 93, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(190, 24, 93, 0.45)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
                    }}
                  >
                    {logo.logo_url && (
                      <img
                        src={logo.logo_url}
                        alt="Brand Partner Logo"
                        className="h-14 sm:h-18 md:h-20 w-auto max-w-[140px] sm:max-w-[180px] object-contain transition-transform duration-300 group-hover/card:scale-105 drop-shadow-sm"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                  </Tag>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="testimonials-section py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--bg-elevated)_0%,_transparent_70%)] opacity-50"></div>
        <div className="container text-center mb-16 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-secondary text-lg max-w-2xl mx-auto"
          >
            Trusted by visionary organizations to deliver robust technology solutions.
          </motion.p>
        </div>

        <div className="marquee-container relative flex overflow-hidden group py-4">
          {/* Fade masks for clean entry/exit */}
          <div className="absolute top-0 left-0 w-16 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="marquee-track">
            {/* Generate plenty of duplicates to fill edge-to-edge monitors before translating natively */}
            {Array(20).fill(testimonials).flat().map((t, idx) => (
              <div key={idx} className="testimonial-card glass-card">
                <div className="flex gap-1 text-yellow-400 mb-4 opacity-90">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-secondary text-[0.95rem] italic mb-6 leading-relaxed flex-grow">"{t.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-bold text-sm shrink-0 border border-slate-200 shadow-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-left flex-grow">
                    <h4 className="font-semibold text-[0.9rem] text-slate-900 leading-tight">{t.name}</h4>
                    <span className="text-[0.75rem] text-slate-500">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standalone Internships CTA */}
      <section className="internships-cta-section relative py-12 md:py-24">
        <div className="absolute inset-0 bg-blue-900/10 border-y border-white/5 py-12" style={{ backgroundColor: 'rgba(14, 165, 233, 0.03)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}></div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl overflow-hidden relative border border-sky-200/60 shadow-xl bg-gradient-to-br from-white/95 via-sky-50/30 to-white/90 p-6 md:p-10 lg:p-12"
          >
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-400/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-2xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 relative z-10">
              
              {/* LEFT COLUMN: CURRICULUM & VALUE HIGHLIGHTS */}
              <div className="w-full lg:flex-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                  <GraduationCap className="w-4 h-4 text-sky-600" />
                  <span>For Students & Aspiring Engineers</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-slate-900 leading-tight">
                  Premium <br />
                  <span className="text-gradient-accent">Internships & Training.</span>
                </h2>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
                  Bridge the gap between academic theory and real enterprise engineering. Join our exclusive mentor-led cohort to gain hands-on production experience with live client projects, SDLC, Git, and AI agent integrations.
                </p>

                {/* Rich Feature Checklist */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    'MERN Stack & Next.js 15',
                    'Real-World Production Capstones',
                    'Git, CI/CD & Agile SDLC',
                    '1-on-1 Mentorship by Senior Leads',
                    'AI Agents & Automation Workflows',
                    'Direct PPO & Placement Referrals'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                      <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link 
                    to="/internships" 
                    className="btn-primary inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Explore Programs</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    to="/schedule-meeting"
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-sky-50 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-300 shadow-xs transition-all"
                  >
                    <Calendar className="w-4 h-4 text-sky-600" />
                    <span>Free Student Counseling</span>
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: RICH CODE DASHBOARD & LIVE CAPSTONE PREVIEW */}
              <div className="w-full lg:flex-1 relative">
                
                {/* Floating Highlight Badge: Student Rating */}
                <div className="absolute -top-4 -right-2 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg text-xs font-bold text-slate-800">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <span>4.9/5 Rating</span>
                  <span className="text-[11px] font-medium text-slate-500">(500+ Mentored)</span>
                </div>

                {/* Modern Code Terminal Card */}
                <div className="rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100">
                  
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-950/70 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/90" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                      <span className="ml-2 text-xs font-mono text-slate-400">
                        Tafinity-Cohort-Engine.tsx
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Cohort Active</span>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="p-4 bg-slate-900/60 border-b border-slate-800/80 flex flex-wrap gap-1.5">
                    {['React 19', 'Node.js', 'Next.js', 'Python AI', 'PostgreSQL', 'Docker', 'Git CI/CD'].map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-slate-800 text-sky-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Terminal Code Snippet Preview */}
                  <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed overflow-x-auto bg-slate-950/40">
                    <div className="text-slate-500 mb-2">
                      {"// 8-Week Industry Capstone & Placement Track"}
                    </div>
                    <div className="text-pink-400">
                      export const <span className="text-yellow-300">TafinityCohort</span> = &#123;
                    </div>
                    <div className="pl-4 text-slate-300">
                      mentorship: <span className="text-emerald-300">"1-on-1 with Senior Tech Leads"</span>,
                    </div>
                    <div className="pl-4 text-slate-300">
                      capstone: <span className="text-emerald-300">"Live Production Fullstack App"</span>,
                    </div>
                    <div className="pl-4 text-slate-300">
                      workflows: [<span className="text-cyan-300">"Agile SDLC"</span>, <span className="text-cyan-300">"Peer Code Reviews"</span>, <span className="text-cyan-300">"CI/CD"</span>],
                    </div>
                    <div className="pl-4 text-slate-300">
                      outcome: <span className="text-amber-300">"Verified Certificate & Direct PPO"</span>
                    </div>
                    <div className="text-pink-400">&#125;;</div>
                  </div>

                  {/* Live Student Capstone Milestones */}
                  <div className="p-4 bg-slate-900/80 border-t border-slate-800 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Cohort Milestones
                    </div>
                    <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded bg-slate-800/50">
                      <span className="text-slate-300 font-medium">Week 1-2: Core Architecture & Git Workflows</span>
                      <span className="text-emerald-400 font-bold">Passed ✓</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded bg-slate-800/50">
                      <span className="text-slate-300 font-medium">Week 3-6: Live Feature Sprint & AI Integration</span>
                      <span className="text-sky-400 font-bold">In Review ⚡</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded bg-slate-800/50">
                      <span className="text-slate-300 font-medium">Week 7-8: Production Launch & PPO Referrals</span>
                      <span className="text-amber-400 font-bold">Upcoming 🎯</span>
                    </div>
                  </div>
                </div>

                {/* Floating Bottom Badge: Direct PPO */}
                <div className="absolute -bottom-4 -left-2 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg text-xs font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Briefcase className="w-3 h-3" />
                  </div>
                  <span>Direct PPO & Internship Opportunities</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .hero {
          position: relative;
          padding-top: 6.85rem;
          padding-bottom: 4rem;
          overflow: hidden;
        }
        .hero-glow {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%; max-width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 60%);
          z-index: -1;
          filter: blur(60px);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 2.5rem;
          align-items: center;
          width: 100%;
        }
        .hero-content {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          position: relative;
          z-index: 5;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.35rem 0.95rem;
          border-radius: 9999px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          margin-bottom: 1.5rem;
          background: #090e1a;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
        }
        .hero-badge .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 10px #22c55e, 0 0 4px #22c55e;
          animation: pulseGreen 1.8s infinite;
        }
        @keyframes pulseGreen {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.85); }
        }
        .hero-title {
          font-size: clamp(2.8rem, 4.4vw, 4.6rem);
          font-weight: 850;
          color: #071a3d;
          margin-bottom: 1.75rem;
          line-height: 1.08;
          letter-spacing: -0.025em;
          font-family: var(--font-display, 'Outfit', 'Poppins', sans-serif);
        }
        .text-gradient-accent {
          background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        .hero-subtitle-wrapper {
          border-left: 3.5px solid #0284c7;
          padding-left: 1.25rem;
          margin-bottom: 2.25rem;
          max-width: 540px;
        }
        .hero-subtitle {
          font-size: clamp(1rem, 1.35vw, 1.15rem);
          color: #475569;
          line-height: 1.65;
          font-weight: 400;
          margin: 0;
        }
        .hero-actions {
          display: flex;
          gap: 1.1rem;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 1rem;
        }
        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.85rem 1.85rem;
          border-radius: 9999px;
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          box-shadow: 0 10px 25px rgba(2, 132, 199, 0.35);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
        }
        .btn-hero-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(2, 132, 199, 0.45);
          background: linear-gradient(135deg, #0369a1 0%, #0284c7 100%);
          color: #ffffff;
        }
        .btn-hero-primary:active {
          transform: translateY(0);
        }
        .btn-hero-primary .btn-arrow-icon {
          transition: transform 0.3s ease;
        }
        .btn-hero-primary:hover .btn-arrow-icon {
          transform: translateX(4px);
        }
        .btn-hero-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.85rem;
          border-radius: 9999px;
          font-size: 0.95rem;
          font-weight: 600;
          color: #0f172a;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .btn-hero-secondary:hover {
          border-color: #0284c7;
          color: #0284c7;
          background: #f0f9ff;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(2, 132, 199, 0.12);
        }
        .btn-hero-secondary:active {
          transform: translateY(0);
        }
        .hero-visual {
          position: relative;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .visual-circle-accent {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, var(--accent-light), var(--accent-hover));
          box-shadow: 
            0 10px 25px var(--accent-glow),
            inset -10px -10px 20px rgba(0,0,100,0.1),
            inset 10px 10px 20px rgba(255,255,255,0.8);
          top: 65%;
          left: 42%;
          z-index: 4;
        }
        .decorative-card {
          position: absolute;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          z-index: 2;
        }
        .small-code-tag {
          top: 10%;
          left: 30%;
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          border-radius: 20px;
        }
        .small-code-tag code { display: flex; align-items: center; }
        .system-card {
          top: 40%;
          left: 15%;
          padding: 1.5rem;
          width: 250px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          animation: float-system 6s ease-in-out infinite;
          z-index: 2;
        }
        .system-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .system-icon {
          width: 36px;
          height: 36px;
          background: var(--bg-secondary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-color);
        }
        .system-text h4 { font-size: 0.9rem; margin: 0; padding: 0; }
        .status-go { font-size: 0.75rem; color: var(--accent-hover); display: flex; align-items: center; gap: 0.3rem;}
        .status-go .dot { width: 6px; height: 6px; background: var(--accent-hover); border-radius: 50%; }
        .system-progress-bar {
          width: 100%;
          height: 4px;
          background: var(--border-light);
          border-radius: 2px;
          margin-bottom: 0.5rem;
        }
        .system-progress-fill {
          width: 85%;
          height: 100%;
          background: var(--accent-light);
          border-radius: 2px;
        }
        .system-progress-text {
          font-size: 0.7rem;
          color: var(--text-secondary);
          display: flex;
          justify-content: space-between;
        }
        .perf-card {
          top: 15%;
          left: 50%;
          padding: 2rem;
          text-align: center;
          animation: float-perf 7s ease-in-out infinite;
          z-index: 3;
        }
        .perf-icon-wrapper {
          width: 48px;
          height: 48px;
          background: var(--accent-color);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        .perf-card h3 { font-size: 2rem; margin-bottom: 0.2rem; }
        .perf-card p { font-size: 0.7rem; letter-spacing: 1px; color: var(--text-secondary); }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.2); }
          70% { box-shadow: 0 0 0 10px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
        @keyframes float-system {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes float-perf {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .hero-grid-pattern {
          position: absolute;
          inset: -100px;
          background-image: 
            linear-gradient(var(--border-light) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-light) 1px, transparent 1px);
          background-size: 20px 20px;
          mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%);
          -webkit-mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%);
          z-index: 0;
          opacity: 0.6;
        }
        
        .hero-audience-banner {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 0.5rem 0; /* Reduced padding to make it a thin ribbon */
          border-top: 1px solid rgba(255,255,255,0.05);
          width: 100%;
          font-size: 0.6rem;
          letter-spacing: 2px;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .hero-audience-banner span {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .audience-dot {
          width: 6px;
          height: 6px;
          background-color: var(--accent-light);
          opacity: 0.8;
        }
        .mission-section {
          padding: 2rem 0;
          background: linear-gradient(110deg, var(--bg-primary) 45%, #0284c7 100%);
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
          position: relative;
          overflow: hidden;
        }
        .mission-section::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -10%;
          width: 100%; max-width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          pointer-events: none;
        }
        .mission-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
          gap: 4rem;
          align-items: center;
        }
        .mission-content h2 {
          font-size: clamp(2rem, 3.5vw, 3rem);
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }
        .mission-content p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .mission-content p:last-child {
          margin-bottom: 0;
        }
        .stats-container {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-auto-rows: minmax(100px, auto);
          gap: 1rem;
        }
        .stat-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(12px);
          padding: 1.25rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
        }
        .stat-card:hover {
          transform: translateY(-5px) scale(1.02);
          background: rgba(2, 132, 199, 0.1);
          border-color: rgba(56, 189, 248, 0.5);
          box-shadow: 0 10px 40px rgba(2, 132, 199, 0.15);
        }
        
        /* Bento box layout configurations */
        .stat-card:nth-child(1) { grid-column: span 3; grid-row: span 1; }
        .stat-card:nth-child(2) { grid-column: span 3; grid-row: span 2; }
        .stat-card:nth-child(3) { grid-column: span 3; grid-row: span 2; }
        .stat-card:nth-child(4) { grid-column: span 3; grid-row: span 1; }
        .stat-card:nth-child(5) { grid-column: span 6; display: flex; flex-direction: row; align-items: center; justify-content: flex-start; gap: 2rem; padding: 1.5rem 2rem; background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(2, 132, 199, 0.1)); }
        
        .stat-card:nth-child(5) .stat-icon { margin-bottom: 0; }
        .stat-card:nth-child(5) h3 { margin-bottom: 0; font-size: 2.2rem; }
        .stat-card:nth-child(5) p { margin-top: 4px; }

        .stat-icon {
          color: var(--accent-hover);
          margin-bottom: 0.8rem;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.5);
          border-radius: 10px;
          padding: 6px;
        }
        .stat-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1;
          margin-bottom: 0.2rem;
          font-family: var(--font-display);
        }
        .stat-card p {
          font-size: 0.70rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 700;
          color: var(--accent-color);
        }
        @media (max-width: 600px) {
          .stats-container { 
            grid-auto-rows: minmax(70px, auto); 
            gap: 0.5rem; 
          }
          .stat-card {
            padding: 0.75rem;
            border-radius: 14px;
          }
          .stat-icon {
            width: 24px; height: 24px;
            padding: 4px;
            margin-bottom: 0.5rem;
          }
          .stat-card h3 {
            font-size: 1.1rem;
          }
          .stat-card p {
            font-size: 0.6rem;
            letter-spacing: 0.5px;
          }
          .stat-card:nth-child(5) { 
            flex-direction: column; 
            text-align: center; 
            justify-content: center; 
            align-items: center; 
            gap: 0.5rem; 
            padding: 1rem;
          }
          .stat-card:nth-child(5) h3 { 
            font-size: 1.5rem; 
          }
        }

        @media (max-width: 991px) {
          .hero {
            padding-top: 5.85rem;
            padding-bottom: 3.5rem;
          }
          .hero-grid {
            display: flex;
            flex-direction: column;
            margin-top: 0;
            margin-bottom: 2rem;
            gap: 1.25rem;
          }
          .hero-tech-right {
            order: 1;
            width: 100%;
          }
          .hero-content {
            align-items: flex-start;
            text-align: left;
            order: 2;
            width: 100%;
          }
          .hero-badge {
            margin-bottom: 0.85rem;
          }
          .hero-title {
            font-size: clamp(2.3rem, 7.5vw, 3.2rem);
            margin-bottom: 1.15rem;
          }
          .hero-subtitle-wrapper {
            border-left: 3.5px solid #0284c7;
            padding-left: 1rem;
            margin-bottom: 1.5rem;
            max-width: 100%;
          }
          .hero-subtitle {
            font-size: 0.98rem;
          }
          .hero-actions {
            justify-content: flex-start;
            gap: 0.75rem;
          }
          .btn-hero-primary, .btn-hero-secondary {
            padding: 0.75rem 1.45rem;
            font-size: 0.9rem;
          }
          .hidden-mobile {
            display: none !important;
          }
          .mission-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
        }
        @media (max-width: 768px) {
          .hero {
            padding-top: 5.5rem;
          }
          .hero-grid {
            margin-top: 0;
            gap: 1.1rem;
          }
          .hero-badge {
            margin-bottom: 0.75rem;
          }
          .hero-audience-banner {
            flex-wrap: nowrap;
            gap: 0.5rem;
            justify-content: space-between;
            overflow: visible;
            margin-left: -1.5rem;
            margin-right: -1.5rem;
            width: calc(100% + 3rem);
            padding: 0 0.5rem;
            transform: none;
            left: auto;
          }
          .hero-audience-banner span {
            font-size: 0.45rem;
            white-space: nowrap;
          }
        }
        @media (max-width: 576px) {
          .hero-audience-banner span {
            font-size: 0.4rem;
          }
          .hero-audience-banner {
            gap: 0.2rem;
            padding: 0 0.2rem;
          }
        }
        .services-section {
          padding: 4.5rem 0;
          position: relative;
        }
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .section-header h2 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .section-header p {
          color: var(--text-secondary);
          font-size: 1.2rem;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .service-card {
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          transition: transform var(--transition-smooth), border-color var(--transition-fast);
        }
        .service-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255, 255, 255, 0.1);
        }
        
        /* Testimonials Marquee CSS */
        .marquee-container {
          width: 100%;
        }
        .marquee-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: slide-left 90s linear infinite;
        }
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
        .testimonial-card {
          width: 100%; max-width: 350px;
          padding: 2rem;
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.06);
          border-color: var(--accent-color);
        }
        @keyframes slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        .icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: var(--accent-light);
        }
        .service-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .service-card p {
          color: var(--text-secondary);
        }
        
        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }
          .section-header p {
            font-size: 0.95rem;
          }
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem;
          }
          .service-card {
            padding: 1.25rem;
          }
          .icon-wrapper {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            margin-bottom: 1rem;
          }
          .icon-wrapper svg {
            width: 24px;
            height: 24px;
          }
          .service-card h3 {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
          }
          .service-card p {
            font-size: 0.8rem;
            line-height: 1.4;
          }
          .service-link {
            font-size: 0.8rem !important;
            margin-top: 0.5rem !important;
          }
        }
        .card-hover-effect {
          position: absolute;
          inset: 0;
          background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), var(--accent-glow), transparent 40%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .service-card:hover .card-hover-effect {
          opacity: 1;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div >
  );
};

export default Home;






