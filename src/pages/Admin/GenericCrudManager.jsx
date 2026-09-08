import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

const GenericCrudManager = ({ title, endpoint, columns, formFields }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});
    const [isUploading, setIsUploading] = useState(false);

    const token = sessionStorage.getItem('adminToken');

    const handleImageUpload = async (e, fieldKey) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const fd = new FormData();
        fd.append('image', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: fd
            });
            if (res.ok) {
                const data = await res.json();
                setFormData(prev => ({ ...prev, [fieldKey]: data.url }));
            } else {
                alert('Image upload failed.');
            }
        } catch (err) {
            console.error(err);
            alert('Upload network error.');
        } finally {
            setIsUploading(false);
        }
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`/api/${endpoint}`);
            if (res.ok) {
                const json = await res.json();
                setData(json);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingId(item.id);
            setFormData(item);
        } else {
            setEditingId(null);
            const emptyData = {};
            formFields.forEach(f => emptyData[f.key] = '');
            setFormData(emptyData);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({});
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/${endpoint}/${editingId}` : `/api/${endpoint}`;

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                fetchData();
                handleCloseModal();
            } else {
                alert('Failed to save data. Please check connection.');
            }
        } catch (e) {
            console.error(e);
            alert('Network Error');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        try {
            const res = await fetch(`/api/${endpoint}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchData();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{title}</h1>
                <button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold transition shadow-sm w-fit">
                    <Plus size={18} /> Add New
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto min-h-[300px]">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                {columns.map(c => <th key={c.key} className="p-4 text-sm font-bold tracking-wide text-slate-500 uppercase">{c.label}</th>)}
                                <th className="p-4 text-sm font-bold tracking-wide text-slate-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={columns.length + 1} className="p-12 text-center text-slate-500 font-semibold animate-pulse">Loading data...</td></tr>
                            ) : data.length === 0 ? (
                                <tr><td colSpan={columns.length + 1} className="p-12 text-center text-slate-400 font-semibold">No records found. Click 'Add New' to create one.</td></tr>
                            ) : (
                                data.map(row => (
                                    <tr key={row.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition">
                                        {columns.map(c => (
                                            <td key={c.key} className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300 max-w-[200px] truncate">
                                                {row[c.key]}
                                            </td>
                                        ))}
                                        <td className="p-4 flex items-center justify-end gap-2">
                                            <button onClick={() => handleOpenModal(row)} className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(row.id)} className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-3xl rounded-[2rem] shadow-2xl relative max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
                        <div className="p-6 md:p-8 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-white/90 dark:bg-slate-800/90 rounded-t-[2rem] shrink-0">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{editingId ? 'Edit Configuration' : 'Create New Record'}</h2>
                            <button type="button" onClick={handleCloseModal} className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500 transition"><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 custom-scrollbar">
                            {formFields.map(field => (
                                <div key={field.key} className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-200">{field.label} {field.required && <span className="text-red-500">*</span>}</label>

                                    {field.type === 'textarea' ? (
                                        <textarea
                                            required={field.required}
                                            rows={5}
                                            className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white font-medium resize-y"
                                            value={formData[field.key] || ''}
                                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                        />
                                    ) : field.type === 'select' ? (
                                        <select
                                            required={field.required}
                                            className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white font-medium appearance-none"
                                            value={formData[field.key] || ''}
                                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                        >
                                            <option value="">Select option...</option>
                                            {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    ) : field.type === 'image' ? (
                                        <div className="flex gap-4 items-start">
                                            <div className="flex-1 flex flex-col gap-2 relative">
                                                <label className={`w-full p-4 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition ${isUploading ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300' : 'bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                                                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                                                        {isUploading ? 'Uploading Please Wait...' : 'Click to Upload Image'}
                                                    </span>
                                                    <input
                                                        disabled={isUploading}
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handleImageUpload(e, field.key)}
                                                    />
                                                </label>
                                                {/* Hidden input to ensure required validation passes if url exists */}
                                                <input type="text" className="hidden" required={field.required} value={formData[field.key] || ''} onChange={() => { }} />

                                                {formData[field.key] && <p className="text-[10px] text-slate-400 truncate w-full">{formData[field.key]}</p>}
                                            </div>
                                            {formData[field.key] ? (
                                                <img src={formData[field.key]} alt="Preview" className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-sm shrink-0" onError={(e) => e.target.style.display = 'none'} />
                                            ) : (
                                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 flex items-center justify-center rounded-xl text-slate-400 border border-slate-200 dark:border-slate-700 shrink-0"><ImageIcon size={24} /></div>
                                            )}
                                        </div>
                                    ) : (
                                        <input
                                            type={field.type || 'text'}
                                            required={field.required}
                                            className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white font-medium"
                                            value={formData[field.key] || ''}
                                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                        />
                                    )}
                                </div>
                            ))}

                            <div className="pt-6 mt-4 flex flex-col md:flex-row justify-end gap-3 shrink-0">
                                <button type="button" onClick={handleCloseModal} className="w-full md:w-auto px-8 py-3.5 rounded-xl font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition">Cancel Process</button>
                                <button type="submit" className="w-full md:w-auto px-8 py-3.5 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition">Save Data Link</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default GenericCrudManager;
