import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, CheckCircle2, LayoutDashboard, Users, BarChart3,
    Settings, ShoppingBag, Heart, Star, CreditCard, Database,
    Cloud, Shield, Home, Bell, Search, Activity, Zap, Monitor,
    Files, Play, Mail, FileText, MousePointer, Paintbrush, Box, Sliders
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// ─── Shared style tokens ───────────────────────────────────────────────────
const C = {
    header: '#cbd5e1', card: '#ffffff', text: '#94a3b8', textLight: '#cbd5e1',
    textDark: '#475569', title: '#334155', img: '#e2e8f0', price: '#10b981',
    btnPrimary: '#0ea5e9', success: '#22c55e', sidebar: '#1e293b',
    avatar: '#94a3b8', blue: '#3b82f6', purple: '#a855f7', green: '#22c55e',
};
const row = (extra = {}) => ({ display: 'flex', ...extra });
const col = (extra = {}) => ({ display: 'flex', flexDirection: 'column', ...extra });

// ─── Websites Mockup (Realistic Landing Page) ──────────────────────────────
const WebsiteMockup = ({ step }) => (
    <div style={col({ height: '100%', boxSizing: 'border-box', background: '#fafafa', position: 'relative', overflow: 'hidden' })}>
        {/* Background Grid Pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '16px 16px', opacity: 0.5, pointerEvents: 'none' }}></div>

        {/* Floating Glows */}
        <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, background: '#38bdf8', filter: 'blur(50px)', opacity: 0.3 }}></div>
        <div style={{ position: 'absolute', bottom: -30, left: -30, width: 100, height: 100, background: '#818cf8', filter: 'blur(50px)', opacity: 0.3 }}></div>

        {/* Modern Navbar */}
        <div style={row({ alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(226,232,240,0.8)', zIndex: 10 })}>
            <div style={{ fontWeight: 800, fontSize: 13, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: 'linear-gradient(135deg, #0ea5e9, #6366f1)' }}></div>
                Nova.UI
            </div>
            <div style={row({ gap: 14, alignItems: 'center' })}>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#475569' }}>Products</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#475569' }}>Docs</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#0f172a', color: '#fff', fontSize: 10, padding: '4px 12px', borderRadius: 20, fontWeight: 600, boxShadow: '0 4px 10px rgba(15,23,42,0.2)' }}>Login <ArrowRight size={10} /></div>
            </div>
        </div>

        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', zIndex: 2, position: 'relative' }}>
            {step === 0 && (
                <div style={col({ gap: 10, alignItems: 'center', textAlign: 'center', marginTop: 0 })}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: '#0284c7', background: '#e0f2fe', padding: '4px 12px', borderRadius: 99, border: '1px solid #bae6fd' }}>Announcing Nova V2.0 🚀</div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.5px' }}>
                        Ship Products <br /><span style={{ background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>At Light Speed.</span>
                    </div>

                    {/* Complex Hero Image / UI Panel */}
                    <div style={{ width: '100%', height: 120, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', marginTop: 10, position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', display: 'flex', overflow: 'hidden' }}>
                        <div style={{ width: 40, background: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <div style={{ width: 14, height: 14, borderRadius: 4, background: '#e2e8f0' }}></div>
                            <div style={{ width: 14, height: 14, borderRadius: 4, background: '#e2e8f0' }}></div>
                            <div style={{ width: 14, height: 14, borderRadius: 4, background: '#e2e8f0' }}></div>
                        </div>
                        <div style={{ flex: 1, padding: 12, backgroundImage: 'linear-gradient(to right, #f8fafc 1px, transparent 1px), linear-gradient(to bottom, #f8fafc 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
                            <div style={{ width: '60%', height: '100%', border: '2px solid #0ea5e9', background: 'rgba(14,165,233,0.1)', borderRadius: 8, position: 'relative' }}>
                                <div style={{ position: 'absolute', top: -4, left: -4, width: 6, height: 6, background: '#fff', border: '1px solid #0ea5e9' }}></div>
                                <div style={{ position: 'absolute', bottom: -4, right: -4, width: 6, height: 6, background: '#fff', border: '1px solid #0ea5e9' }}></div>
                            </div>
                        </div>
                        {/* Floating Chart Card */}
                        <div style={{ position: 'absolute', right: -10, top: 20, width: 90, height: 60, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.8)', borderRadius: 8, boxShadow: '0 10px 15px rgba(0,0,0,0.1)', padding: 6, display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                            {[20, 50, 30, 80, 60, 100].map((h, i) => (
                                <div key={i} style={{ flex: 1, height: `${h}%`, background: '#8b5cf6', borderRadius: 2 }}></div>
                            ))}
                            <div style={{ position: 'absolute', top: 6, left: 6, fontSize: 8, fontWeight: 700, color: '#334155' }}>Sales Growth</div>
                        </div>
                    </div>
                </div>
            )}

            {step === 1 && (
                <div style={col({ gap: 12, flex: 1 })}>
                    <div style={col({ textAlign: 'center', marginBottom: 4 })}>
                        <div style={{ fontSize: 16, fontWeight: 900, color: '#0f172a' }}>Bento Box Grid</div>
                    </div>
                    {/* Bento Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 10, flex: 1 }}>
                        <div style={{ gridColumn: '1 / -1', background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                            <div style={col({ gap: 4 })}>
                                <span style={{ fontSize: 12, fontWeight: 800, color: '#0f172a' }}>Global Edge Network</span>
                                <span style={{ fontSize: 9, color: '#64748b' }}>Deploy across 120 regions.</span>
                            </div>
                            <Cloud size={24} color="#0ea5e9" strokeWidth={1.5} />
                        </div>

                        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Shield size={16} color="#ef4444" />
                            </div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: '#334155' }}>Hardened Auth</div>
                        </div>

                        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Monitor size={16} color="#0ea5e9" />
                            </div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: '#334155' }}>Realtime Sync</div>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div style={col({ flex: 1, gap: 12, alignItems: 'center', justifyContent: 'center', paddingTop: 10 })}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', textAlign: 'center' }}>Seamless Integrations</div>
                    {/* Complex Node integration diagram */}
                    <div style={{ width: '100%', flex: 1, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.02)' }}>

                        {/* Center Hub */}
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #0f172a, #334155)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, boxShadow: '0 10px 20px rgba(15,23,42,0.3)' }}>
                            <span style={{ color: '#fff', fontWeight: 900, fontSize: 14 }}>N</span>
                        </div>

                        {/* Connecting lines */}
                        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, overflow: 'visible' }}>
                            <path d="M 45 40 Q 120 40, 160 70" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                            <path d="M 275 40 Q 200 40, 160 70" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                            <path d="M 160 70 L 160 120" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                        </svg>

                        {/* Satellite Nodes */}
                        <div style={{ position: 'absolute', top: 20, left: 30, width: 32, height: 32, borderRadius: 8, background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                            <Cloud size={16} color="#3b82f6" />
                        </div>
                        <div style={{ position: 'absolute', top: 20, right: 30, width: 32, height: 32, borderRadius: 8, background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                            <Database size={16} color="#ef4444" />
                        </div>
                        <div style={{ position: 'absolute', bottom: 20, left: 144, width: 32, height: 32, borderRadius: 8, background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                            <Settings size={16} color="#10b981" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);

// ─── CRM Mockup (Realistic) ────────────────────────────────────────────────
const CRMMockup = ({ step }) => (
    <div style={col({ padding: 16, gap: 12, height: '100%', boxSizing: 'border-box' })}>
        {/* Top Header */}
        <div style={row({ alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #e2e8f0' })}>
            <div style={row({ alignItems: 'center', gap: 8 })}>
                <Users size={18} color="#0ea5e9" />
                <span style={{ fontWeight: 600, fontSize: 13, color: '#334155' }}>CRM Portal</span>
            </div>
            <div style={row({ gap: 10 })}>
                <Search size={14} color="#94a3b8" />
                <Bell size={14} color="#94a3b8" />
            </div>
        </div>

        {step === 0 && (
            <div style={col({ gap: 12, flex: 1, marginTop: 4 })}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Sales Pipeline</div>
                <div style={row({ gap: 12, flex: 1 })}>
                    {['Lead', 'In Progress', 'Won'].map((t, i) => (
                        <div key={i} style={col({ flex: 1, gap: 8 })}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{t} ({3 - i})</div>
                            <div style={{ flex: 1, background: '#f1f5f9', borderRadius: 4, padding: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {[...Array(3 - i)].map((_, j) => (
                                    <div key={j} style={{ background: '#fff', borderRadius: 4, padding: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                        <div style={{ fontSize: 11, fontWeight: 600, color: '#334155' }}>Client XYZ</div>
                                        <div style={{ fontSize: 9, color: '#10b981', fontWeight: 600 }}>$12,000</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {step === 1 && (
            <div style={col({ gap: 12, flex: 1, marginTop: 4 })}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Lead Management</div>
                <div style={col({ gap: 8 })}>
                    {[
                        { name: "John Doe", type: "VP of Sales", amt: "High Probability" },
                        { name: "Sarah Smith", type: "CTO, Tech Co", amt: "In Negotiation" },
                        { name: "Tech Corp", type: "Enterprise Lead", amt: "Meeting Set" },
                    ].map((u, i) => (
                        <div key={i} style={row({ alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#f8fafc', borderRadius: 6, border: '1px solid #e2e8f0' })}>
                            <div style={row({ alignItems: 'center', gap: 10 })}>
                                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={14} color="#64748b" /></div>
                                <div style={col()}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{u.name}</span>
                                    <span style={{ fontSize: 11, color: '#64748b' }}>{u.type}</span>
                                </div>
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 600, color: '#0ea5e9' }}>{u.amt}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {step === 2 && (
            <div style={col({ gap: 12, flex: 1, marginTop: 4 })}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Automated Flows</div>
                <div style={col({ gap: 12, alignItems: 'center', alignContent: 'center', paddingTop: 20 })}>
                    <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '8px 16px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#0369a1' }}>New Lead Captured</div>
                    <div style={{ width: 2, height: 16, background: '#cbd5e1' }}></div>
                    <div style={{ background: '#fef9c3', border: '1px solid #fde047', padding: '8px 16px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#854d0e' }}>Send Intro Email</div>
                    <div style={{ width: 2, height: 16, background: '#cbd5e1' }}></div>
                    <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', padding: '8px 16px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#065f46' }}>Assign to Sales Rep</div>
                </div>
            </div>
        )}
    </div>
);

// ─── Desktop App Mockup (Realistic Native App) ─────────────────────────────
const DesktopMockup = ({ step }) => (
    <div style={col({ height: '100%', boxSizing: 'border-box', background: '#272822' })}>
        {/* Native macOS style menu bar (Dark mode) */}
        <div style={row({ alignItems: 'center', padding: '4px 12px', background: '#1e1f1c', borderBottom: '1px solid #111111', fontSize: 10, color: '#a0a0a0', gap: 16, fontWeight: 600 })}>
            <span style={{ color: '#fff' }}>TafinityApp</span>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Terminal</span>
            <span>Help</span>
        </div>

        <div style={row({ flex: 1, overflow: 'hidden' })}>
            {/* Native Sidebar */}
            <div style={col({ width: 140, background: '#272822', borderRight: '1px solid #1e1f1c', fontSize: 11, color: '#f8f8f2' })}>
                <div style={{ padding: '8px 12px', fontWeight: 700, opacity: 0.6, fontSize: 9, textTransform: 'uppercase' }}>Explorer</div>
                <div style={col({ gap: 6, padding: '0 12px' })}>
                    <div style={row({ alignItems: 'center', gap: 6 })}><Files size={12} color="#0ea5e9" /> <span>src</span></div>
                    <div style={row({ alignItems: 'center', gap: 6, paddingLeft: 12, background: '#3e3d32', borderRadius: 4 })}><FileText size={12} color="#f59e0b" /> <span style={{ color: '#fff' }}>main.js</span></div>
                    <div style={row({ alignItems: 'center', gap: 6, paddingLeft: 12 })}><FileText size={12} color="#0ea5e9" /> <span>styles.css</span></div>
                    <div style={row({ alignItems: 'center', gap: 6 })}><Box size={12} color="#a0a0a0" /> <span style={{ opacity: 0.8 }}>node_modules</span></div>
                </div>
            </div>

            {/* Editor Space */}
            <div style={col({ flex: 1, background: '#272822' })}>

                {step === 0 && (
                    <div style={col({ flex: 1, padding: 16, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6 })}>
                        <span style={{ color: '#f92672' }}>import</span> <span style={{ color: '#f8f8f2' }}>React</span> <span style={{ color: '#f92672' }}>from</span> <span style={{ color: '#e6db74' }}>'react'</span>;
                        <br />
                        <span style={{ color: '#66d9ef' }}>function</span> <span style={{ color: '#a6e22e' }}>NativeWindow</span>() {'{'}
                        <div style={{ paddingLeft: 20 }}>
                            <span style={{ color: '#f92672' }}>const</span> <span style={{ color: '#f8f8f2' }}>fs </span> <span style={{ color: '#f92672' }}>=</span> <span style={{ color: '#66d9ef' }}>require</span>(<span style={{ color: '#e6db74' }}>'fs'</span>);<br />
                            <span style={{ color: '#f8f8f2' }}>fs.</span><span style={{ color: '#a6e22e' }}>readFile</span>(<span style={{ color: '#e6db74' }}>'desktop.js'</span>);<br /><br />
                            <span style={{ color: '#f92672' }}>return</span> {'<'}<span style={{ color: '#f92672' }}>App</span> {'/>'};
                        </div>
                        {'}'}
                        <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
                            <div style={{ background: '#f92672', color: '#fff', padding: '4px 12px', borderRadius: 4, fontSize: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Play size={10} fill="white" /> Execute</div>
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <div style={row({ flex: 1, borderTop: '1px solid #1e1f1c' })}>
                        {/* Visual Editor Tool Palette */}
                        <div style={col({ width: 36, borderRight: '1px solid #1e1f1c', alignItems: 'center', padding: '8px 0', gap: 12 })}>
                            <MousePointer size={14} color="#fff" />
                            <Paintbrush size={14} color="#a0a0a0" />
                            <FileText size={14} color="#a0a0a0" />
                        </div>
                        {/* Canvas */}
                        <div style={{ flex: 1, background: '#1e1f1c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: 120, height: 160, background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: -10, left: -10, width: 6, height: 6, border: '2px solid #0ea5e9' }}></div>
                                <div style={{ position: 'absolute', bottom: -10, right: -10, width: 6, height: 6, border: '2px solid #0ea5e9' }}></div>
                                <div style={{ width: '100%', height: 40, background: '#3b82f6', color: '#fff', fontSize: 9, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Hero Section</div>
                            </div>
                        </div>
                        {/* Inspector */}
                        <div style={col({ width: 100, borderLeft: '1px solid #1e1f1c', padding: 8, gap: 12, fontSize: 9, color: '#f8f8f2' })}>
                            <div><strong>Properties</strong></div>
                            <div style={row({ justifyContent: 'space-between' })}><span>W</span> <span>1920</span></div>
                            <div style={row({ justifyContent: 'space-between' })}><span>H</span> <span>1080</span></div>
                            <div style={{ borderTop: '1px solid #3b3a32', margin: '4px 0' }}></div>
                            <div style={row({ justifyContent: 'space-between' })}><span>Fill</span> <div style={{ width: 12, height: 12, background: '#3b82f6' }}></div></div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div style={col({ flex: 1, background: '#272822', padding: 16 })}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 16 }}>System Performance Monitor</div>
                        <div style={row({ alignItems: 'flex-end', justifyContent: 'space-between', height: 80, borderBottom: '1px solid #444', paddingBottom: 4 })}>
                            {[60, 85, 45, 90, 55, 75, 40, 95, 65, 80].map((h, i) => (
                                <div key={i} style={{ width: '8%', height: `${h}%`, background: h > 85 ? '#f92672' : '#a6e22e', borderRadius: '2px 2px 0 0' }}></div>
                            ))}
                        </div>
                        <div style={row({ justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: '#a0a0a0' })}>
                            <span>CPU Thread Load</span>
                            <span>92% Peak</span>
                        </div>

                        <div style={row({ gap: 8, marginTop: 16 })}>
                            <div style={{ background: '#3e3d32', padding: '6px 12px', borderRadius: 4, fontSize: 10, color: '#f8f8f2', display: 'flex', alignItems: 'center', gap: 6 }}><Sliders size={12} /> Tuner</div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    </div>
);

// ─── Ecommerce Mockup (Realistic) ──────────────────────────────────────────
const EcommerceMockup = ({ step }) => (
    <div style={col({ padding: 16, gap: 12, height: '100%', boxSizing: 'border-box' })}>
        {/* Nav */}
        <div style={row({ alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #e2e8f0' })}>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#111827', letterSpacing: '-0.5px' }}>StoreFront.</div>
            <div style={row({ gap: 12 })}>
                <Search size={16} color="#64748b" />
                <div style={{ position: 'relative' }}>
                    <ShoppingBag size={16} color="#64748b" />
                    <div style={{ position: 'absolute', top: -4, right: -4, width: 12, height: 12, background: '#ef4444', borderRadius: '50%', color: '#fff', fontSize: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>
                </div>
            </div>
        </div>

        {step === 0 && (
            <div style={col({ gap: 12, flex: 1, marginTop: 4 })}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#334155' }}>Trending Products</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                        { img: 'bg-blue-100', name: 'Nike Air Max', price: '$120.00' },
                        { img: 'bg-orange-100', name: 'Urban Hoodie', price: '$65.00' },
                        { img: 'bg-green-100', name: 'Smart Watch', price: '$199.99' },
                        { img: 'bg-purple-100', name: 'Wireless Buds', price: '$89.00' },
                    ].map((p, i) => (
                        <div key={i} style={col({ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' })}>
                            <div style={{ height: 75, background: i % 2 === 0 ? '#f1f5f9' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ShoppingBag size={24} color={i % 2 === 0 ? '#94a3b8' : '#cbd5e1'} />
                            </div>
                            <div style={col({ padding: 8 })}>
                                <span style={{ fontSize: 11, fontWeight: 600, color: '#334155' }}>{p.name}</span>
                                <div style={row({ justifyContent: 'space-between', alignItems: 'center', marginTop: 4 })}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0ea5e9' }}>{p.price}</span>
                                    <Heart size={12} color="#94a3b8" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {step === 1 && (
            <div style={row({ gap: 16, flex: 1, marginTop: 4 })}>
                <div style={{ width: '45%', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingBag size={48} color="#94a3b8" />
                </div>
                <div style={col({ flex: 1, justifyContent: 'center', gap: 6 })}>
                    <div style={row({ gap: 4 })}>
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} color={i < 5 ? "#f59e0b" : "#cbd5e1"} fill={i < 5 ? "#f59e0b" : "none"} />)}
                        <span style={{ fontSize: 10, color: '#64748b', marginLeft: 4 }}>(124)</span>
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 800, color: '#1e293b', lineHeight: 1.2 }}>Premium Urban Hoodie</span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#0ea5e9' }}>$65.00</span>
                    <p style={{ fontSize: 10, color: '#64748b', margin: 0, lineHeight: 1.4 }}>100% cotton, relaxed fit. Perfect for all weather conditions.</p>
                    <button style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 0', fontSize: 12, fontWeight: 600, marginTop: 8, cursor: 'pointer' }}>
                        Add to Cart
                    </button>
                </div>
            </div>
        )}

        {step === 2 && (
            <div style={col({ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 })}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 6px rgba(16, 185, 129, 0.2)' }}>
                        <CheckCircle2 size={24} color="#fff" />
                    </div>
                </div>
                <div style={col({ alignItems: 'center' })}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#065f46' }}>Payment Success!</span>
                    <span style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Order #8492-AX2</span>
                </div>
                <div style={col({ width: '80%', padding: 12, border: '1px solid #e2e8f0', borderRadius: 8, background: '#f8fafc', gap: 8 })}>
                    <div style={row({ justifyContent: 'space-between', fontSize: 11, color: '#475569' })}>
                        <span>Amount paid</span>
                        <span style={{ fontWeight: 700 }}>$65.00</span>
                    </div>
                    <div style={row({ justifyContent: 'space-between', fontSize: 11, color: '#475569' })}>
                        <span>Paid with</span>
                        <span style={row({ alignItems: 'center', gap: 4, fontWeight: 600 })}><CreditCard size={12} /> **** 4242</span>
                    </div>
                </div>
            </div>
        )}
    </div>
);

// ─── ERP / Cloud Mockup (Realistic) ─────────────────────────────────────────
const ERPMockup = ({ step }) => (
    <div style={row({ height: '100%', boxSizing: 'border-box' })}>
        {/* Dark Sidebar */}
        <div style={col({ width: 120, background: '#0f172a', padding: 16, gap: 20 })}>
            <div style={row({ alignItems: 'center', gap: 8 })}>
                <Cloud size={20} color="#38bdf8" />
                <span style={{ color: '#fff', fontSize: 14, fontWeight: 800, letterSpacing: 1 }}>ERP</span>
            </div>
            <div style={col({ gap: 12 })}>
                <div style={row({ gap: 8, alignItems: 'center', color: '#f8fafc' })}>
                    <LayoutDashboard size={14} /> <span style={{ fontSize: 11, fontWeight: 600 }}>Overview</span>
                </div>
                <div style={row({ gap: 8, alignItems: 'center', color: '#94a3b8' })}>
                    <Database size={14} /> <span style={{ fontSize: 11, fontWeight: 600 }}>Resources</span>
                </div>
                <div style={row({ gap: 8, alignItems: 'center', color: '#94a3b8' })}>
                    <Users size={14} /> <span style={{ fontSize: 11, fontWeight: 600 }}>HR Module</span>
                </div>
                <div style={row({ gap: 8, alignItems: 'center', color: '#94a3b8' })}>
                    <Settings size={14} /> <span style={{ fontSize: 11, fontWeight: 600 }}>Global Setup</span>
                </div>
            </div>
        </div>

        {/* Main Content */}
        <div style={col({ flex: 1, padding: 16, background: '#f8fafc', gap: 16 })}>
            <div style={row({ justifyContent: 'space-between', alignItems: 'center' })}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>
                    {step === 0 ? "Analytics Engine" : step === 1 ? "Database Instances" : "Resource Allocation"}
                </span>
                <span style={{ fontSize: 11, color: '#64748b', background: '#e2e8f0', padding: '4px 8px', borderRadius: 4 }}>Live Syncing</span>
            </div>

            {step === 0 && (
                <div style={col({ flex: 1, gap: 12 })}>
                    <div style={{ flex: 1, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, display: 'flex', alignItems: 'flex-end', gap: 12, position: 'relative' }}>
                        {[40, 70, 50, 90, 65, 80].map((h, i) => (
                            <div key={i} style={col({ flex: 1, alignItems: 'center', gap: 4 })}>
                                <div style={{ width: '100%', height: `${h}%`, background: h > 80 ? '#f43f5e' : (h > 60 ? '#10b981' : '#3b82f6'), borderRadius: '4px 4px 0 0' }}></div>
                                <span style={{ fontSize: 9, color: '#94a3b8' }}>M{i + 1}</span>
                            </div>
                        ))}
                        <div style={{ position: 'absolute', top: 12, left: 12, fontSize: 12, fontWeight: 600, color: '#475569' }}>CPU Utilization <Activity size={12} color="#10b981" style={{ display: 'inline', marginLeft: 4 }} /> </div>
                    </div>
                </div>
            )}

            {step === 1 && (
                <div style={col({ flex: 1, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' })}>
                    <div style={row({ background: '#f1f5f9', padding: '8px 12px', fontSize: 11, fontWeight: 600, color: '#475569', borderBottom: '1px solid #e2e8f0' })}>
                        <div style={{ flex: 2 }}>Instance</div>
                        <div style={{ flex: 1 }}>Status</div>
                        <div style={{ flex: 1, textAlign: 'right' }}>Load</div>
                    </div>
                    {[
                        { name: "us-east-db-1", status: "Healthy", color: "#10b981", load: "42%" },
                        { name: "eu-west-cache", status: "Warning", color: "#f59e0b", load: "89%" },
                        { name: "ap-south-auth", status: "Healthy", color: "#10b981", load: "12%" },
                    ].map((r, i) => (
                        <div key={i} style={row({ padding: '10px 12px', fontSize: 11, color: '#334155', borderBottom: '1px solid #f1f5f9', alignItems: 'center' })}>
                            <div style={{ flex: 2, fontWeight: 500, fontFamily: 'monospace' }}>{r.name}</div>
                            <div style={row({ flex: 1, alignItems: 'center', gap: 4 })}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: r.color }}></div>
                                <span style={{ color: r.color, fontWeight: 600 }}>{r.status}</span>
                            </div>
                            <div style={{ flex: 1, textAlign: 'right', fontWeight: 600 }}>{r.load}</div>
                        </div>
                    ))}
                </div>
            )}

            {step === 2 && (
                <div style={{ flex: 1, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyItems: 'center', padding: 20 }}>
                    {/* Donut Chart representation */}
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 120, height: 120, borderRadius: '50%', border: '16px solid #e2e8f0', borderTopColor: '#3b82f6', borderRightColor: '#8b5cf6', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={col({ alignItems: 'center' })}>
                                <span style={{ fontSize: 24, fontWeight: 800, color: '#1e293b' }}>72%</span>
                                <span style={{ fontSize: 9, color: '#64748b', textTransform: 'uppercase' }}>Efficiency</span>
                            </div>
                        </div>
                    </div>
                    <div style={col({ flex: 1, gap: 12 })}>
                        <div style={row({ alignItems: 'center', gap: 8 })}><div style={{ width: 12, height: 12, borderRadius: 4, background: '#3b82f6' }}></div><span style={{ fontSize: 11, color: '#475569' }}>Production</span></div>
                        <div style={row({ alignItems: 'center', gap: 8 })}><div style={{ width: 12, height: 12, borderRadius: 4, background: '#8b5cf6' }}></div><span style={{ fontSize: 11, color: '#475569' }}>Logistics</span></div>
                        <div style={row({ alignItems: 'center', gap: 8 })}><div style={{ width: 12, height: 12, borderRadius: 4, background: '#e2e8f0' }}></div><span style={{ fontSize: 11, color: '#475569' }}>Idle</span></div>
                    </div>
                </div>
            )}
        </div>
    </div>
);

// ─── Mobile Mockup (Realistic) ─────────────────────────────────────────────
const MobileMockup = ({ step }) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background: '#f8fafc' }}>
        <div style={{ width: 140, height: 280, border: '6px solid #111827', borderRadius: 28, position: 'relative', overflow: 'hidden', background: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
            {/* Notch */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 44, height: 12, background: '#111827', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, zIndex: 10 }} />

            {/* App Header */}
            <div style={row({ alignItems: 'center', justifyContent: 'space-between', padding: '16px 12px 10px', background: '#fff', borderBottom: '1px solid #f1f5f9' })}>
                <span style={{ fontWeight: 800, fontSize: 14, color: '#0f172a' }}>FitnessPro</span>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 10, fontWeight: 'bold', color: '#0ea5e9' }}>J</span>
                </div>
            </div>

            {/* App Body */}
            <div style={{ flex: 1, padding: '10px 12px', background: '#f8fafc', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={col({ width: '100%', height: '100%', gap: 10 })}>

                        {step === 0 && (
                            <>
                                <div style={{ fontSize: 15, fontWeight: 700, color: '#334155', lineHeight: 1.1 }}>Good Morning,<br />John!</div>
                                <div style={row({ alignItems: 'center', justifyContent: 'space-between', background: '#0ea5e9', padding: '12px 10px', borderRadius: 12, color: '#fff' })}>
                                    <div style={col()}>
                                        <span style={{ fontSize: 10, opacity: 0.9 }}>Steps Today</span>
                                        <span style={{ fontSize: 18, fontWeight: 800 }}>8,432</span>
                                    </div>
                                    <Activity size={24} opacity={0.8} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                    <div style={col({ background: '#fff', padding: 8, borderRadius: 8, border: '1px solid #e2e8f0', alignItems: 'center' })}>
                                        <Heart size={14} color="#f43f5e" style={{ marginBottom: 4 }} />
                                        <span style={{ fontSize: 12, fontWeight: 700 }}>112</span>
                                        <span style={{ fontSize: 8, color: '#94a3b8' }}>BPM</span>
                                    </div>
                                    <div style={col({ background: '#fff', padding: 8, borderRadius: 8, border: '1px solid #e2e8f0', alignItems: 'center' })}>
                                        <Zap size={14} color="#f59e0b" style={{ marginBottom: 4 }} />
                                        <span style={{ fontSize: 12, fontWeight: 700 }}>450</span>
                                        <span style={{ fontSize: 8, color: '#94a3b8' }}>kcal</span>
                                    </div>
                                </div>
                            </>
                        )}

                        {step === 1 && (
                            <>
                                <span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>Completed Workouts</span>
                                {[
                                    { title: "Morning Run", time: "32 mins", cal: "320 kcal", bg: '#ecfdf5', color: '#10b981' },
                                    { title: "Yoga Session", time: "45 mins", cal: "150 kcal", bg: '#fef3c7', color: '#f59e0b' }
                                ].map((w, i) => (
                                    <div key={i} style={row({ alignItems: 'center', gap: 10, background: '#fff', padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' })}>
                                        <div style={{ width: 28, height: 28, borderRadius: 6, background: w.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Activity size={12} color={w.color} />
                                        </div>
                                        <div style={col({ flex: 1 })}>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>{w.title}</span>
                                            <span style={{ fontSize: 9, color: '#94a3b8' }}>{w.time} • {w.cal}</span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        {step === 2 && (
                            <div style={col({ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 })}>
                                <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <CheckCircle2 size={32} color="#10b981" />
                                </div>
                                <div style={col({ alignItems: 'center' })}>
                                    <span style={{ fontSize: 16, fontWeight: 800, color: '#10b981' }}>Goal Reached!</span>
                                    <span style={{ fontSize: 10, color: '#64748b', textAlign: 'center', marginTop: 4 }}>You hit your 10,000 steps target today.</span>
                                </div>
                            </div>
                        )}

                    </motion.div>
                </AnimatePresence>
            </div>

            {/* App Tab Bar */}
            <div style={row({ justifyContent: 'space-around', alignItems: 'center', padding: '10px 0 12px', background: '#fff', borderTop: '1px solid #e2e8f0', marginTop: 'auto' })}>
                <Home size={16} color="#0ea5e9" />
                <Activity size={16} color="#94a3b8" />
                <Users size={16} color="#94a3b8" />
            </div>
        </div>
    </div>
);

// ─── Web + App Mockup ──────────────────────────────────────────────────────
const WebAppMockup = ({ step }) => (
    <div style={{ display: 'flex', height: '100%', background: '#f8fafc', padding: 20, gap: 20, alignItems: 'center', justifyContent: 'center' }}>
        {/* Desktop View */}
        <div style={{ flex: 1, height: '80%', background: '#fff', border: '2px solid #e2e8f0', borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden', opacity: step !== 1 ? 1 : 0.5, transform: step !== 1 ? 'scale(1)' : 'scale(0.95)', transition: 'all 0.5s', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <div style={{ background: '#f1f5f9', height: 24, display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#eab308' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ background: '#fff', height: 16, width: 120, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#94a3b8', border: '1px solid #e2e8f0' }}>app.tafinity.ai</div>
                </div>
            </div>
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Sidebar */}
                <div style={{ width: 44, background: '#1e293b', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0', gap: 16 }}>
                    <div style={{ width: 24, height: 24, background: '#3b82f6', borderRadius: 6, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>T</span></div>
                    <LayoutDashboard size={16} color="#0ea5e9" />
                    <Users size={16} color="#64748b" />
                    <Settings size={16} color="#64748b" />
                </div>
                {/* Main Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s' }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>
                            {step === 0 ? "Dashboard Overview" : step === 1 ? "Live Platform Sync" : "System Analytics"}
                        </span>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <Search size={14} color="#94a3b8" />
                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 'bold' }}>JD</div>
                        </div>
                    </div>
                    <div style={{ padding: 12, display: 'flex', gap: 8 }}>
                        {/* Stat Cards */}
                        <div style={{ flex: 1, background: '#f8fafc', padding: 10, borderRadius: 6, border: '1px solid #f1f5f9' }}>
                            <div style={{ fontSize: 9, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                                {step === 0 ? 'Total Users' : step === 1 ? 'Sync Status' : 'API Latency'}
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 800, color: '#0ea5e9', marginTop: 4 }}>
                                {step === 0 ? '1,248' : step === 1 ? 'Active' : '24ms'}
                            </div>
                        </div>
                        <div style={{ flex: 1, background: '#f8fafc', padding: 10, borderRadius: 6, border: '1px solid #f1f5f9' }}>
                            <div style={{ fontSize: 9, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                                {step === 0 ? 'Active Tasks' : step === 1 ? 'Payload' : 'Uptime'}
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 800, color: '#10b981', marginTop: 4 }}>
                                {step === 0 ? '84' : step === 1 ? '1.2MB' : '99.9%'}
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '0 12px', flex: 1 }}>
                        <div style={{ width: '100%', height: '100%', background: '#f1f5f9', borderRadius: '6px 6px 0 0', border: '1px solid #e2e8f0', borderBottom: 0, padding: 10 }}>
                            <div style={{ width: step === 0 ? '30%' : (step === 1 ? '50%' : '70%'), height: 12, background: '#cbd5e1', borderRadius: 4, marginBottom: 12, transition: 'width 0.5s' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {[1, 2, 3].map(i => (
                                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 6, background: '#fff', borderRadius: 4 }}>
                                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: step === i - 1 ? '#3b82f6' : '#e2e8f0', transition: 'background 0.5s' }} />
                                        <div style={{ width: `${40 + (i * 10) - (step * 5)}%`, height: 8, background: '#cbd5e1', borderRadius: 4, transition: 'width 0.5s' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Mobile View */}
        <div style={{ width: 120, height: 220, background: '#fff', border: '8px solid #0f172a', borderRadius: 24, display: 'flex', flexDirection: 'column', overflow: 'hidden', opacity: step === 1 ? 1 : 0.5, transform: step === 1 ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.5s', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', position: 'relative', zIndex: 10 }}>
            {/* Notch */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 40, height: 10, background: '#0f172a', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, zIndex: 10 }} />
            <div style={{ background: '#3b82f6', paddingTop: 20, paddingBottom: 10, paddingLeft: 12, paddingRight: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>
                    {step === 0 ? 'Home' : step === 1 ? 'Sync' : 'Stats'}
                </span>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 'bold', color: '#fff' }}>JD</div>
            </div>
            <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8, flex: 1, background: '#f8fafc' }}>
                <div style={{ background: '#fff', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: 9, color: '#64748b', fontWeight: 600 }}>
                        {step === 0 ? 'Total Users' : step === 1 ? 'Sync Status' : 'API Latency'}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#0ea5e9' }}>
                        {step === 0 ? '1,248' : step === 1 ? 'Active' : '24ms'}
                    </div>
                </div>
                <div style={{ background: '#fff', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: 9, color: '#64748b', fontWeight: 600 }}>
                        {step === 0 ? 'Active Tasks' : step === 1 ? 'Payload' : 'Uptime'}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#10b981' }}>
                        {step === 0 ? '84' : step === 1 ? '1.2MB' : '99.9%'}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// ─── POS Mockup (Point of Sale) ────────────────────────────────────────────
const POSMockup = ({ step }) => (
    <div style={{ display: 'flex', height: '100%', background: '#e0f2fe', padding: 10, fontFamily: 'monospace' }}>
        <div style={{ flex: 1, background: '#fff', borderRadius: 8, display: 'flex', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            {/* Products Grid */}
            <div style={{ flex: 2, padding: 12, borderRight: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: 8, alignContent: 'flex-start' }}>
                <div style={{ width: '100%', paddingBottom: 8, borderBottom: '1px solid #f1f5f9', marginBottom: 4, fontWeight: 700 }}>Terminal 01 - Cashier</div>
                {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ width: '30%', height: 60, background: i === step ? '#3b82f6' : '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center', padding: '8px 0', color: i === step ? '#fff' : '#475569', transition: 'all 0.2s' }}>
                        <ShoppingBag size={18} />
                        <span style={{ fontSize: 9, marginTop: 4 }}>Item {i + 1}</span>
                    </div>
                ))}
            </div>
            {/* Receipt / Invoice */}
            <div style={{ flex: 1, background: '#f8fafc', padding: 12, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 700, fontSize: 12, textAlign: 'center', marginBottom: 12, borderBottom: '1px dashed #cbd5e1', paddingBottom: 8 }}>Current Order</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Item 1 x2</span><span>$24.00</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Item 2 x1</span><span>$15.50</span></div>
                    {step > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0ea5e9' }}><span>Item {step + 1} x1</span><span>$9.99</span></div>}
                </div>
                <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: 8, marginTop: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#64748b' }}><span>Tax (8%)</span><span>$3.16</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 800, marginTop: 4 }}><span>Total</span><span>${step > 0 ? '52.65' : '42.66'}</span></div>
                </div>
                <div style={{ background: '#10b981', color: '#fff', textAlign: 'center', padding: '10px 0', borderRadius: 6, marginTop: 12, fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <CreditCard size={14} /> PAY NOW
                </div>
            </div>
        </div>
    </div>
);

// ─── Custom Solutions Mockup ──────────────────────────────────────────────
const CustomMockup = ({ step }) => (
    <div style={{ display: 'flex', height: '100%', background: '#0f172a', padding: 20, alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Node Network Map */}
        <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.2, backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        <div style={{ display: 'flex', gap: 40, alignItems: 'center', zIndex: 1 }}>
            {/* Core Box */}
            <div style={{ background: '#1e293b', border: '1px solid #3b82f6', padding: 20, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: step === 1 ? '0 0 30px rgba(59,130,246,0.3)' : 'none', transition: 'all 0.5s' }}>
                <Sliders size={24} color="#3b82f6" />
                <span style={{ color: '#fff', fontSize: 10, fontWeight: 600, marginTop: 8 }}>Core Logic</span>
            </div>

            {/* Data Pipeline arrows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ width: 40, height: 2, background: step === 0 ? '#10b981' : '#334155', transition: 'background 0.3s' }} />
                <div style={{ width: 40, height: 2, background: step === 1 ? '#0ea5e9' : '#334155', transition: 'background 0.3s' }} />
                <div style={{ width: 40, height: 2, background: step === 2 ? '#f59e0b' : '#334155', transition: 'background 0.3s' }} />
            </div>

            {/* Microservices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ background: '#1e293b', padding: '10px 16px', borderRadius: 8, border: step === 0 ? '1px solid #10b981' : '1px solid #334155', color: '#fff', fontSize: 10, display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.3s' }}>
                    <Database size={12} color={step === 0 ? '#10b981' : '#94a3b8'} /> Database API
                </div>
                <div style={{ background: '#1e293b', padding: '10px 16px', borderRadius: 8, border: step === 1 ? '1px solid #0ea5e9' : '1px solid #334155', color: '#fff', fontSize: 10, display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.3s' }}>
                    <Cloud size={12} color={step === 1 ? '#0ea5e9' : '#94a3b8'} /> AWS Lambda
                </div>
                <div style={{ background: '#1e293b', padding: '10px 16px', borderRadius: 8, border: step === 2 ? '1px solid #f59e0b' : '1px solid #334155', color: '#fff', fontSize: 10, display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.3s' }}>
                    <Shield size={12} color={step === 2 ? '#f59e0b' : '#94a3b8'} /> Auth Service
                </div>
            </div>
        </div>
    </div>
);

// ─── Slideshow Carousel ───
const MockupCarousel = ({ serviceId }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setStep(p => (p + 1) % 3), 3000); // 3 sec for better readability
        return () => clearInterval(timer);
    }, []);

    const renderContent = () => {
        switch (serviceId) {
            case 'websites': return <WebsiteMockup step={step} />;
            case 'ecommerce': return <EcommerceMockup step={step} />;
            case 'erp': return <ERPMockup step={step} />;
            case 'crm': return <CRMMockup step={step} />;
            case 'mobile': return <MobileMockup step={step} />;
            case 'desktop': return <DesktopMockup step={step} />;
            case 'webapp': return <WebAppMockup step={step} />;
            case 'pos': return <POSMockup step={step} />;
            case 'custom': return <CustomMockup step={step} />;
            default: return <WebsiteMockup step={step} />;
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: 480, height: 340, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
            {/* Mac-style header */}
            <div style={{ background: serviceId === 'desktop' ? '#1e1f1c' : '#f8fafc', borderBottom: serviceId === 'desktop' ? 'none' : '1px solid #e2e8f0', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6, position: 'relative', flexShrink: 0 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
                <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 11, color: serviceId === 'desktop' ? '#fff' : '#94a3b8', fontFamily: 'monospace' }}>
                    {serviceId === 'desktop' ? 'TafinityNative' : `${serviceId}.tafinity.ai`}
                </div>
            </div>
            {/* Body */}
            <div style={{ flex: 1, background: serviceId === 'desktop' ? '#272822' : '#f8fafc', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} style={{ width: '100%', height: '100%' }}>
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
            {/* Slide dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '8px 0', background: serviceId === 'desktop' ? '#1e1f1c' : '#f8fafc', flexShrink: 0, borderTop: serviceId === 'desktop' ? 'none' : '1px solid #e2e8f0' }}>
                {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i === step ? '#0ea5e9' : (serviceId === 'desktop' ? '#444' : '#cbd5e1'), transition: 'background 0.3s' }} />
                ))}
            </div>
        </div>
    );
};

// ─── Services Page ───
const Services = () => {
    const serviceList = [
        { id: 'websites', title: 'Website Development', desc: 'We design striking, conversion-optimized landing pages and brand portfolios with highly immersive 3D/animation physics.', features: ['Breathtaking Animations', 'SEO Optimized', 'Tailwind & Framer Motion', 'Content Management Support'], tag: 'Design' },
        { id: 'mobile', title: 'Android App Development', desc: 'Native and cross-platform apps for iOS and Android delivering unforgettable user experiences.', features: ['React Native & Flutter', 'Offline First Architecture', 'Push Notification Engine', 'App Store Optimization'], tag: 'Mobile' },
        { id: 'webapp', title: 'Web + App Solutions', desc: 'Unified codebase solutions providing a seamless experience across desktop browsers and mobile devices.', features: ['Progressive Web Apps', 'Unified Backend Architecture', 'Cross-Platform Sync', 'Real-time Datasets'], tag: 'Hybrid' },
        { id: 'ecommerce', title: 'E-Commerce Solutions', desc: 'High-conversion online stores engineered for scale, featuring seamless checkouts and intelligent inventory synchronization.', features: ['Custom Cart Solutions', 'Payment Gateway Integration', 'Headless Commerce', 'Conversion Optimized'], tag: 'Growth' },
        { id: 'pos', title: 'POS / Billing Solutions', desc: 'Fast, secure and reliable Point of Sale software focused on frictionless checkout and real-time ledger management.', features: ['Barcode Integration', 'Thermal Printer Support', 'Offline Syncing', 'Inventory Tracking'], tag: 'Retail' },
        { id: 'erp', title: 'ERP Solutions', desc: 'Custom enterprise resource planning software tailored to automate your specific operational workflows.', features: ['Inventory Management', 'HR & Payroll Systems', 'Real-time Analytics', 'Legacy System Migration'], tag: 'Enterprise' },
        { id: 'crm', title: 'CRM Solutions', desc: 'Intelligent customer relationship management to track leads, automate follow-ups, and boost sales efficiency.', features: ['Lead Scoring Pipeline', 'Automated Email Flows', 'Customer Insights', 'Omnichannel Support'], tag: 'Sales' },
        { id: 'custom', title: 'Custom Solutions', desc: 'Powerful bespoke applications customized end-to-end to solve your unique and complex business challenges.', features: ['Bespoke Architecture', 'Third-Party APIs', 'Scalable Microservices', 'Process Automation'], tag: 'Tech' },
    ];

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                // Short timeout to ensure framer-motion DOM mounting completes before scroll calculation
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 200);
            }
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [location]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-wrapper">
            {/* Hero */}
            <section className="services-hero">
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="hero-pill">Capabilities</motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="services-title">
                        Digital Solutions <br /> Engineered for <span className="text-gradient-accent">Excellence.</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="services-subtitle">
                        We go beyond code. We map out your challenges and build bespoke digital ecosystems that drive unprecedented efficiency and growth.
                    </motion.p>
                </div>
                <div className="services-bg-glow"></div>
            </section>

            {/* Alternating layout */}
            <section className="services-list" style={{ paddingBottom: '6rem' }}>
                <div className="container">
                    {serviceList.map((svc, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <motion.div
                                key={svc.id}
                                id={svc.id}
                                variants={itemVariants}
                                viewport={{ once: true, margin: '-100px' }}
                                whileInView="visible"
                                initial="hidden"
                                className={`service-showcase ${isEven ? 'row-normal' : 'row-reverse'}`}
                            >
                                <div className="showcase-content">
                                    <span className="tag">{svc.tag}</span>
                                    <h2>{svc.title}</h2>
                                    <p className="desc">{svc.desc}</p>
                                    <div className="features">
                                        {svc.features.map((f, i) => (
                                            <div key={i} className="feature-item">
                                                <CheckCircle2 size={18} className="feature-icon" />
                                                <span>{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link to="/contact" className="explore-btn">Discuss Project <ArrowRight size={16} /></Link>
                                </div>

                                <div className="showcase-visual">
                                    <div className="visual-glow"></div>
                                    <MockupCarousel serviceId={svc.id} />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="services-cta glass">
                <div className="container text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <h2>Ready to modernize your operations?</h2>
                        <p>Our team of architects and engineers is ready to start building your next big leap.</p>
                        <Link to="/contact" className="btn-primary custom-btn">Let's Build Something <ArrowRight size={18} /></Link>
                    </motion.div>
                </div>
            </section>

            <style>{`
        .services-hero { padding: 10rem 0 6rem; text-align: center; position: relative; overflow: hidden; background: linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary)); }
        .services-bg-glow { position: absolute; top: -20%; right: -10%; width: 800px; height: 800px; background: radial-gradient(circle, var(--accent-glow) 0%, transparent 60%); z-index: 1; }
        .hero-pill { display: inline-block; padding: 0.5rem 1.5rem; background: rgba(2,132,199,0.1); color: var(--accent-color); border-radius: 100px; font-weight: 600; font-size: 0.9rem; margin-bottom: 2rem; letter-spacing: 1px; text-transform: uppercase; }
        .services-title { font-size: clamp(2.5rem, 5vw, 4.5rem); margin-bottom: 1.5rem; }
        .services-subtitle { color: var(--text-secondary); font-size: 1.25rem; max-width: 800px; margin: 0 auto; }
        .service-showcase { display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 4rem; padding: 6rem 0; border-bottom: 1px solid var(--border-light); }
        .service-showcase:last-child { border-bottom: none; }
        .showcase-content { flex: 1; max-width: 550px; }
        .showcase-visual { flex: 1; display: flex; justify-content: center; align-items: center; width: 100%; position: relative; }
        .tag { color: var(--accent-color); font-weight: 700; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 1rem; }
        .showcase-content h2 { font-size: 2.5rem; margin-bottom: 1.5rem; }
        .showcase-content .desc { color: var(--text-secondary); font-size: 1.15rem; line-height: 1.8; margin-bottom: 2rem; }
        .features { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2.5rem; }
        .feature-item { display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary); font-weight: 500; }
        .feature-icon { color: var(--accent-color); }
        .explore-btn { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--accent-color); font-weight: 600; font-size: 1.05rem; }
        .explore-btn:hover { color: var(--accent-hover); text-decoration: underline; }
        .visual-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 300px; height: 300px; background: var(--accent-glow); border-radius: 50%; filter: blur(50px); z-index: 0; }
        .services-cta { padding: 5rem 0; margin: 2rem 1.5rem 0; border-radius: 32px; border: 1px solid var(--border-color); background-color: var(--bg-elevated); }
        .services-cta h2 { font-size: 2.5rem; margin-bottom: 1rem; }
        .services-cta p { color: var(--text-secondary); font-size: 1.15rem; margin-bottom: 2rem; }
        .custom-btn { padding: 1rem 2.5rem; font-size: 1.1rem; }
        @media (min-width: 992px) {
          .service-showcase { flex-direction: row; gap: 6rem; }
          .row-reverse { flex-direction: row-reverse; }
        }
      `}</style>
        </motion.div>
    );
};

export default Services;
