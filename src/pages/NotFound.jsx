import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, ShieldAlert } from 'lucide-react';
import SEO from '../components/SEO.jsx';

const NotFound = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[80vh] flex items-center justify-center px-4 py-16 sm:py-24 relative overflow-hidden"
        >
            <SEO title="404 - Page Not Found | TafinityAI" />

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gradient-to-r from-sky-400/15 via-blue-500/10 to-indigo-400/15 blur-3xl rounded-full pointer-events-none" />

            <div className="max-w-md w-full text-center relative z-10">
                
                {/* 404 Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-600 text-xs font-bold uppercase tracking-wider mb-6">
                    <ShieldAlert size={14} />
                    <span>404 &bull; Error Not Found</span>
                </div>

                {/* Big Gradient 404 Number */}
                <h1 className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 tracking-tight leading-none mb-4 select-none">
                    404
                </h1>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    Page Not Found
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-8 max-w-sm mx-auto">
                    The requested URL is unavailable, does not exist, or has been relocated.
                </p>

                {/* Action Navigation */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        to="/"
                        className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
                    >
                        <Home size={16} />
                        <span>Back to Home</span>
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                        <span>Previous Page</span>
                    </button>
                </div>

                <div className="mt-12 pt-6 border-t border-slate-100">
                    <p className="text-[11px] text-slate-400">
                        &copy; 2026 TafinityAI LLP. All rights reserved.
                    </p>
                </div>

            </div>
        </motion.div>
    );
};

export default NotFound;
