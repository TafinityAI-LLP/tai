import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, BookOpen, Clock, Calendar, Search, Tag, User, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO.jsx';

const DEFAULT_POSTS = [
    {
        id: 'blog-1',
        title: 'Architecting Event-Driven Workflows with n8n & Distributed Message Queues',
        category: 'Automation & AI',
        snippet: 'A deep architectural dive into how we build fault-tolerant, high-throughput automation pipelines using self-hosted n8n workers, Redis pub/sub, and dead-letter queues.',
        author: 'Lead Architect',
        publishedAt: '2026-10-18',
        readTime: '6 min read',
        gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
        featured: true,
        tags: ['n8n', 'Microservices', 'Redis']
    },
    {
        id: 'blog-2',
        title: 'Decoupling Monoliths: Pragmatic Migration to React & High-Speed APIs',
        category: 'Engineering',
        snippet: 'Strategies for incrementally strangling monolithic legacy web applications without downtime, utilizing reverse proxies and incremental component adoption.',
        author: 'Senior Systems Engineer',
        publishedAt: '2026-10-12',
        readTime: '8 min read',
        gradient: 'from-emerald-600 via-teal-600 to-sky-500',
        featured: false,
        tags: ['React', 'System Design', 'APIs']
    },
    {
        id: 'blog-3',
        title: 'Autonomous AI Agents vs Traditional RPA: The Practical Business Evaluation',
        category: 'Automation & AI',
        snippet: 'When should your business deploy non-deterministic LLM agents versus deterministic code rules? An analytical framework based on error tolerance and cost.',
        author: 'AI Research Team',
        publishedAt: '2026-10-05',
        readTime: '5 min read',
        gradient: 'from-purple-600 via-pink-600 to-rose-500',
        featured: false,
        tags: ['AI Agents', 'LLM', 'Enterprise']
    },
    {
        id: 'blog-4',
        title: 'PostgreSQL Indexing & Latency Tuning for Multi-Tenant Enterprise SaaS',
        category: 'Cloud & DevOps',
        snippet: 'How composite indexes, partial indexes, and partitioning schemas can reduce analytical database query latency from seconds down to sub-15ms.',
        author: 'Database Architect',
        publishedAt: '2026-09-28',
        readTime: '7 min read',
        gradient: 'from-amber-600 via-orange-600 to-yellow-500',
        featured: false,
        tags: ['PostgreSQL', 'Performance', 'SQL']
    },
    {
        id: 'blog-5',
        title: 'Implementing Zero-Trust Authentication in Modern Microservice Clouds',
        category: 'Enterprise Tech',
        snippet: 'Building airtight API gateways, ephemeral JWT issuance, and automated mTLS service mesh verification for security-sensitive fintech architectures.',
        author: 'DevSecOps Specialist',
        publishedAt: '2026-09-20',
        readTime: '6 min read',
        gradient: 'from-cyan-600 via-blue-600 to-indigo-500',
        featured: false,
        tags: ['Security', 'Zero Trust', 'Docker']
    },
    {
        id: 'blog-6',
        title: 'Building Offline-First Mobile Applications with Instant Cloud Synchronization',
        category: 'Engineering',
        snippet: 'Techniques for conflict-free replicated data types (CRDTs) and local SQLite caching in mobile applications that must operate reliably in zero-network environments.',
        author: 'Mobile Team Lead',
        publishedAt: '2026-09-15',
        readTime: '5 min read',
        gradient: 'from-rose-600 via-pink-600 to-purple-500',
        featured: false,
        tags: ['Flutter', 'React Native', 'Offline First']
    }
];

const Blog = () => {
    const [posts, setPosts] = useState(DEFAULT_POSTS);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [emailSubscribed, setEmailSubscribed] = useState(false);
    const [subscriberEmail, setSubscriberEmail] = useState('');

    useEffect(() => {
        fetch('/api/blogs')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setPosts(data);
                }
            })
            .catch(() => {
                // Keep default high-grade posts
            });
    }, []);

    const categories = ['All', 'Engineering', 'Automation & AI', 'Cloud & DevOps', 'Enterprise Tech'];

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || 
            (post.category || '').toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesSearch = !searchQuery || 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.snippet || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
    const gridPosts = featuredPost 
        ? filteredPosts.filter(p => (p.id || p.title) !== (featuredPost.id || featuredPost.title))
        : filteredPosts;

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (subscriberEmail.trim()) {
            setEmailSubscribed(true);
            setSubscriberEmail('');
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-slate-50/50 pb-20">
            <SEO />

            {/* HERO SECTION */}
            <section className="relative pt-24 sm:pt-32 md:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-transparent">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[300px] bg-gradient-to-r from-blue-300/20 via-sky-400/15 to-indigo-300/20 blur-3xl rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 sm:mb-5 shadow-xs"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Engineering Insights &amp; Architectural Breakdowns</span>
                    </motion.div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
                        TafinityAI <span className="text-gradient-accent">Insights.</span>
                    </h1>

                    <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Practical breakdowns, workflow automation tutorials, and modern system design principles straight from our engineering team.
                    </p>

                    {/* SEARCH & FILTERS BAR */}
                    <div className="mt-8 max-w-xl mx-auto">
                        <div className="relative mb-6">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search tutorials, architectures, keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs transition"
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                                        selectedCategory === cat
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-600'
                                            : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT CONTAINER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">

                {/* FEATURED POST (Top Highlight) */}
                {featuredPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 sm:mb-14 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                            {/* Visual Side */}
                            <div
                                className={`lg:col-span-5 h-56 sm:h-72 lg:h-auto bg-gradient-to-br ${
                                    featuredPost.gradient || 'from-blue-600 to-indigo-600'
                                } p-6 sm:p-8 flex flex-col justify-between text-white relative`}
                                style={featuredPost.imageUrl ? { background: `url(${featuredPost.imageUrl}) center/cover` } : {}}
                            >
                                <div className="flex items-center justify-between gap-2 z-10">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
                                        Featured Read
                                    </span>
                                    <span className="text-xs text-white/80 font-medium">
                                        {featuredPost.readTime || '5 min read'}
                                    </span>
                                </div>

                                <div className="z-10 mt-auto">
                                    <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white mb-2 shadow-xs group-hover:scale-110 transition-transform">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                                        {featuredPost.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-3">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-blue-600" />
                                            <span>
                                                {new Date(featuredPost.publishedAt || Date.now()).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <span>&bull;</span>
                                        <div className="flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5 text-blue-600" />
                                            <span>{featuredPost.author || 'Tafinity Team'}</span>
                                        </div>
                                    </div>

                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-6">
                                        {featuredPost.snippet}
                                    </p>

                                    {featuredPost.tags && (
                                        <div className="flex flex-wrap items-center gap-1.5 mb-6">
                                            {featuredPost.tags.map((t, idx) => (
                                                <span key={idx} className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                                                    #{t}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-xs sm:text-sm font-bold text-blue-600 inline-flex items-center gap-1.5 group-hover:underline">
                                        Read Full Article <ArrowUpRight className="w-4 h-4" />
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        Technical Deep-Dive
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* BLOG GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                    {gridPosts.map((post, idx) => {
                        const gradient = post.gradient || 'from-blue-600 to-indigo-600';
                        return (
                            <motion.div
                                key={post.id || idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Visual Banner */}
                                    <div
                                        className={`h-44 sm:h-48 w-full bg-gradient-to-br ${gradient} p-4 sm:p-5 flex flex-col justify-between text-white relative`}
                                        style={post.imageUrl ? { background: `url(${post.imageUrl}) center/cover` } : {}}
                                    >
                                        <div className="flex items-center justify-between gap-2 z-10">
                                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/25 backdrop-blur-md text-white border border-white/20">
                                                {post.category || 'Article'}
                                            </span>
                                            <span className="text-[11px] font-semibold text-white/80">
                                                {post.readTime || '5 min read'}
                                            </span>
                                        </div>

                                        <div className="z-10 mt-auto">
                                            <div className="w-9 h-9 rounded-lg bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white mb-1 shadow-xs group-hover:scale-110 transition-transform">
                                                <BookOpen className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Info */}
                                    <div className="p-4 sm:p-5">
                                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mb-2">
                                            <Calendar className="w-3 h-3 text-blue-500" />
                                            <span>
                                                {new Date(post.publishedAt || Date.now()).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>

                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2 line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                                            {post.snippet || 'Explore technical best practices and architectural patterns engineered by TafinityAI.'}
                                        </p>

                                        {post.tags && (
                                            <div className="flex flex-wrap items-center gap-1 mb-2">
                                                {post.tags.slice(0, 3).map((t, tIdx) => (
                                                    <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                                                        #{t}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 sm:p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 group-hover:underline">
                                        Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                                    </span>
                                    <span className="text-[11px] text-slate-400">
                                        Engineering
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                        <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                        <h3 className="text-base font-bold text-slate-800">No matching articles found</h3>
                        <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting "All".</p>
                        <button
                            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                            className="mt-4 px-4 py-2 rounded-full text-xs font-bold bg-blue-600 text-white"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* NEWSLETTER SUBSCRIPTION CARD */}
                <div className="mt-14 sm:mt-18 p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden text-center">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-200 mb-3">
                            <Sparkles className="w-3 h-3" />
                            <span>Weekly Engineering Newsletter</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                            Stay on top of Enterprise AI &amp; Cloud Workflows
                        </h3>
                        <p className="text-white/70 text-xs sm:text-sm mb-6">
                            Receive bi-weekly architectural summaries, automation blueprints, and open-source recipes. No marketing fluff.
                        </p>

                        {emailSubscribed ? (
                            <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-semibold inline-block">
                                ✓ Thank you for subscribing! We'll keep you posted with high-signal engineering updates.
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your work email address"
                                    value={subscriberEmail}
                                    onChange={(e) => setSubscriberEmail(e.target.value)}
                                    className="w-full sm:flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs sm:text-sm transition shadow-md cursor-pointer shrink-0"
                                >
                                    Subscribe Free
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default Blog;
