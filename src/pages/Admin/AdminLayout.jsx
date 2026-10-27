import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, FileText, Briefcase, Users, LogOut, 
    Award, Layers, GraduationCap, Search, Sparkles, UserCheck, 
    Menu, X, ChevronRight 
} from 'lucide-react';

const AdminLayout = () => {
    const token = sessionStorage.getItem('adminToken');
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Automatically close mobile drawer when navigating
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Handle ESC key to close mobile drawer
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevent background scroll when mobile drawer is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    if (!token) {
        return <Navigate to="/tai/login" replace />;
    }

    const handleLogout = () => {
        sessionStorage.removeItem('adminToken');
        navigate('/tai/login', { replace: true });
    };

    const navs = [
        { name: 'Dashboard', path: '/tai', icon: <LayoutDashboard size={20} /> },
        { name: 'Applications', path: '/tai/applications', icon: <UserCheck size={20} /> },
        { name: 'Jobs', path: '/tai/jobs', icon: <Briefcase size={20} /> },
        { name: 'Internships', path: '/tai/internships', icon: <GraduationCap size={20} /> },
        { name: 'Blogs', path: '/tai/blogs', icon: <FileText size={20} /> },
        { name: 'Case Studies', path: '/tai/casestudies', icon: <Award size={20} /> },
        { name: 'Portfolio', path: '/tai/portfolio', icon: <Layers size={20} /> },
        { name: 'Testimonials', path: '/tai/testimonials', icon: <Users size={20} /> },
        { name: 'Recent Projects', path: '/tai/recent-projects', icon: <Layers size={20} /> },
        { name: 'Client Logos', path: '/tai/client-logos', icon: <Sparkles size={20} /> },
        { name: 'SEO Engine', path: '/tai/seo', icon: <Search size={20} /> }
    ];

    const currentNav = navs.find(n => 
        n.path === '/tai' ? location.pathname === '/tai' : location.pathname.startsWith(n.path)
    );

    return (
        <div className="flex flex-col md:flex-row h-screen bg-slate-100 dark:bg-slate-900 fixed inset-0 z-50 overflow-hidden font-sans text-slate-800">
            
            {/* ── MOBILE TOP NAVBAR (BURGER MENU BAR) ── */}
            <header className="md:hidden flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-30 shrink-0 shadow-xs">
                <div className="flex items-center gap-2.5 sm:gap-3">
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition active:scale-95 cursor-pointer"
                        aria-label="Open Navigation Menu"
                    >
                        <Menu size={20} />
                    </button>
                    <div>
                        <h2 className="text-sm sm:text-base font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
                            Tafinity CMS
                        </h2>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                            {currentNav ? currentNav.name : 'Console'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-1.5">
                    <button
                        onClick={handleLogout}
                        className="p-1.5 sm:p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
                        title="Exit CMS"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Exit</span>
                    </button>
                </div>
            </header>

            {/* ── MOBILE DRAWER BACKDROP ── */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden transition-opacity duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* ── MOBILE DRAWER (OFF-CANVAS SLIDE-IN SIDEBAR) ── */}
            <aside
                className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col shadow-2xl z-50 md:hidden transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            Tafinity CMS
                        </h2>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5">
                            Admin Navigation
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-500 hover:text-slate-700 dark:text-slate-300 transition cursor-pointer"
                        aria-label="Close Menu"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Navigation Links inside Mobile Drawer */}
                <nav className="flex-1 p-3.5 flex flex-col gap-1 overflow-y-auto">
                    {navs.map(nav => {
                        const isActive = nav.path === '/tai' ? location.pathname === '/tai' : location.pathname.startsWith(nav.path);
                        return (
                            <Link
                                key={nav.path}
                                to={nav.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 shadow-xs font-bold'
                                        : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/50 font-medium'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {nav.icon}
                                    <span className="text-sm">{nav.name}</span>
                                </div>
                                {isActive && <ChevronRight size={16} className="text-blue-600 dark:text-blue-400" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-3.5 border-t border-slate-200 dark:border-slate-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center w-full gap-2 p-3 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors font-bold text-sm"
                    >
                        <LogOut size={18} /> Exit CMS
                    </button>
                </div>
            </aside>

            {/* ── DESKTOP PERMANENT SIDEBAR ── */}
            <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex-col shadow-lg z-10 hidden md:flex shrink-0">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Tafinity CMS
                    </h2>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1 block">
                        Admin Console
                    </span>
                </div>
                <nav className="flex-1 p-4 flex flex-col gap-1.5 overflow-y-auto">
                    {navs.map(nav => {
                        const isActive = nav.path === '/tai' ? location.pathname === '/tai' : location.pathname.startsWith(nav.path);
                        return (
                            <Link
                                key={nav.path}
                                to={nav.path}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 shadow-sm font-bold'
                                        : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/50 font-medium'
                                }`}
                            >
                                {nav.icon}
                                <span className="text-sm">{nav.name}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center justify-center w-full gap-2 p-3 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors font-bold text-sm cursor-pointer"
                    >
                        <LogOut size={18} /> Exit CMS
                    </button>
                </div>
            </aside>

            {/* ── MAIN CONTENT PANE ── */}
            <main className="flex-1 h-full overflow-y-auto p-3.5 sm:p-5 md:p-8 bg-slate-50 dark:bg-slate-900 relative">
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;
