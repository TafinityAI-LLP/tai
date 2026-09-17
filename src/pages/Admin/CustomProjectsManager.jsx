import React, { useState, useEffect, useRef } from 'react';
import { Search, RotateCcw, Plus, Edit, Eye, Trash2, Image as ImageIcon, UploadCloud, X, ArrowLeft, Loader2, Link as LinkIcon, FileText, Layers } from 'lucide-react';

export default function CustomProjectsManager() {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    
    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Modal States
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    
    const [currentProject, setCurrentProject] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        summary: '',
        image_url: '',
        website_url: '',
        status: 'Active',
        display_order: 1
    });
    
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const categories = ['Construction', 'Interior', 'Web Solutions', 'App Development', 'Software', 'Others'];

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('adminToken');
            const response = await fetch('/api/recent_projects', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                // Ensure data is sorted by display order
                const sorted = data.sort((a, b) => a.display_order - b.display_order);
                setProjects(sorted);
                setFilteredProjects(sorted);
            }
        } catch (error) {
            console.error("Error fetching projects", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        let result = projects;
        if (searchTerm) {
            result = result.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.summary?.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (categoryFilter) {
            result = result.filter(p => p.category === categoryFilter);
        }
        if (statusFilter) {
            result = result.filter(p => p.status === statusFilter);
        }
        setFilteredProjects(result);
    }, [searchTerm, categoryFilter, statusFilter, projects]);

    const handleResetFilters = () => {
        setSearchTerm('');
        setCategoryFilter('');
        setStatusFilter('');
        fetchProjects();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validation
            if (file.size > 5 * 1024 * 1024) {
                alert("File size must be less than 5MB");
                return;
            }
            if (!file.type.match('image.*')) {
                alert("Only image files are allowed");
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async () => {
        if (!imageFile) return formData.image_url; // Return existing if no new file

        const token = sessionStorage.getItem('adminToken');
        const uploadData = new FormData();
        uploadData.append('image', imageFile);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: uploadData
            });
            if (res.ok) {
                const data = await res.json();
                return data.url;
            }
        } catch (e) {
            console.error("Image upload failed", e);
        }
        return null;
    };

    const validateForm = () => {
        if (!formData.title.trim()) return "Title is required";
        if (!formData.category) return "Category is required";
        if (!formData.summary.trim()) return "Summary is required";
        if (!imageFile && !formData.image_url) return "Project image is required";
        if (formData.display_order <= 0) return "Display order must be a positive integer";
        if (formData.website_url) {
            try { new URL(formData.website_url); } catch (_) { return "Website URL is invalid"; }
        }
        return null;
    };

    const handleSave = async () => {
        const error = validateForm();
        if (error) {
            alert(error);
            return;
        }

        setProcessing(true);
        const token = sessionStorage.getItem('adminToken');
        
        let finalImageUrl = formData.image_url;
        if (imageFile) {
            const uploadedUrl = await uploadImage();
            if (!uploadedUrl) {
                alert("Failed to upload image.");
                setProcessing(false);
                return;
            }
            finalImageUrl = uploadedUrl;
        }

        const payload = {
            ...formData,
            image_url: finalImageUrl
        };

        const method = currentProject ? 'PUT' : 'POST';
        const url = currentProject ? `/api/recent_projects/${currentProject.id}` : '/api/recent_projects';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // Not using toast directly since we don't have react-hot-toast guaranteed in scope, using simple alert matching generic crud
                alert(`Project ${currentProject ? 'updated' : 'added'} successfully!`);
                closeForm();
                fetchProjects();
            } else {
                alert("Failed to save project.");
            }
        } catch (e) {
            console.error("Error saving project", e);
            alert("Error saving project.");
        } finally {
            setProcessing(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setProcessing(true);
        const token = sessionStorage.getItem('adminToken');
        try {
            const res = await fetch(`/api/recent_projects/${deleteId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                alert("Project deleted successfully");
                setIsDeleteOpen(false);
                fetchProjects();
            }
        } catch (e) {
            alert("Failed to delete project");
        } finally {
            setProcessing(false);
        }
    };

    const openAddForm = () => {
        setCurrentProject(null);
        setFormData({
            title: '',
            category: '',
            summary: '',
            image_url: '',
            website_url: '',
            status: 'Active',
            display_order: projects.length + 1
        });
        setImageFile(null);
        setImagePreview(null);
        setIsFormOpen(true);
    };

    const openEditForm = (project) => {
        setCurrentProject(project);
        setFormData({
            title: project.title || '',
            category: project.category || '',
            summary: project.summary || '',
            image_url: project.image_url || '',
            website_url: project.website_url || '',
            status: project.status || 'Active',
            display_order: project.display_order || 1
        });
        setImageFile(null);
        setImagePreview(project.image_url || null);
        setIsFormOpen(true);
    };

    const openView = (project) => {
        setCurrentProject(project);
        setIsViewOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setCurrentProject(null);
    };

    const getStatusColor = (status) => status === 'Active' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50';
    const getCategoryColor = (category) => {
        const colors = {
            'Construction': 'text-blue-600 bg-blue-50',
            'Interior': 'text-purple-600 bg-purple-50',
            'Web Solutions': 'text-green-600 bg-green-50',
            'Others': 'text-orange-600 bg-orange-50'
        };
        return colors[category] || 'text-slate-600 bg-slate-50 border-slate-200';
    };

    if (isFormOpen) {
        return (
            <div className="p-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="text-sm text-slate-500 flex items-center gap-2 mb-2">
                            Dashboard <span className="text-slate-300">/</span> Projects <span className="text-slate-300">/</span> {currentProject ? 'Edit Project' : 'Add Project'}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                <Plus size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">{currentProject ? 'Edit' : 'Add'} Recent Project</h1>
                                <p className="text-slate-500 text-sm">Add a new project to showcase on your website.</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={closeForm} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors font-medium">
                        <ArrowLeft size={18} /> Back to Projects
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">Project Image <span className="text-red-500">*</span></label>
                                <div 
                                    className={`border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-colors relative
                                        ${imagePreview ? 'border-slate-200 bg-slate-50' : 'border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-400'}`}
                                    onClick={() => fileInputRef.current?.click()}
                                    style={{ height: '200px' }}
                                >
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        onChange={handleImageChange} 
                                        accept="image/jpeg,image/png,image/webp" 
                                        className="hidden" 
                                    />
                                    {imagePreview ? (
                                        <>
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                <div className="bg-white text-slate-900 px-4 py-2 rounded-lg font-medium shadow-lg flex items-center gap-2">
                                                    <Edit size={16}/> Change Image
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                                            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                                                <UploadCloud className="text-blue-600" size={24} />
                                            </div>
                                            <p className="font-semibold text-slate-700 mb-1">Click to upload image</p>
                                            <p className="text-xs text-slate-500">JPG, PNG, WebP (Max 5MB)<br/>Recommended size: 1200 x 800</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">Project Title <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-slate-400 font-serif font-bold text-lg">T</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Enter project title" 
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-shadow"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">Module / Category <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Layers className="text-slate-400" size={18} />
                                    </div>
                                    <select 
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-shadow appearance-none bg-white"
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    >
                                        <option value="">Select module / category</option>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Summary */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">Project Summary <span className="text-red-500">*</span></label>
                                <div className="relative rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-blue-600/20 focus-within:border-blue-600 transition-shadow overflow-hidden bg-white flex">
                                    <div className="pl-3 pt-3">
                                        <FileText className="text-slate-400" size={18} />
                                    </div>
                                    <textarea 
                                        placeholder="Write a short summary about the project..." 
                                        className="w-full pl-2 pr-4 py-3 border-none focus:outline-none resize-none bg-transparent"
                                        rows="4"
                                        maxLength={500}
                                        value={formData.summary}
                                        onChange={(e) => setFormData({...formData, summary: e.target.value})}
                                    />
                                </div>
                                <div className="flex justify-end mt-1">
                                    <span className="text-xs text-slate-400 font-medium">{formData.summary.length}/500</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            
                            {/* Website URL */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">Website URL <span className="text-slate-400 font-normal">(Optional)</span></label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LinkIcon className="text-slate-400" size={18} />
                                    </div>
                                    <input 
                                        type="url" 
                                        placeholder="https://example.com" 
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-shadow"
                                        value={formData.website_url}
                                        onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Add live project URL if available (optional)</p>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">Status <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <div className={`w-2.5 h-2.5 rounded-full ${formData.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                    </div>
                                    <select 
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-shadow appearance-none bg-white font-medium"
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Only active projects will be shown on website.</p>
                            </div>

                            {/* Display Order */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">Display Order <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-slate-400 font-medium text-lg">#</span>
                                    </div>
                                    <input 
                                        type="number" 
                                        min="1"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-shadow font-medium"
                                        value={formData.display_order}
                                        onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || ''})}
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Lower number will be shown first.</p>
                            </div>

                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-slate-100">
                        <button 
                            onClick={closeForm}
                            disabled={processing}
                            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={processing}
                            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-50"
                        >
                            {processing ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                            Save Project
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="text-sm text-slate-500 flex items-center gap-2 mb-2">
                        Dashboard <span className="text-slate-300">/</span> Projects
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                            <Plus size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
                            <p className="text-slate-500 text-sm">Manage all your projects from here.</p>
                        </div>
                    </div>
                </div>
                <button onClick={openAddForm} className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-blue-200 flex items-center gap-2 hover:bg-blue-700 transition-colors">
                    <Plus size={18} /> Add Project
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-t-2xl border-b border-slate-100 shadow-sm flex flex-wrap gap-4 items-center justify-between">
                <div className="relative max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search projects..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-shadow"
                    />
                </div>
                <div className="flex items-center gap-3 flex-1 justify-end">
                    <select 
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white font-medium text-slate-700 cursor-pointer min-w-[160px]"
                    >
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white font-medium text-slate-700 cursor-pointer min-w-[140px]"
                    >
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <button 
                        type="button"
                        onClick={handleResetFilters}
                        className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-2 font-medium transition-colors"
                    >
                        <RotateCcw size={16} /> Reset
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-b-2xl shadow-sm border-x border-b border-slate-100 flex-1 overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-100">
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">#</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Image</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Project Title</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Module / Category</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Order</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                                        <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                                        Loading projects...
                                    </td>
                                </tr>
                            ) : filteredProjects.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                                        <ImageIcon className="mx-auto mb-2 opacity-50" size={32} />
                                        No projects found.
                                    </td>
                                </tr>
                            ) : (
                                filteredProjects.map((project, index) => (
                                    <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4 text-slate-500 font-medium">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="w-24 h-16 rounded-lg bg-slate-100 overflow-hidden shadow-sm border border-slate-200/60">
                                                {project.image_url ? (
                                                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                        <ImageIcon size={20} />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 max-w-[280px]">
                                            <h3 className="font-bold text-slate-900 truncate">{project.title}</h3>
                                            <p className="text-sm text-slate-500 truncate mt-0.5">{project.summary}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(project.category)}`}>
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 flex items-center gap-1.5 w-max text-xs font-semibold rounded-full border border-current/10 ${getStatusColor(project.status)}`}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 font-medium">
                                            {project.display_order}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openEditForm(project)} className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 flex items-center justify-center transition-colors">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => openView(project)} className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 flex items-center justify-center transition-colors">
                                                    <Eye size={16} />
                                                </button>
                                                <button onClick={() => { setDeleteId(project.id); setIsDeleteOpen(true); }} className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-colors">
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
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 mt-auto flex items-center justify-between text-sm text-slate-500">
                    <div>Showing 1 to {filteredProjects.length} of {projects.length} projects</div>
                </div>
            </div>

            {/* View Modal */}
            {isViewOpen && currentProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative">
                        <div className="relative h-64 bg-slate-100 border-b border-slate-100">
                            {currentProject.image_url ? (
                                <img src={currentProject.image_url} alt={currentProject.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center"><ImageIcon size={48} className="text-slate-300"/></div>
                            )}
                            <button onClick={() => setIsViewOpen(false)} className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">{currentProject.title}</h2>
                                    <div className="flex items-center gap-3 mt-3">
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${getCategoryColor(currentProject.category)}`}>
                                            {currentProject.category}
                                        </span>
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border border-current/10 ${getStatusColor(currentProject.status)} flex items-center gap-1.5`}>
                                            <div className="w-1.5 h-1.5 rounded-full bg-current"></div>{currentProject.status}
                                        </span>
                                        <span className="text-sm font-medium text-slate-500">Order: #{currentProject.display_order}</span>
                                    </div>
                                </div>
                                {currentProject.website_url && (
                                    <a href={currentProject.website_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg transition-colors text-sm shrink-0">
                                        Visit Website <LinkIcon size={14} />
                                    </a>
                                )}
                            </div>
                            <div className="prose prose-slate max-w-none text-slate-600 mt-6">
                                <p>{currentProject.summary}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Project</h3>
                        <p className="text-slate-500 mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
                        <div className="flex gap-3 justify-center">
                            <button disabled={processing} onClick={() => setIsDeleteOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
                            <button disabled={processing} onClick={handleDelete} className="px-5 py-2.5 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700 flex items-center gap-2">
                                {processing ? <Loader2 size={18} className="animate-spin"/> : null} Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
