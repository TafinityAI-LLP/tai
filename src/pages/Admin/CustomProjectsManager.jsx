import React, { useState, useEffect, useRef } from 'react';
import { 
    Search, RotateCcw, Plus, Edit, Eye, Trash2, Image as ImageIcon, 
    UploadCloud, X, ArrowLeft, Loader2, Link as LinkIcon, FileText, 
    Layers, Smartphone, Globe, ArrowUp, ArrowDown, Sparkles, Database 
} from 'lucide-react';

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
        category: 'Mobile App',
        project_type: 'mobile_app',
        summary: '',
        image_url: '',
        website_url: '',
        status: 'Active',
        display_order: 1
    });
    
    // Dynamic multiple sections / images repeater state
    const [sections, setSections] = useState([]);
    
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const categories = [
        'Mobile App',
        'Website',
        'Web Application',
        'ERP Solutions',
        'CRM Solutions',
        'AI & Automation',
        'E-Commerce',
        'Custom Software',
        'Others'
    ];

    const projectTypes = [
        { id: 'mobile_app', label: '📱 Mobile App (Smartphone Mockup Frame)' },
        { id: 'website', label: '🌐 Website / Web App (Browser Mockup Frame)' },
        { id: 'erp', label: '⚡ ERP System (Enterprise Mockup Frame)' },
        { id: 'crm', label: '📊 CRM Solution (Dashboard Mockup Frame)' },
        { id: 'custom', label: '💻 Custom Software / Others' }
    ];

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('adminToken');
            const response = await fetch('/api/recent_projects', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
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
            result = result.filter(p => 
                p.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                p.summary?.toLowerCase().includes(searchTerm.toLowerCase())
            );
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
            if (file.size > 35 * 1024 * 1024) {
                alert("File size must be less than 35MB (4K HD images supported)");
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

    const uploadImage = async (fileToUpload) => {
        const file = fileToUpload || imageFile;
        if (!file) return formData.image_url;

        const token = sessionStorage.getItem('adminToken');
        const uploadData = new FormData();
        uploadData.append('image', file);

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

    // ── Sections Repeater Handlers ──
    const addSection = () => {
        setSections(prev => [
            ...prev,
            {
                id: 'sec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
                heading: '',
                content: '',
                image_url: '',
                newFile: null,
                preview: null
            }
        ]);
    };

    const updateSection = (id, field, value) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleSectionImageChange = (id, file) => {
        if (!file) return;
        if (file.size > 35 * 1024 * 1024) {
            alert("File size must be less than 35MB (4K HD images supported)");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setSections(prev => prev.map(s => s.id === id ? { ...s, newFile: file, preview: reader.result } : s));
        };
        reader.readAsDataURL(file);
    };

    const removeSection = (id) => {
        setSections(prev => prev.filter(s => s.id !== id));
    };

    const moveSection = (index, direction) => {
        const newSections = [...sections];
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= newSections.length) return;
        const temp = newSections[index];
        newSections[index] = newSections[targetIndex];
        newSections[targetIndex] = temp;
        setSections(newSections);
    };

    const validateForm = () => {
        if (!formData.title.trim()) return "Title is required";
        if (!formData.category) return "Category is required";
        if (!formData.summary.trim()) return "Summary is required";
        if (!imageFile && !formData.image_url) return "Main project cover image is required";
        if (formData.display_order <= 0) return "Display order must be a positive integer";
        if (formData.website_url) {
            try { new URL(formData.website_url); } catch (_) { return "Website URL is invalid (format: https://example.com)"; }
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
            const uploadedUrl = await uploadImage(imageFile);
            if (!uploadedUrl) {
                alert("Failed to upload main project image.");
                setProcessing(false);
                return;
            }
            finalImageUrl = uploadedUrl;
        }

        // Upload any newly selected section images
        const processedSections = [];
        for (let i = 0; i < sections.length; i++) {
            const sec = sections[i];
            let secImageUrl = sec.image_url || '';
            if (sec.newFile) {
                const uploadedUrl = await uploadImage(sec.newFile);
                if (uploadedUrl) {
                    secImageUrl = uploadedUrl;
                }
            }
            processedSections.push({
                id: sec.id || ('sec_' + i),
                heading: sec.heading || '',
                content: sec.content || '',
                image_url: secImageUrl
            });
        }

        const payload = {
            ...formData,
            image_url: finalImageUrl,
            sections: JSON.stringify(processedSections)
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
            category: 'Mobile App',
            project_type: 'mobile_app',
            summary: '',
            image_url: '',
            website_url: '',
            status: 'Active',
            display_order: projects.length + 1
        });
        setSections([]);
        setImageFile(null);
        setImagePreview(null);
        setIsFormOpen(true);
    };

    const openEditForm = (project) => {
        setCurrentProject(project);
        setFormData({
            title: project.title || '',
            category: project.category || 'Mobile App',
            project_type: project.project_type || (project.category?.toLowerCase().includes('app') ? 'mobile_app' : 'website'),
            summary: project.summary || '',
            image_url: project.image_url || '',
            website_url: project.website_url || '',
            status: project.status || 'Active',
            display_order: project.display_order || 1
        });

        let initialSections = [];
        if (Array.isArray(project.sections)) {
            initialSections = project.sections;
        } else if (typeof project.sections === 'string') {
            try { initialSections = JSON.parse(project.sections); } catch(_) { initialSections = []; }
        }

        setSections(initialSections.map(s => ({
            id: s.id || ('sec_' + Math.random().toString(36).substr(2, 6)),
            heading: s.heading || '',
            content: s.content || '',
            image_url: s.image_url || '',
            newFile: null,
            preview: s.image_url || null
        })));

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
            'Mobile App': 'text-pink-600 bg-pink-50 border-pink-200',
            'Website': 'text-blue-600 bg-blue-50 border-blue-200',
            'ERP Solutions': 'text-purple-600 bg-purple-50 border-purple-200',
            'CRM Solutions': 'text-amber-600 bg-amber-50 border-amber-200',
            'AI & Automation': 'text-emerald-600 bg-emerald-50 border-emerald-200',
        };
        return colors[category] || 'text-slate-600 bg-slate-50 border-slate-200';
    };

    // ── FORM VIEW (ADD / EDIT) ──
    if (isFormOpen) {
        return (
            <div className="p-4 sm:p-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="text-sm text-slate-500 flex items-center gap-2 mb-2">
                            Dashboard <span className="text-slate-300">/</span> Recent Projects <span className="text-slate-300">/</span> {currentProject ? 'Edit Project' : 'Add Project'}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-200 text-white">
                                <Plus size={24} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">{currentProject ? 'Edit' : 'Add'} Recent Project</h1>
                                <p className="text-slate-500 text-sm">Configure project details, mockup frame, and optional multiple screenshot sections.</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={closeForm} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors font-medium">
                        <ArrowLeft size={18} /> Back to Projects
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-8">
                    {/* Top Row: Basic Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column (Main Cover Image & Summary) */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Main Image Upload */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-semibold text-slate-900">
                                        Main Cover Image / Thumbnail <span className="text-red-500">*</span>
                                    </label>
                                    <span className="text-xs text-slate-400">Shown on Recent Projects card</span>
                                </div>
                                <div 
                                    className={`border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-colors relative
                                        ${imagePreview ? 'border-slate-200 bg-slate-50' : 'border-pink-200 bg-pink-50/40 hover:bg-pink-50 hover:border-pink-400'}`}
                                    onClick={() => fileInputRef.current?.click()}
                                    style={{ height: '220px' }}
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
                                                <div className="bg-white text-slate-900 px-4 py-2 rounded-lg font-medium shadow-lg flex items-center gap-2 text-sm">
                                                    <Edit size={16}/> Change Cover Image
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                                            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                                                <UploadCloud className="text-pink-600" size={24} />
                                            </div>
                                            <p className="font-semibold text-slate-700 mb-1 text-sm">Click to upload main cover image</p>
                                            <p className="text-xs text-slate-500">JPG, PNG, WebP (Max 5MB)<br/>Recommended: 1200 x 800</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Project Title */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Project Title <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. AI-Powered Healthcare CRM or FinTech Mobile App" 
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-shadow text-sm"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                            </div>

                            {/* Project Summary */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Project Summary <span className="text-red-500">*</span>
                                </label>
                                <textarea 
                                    placeholder="Write a clear summary about what this project does and who it's for..." 
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-shadow resize-none text-sm"
                                    rows="4"
                                    maxLength={500}
                                    value={formData.summary}
                                    onChange={(e) => setFormData({...formData, summary: e.target.value})}
                                />
                                <div className="flex justify-end mt-1">
                                    <span className="text-xs text-slate-400 font-medium">{formData.summary.length}/500</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Settings & Types */}
                        <div className="space-y-6">
                            {/* Project Type (Controls Frame Display) */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Display Frame & Type <span className="text-pink-600 font-bold">*</span>
                                </label>
                                <select 
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-shadow bg-white font-medium text-sm"
                                    value={formData.project_type}
                                    onChange={(e) => setFormData({...formData, project_type: e.target.value})}
                                >
                                    {projectTypes.map(pt => (
                                        <option key={pt.id} value={pt.id}>{pt.label}</option>
                                    ))}
                                </select>
                                <p className="text-xs text-slate-500 mt-2">
                                    {formData.project_type === 'mobile_app' ? '✅ App screenshots will automatically display inside an ultra-realistic smartphone frame!' : '✅ Web projects will display inside an elegant browser/dashboard mockup!'}
                                </p>
                            </div>

                            {/* Category Badge */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Category / Module <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-shadow bg-white text-sm"
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                >
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            {/* Website Live URL */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Direct Live URL <span className="text-slate-400 font-normal">(Optional)</span>
                                </label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input 
                                        type="url" 
                                        placeholder="https://example.com" 
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-shadow text-sm"
                                        value={formData.website_url}
                                        onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2">If provided, user can click to redirect directly to the live app/site.</p>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-shadow bg-white font-medium text-sm"
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                >
                                    <option value="Active">Active (Visible on Website)</option>
                                    <option value="Inactive">Inactive (Hidden)</option>
                                </select>
                            </div>

                            {/* Display Order */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    Display Order <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="number" 
                                    min="1"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-shadow font-medium text-sm"
                                    value={formData.display_order}
                                    onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 1})}
                                />
                                <p className="text-xs text-slate-500 mt-2">Lower number (e.g. 1) displays first.</p>
                            </div>
                        </div>
                    </div>

                    {/* ── DYNAMIC SECTIONS REPEATER (MULTIPLE IMAGES + HEADINGS + CONTENT) ── */}
                    <div className="pt-8 border-t border-slate-100 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold uppercase tracking-wider mb-1">
                                    <Sparkles size={12} /> Optional Deep-Dive Sections
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">
                                    Project Screenshots & Content Sections
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Add multiple images with custom headings and descriptions (e.g. "Dashboard View", "Checkout Flow"). If you don't need extra images, leave this empty.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={addSection}
                                className="px-4 py-2.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all transform hover:scale-[1.02] active:scale-95"
                                style={{
                                    background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
                                    boxShadow: '0 4px 14px rgba(190, 24, 93, 0.25)'
                                }}
                            >
                                <Plus size={16} /> Add Image & Content Section
                            </button>
                        </div>

                        {sections.length === 0 ? (
                            <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-3 bg-slate-50/50">
                                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                                    <ImageIcon size={22} />
                                </div>
                                <h4 className="text-sm font-bold text-slate-700">No Extra Sections Added</h4>
                                <p className="text-xs text-slate-500 max-w-md mx-auto">
                                    This project will only display the main cover image. If you'd like to showcase more screens with explanations, click "Add Image & Content Section".
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {sections.map((sec, idx) => (
                                    <div 
                                        key={sec.id || idx}
                                        className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4 relative animate-in fade-in duration-200 shadow-sm"
                                    >
                                        <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                                            <div className="flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-lg bg-pink-600 text-white font-bold text-xs flex items-center justify-center">
                                                    {idx + 1}
                                                </span>
                                                <span className="font-bold text-slate-800 text-sm">
                                                    Section #{idx + 1}: {sec.heading || '(Untitled Heading)'}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    disabled={idx === 0}
                                                    onClick={() => moveSection(idx, -1)}
                                                    className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-30 flex items-center justify-center transition-colors"
                                                    title="Move Up"
                                                >
                                                    <ArrowUp size={14} />
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={idx === sections.length - 1}
                                                    onClick={() => moveSection(idx, 1)}
                                                    className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-30 flex items-center justify-center transition-colors"
                                                    title="Move Down"
                                                >
                                                    <ArrowDown size={14} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => removeSection(sec.id)}
                                                    className="w-7 h-7 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors ml-1"
                                                    title="Remove Section"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {/* Section Heading & Content */}
                                            <div className="md:col-span-2 space-y-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                                        Section Heading / Feature Title
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="e.g. Real-Time Telemetry & Reports Dashboard"
                                                        value={sec.heading}
                                                        onChange={(e) => updateSection(sec.id, 'heading', e.target.value)}
                                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                                        Description / Feature Details
                                                    </label>
                                                    <textarea 
                                                        rows="3"
                                                        placeholder="Describe what this screenshot demonstrates..."
                                                        value={sec.content}
                                                        onChange={(e) => updateSection(sec.id, 'content', e.target.value)}
                                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 text-sm resize-none"
                                                    />
                                                </div>
                                            </div>

                                            {/* Section Image Uploader */}
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                                    Screenshot Image
                                                </label>
                                                <div 
                                                    className="h-32 border-2 border-dashed border-slate-200 hover:border-pink-400 bg-white rounded-xl overflow-hidden relative cursor-pointer flex flex-col items-center justify-center text-center p-3 transition-colors"
                                                    onClick={() => document.getElementById(`sec-img-${sec.id}`)?.click()}
                                                >
                                                    <input 
                                                        id={`sec-img-${sec.id}`}
                                                        type="file"
                                                        accept="image/jpeg,image/png,image/webp"
                                                        className="hidden"
                                                        onChange={(e) => handleSectionImageChange(sec.id, e.target.files[0])}
                                                    />
                                                    {sec.preview || sec.image_url ? (
                                                        <>
                                                            <img 
                                                                src={sec.preview || sec.image_url} 
                                                                alt="Preview" 
                                                                className="w-full h-full object-cover" 
                                                            />
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                                                                <span className="text-white text-xs font-bold bg-slate-900/80 px-2.5 py-1 rounded-md">
                                                                    Change Image
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="space-y-1">
                                                            <UploadCloud size={20} className="text-pink-600 mx-auto" />
                                                            <p className="text-xs font-semibold text-slate-700">Upload Image</p>
                                                            <p className="text-[10px] text-slate-400">PNG, JPG up to 5MB</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="text-center pt-2">
                                    <button
                                        type="button"
                                        onClick={addSection}
                                        className="px-5 py-2.5 rounded-xl border-2 border-dashed border-pink-300 text-pink-700 hover:bg-pink-50 font-bold text-xs flex items-center justify-center gap-2 mx-auto transition-colors"
                                    >
                                        <Plus size={14} /> Add Another Section
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Save & Cancel Bar */}
                    <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-slate-100">
                        <button 
                            type="button"
                            onClick={closeForm}
                            disabled={processing}
                            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50 text-sm"
                        >
                            Cancel
                        </button>
                        <button 
                            type="button"
                            onClick={handleSave}
                            disabled={processing}
                            className="px-8 py-3 rounded-xl text-white font-semibold transition-all flex items-center gap-2 shadow-lg disabled:opacity-50 text-sm"
                            style={{
                                background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
                                boxShadow: '0 4px 16px rgba(190, 24, 93, 0.35)'
                            }}
                        >
                            {processing ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                            {currentProject ? 'Save Changes' : 'Publish Project'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── MAIN TABLE VIEW ──
    return (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto h-full flex flex-col">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <div className="text-sm text-slate-500 flex items-center gap-2 mb-2">
                        Dashboard <span className="text-slate-300">/</span> Recent Projects
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-200 text-white">
                            <Layers size={22} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Recent Projects</h1>
                            <p className="text-slate-500 text-sm">Manage projects showcased in the website's Recent Projects section.</p>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={openAddForm} 
                    className="px-5 py-2.5 rounded-xl text-white font-semibold shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                    style={{
                        background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
                        boxShadow: '0 4px 14px rgba(190, 24, 93, 0.35)'
                    }}
                >
                    <Plus size={18} /> Add Project
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-t-2xl border-b border-slate-100 shadow-sm flex flex-wrap gap-4 items-center justify-between">
                <div className="relative max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search projects by title or summary..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-500 transition-shadow text-sm"
                    />
                </div>
                <div className="flex items-center gap-3 flex-1 justify-end flex-wrap">
                    <select 
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-100 bg-white font-medium text-slate-700 cursor-pointer min-w-[150px] text-sm"
                    >
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-100 bg-white font-medium text-slate-700 cursor-pointer min-w-[130px] text-sm"
                    >
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <button 
                        type="button"
                        onClick={handleResetFilters}
                        className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-2 font-medium transition-colors text-sm"
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
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Category & Frame</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Sections</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Order</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-12 text-slate-500">
                                        <Loader2 size={24} className="animate-spin mx-auto mb-2 text-pink-600" />
                                        Loading projects...
                                    </td>
                                </tr>
                            ) : filteredProjects.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-12 text-slate-500">
                                        No projects found. Click "Add Project" to create one.
                                    </td>
                                </tr>
                            ) : (
                                filteredProjects.map((project, idx) => {
                                    const isApp = project.project_type === 'mobile_app' || project.category?.toLowerCase().includes('app');
                                    let secCount = 0;
                                    if (Array.isArray(project.sections)) secCount = project.sections.length;
                                    else if (typeof project.sections === 'string') {
                                        try { secCount = JSON.parse(project.sections).length; } catch(_) { secCount = 0; }
                                    }

                                    return (
                                        <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-500">
                                                {idx + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                                    {project.image_url ? (
                                                        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                            <ImageIcon size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900 text-sm line-clamp-1">{project.title}</div>
                                                <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{project.summary}</div>
                                                {project.website_url && (
                                                    <a 
                                                        href={project.website_url} 
                                                        target="_blank" 
                                                        rel="noreferrer" 
                                                        className="text-xs text-pink-600 hover:underline inline-flex items-center gap-1 mt-1"
                                                    >
                                                        {project.website_url.replace(/^https?:\/\//, '')} <LinkIcon size={10} />
                                                    </a>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1 items-start">
                                                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border ${getCategoryColor(project.category)}`}>
                                                        {project.category || 'General'}
                                                    </span>
                                                    <span className="text-[11px] text-slate-500 font-medium">
                                                        {isApp ? '📱 Phone Frame' : '🌐 Browser Frame'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                                                    {secCount} {secCount === 1 ? 'Section' : 'Sections'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border border-current/10 ${getStatusColor(project.status)} flex items-center gap-1.5 w-fit`}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>{project.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-600">
                                                #{project.display_order}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        onClick={() => openEditForm(project)} 
                                                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-pink-600 hover:border-pink-200 hover:bg-pink-50 flex items-center justify-center transition-colors"
                                                        title="Edit Project"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => openView(project)} 
                                                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 flex items-center justify-center transition-colors"
                                                        title="Preview Project Case Study"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => { setDeleteId(project.id); setIsDeleteOpen(true); }} 
                                                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-colors"
                                                        title="Delete Project"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 mt-auto flex items-center justify-between text-sm text-slate-500">
                    <div>Showing {filteredProjects.length} of {projects.length} projects</div>
                </div>
            </div>

            {/* ── ADMIN VIEW MODAL (PREVIEW) ── */}
            {isViewOpen && currentProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 relative my-auto">
                        <div className="relative h-64 bg-slate-900 border-b border-slate-100">
                            {currentProject.image_url ? (
                                <img src={currentProject.image_url} alt={currentProject.title} className="w-full h-full object-cover object-top" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center"><ImageIcon size={48} className="text-slate-300"/></div>
                            )}
                            <button onClick={() => setIsViewOpen(false)} className="absolute top-4 right-4 w-8 h-8 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">{currentProject.title}</h2>
                                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${getCategoryColor(currentProject.category)}`}>
                                            {currentProject.category}
                                        </span>
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border border-current/10 ${getStatusColor(currentProject.status)} flex items-center gap-1.5`}>
                                            <div className="w-1.5 h-1.5 rounded-full bg-current"></div>{currentProject.status}
                                        </span>
                                        <span className="text-sm font-medium text-slate-500">Display Order: #{currentProject.display_order}</span>
                                    </div>
                                </div>
                                {currentProject.website_url && (
                                    <a href={currentProject.website_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg transition-colors text-sm shrink-0">
                                        Visit Live <LinkIcon size={14} />
                                    </a>
                                )}
                            </div>
                            
                            <div className="text-slate-600 text-sm leading-relaxed">
                                <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider mb-1">Summary:</h4>
                                <p>{currentProject.summary}</p>
                            </div>

                            {/* Extra Sections Preview in Admin View */}
                            {currentProject.sections && (
                                <div className="pt-4 border-t border-slate-100 space-y-4">
                                    <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider">
                                        Additional Sections & Screenshots
                                    </h4>
                                    {(Array.isArray(currentProject.sections) ? currentProject.sections : (() => {
                                        try { return JSON.parse(currentProject.sections); } catch(_) { return []; }
                                    })()).map((s, idx) => (
                                        <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                                            <div className="font-bold text-slate-900 text-sm">#{idx + 1} {s.heading}</div>
                                            {s.content && <p className="text-xs text-slate-600">{s.content}</p>}
                                            {s.image_url && (
                                                <img src={s.image_url} alt={s.heading} className="w-full h-40 object-cover rounded-lg border border-slate-200 mt-2" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ── DELETE MODAL ── */}
            {isDeleteOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Project</h3>
                        <p className="text-slate-500 mb-6 text-sm">Are you sure you want to delete this project? This will remove it from the Recent Projects section.</p>
                        <div className="flex gap-3 justify-center">
                            <button disabled={processing} onClick={() => setIsDeleteOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 text-sm">Cancel</button>
                            <button disabled={processing} onClick={handleDelete} className="px-5 py-2.5 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700 flex items-center gap-2 text-sm shadow-md">
                                {processing ? <Loader2 size={16} className="animate-spin"/> : null} Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
