import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                sessionStorage.setItem('adminToken', data.token);
                navigate('/admin');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Network error connecting to backend.');
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-900 fixed inset-0 z-50">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl m-4">
                <h2 className="text-2xl font-bold text-center mb-2 text-slate-800">Tafinity CMS</h2>
                <p className="text-center text-slate-500 mb-6">Enter your credentials to continue</p>

                {error && <div className="bg-red-50 text-red-500 text-sm text-center p-3 rounded-lg mb-4 font-semibold">{error}</div>}

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-800"
                        value={username} onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-800"
                        value={password} onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition-colors mt-2 shadow-sm">
                        Sign In to CMS
                    </button>
                </form>
            </div>
        </div>
    );
};
export default AdminLogin;
