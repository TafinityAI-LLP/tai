import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, FileText, Briefcase, Users, Award, Layers, GraduationCap } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [duration, setDuration] = useState('7d');

    const [trafficData, setTrafficData] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = sessionStorage.getItem('adminToken');
                const res = await fetch(`/api/stats?duration=${duration}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                    if (data.traffic) setTrafficData(data.traffic);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, [duration]);

    const statCards = [
        { key: 'blogs', label: 'Active Blogs', icon: <FileText size={24} />, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { key: 'casestudies', label: 'Case Studies', icon: <Award size={24} />, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { key: 'portfolio', label: 'Portfolio Items', icon: <Layers size={24} />, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
        { key: 'testimonials', label: 'Testimonials', icon: <Users size={24} />, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        { key: 'jobs', label: 'Open Jobs', icon: <Briefcase size={24} />, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
        { key: 'internships', label: 'Active Internships', icon: <GraduationCap size={24} />, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Platform Overview</h1>
                    <p className="text-slate-500 font-medium">Real-time metrics from the Laravel API engine.</p>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm w-fit overflow-x-auto">
                    <button onClick={() => setDuration('7d')} className={`px-4 py-2 rounded-lg text-sm font-bold transition min-w-max ${duration === '7d' ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>7 Days</button>
                    <button onClick={() => setDuration('30d')} className={`px-4 py-2 rounded-lg text-sm font-bold transition min-w-max ${duration === '30d' ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>30 Days</button>
                    <button onClick={() => setDuration('1y')} className={`px-4 py-2 rounded-lg text-sm font-bold transition min-w-max ${duration === '1y' ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>1 Year</button>
                    <button onClick={() => setDuration('all')} className={`px-4 py-2 rounded-lg text-sm font-bold transition min-w-max ${duration === 'all' ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>All Time</button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {statCards.map((card) => (
                    <div key={card.key} className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition duration-300 cursor-default">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${card.bg} ${card.color} group-hover:scale-110 transition-transform duration-300`}>
                            {card.icon}
                        </div>
                        <p className="text-3xl font-black text-slate-800 dark:text-white mb-1">
                            {stats ? stats[card.key] : <span className="animate-pulse bg-slate-200 dark:bg-slate-700 w-8 h-8 rounded block mx-auto"></span>}
                        </p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{card.label}</p>
                    </div>
                ))}
            </div>

            {/* Traffic Visualization */}
            <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                        <Activity size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Website Traffic Analytics</h2>
                        <p className="text-sm text-slate-500">Unique visitors and pageviews over selected timeframe.</p>
                    </div>
                </div>

                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.95)', fontWeight: 'bold' }}
                                itemStyle={{ fontWeight: '600' }}
                            />
                            <Area type="monotone" dataKey="pageviews" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorPageviews)" />
                            <Area type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
export default AdminDashboard;
