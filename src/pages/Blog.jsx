import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Blog = () => {
    const posts = [
        { id: 1, title: 'The Future of Headless E-Commerce Architecture', category: 'Engineering', readTime: '5 min read', img: 'linear-gradient(135deg, #0ea5e9, #3b82f6)' },
        { id: 2, title: 'Building Autonomous AI Agents with N8N', category: 'Automation', readTime: '8 min read', img: 'linear-gradient(135deg, #10b981, #059669)' },
        { id: 3, title: 'Why You Should Migrate from Legacy ERPs', category: 'Enterprise', readTime: '6 min read', img: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' },
        { id: 4, title: 'Optimizing React Rendering for Complex Dashboards', category: 'Frontend', readTime: '4 min read', img: 'linear-gradient(135deg, #f59e0b, #d97706)' },
        { id: 5, title: 'Securing API Endpoints in 2026', category: 'Security', readTime: '7 min read', img: 'linear-gradient(135deg, #14b8a6, #0f766e)' },
        { id: 6, title: 'Designing Conversational Interfaces for Gen-AI', category: 'Design', readTime: '5 min read', img: 'linear-gradient(135deg, #ec4899, #be185d)' },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-wrapper">
            <div className="container" style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>TafinityAI <span className="text-gradient-accent">Insights.</span></h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Thoughts, tutorials, and architectural breakdowns from our engineering team.
                    </p>
                </div>

                {/* Categories */}
                <div className="blog-filters">
                    <button className="filter-pill active">All Posts</button>
                    <button className="filter-pill">Engineering</button>
                    <button className="filter-pill">Automation</button>
                    <button className="filter-pill">Design</button>
                    <button className="filter-pill">Enterprise</button>
                </div>

                {/* Featured Post (First one usually gets bigger real estate) */}
                <div className="featured-post glass-card">
                    <div className="featured-img" style={{ background: posts[0].img }}></div>
                    <div className="featured-content">
                        <span className="category">{posts[0].category}</span>
                        <h2>{posts[0].title}</h2>
                        <p>An in-depth look at transitioning monolithic digital stores into ultra-fast, decoupled headless storefronts that drive higher conversions and unmatched scalability.</p>
                        <div className="post-meta">
                            <span className="date">August 28, 2026</span>
                            <span className="dot">•</span>
                            <span className="read-time">{posts[0].readTime}</span>
                        </div>
                    </div>
                </div>

                {/* Masonry / Grid */}
                <div className="blog-grid">
                    {posts.slice(1).map(post => (
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={post.id} className="blog-card glass-card">
                            <div className="blog-img" style={{ background: post.img }}></div>
                            <div className="blog-content">
                                <span className="category">{post.category}</span>
                                <h3>{post.title}</h3>
                                <div className="post-meta">
                                    <span className="read-time">{post.readTime}</span>
                                    <ArrowUpRight size={16} className="read-icon" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
        .blog-filters {
           display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-bottom: 4rem;
        }
        .filter-pill {
           background: transparent; color: var(--text-secondary); border: 1px solid var(--border-color);
           padding: 8px 20px; border-radius: 100px; font-weight: 500; cursor: pointer; transition: all 0.2s;
        }
        .filter-pill:hover, .filter-pill.active {
           background: var(--text-primary); color: #fff; border-color: var(--text-primary);
        }

        .featured-post {
           display: grid; grid-template-columns: 1fr; gap: 2rem; padding: 1.5rem; border-radius: 24px; margin-bottom: 3rem; cursor: pointer; transition: transform 0.2s;
        }
        .featured-post:hover { transform: translateY(-5px); }
        .featured-img { min-height: 250px; border-radius: 16px; }
        .featured-content { display: flex; flex-direction: column; justify-content: center; padding: 1rem; }
        .featured-content h2 { font-size: 2rem; margin: 1rem 0; color: var(--text-primary); }
        .featured-content p { color: var(--text-secondary); font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; }
        .category { color: var(--primary-color); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; }
        .post-meta { display: flex; alignItems: center; gap: 12px; color: var(--text-secondary); font-size: 0.9rem; font-weight: 500; }
        .dot { opacity: 0.5; }

        .blog-grid {
           display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: 2rem;
        }
        .blog-card {
           padding: 1rem; border-radius: 20px; display: flex; flex-direction: column; gap: 1.5rem; cursor: pointer; transition: transform 0.2s;
        }
        .blog-card:hover { transform: translateY(-5px); }
        .blog-card:hover .read-icon { color: var(--primary-color); transform: translate(2px, -2px); }
        .blog-img { height: 200px; border-radius: 12px; }
        .blog-content { padding: 0 0.5rem 0.5rem; flex: 1; display: flex; flex-direction: column; }
        .blog-content h3 { font-size: 1.3rem; line-height: 1.4; color: var(--text-primary); margin: 0.73.5rem 0 1.5rem; flex: 1; }
        .blog-content .post-meta { justify-content: space-between; border-top: 1px solid var(--border-color); padding-top: 1rem; }
        .read-icon { transition: all 0.2s; }

        @media (min-width: 992px) {
           .featured-post { grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); }
           .featured-img { min-height: 350px; }
        }
      `}</style>
        </motion.div>
    );
};

export default Blog;
