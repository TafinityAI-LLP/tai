import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, Users, LogOut, Award, Layers, GraduationCap } from 'lucide-react';

const AdminLayout = () => {
    const token = sessionStorage.getItem('adminToken');
    const navigate = useNavigate();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    const handleLogout = () => {
        sessionStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    useEffect(() => {
        const handleUnload = () => {
            sessionStorage.removeItem('adminToken');
        };
        window.addEventListener('beforeunload', handleUnload);
        return () => window.removeEventListener('beforeunload', handleUnload);
    }, []);

    const navs = [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: 'Blogs', path: '/admin/blogs', icon: <FileText size={20} /> },
        { name: 'Case Studies', path: '/admin/casestudies', icon: <Award size={20} /> },
        { name: 'Portfolio', path: '/admin/portfolio', icon: <Layers size={20} /> },
        { name: 'Testimonials', path: '/admin/testimonials', icon: <Users size={20} /> },
        { name: 'Jobs', path: '/admin/jobs', icon: <Briefcase size={20} /> },
        { name: 'Internships', path: '/admin/internships', icon: <GraduationCap size={20} /> }
    ];

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-900 fixed inset-0 z-50 overflow-hidden font-sans text-slate-800">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col shadow-lg z-10 hidden md:flex">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Tafinity CMS</h2>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1 block">Admin Console</span>
                </div>
                <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
                    {navs.map(nav => {
                        // Precise active matching for Dashboard vs others
                        const isActive = nav.path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(nav.path);

                        return (
                            <Link
                                key={nav.path}
                                to={nav.path}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/50'
                                    }`}
                            >
                                {nav.icon}
                                <span className="font-semibold text-sm">{nav.name}</span>
                            </Link>
                        )
                    })}
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                    <button onClick={handleLogout} className="flex items-center justify-center w-full gap-2 p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-bold text-sm">
                        <LogOut size={18} /> Exit CMS
                    </button>
                </div>
            </aside>

            {/* Main Content Pane */}
            <main className="flex-1 h-full overflow-y-auto p-4 md:p-8 bg-slate-50 dark:bg-slate-900 relative">
                <Outlet />
            </main>
        </div>
    );
};
export default AdminLayout;
