import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ArrowLeft, ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
    const token = sessionStorage.getItem('adminToken');
    const navigate = useNavigate();

    // If admin is already authenticated, redirect straight to dashboard
    if (token) {
        return <Navigate to="/tai" replace />;
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showForgotNotice, setShowForgotNotice] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                sessionStorage.setItem('adminToken', data.token);
                // Replace login entry in browser history so pressing Back never returns to login
                navigate('/tai', { replace: true });
            } else {
                setError(data.error || 'Invalid username or password. Please try again.');
            }
        } catch (err) {
            setError('Network error connecting to backend service.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f4efe6] relative overflow-hidden px-4 py-8 font-sans">
            
            {/* Top Left Return to Site Link */}
            <div className="absolute top-5 left-5 z-20">
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors py-1.5 px-3 rounded-full bg-white/70 backdrop-blur-xs border border-stone-200/80 shadow-2xs"
                >
                    <ArrowLeft size={14} />
                    <span>Back to Website</span>
                </Link>
            </div>

            {/* Subtle luxury ambient glow on beige canvas */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

            {/* Central Minimalist Sign In Card */}
            <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl shadow-stone-800/5 border border-stone-200/80 p-8 sm:p-12 relative z-10 animate-in fade-in zoom-in-95 duration-300">
                
                {/* Brand Logo Square (Styled matching the reference screenshot) */}
                <div className="w-14 h-14 mx-auto mb-6 rounded-lg bg-[#d97706] flex items-center justify-center shadow-md shadow-amber-600/25 p-2.5 transition-transform hover:scale-105">
                    <img 
                        src="/logo.png" 
                        alt="TafinityAI Logo" 
                        className="w-full h-full object-contain filter brightness-0 invert" 
                    />
                </div>

                {/* Headings */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 tracking-tight mb-2">
                        Sign in
                    </h1>
                    <p className="text-sm text-slate-500 font-normal">
                        to continue to Tafinity CMS
                    </p>
                </div>

                {/* Error Alert Message */}
                {error && (
                    <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                        <ShieldAlert size={16} className="shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    
                    {/* Username / Email Field */}
                    <div className="relative">
                        <input
                            type="text"
                            id="username"
                            required
                            autoFocus
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Email or Username"
                            className="w-full py-2.5 text-slate-800 bg-transparent border-b border-slate-300 focus:border-[#d97706] outline-none text-sm sm:text-base transition-colors placeholder:text-slate-400 font-normal"
                        />
                    </div>

                    {/* Password Field with Eye Toggle */}
                    <div className="relative pt-2">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full py-2.5 pr-10 text-slate-800 bg-transparent border-b border-slate-300 focus:border-[#d97706] outline-none text-sm sm:text-base transition-colors placeholder:text-slate-400 font-normal"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition p-1 cursor-pointer"
                            tabIndex={-1}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Action Row: Forgot Password & Next Button */}
                    <div className="pt-6 flex items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={() => setShowForgotNotice(true)}
                            className="text-xs sm:text-sm font-semibold text-[#d97706] hover:text-amber-700 transition-colors cursor-pointer text-left"
                        >
                            Forgot password?
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-2.5 rounded-md bg-[#d97706] hover:bg-[#b45309] text-white font-semibold text-sm shadow-md shadow-amber-600/20 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                <span>Next</span>
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer Separator & Copyright */}
                <div className="mt-12 pt-6 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-400 font-normal">
                        &copy; 2026 TafinityAI LLP. Professional CMS Suite.
                    </p>
                </div>

            </div>

            {/* Forgot Password Helper Modal */}
            {showForgotNotice && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 animate-in zoom-in-95">
                        <h3 className="text-base font-bold text-slate-900 mb-2">
                            Reset Admin Credentials
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                            For security purposes, administrative account resets require verification from the lead database architect.
                        </p>
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-800 font-medium mb-5">
                            Contact: <span className="font-bold select-all">admin@tafinityai.com</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowForgotNotice(false)}
                            className="w-full py-2.5 rounded-lg bg-[#d97706] text-white text-xs font-bold hover:bg-[#b45309] transition cursor-pointer"
                        >
                            Got It
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminLogin;
