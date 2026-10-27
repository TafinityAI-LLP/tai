import React, { useState, useEffect } from 'react';
import { FileText, Download, ExternalLink, Trash2, CheckCircle2, Clock, XCircle, AlertCircle, Search, Filter, Mail, Phone, Calendar, Briefcase, GraduationCap, Eye } from 'lucide-react';

const AdminApplications = () => {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [roleFilter, setRoleFilter] = useState('All');
    const [selectedApplication, setSelectedApplication] = useState(null);
    const token = sessionStorage.getItem('adminToken');

    const fetchApplications = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/job_applications', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                // Sort by latest created_at
                const sorted = Array.isArray(data) ? data.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)) : [];
                setApplications(sorted);
            }
        } catch (error) {
            console.error('Failed to fetch applications', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await fetch(`/api/job_applications/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
                if (selectedApplication && selectedApplication.id === id) {
                    setSelectedApplication(prev => ({ ...prev, status: newStatus }));
                }
            } else {
                alert('Could not update status');
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this application?')) return;
        try {
            const res = await fetch(`/api/job_applications/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setApplications(prev => prev.filter(app => app.id !== id));
                if (selectedApplication && selectedApplication.id === id) {
                    setSelectedApplication(null);
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    const filteredApplications = applications.filter(app => {
        const matchesSearch = (
            (app.name && app.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (app.email && app.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (app.phone && app.phone.includes(searchTerm)) ||
            (app.role_title && app.role_title.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
        const matchesRole = roleFilter === 'All' || (app.role_type && app.role_type.toLowerCase() === roleFilter.toLowerCase());
        return matchesSearch && matchesStatus && matchesRole;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Shortlisted':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"><CheckCircle2 size={12} /> Shortlisted</span>;
            case 'Interview':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"><Clock size={12} /> Interview</span>;
            case 'Hired':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"><CheckCircle2 size={12} /> Hired</span>;
            case 'Rejected':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"><XCircle size={12} /> Rejected</span>;
            default:
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"><AlertCircle size={12} /> Pending</span>;
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
            {/* Header & Stats */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                        Job & Internship Applications
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Review candidate submissions, download resumes, and manage applicant status.
                    </p>
                </div>
                <button
                    onClick={fetchApplications}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-200 transition shadow-sm w-fit"
                >
                    ↻ Refresh List
                </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Total Applicants</span>
                    <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{applications.length}</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 shadow-sm">
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase">Pending Review</span>
                    <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                        {applications.filter(a => a.status === 'Pending' || !a.status).length}
                    </p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 shadow-sm">
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase">Shortlisted</span>
                    <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                        {applications.filter(a => a.status === 'Shortlisted').length}
                    </p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 shadow-sm">
                    <span className="text-xs font-semibold text-purple-700 dark:text-purple-400 uppercase">Interview / Hired</span>
                    <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">
                        {applications.filter(a => a.status === 'Interview' || a.status === 'Hired').length}
                    </p>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search applicant name, email, role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                    </select>

                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none"
                    >
                        <option value="All">All Types</option>
                        <option value="job">Full-Time Jobs</option>
                        <option value="internship">Internships</option>
                    </select>
                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto min-h-[350px]">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                <th className="p-4">Candidate</th>
                                <th className="p-4">Applied Role</th>
                                <th className="p-4">Contact</th>
                                <th className="p-4">Resume</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-slate-400 font-semibold animate-pulse">
                                        Loading candidates...
                                    </td>
                                </tr>
                            ) : filteredApplications.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-slate-400 font-semibold">
                                        No applications found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredApplications.map(app => (
                                    <tr key={app.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-700/20 transition">
                                        {/* Candidate */}
                                        <td className="p-4">
                                            <div className="font-bold text-slate-900 dark:text-white text-sm">{app.name}</div>
                                            {app.experience && (
                                                <div className="text-[11px] text-slate-400">{app.experience}</div>
                                            )}
                                        </td>

                                        {/* Role */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200 text-xs">
                                                {app.role_type === 'internship' ? (
                                                    <span className="p-1 rounded bg-orange-100 dark:bg-orange-950 text-orange-600"><GraduationCap size={12} /></span>
                                                ) : (
                                                    <span className="p-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-600"><Briefcase size={12} /></span>
                                                )}
                                                <span>{app.role_title}</span>
                                            </div>
                                        </td>

                                        {/* Contact */}
                                        <td className="p-4 text-xs text-slate-600 dark:text-slate-300">
                                            <div>{app.email}</div>
                                            <div className="text-slate-400 text-[11px]">{app.phone}</div>
                                        </td>

                                        {/* Resume Link */}
                                        <td className="p-4">
                                            {app.resume_url ? (
                                                <a
                                                    href={app.resume_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 hover:bg-pink-100 border border-pink-200/60 dark:border-pink-900/40 transition shadow-sm"
                                                >
                                                    <FileText size={13} /> View Resume
                                                </a>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">No File</span>
                                            )}
                                        </td>

                                        {/* Status Dropdown */}
                                        <td className="p-4">
                                            <select
                                                value={app.status || 'Pending'}
                                                onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Shortlisted">Shortlisted</option>
                                                <option value="Interview">Interview</option>
                                                <option value="Hired">Hired</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        </td>

                                        {/* Date */}
                                        <td className="p-4 text-xs text-slate-500">
                                            {app.created_at ? new Date(app.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
                                        </td>

                                        {/* Actions */}
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => setSelectedApplication(app)}
                                                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                                                    title="View Full Profile"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(app.id)}
                                                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition"
                                                    title="Delete Application"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Candidate Details Modal */}
            {selectedApplication && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl max-w-xl w-full p-5 sm:p-8 space-y-5 sm:space-y-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {selectedApplication.name}
                                </h3>
                                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                                    Applied for: <span className="text-blue-600">{selectedApplication.role_title}</span> ({selectedApplication.role_type})
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedApplication(null)}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4 text-sm divide-y divide-slate-100 dark:divide-slate-800">
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <div>
                                    <span className="text-[11px] font-bold uppercase text-slate-400">Email</span>
                                    <p className="font-medium text-slate-800 dark:text-slate-200">{selectedApplication.email}</p>
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold uppercase text-slate-400">Phone</span>
                                    <p className="font-medium text-slate-800 dark:text-slate-200">{selectedApplication.phone}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-4">
                                <div>
                                    <span className="text-[11px] font-bold uppercase text-slate-400">Experience / Note</span>
                                    <p className="font-medium text-slate-800 dark:text-slate-200">{selectedApplication.experience || 'Not specified'}</p>
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold uppercase text-slate-400">Portfolio / LinkedIn</span>
                                    <p className="font-medium text-slate-800 dark:text-slate-200 truncate">
                                        {selectedApplication.portfolio_url ? (
                                            <a href={selectedApplication.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-1">
                                                Open Link <ExternalLink size={11} />
                                            </a>
                                        ) : 'None'}
                                    </p>
                                </div>
                            </div>

                            {selectedApplication.message && (
                                <div className="pt-4">
                                    <span className="text-[11px] font-bold uppercase text-slate-400">Applicant Message / Cover Note</span>
                                    <p className="mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                                        {selectedApplication.message}
                                    </p>
                                </div>
                            )}

                            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Status</span>
                                    {getStatusBadge(selectedApplication.status)}
                                </div>

                                {selectedApplication.resume_url && (
                                    <a
                                        href={selectedApplication.resume_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-md flex items-center justify-center gap-2"
                                    >
                                        <Download size={14} /> Download Resume (PDF)
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminApplications;
