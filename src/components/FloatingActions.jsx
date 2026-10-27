import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Phone } from 'lucide-react';

const FloatingActions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [hovered, setHovered] = useState(null);

    // If currently on /schedule-meeting, don't duplicate the schedule meeting button
    const isSchedulePage = location.pathname === '/schedule-meeting';

    // Social media links provided by user
    const socialLinks = [
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/profile.php?id=61595215071246',
            color: '#1877F2',
            icon: (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            )
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/tafinityai/',
            color: '#E4405F',
            icon: (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            )
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/company/tafinityai/',
            color: '#0A66C2',
            icon: (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            )
        },
        {
            name: 'YouTube',
            url: 'https://www.youtube.com/@TafinityAI',
            color: '#FF0000',
            icon: (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            )
        },
        {
            name: 'X (Twitter)',
            url: 'https://x.com/tafinityai',
            color: '#0f172a',
            icon: (
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            )
        }
    ];

    return (
        <>
            {/* ── 1. STICKY SOCIAL MEDIA BAR (LEFT SIDE, VERTICALLY CENTER ALIGNED) ── */}
            <div className="fixed left-2 sm:left-3.5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 pointer-events-auto select-none">
                {socialLinks.map((item) => (
                    <div key={item.name} className="relative flex items-center group">
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setHovered(item.name)}
                            onMouseLeave={() => setHovered(null)}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-gray-600 border border-gray-200/90 shadow-md flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 hover:shadow-lg cursor-pointer"
                            style={{
                                color: hovered === item.name ? item.color : '#475569',
                                borderColor: hovered === item.name ? item.color : '#e2e8f0'
                            }}
                            aria-label={item.name}
                        >
                            {item.icon}
                        </a>

                        {/* Tooltip on right of icon */}
                        <span
                            className={`hidden sm:block absolute left-11 bg-gray-900/95 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md border border-white/10 whitespace-nowrap transition-all duration-200 pointer-events-none ${
                                hovered === item.name ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                            }`}
                        >
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>

            {/* ── 2. STICKY SCHEDULE MEETING BUTTON (VERTICAL RIGHT SIDE TAB) ── */}
            {!isSchedulePage && (
                <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 pointer-events-auto select-none">
                    <button
                        onClick={() => {
                            navigate('/schedule-meeting');
                            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                        }}
                        onMouseEnter={() => setHovered('schedule')}
                        onMouseLeave={() => setHovered(null)}
                        className="relative flex flex-col items-center gap-2 py-3 px-2 sm:px-2.5 rounded-l-xl text-white shadow-2xl transition-all duration-300 transform hover:-translate-x-1 active:scale-95 cursor-pointer border-t border-b border-l border-pink-400/40"
                        style={{
                            background: 'linear-gradient(180deg, #be185d 0%, #9d174d 50%, #831843 100%)',
                            boxShadow: '-4px 0 20px rgba(190, 24, 93, 0.45)'
                        }}
                        aria-label="Schedule a Meeting"
                    >
                        {/* Ping radar dot */}
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-300 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>

                        {/* Compact Calendar icon */}
                        <Calendar className="w-3.5 h-3.5 text-white animate-pulse" />
                        
                        {/* Vertical Text */}
                        <span 
                            className="font-bold text-[10.5px] uppercase tracking-widest text-pink-50 whitespace-nowrap mt-1"
                            style={{
                                writingMode: 'vertical-rl',
                                transform: 'rotate(180deg)'
                            }}
                        >
                            Book Meeting
                        </span>
                    </button>
                </div>
            )}

            {/* ── 3. STICKY WHATSAPP & PHONE CALL BUTTONS (BOTTOM LEFT POSITION) ── */}
            <div className="fixed bottom-6 left-3.5 sm:left-5 z-50 flex flex-col items-start gap-2.5 pointer-events-auto select-none">
                {/* WhatsApp Button */}
                <div className="relative flex items-center group">
                    <a
                        href="https://wa.me/918005006933"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHovered('wa')}
                        onMouseLeave={() => setHovered(null)}
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border border-emerald-300/40"
                        style={{
                            backgroundColor: '#25D366',
                            boxShadow: '0 6px 18px rgba(37, 211, 102, 0.45)'
                        }}
                        aria-label="Chat on WhatsApp"
                    >
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.996.586 3.86 1.6 5.437L2 22l4.673-1.564A9.99 9.99 0 0012.03 22c5.536 0 10.031-4.495 10.031-10.031C22.062 6.495 17.567 2 12.031 2zm0 18.23a8.163 8.163 0 01-4.33-1.233l-.31-.186-2.774.928.93-2.705-.203-.324a8.156 8.156 0 01-1.344-4.68c0-4.542 3.688-8.23 8.23-8.23 4.543 0 8.23 3.688 8.23 8.23 0 4.543-3.687 8.23-8.23 8.23zm4.512-6.177c-.247-.123-1.464-.723-1.691-.806-.227-.082-.392-.123-.557.123-.165.247-.64.806-.784.97-.144.165-.288.186-.535.062a6.764 6.764 0 01-1.986-1.225 7.46 7.46 0 01-1.373-1.71c-.144-.247-.015-.38.108-.503.111-.111.247-.288.371-.432.123-.144.165-.247.247-.412.082-.165.041-.31-.02-.433-.062-.124-.557-1.342-.763-1.838-.2-.484-.403-.418-.557-.426-.144-.008-.31-.01-.475-.01s-.433.062-.66.31c-.227.247-.866.846-.866 2.063s.887 2.394 1.01 2.56c.124.165 1.745 2.664 4.228 3.737.59.256 1.05.409 1.41.524.593.189 1.133.162 1.56.099.476-.071 1.464-.6 1.67-1.177.206-.578.206-1.074.144-1.177-.062-.103-.227-.165-.474-.288z" />
                        </svg>
                    </a>

                    {/* Desktop Tooltip */}
                    <span
                        className={`hidden sm:block absolute left-14 bg-gray-900/95 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg border border-white/10 whitespace-nowrap transition-all duration-200 pointer-events-none ${
                            hovered === 'wa' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                        }`}
                    >
                        WhatsApp (+91-8005006933)
                    </span>
                </div>

                {/* Phone Call Button */}
                <div className="relative flex items-center group">
                    <a
                        href="tel:+918005006933"
                        onMouseEnter={() => setHovered('call')}
                        onMouseLeave={() => setHovered(null)}
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border border-cyan-300/40"
                        style={{
                            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                            boxShadow: '0 6px 18px rgba(2, 132, 199, 0.45)'
                        }}
                        aria-label="Direct Phone Call"
                    >
                        <Phone className="w-5 h-5 text-white" />
                    </a>

                    {/* Desktop Tooltip */}
                    <span
                        className={`hidden sm:block absolute left-14 bg-gray-900/95 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg border border-white/10 whitespace-nowrap transition-all duration-200 pointer-events-none ${
                            hovered === 'call' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                        }`}
                    >
                        Call Us (+91-8005006933)
                    </span>
                </div>
            </div>
        </>
    );
};

export default FloatingActions;
