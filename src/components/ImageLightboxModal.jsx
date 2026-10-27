import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ExternalLink } from 'lucide-react';

export default function ImageLightboxModal({ isOpen, onClose, imageUrl, title }) {
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

    if (!isOpen || !imageUrl) return null;

    const modalContent = (
        <div 
            className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
            onClick={onClose}
        >
            {/* Top Toolbar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-full border border-white/10 pointer-events-auto max-w-[70%] truncate">
                    {title || 'Project Preview'}
                </div>
                <div className="flex items-center gap-2 pointer-events-auto">
                    <a
                        href={imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10"
                        title="Open Original"
                    >
                        <ExternalLink size={18} />
                    </a>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-pink-600 hover:bg-pink-700 text-white flex items-center justify-center transition-colors shadow-lg shadow-pink-600/30"
                        title="Close (Esc)"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Image Container */}
            <div 
                className="max-w-[92vw] max-h-[85vh] flex items-center justify-center select-none"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={imageUrl}
                    alt={title || 'Preview'}
                    className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
                />
            </div>
        </div>
    );

    return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
}
