import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Sparkles, Smartphone, Globe, Layers, Database, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';

export default function ProjectDetailsModal({ 
    isOpen, 
    onClose, 
    project, 
    onOpenLightbox, 
    onOpenEnquiry 
}) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !project) return null;

    // Detect if this is a mobile app project
    const isMobileApp = 
        project.project_type === 'mobile_app' ||
        project.category?.toLowerCase().includes('app') ||
        project.category?.toLowerCase().includes('mobile');

    // Parse sections if stored as JSON string
    const sections = Array.isArray(project.sections) 
        ? project.sections 
        : (typeof project.sections === 'string' ? (() => {
            try { return JSON.parse(project.sections); } catch(_) { return []; }
        })() : []);

    const getTypeIcon = () => {
        if (isMobileApp) return <Smartphone size={14} className="text-pink-400" />;
        if (project.category?.toLowerCase().includes('erp')) return <Database size={14} className="text-cyan-400" />;
        if (project.category?.toLowerCase().includes('crm')) return <Layers size={14} className="text-purple-400" />;
        return <Globe size={14} className="text-blue-400" />;
    };

    const modalContent = (
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2.5 xs:p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div 
                role="dialog"
                aria-modal="true"
                className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] sm:max-h-[90vh] flex flex-col overflow-hidden border border-slate-200/80 dark:border-slate-800 my-auto animate-in zoom-in-95 duration-200 preserve-typography"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ── TOP HEADER BAR ── */}
                <div className="px-4 sm:px-6 py-3.5 sm:py-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 border border-pink-200/60 dark:border-pink-900/50 shrink-0">
                            {getTypeIcon()}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300">
                                    {project.category || 'Technology'}
                                </span>
                                {project.status === 'Active' && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        Live
                                    </span>
                                )}
                            </div>
                            <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                                {project.title}
                            </h2>
                        </div>
                    </div>

                    {/* Header Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        {project.website_url && (
                            <a
                                href={project.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-pink-500/50 hover:text-pink-600 transition-all shadow-sm"
                            >
                                Live Demo <ExternalLink size={13} />
                            </a>
                        )}
                        <button
                            onClick={() => onOpenEnquiry(project)}
                            className="hidden xs:inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all transform hover:scale-[1.02] active:scale-95"
                            style={{
                                background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
                                boxShadow: '0 4px 14px rgba(190, 24, 93, 0.35)'
                            }}
                        >
                            <MessageSquare size={13} /> Enquire
                        </button>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
                        >
                            <X size={17} />
                        </button>
                    </div>
                </div>

                {/* ── SCROLLABLE BODY ── */}
                <div className="overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8 flex-1">
                    
                    {/* Project Overview */}
                    <div className="space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                            Project Overview
                        </div>
                        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                            {project.summary}
                        </p>
                    </div>

                    {/* ── MAIN SHOWCASE (FRAME PRESENTATION) ── */}
                    <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Main Presentation {isMobileApp && '(Mobile App View)'}
                            </span>
                            <span className="text-[11px] text-pink-600 dark:text-pink-400 font-medium flex items-center gap-1">
                                <span>🔍</span> Click image for Fullscreen Preview
                            </span>
                        </div>

                        {isMobileApp ? (
                            /* ── ULTRA-PREMIUM SMARTPHONE FRAME MOCKUP (REFINED SLEEK THICKNESS) ── */
                            <div className="py-5 flex justify-center bg-gradient-to-b from-pink-950/20 via-slate-900/40 to-slate-950/60 rounded-3xl border border-pink-500/20 relative overflow-hidden">
                                {/* Ambient Deep Magenta Backlight Glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/20 via-rose-600/10 to-transparent blur-3xl pointer-events-none"></div>

                                <div className="relative mx-auto w-[245px] xs:w-[268px] sm:w-[295px] rounded-[36px] sm:rounded-[40px] p-2 shadow-[0_22px_50px_-12px_rgba(190,24,93,0.5),_0_0_0_1px_rgba(244,114,182,0.35)] border-[5px] sm:border-[6px] border-[#831843] bg-gradient-to-b from-[#831843] via-[#700a35] to-[#500724]">
                                    {/* Metallic Deep Magenta Edge Volume/Power Buttons */}
                                    <div className="absolute -left-[7px] top-20 w-[2.5px] h-7 bg-[#be185d] rounded-l-sm shadow-sm"></div>
                                    <div className="absolute -left-[7px] top-30 w-[2.5px] h-7 bg-[#be185d] rounded-l-sm shadow-sm"></div>
                                    <div className="absolute -right-[7px] top-24 w-[2.5px] h-10 bg-[#be185d] rounded-r-sm shadow-sm"></div>

                                    {/* Smartphone Notch / Dynamic Island with Magenta Rim */}
                                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 sm:w-22 h-4 sm:h-4.5 bg-black/95 rounded-full z-20 flex items-center justify-center gap-1.5 ring-1 ring-pink-500/30 shadow-inner">
                                        <div className="w-2 h-2 rounded-full bg-slate-900 border border-pink-950"></div>
                                        <div className="w-1.2 h-1.2 rounded-full bg-pink-900/80"></div>
                                    </div>

                                    {/* Inner Screen */}
                                    <div 
                                        className="relative aspect-[9/19] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-slate-950 cursor-pointer group shadow-inner ring-1 ring-black/80"
                                        onClick={() => onOpenLightbox(project.image_url, project.title)}
                                    >
                                        {project.image_url ? (
                                            <img
                                                src={project.image_url}
                                                alt={project.title}
                                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                                                No Mockup Uploaded
                                            </div>
                                        )}
                                        {/* Hover Overlay Hint */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-pink-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg border border-pink-300/40">
                                                Click to Fullscreen 🔍
                                            </span>
                                        </div>
                                    </div>

                                    {/* Home Indicator Bar */}
                                    <div className="w-22 h-1 bg-pink-300/70 rounded-full mx-auto mt-2 mb-0.5 shadow-sm"></div>
                                </div>
                            </div>
                        ) : (
                            /* ── ULTRA-PREMIUM BROWSER MOCKUP FRAME (DEEP MAGENTA) ── */
                            <div className="rounded-2xl overflow-hidden border border-pink-500/30 shadow-[0_20px_50px_-10px_rgba(190,24,93,0.35)] bg-slate-950 group relative">
                                {/* Ambient Top Magenta Glow */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-pink-600/20 blur-3xl pointer-events-none"></div>

                                {/* Deep Magenta Browser Chrome Bar */}
                                <div 
                                    className="px-4 py-2.5 flex items-center justify-between border-b border-pink-500/30"
                                    style={{
                                        background: 'linear-gradient(135deg, #831843 0%, #500724 100%)'
                                    }}
                                >
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-rose-400 shadow-sm"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm"></div>
                                    </div>
                                    <div className="px-4 py-1 rounded-md bg-black/50 text-[11px] text-pink-200 font-mono truncate max-w-[280px] border border-pink-400/20 shadow-inner">
                                        {project.website_url || 'https://tafinityai.com/showcase'}
                                    </div>
                                    <div className="w-12"></div>
                                </div>

                                {/* Browser Screen */}
                                <div 
                                    className="relative aspect-video max-h-[460px] overflow-hidden bg-slate-950 cursor-pointer"
                                    onClick={() => onOpenLightbox(project.image_url, project.title)}
                                >
                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-600 text-sm">
                                            No Image Available
                                        </div>
                                    )}
                                    {/* Hover Overlay Hint */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="bg-pink-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg border border-pink-300/40">
                                            Click to Fullscreen 🔍
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── DYNAMIC SECTIONS (MULTIPLE IMAGES & CONTENT HEADINGS) ── */}
                    {sections.length > 0 && (
                        <div className="space-y-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                                    Feature Deep-Dive & Screenshots
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Explore the key modules, workflows, and user experience built into this project.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {sections.map((section, idx) => (
                                    <div 
                                        key={section.id || idx}
                                        className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-4"
                                    >
                                        {/* Section Header */}
                                        <div className="flex items-center gap-2.5">
                                            <span className="w-6 h-6 rounded-lg bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 font-bold text-xs flex items-center justify-center">
                                                {idx + 1}
                                            </span>
                                            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                                {section.heading || `Project Feature #${idx + 1}`}
                                            </h4>
                                        </div>

                                        {/* Section Content */}
                                        {section.content && (
                                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                                {section.content}
                                            </p>
                                        )}

                                        {/* Section Image */}
                                        {section.image_url && (
                                            <div 
                                                className="relative rounded-xl overflow-hidden border border-pink-500/20 cursor-pointer group shadow-sm bg-slate-900"
                                                onClick={() => onOpenLightbox(section.image_url, section.heading || project.title)}
                                            >
                                                {isMobileApp ? (
                                                    <div className="py-4 flex justify-center bg-gradient-to-b from-pink-950/20 to-slate-900/40">
                                                        <div className="w-[190px] sm:w-[230px] rounded-[26px] sm:rounded-[30px] p-1.5 shadow-lg border-[4px] sm:border-[5px] border-[#831843] bg-gradient-to-b from-[#831843] to-[#500724]">
                                                            <div className="aspect-[9/19] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-slate-900">
                                                                <img
                                                                    src={section.image_url}
                                                                    alt={section.heading || 'Screenshot'}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="aspect-video max-h-[380px] overflow-hidden">
                                                        <img
                                                            src={section.image_url}
                                                            alt={section.heading || 'Screenshot'}
                                                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="bg-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-pink-300/40">
                                                        Click to Fullscreen 🔍
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* ── MOBILE QUICK ACTION FOOTER ── */}
                <div className="xs:hidden px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
                    {project.website_url && (
                        <a
                            href={project.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
                        >
                            Live Demo <ExternalLink size={13} />
                        </a>
                    )}
                    <button
                        onClick={() => onOpenEnquiry(project)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white shadow-md"
                        style={{
                            background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
                        }}
                    >
                        <MessageSquare size={13} /> Enquire
                    </button>
                </div>
            </div>
        </div>
    );

    return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
}
