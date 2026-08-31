import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Phone, Globe, ShoppingCart, Smartphone, Layout, Receipt, Cpu, BarChart3, Layers, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const packages = [
    {
        id: 'website',
        icon: <Globe size={24} />,
        title: 'Website',
        tagline: 'Professional website to grow your business online.',
        originalPrice: '₹9,999',
        price: '₹6,999',
        priceType: 'One-time setup',
        badge: null,
        contactSales: false,
        includes: [
            'Domain & Hosting (1 Year)',
            'SSL Certificate',
            'Business Email',
            'Responsive Design',
            'Basic SEO',
        ],
        maintenance: '1 Year Maintenance Included',
    },
    {
        id: 'ecommerce',
        icon: <ShoppingCart size={24} />,
        title: 'E-Commerce',
        tagline: 'Online store to sell products and grow your business.',
        originalPrice: '₹17,999',
        price: '₹14,999',
        priceType: 'One-time setup',
        badge: 'Most Popular',
        contactSales: false,
        includes: [
            'Product Management',
            'Shopping Cart',
            'Payment Gateway',
            'Order Management',
            'Admin Dashboard',
        ],
        maintenance: '1 Year Maintenance Included',
    },
    {
        id: 'android',
        icon: <Smartphone size={24} />,
        title: 'Android App',
        tagline: 'Powerful Android app for your business or startup.',
        originalPrice: '₹17,999',
        price: '₹14,999',
        priceType: 'One-time setup',
        badge: null,
        contactSales: false,
        includes: [
            'Custom UI Design',
            'Admin Panel',
            'API Integration',
            'Push Notifications',
            'Play Store Upload',
        ],
        maintenance: '1 Year Maintenance Included',
    },
    {
        id: 'webapp',
        icon: <Layout size={24} />,
        title: 'Web + App',
        tagline: 'Complete solution with website and Android app.',
        originalPrice: '₹23,999',
        price: '₹20,999',
        priceType: 'One-time setup',
        badge: 'Best Value',
        contactSales: false,
        includes: [
            'Website + Android App',
            'Domain, Hosting & SSL',
            'Business Email',
            'Admin Panel',
            'Play Store Upload',
        ],
        maintenance: '1 Year Maintenance Included',
    },
    {
        id: 'pos',
        icon: <Receipt size={24} />,
        title: 'POS / Billing',
        tagline: 'Easy billing and inventory management solution.',
        originalPrice: '₹11,999',
        price: '₹8,999',
        priceType: 'One-time setup',
        badge: null,
        contactSales: false,
        includes: [
            'Billing & Invoicing',
            'Product & Stock Mgmt.',
            'Barcode Support',
            'Sales Reports',
            'Customer Management',
            'Backup & Restore',
        ],
        maintenance: '1 Year Maintenance Included',
    },
    {
        id: 'custom',
        icon: <Zap size={24} />,
        title: 'Custom Solution',
        tagline: 'Tailor-made software built as per your requirements.',
        originalPrice: null,
        price: 'Get a Quote',
        priceType: 'One-time or Custom',
        badge: null,
        contactSales: true,
        includes: [
            'Custom Features',
            'Scalable & Secure',
            'Third-party Integration',
            'Ongoing Support',
            'Maintenance',
            'On-time Delivery',
        ],
        maintenance: null,
    },
    {
        id: 'crm',
        icon: <BarChart3 size={24} />,
        title: 'CRM',
        tagline: 'Manage leads, follow-ups, and customer relationships at scale.',
        originalPrice: null,
        price: 'Contact Sales',
        priceType: 'Custom pricing',
        badge: null,
        contactSales: true,
        includes: [
            'Lead & Contact Management',
            'Pipeline & Deal Tracking',
            'Activity & Follow-up Logs',
            'Custom Reports & Analytics',
            'Role-based Access Control',
            'API & Third-party Integration',
        ],
        maintenance: null,
    },
    {
        id: 'erp',
        icon: <Layers size={24} />,
        title: 'ERP',
        tagline: 'End-to-end enterprise resource planning for growing businesses.',
        originalPrice: null,
        price: 'Contact Sales',
        priceType: 'Custom pricing',
        badge: null,
        contactSales: true,
        includes: [
            'Inventory & Procurement',
            'Finance & Accounting',
            'HR & Payroll',
            'Sales & Purchase Orders',
            'Multi-branch Support',
            'Custom Module Development',
        ],
        maintenance: null,
    },
];

const Pricing = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* ── Hero ── */}
            <section style={{ paddingTop: '9rem', paddingBottom: '5rem', background: 'var(--bg-secondary)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(2,132,199,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ color: 'var(--accent-color)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                        TRANSPARENT PRICING
                    </motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }} style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
                        Simple, Honest{' '}
                        <span style={{ background: 'linear-gradient(90deg,var(--accent-color),#0369a1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Pricing</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.75 }}>
                        No hidden fees. No long-term lock-ins. Pay once and grow — with maintenance support included for a full year.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(2,132,199,0.1)', border: '1px solid rgba(2,132,199,0.25)', borderRadius: '999px', padding: '0.45rem 1rem', fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: 600 }}>
                        <Zap size={14} /> Launch offer prices — Limited time
                    </motion.div>
                </div>
            </section>

            {/* ── Cards ── */}
            <section style={{ padding: '5rem 0 7rem', background: 'var(--bg-primary)' }}>
                <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}
                    >
                        {packages.map((pkg, idx) => {
                            const isPopular = pkg.badge === 'Most Popular';
                            const isBestValue = pkg.badge === 'Best Value';
                            const isContact = pkg.contactSales;
                            return (
                                <motion.div
                                    key={pkg.id}
                                    variants={fadeIn}
                                    style={{
                                        position: 'relative',
                                        borderRadius: '22px',
                                        padding: '2rem',
                                        background: isPopular
                                            ? 'linear-gradient(145deg, rgba(2,132,199,0.12), rgba(3,105,161,0.08))'
                                            : 'var(--bg-secondary)',
                                        border: isPopular
                                            ? '1.5px solid rgba(2,132,199,0.55)'
                                            : '1px solid var(--border-light)',
                                        boxShadow: isPopular ? '0 20px 50px rgba(2,132,199,0.12)' : 'none',
                                        display: 'flex', flexDirection: 'column', gap: '1rem',
                                        transition: 'all 0.3s', cursor: 'default',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = isPopular ? '0 28px 60px rgba(2,132,199,0.18)' : '0 12px 36px rgba(0,0,0,0.09)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = isPopular ? '0 20px 50px rgba(2,132,199,0.12)' : 'none';
                                    }}
                                >
                                    {/* Badge */}
                                    {pkg.badge && (
                                        <div style={{
                                            position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                                            background: isPopular ? 'var(--accent-color)' : 'linear-gradient(90deg,#0369a1,#0284c7)',
                                            color: '#fff', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em',
                                            textTransform: 'uppercase', padding: '4px 14px', borderRadius: '999px',
                                            whiteSpace: 'nowrap', boxShadow: '0 4px 14px rgba(2,132,199,0.4)',
                                        }}>
                                            {pkg.badge}
                                        </div>
                                    )}

                                    {/* Icon + Title */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                        <div style={{
                                            width: '46px', height: '46px', borderRadius: '13px',
                                            background: isContact ? 'rgba(100,116,139,0.12)' : 'rgba(2,132,199,0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: isContact ? 'var(--text-secondary)' : 'var(--accent-color)', flexShrink: 0,
                                        }}>
                                            {pkg.icon}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '1.15rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{pkg.title}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginTop: '2px' }}>{pkg.tagline}</div>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                                        {!isContact && pkg.originalPrice && (
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textDecoration: 'line-through', marginBottom: '2px' }}>
                                                {pkg.originalPrice}
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', flexWrap: 'wrap' }}>
                                            <span style={{
                                                fontSize: isContact ? '1.5rem' : '2.25rem',
                                                fontFamily: 'var(--font-display)', fontWeight: 800,
                                                color: isContact ? 'var(--text-secondary)' : 'var(--text-primary)',
                                                lineHeight: 1,
                                            }}>
                                                {pkg.price}
                                            </span>
                                            {!isContact && (
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                                                    {pkg.priceType}
                                                </span>
                                            )}
                                        </div>
                                        {isContact && (
                                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{pkg.priceType}</div>
                                        )}
                                    </div>

                                    {/* Features */}
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', padding: 0 }}>
                                        {pkg.includes.map((feat, fi) => (
                                            <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                                                <Check size={15} style={{ color: isContact ? 'var(--text-secondary)' : 'var(--accent-color)', flexShrink: 0 }} />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Maintenance tag */}
                                    {pkg.maintenance && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: '#16a34a', background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.2)', borderRadius: '8px', padding: '0.4rem 0.75rem', width: 'fit-content' }}>
                                            <Check size={12} color="#16a34a" /> {pkg.maintenance}
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <Link
                                        to="/contact"
                                        style={{
                                            marginTop: 'auto',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                                            padding: '0.75rem 1.25rem',
                                            borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem',
                                            textDecoration: 'none', transition: 'all 0.25s',
                                            ...(isContact
                                                ? { background: 'transparent', border: '1.5px solid var(--border-light)', color: 'var(--text-primary)' }
                                                : isPopular
                                                    ? { background: 'var(--accent-color)', color: '#fff', boxShadow: '0 6px 20px rgba(2,132,199,0.3)' }
                                                    : { background: 'transparent', border: '1.5px solid var(--accent-color)', color: 'var(--accent-color)' }
                                            ),
                                        }}
                                        onMouseEnter={e => {
                                            if (isContact) { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.color = 'var(--accent-color)'; }
                                            else if (!isPopular) { e.currentTarget.style.background = 'var(--accent-color)'; e.currentTarget.style.color = '#fff'; }
                                        }}
                                        onMouseLeave={e => {
                                            if (isContact) { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-primary)'; }
                                            else if (!isPopular) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent-color)'; }
                                        }}
                                    >
                                        {isContact ? <><Phone size={15} /> Contact Sales</> : <>Get Started <ArrowRight size={15} /></>}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ── footnote ── */}
            <section style={{ padding: '3rem 0 5rem', background: 'var(--bg-secondary)', textAlign: 'center' }}>
                <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                        All prices are exclusive of GST. Domain, hosting, and third-party service costs are billed additionally.
                        ERP and CRM pricing depends on the number of users, modules, and level of customization required — <Link to="/contact" style={{ color: 'var(--accent-color)', fontWeight: 600, textDecoration: 'none' }}>contact us</Link> for a tailored quote.
                    </p>
                </div>
            </section>
        </motion.div>
    );
};

export default Pricing;
