import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, Headphones, Cloud, Wrench, Clock, MessageCircle, Phone, Mail, MapPin, Heart, Brain, BrainCircuitIcon, BrainCircuit, BrainIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-advanced">

      {/* TOP FEATURES BANNER */}
      <div className="footer-features-wrapper">
        <div className="container">
          <div className="features-banner glass-card">
            <div className="feature-item">
              <ShieldCheck size={36} className="feature-icon" />
              <div className="feature-text">
                <span className="feature-title">100% Secure</span>
                <span className="feature-desc">Your data is safe with us</span>
              </div>
            </div>

            <div className="feature-divider"></div>

            <div className="feature-item">
              <Headphones size={36} className="feature-icon" />
              <div className="feature-text">
                <span className="feature-title">Dedicated Support</span>
                <span className="feature-desc">We are here to help you</span>
              </div>
            </div>

            <div className="feature-divider"></div>

            <div className="feature-item">
              <Cloud size={36} className="feature-icon" />
              <div className="feature-text">
                <span className="feature-title">Data Backup</span>
                <span className="feature-desc">Regular & secure backup</span>
              </div>
            </div>

            <div className="feature-divider"></div>

            <div className="feature-item">
              <Wrench size={36} className="feature-icon" />
              <div className="feature-text">
                <span className="feature-title">1 Year Maintenance</span>
                <span className="feature-desc">Free maintenance included</span>
              </div>
            </div>

            <div className="feature-divider"></div>

            <div className="feature-item">
              <Clock size={36} className="feature-icon" />
              <div className="feature-text">
                <span className="feature-title">On-time Delivery</span>
                <span className="feature-desc">We value your time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE MAIN FOOTER */}
      <div className="footer-middle">
        <div className="container">
          <div className="footer-grid">

            {/* Column 1: Brand Info */}
            <div className="footer-brand-col">
              <div className="brand-logo-container">
                <img src="/logo.png" alt="TafinityAI Logo" className="h-10 md:h-12 w-auto mb-2" style={{ objectFit: 'contain' }} />
                <h2 style={{ letterSpacing: '-0.5px' }}>Tafinity<span className="text-gradient-accent">AI</span></h2>
              </div>

              <p className="footer-description">
                We build powerful digital solutions to help businesses grow, automate and succeed in the modern world.
              </p>

              <div className="social-icons">
                <a href="#" className="social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" className="social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
                <a href="#" className="social-btn"><MessageCircle size={18} /></a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-links-col">
              <h3>QUICK LINKS</h3>
              <div className="heading-underline"></div>
              <ul>
                <li><NavLink to="/"><span>›</span> Home</NavLink></li>
                <li><NavLink to="/about"><span>›</span> About Us</NavLink></li>
                <li><NavLink to="/services"><span>›</span> Services</NavLink></li>
                <li><NavLink to="/automation"><span>›</span> Automation</NavLink></li>
                <li><NavLink to="/portfolio"><span>›</span> Portfolio</NavLink></li>
                <li><NavLink to="/pricing"><span>›</span> Pricing</NavLink></li>
                <li><NavLink to="/case-studies"><span>›</span> Case Study</NavLink></li>
                <li><NavLink to="/blog"><span>›</span> Blog</NavLink></li>
                <li><NavLink to="/contact"><span>›</span> Contact Us</NavLink></li>
              </ul>
            </div>

            {/* Column 3: Our Services */}
            <div className="footer-links-col">
              <h3>OUR SERVICES</h3>
              <div className="heading-underline"></div>
              <ul>
                <li><NavLink to="/services"><span>›</span> Website Development</NavLink></li>
                <li><NavLink to="/services"><span>›</span> Android App Development</NavLink></li>
                <li><NavLink to="/services"><span>›</span> Web + App Solutions</NavLink></li>
                <li><NavLink to="/services"><span>›</span> E-Commerce Solutions</NavLink></li>
                <li><NavLink to="/services"><span>›</span> POS / Billing Solutions</NavLink></li>
                <li><NavLink to="/services"><span>›</span> ERP Solutions</NavLink></li>
                <li><NavLink to="/services"><span>›</span> CRM Solutions</NavLink></li>
                <li><NavLink to="/services"><span>›</span> Custom Solutions</NavLink></li>
              </ul>
            </div>

            {/* Column 4: Support */}
            <div className="footer-links-col">
              <h3>SUPPORT</h3>
              <div className="heading-underline"></div>
              <ul>
                <li><NavLink to="/faq"><span>›</span> FAQ's</NavLink></li>
                <li><NavLink to="/terms"><span>›</span> Terms & Conditions</NavLink></li>
                <li><NavLink to="/privacy"><span>›</span> Privacy Policy</NavLink></li>
                <li><NavLink to="/refund"><span>›</span> Refund Policy</NavLink></li>
                <li><NavLink to="/maintenance"><span>›</span> Maintenance & Support</NavLink></li>
              </ul>
            </div>

            {/* Column 5: Contact Us */}
            <div className="footer-contact-col">
              <h3>CONTACT US</h3>
              <div className="heading-underline"></div>

              <div className="contact-item">
                <div className="contact-icon"><Phone size={20} /></div>
                <div className="contact-text">
                  <p>+91 79870 60552</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Mail size={20} /></div>
                <div className="contact-text">
                  <p>info@tafinityai.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><MapPin size={20} /></div>
                <div className="contact-text">
                  <p style={{ fontWeight: 600 }}>TafinityAI</p>
                  <p>Uttam Nagar</p>
                  <p>New Delhi, India - 110059</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM DARK BAR */}
      <div className="footer-bottom-bar">
        <div className="container bottom-bar-flex">
          <div className="bottom-left">
            © {new Date().getFullYear()} <span className="text-primary-blue">TafinityAI LLP</span>. All Rights Reserved.
          </div>
          <div className="bottom-center">
            <img src="/logo.png" alt="TafinityAI Logo" className="h-5 md:h-6 w-auto" style={{ objectFit: 'contain' }} />
          </div>
          <div className="bottom-right">
            Made with <BrainIcon size={25} fill="#0d6efd" color="#0d6efd" style={{ display: 'inline', margin: '0 4px' }} /> for a better digital tomorrow.
          </div>
        </div>
      </div>

      <style>{`
        /* Global Reset For Footer ONLY */
        .footer-advanced {
          width: 100%;
          font-family: 'Poppins', sans-serif;
          position: relative;
          background: #f4f7fc; /* light grayish blue background */
          background-image: radial-gradient(#d1dceb 1px, transparent 1px);
          background-size: 40px 40px;
          margin-top: 10rem;
        }

        /* --- FEATURES BANNER (TOP) --- */
        .footer-features-wrapper {
          position: absolute;
          top: -60px; /* pull it up to overlap */
          left: 0;
          width: 100%;
          z-index: 10;
        }
        .features-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff !important;
          padding: 1.5rem 2rem;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.06);
          border: none;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .feature-icon {
          color: #0d6efd;
          stroke-width: 1.5;
        }
        .feature-text {
          display: flex;
          flex-direction: column;
        }
        .feature-title {
          font-weight: 700;
          font-size: 0.95rem;
          color: #0d2645;
        }
        .feature-desc {
          font-size: 0.75rem;
          color: #6b7280;
        }
        .feature-divider {
          width: 1px;
          height: 40px;
          background: #e5e7eb;
        }

        /* --- MIDDLE MAIN FOOTER --- */
        .footer-middle {
          padding: 8rem 0 3rem 0;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2.2fr 1.2fr 1.5fr 1.2fr 1.5fr;
          gap: 2rem;
        }
        .footer-middle h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }
        .heading-underline {
          width: 30px;
          height: 3px;
          background-color: #0d6efd;
          border-radius: 5px;
          margin-bottom: 1.5rem;
        }

        /* Col 1 Brand */
        .brand-logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.5rem;
          text-align: center;
          width: max-content;
        }
        .brand-logo-container h2 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0f172a;
          margin: 10px 0 0 0;
        }
        .text-primary-blue {
          color: #0d6efd;
        }
        .brand-subtitle {
          font-size: 0.75rem;
          color: #3b82f6;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .footer-description {
          color: #4b5563;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 300px;
        }
        .social-icons {
          display: flex;
          gap: 15px;
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ffffff;
          color: #0d6efd;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }
        .social-btn:hover {
          background: #0d6efd;
          color: #ffffff;
          transform: translateY(-3px);
        }

        /* Cols 2-4 Links */
        .footer-links-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-links-col a {
          color: #4b5563;
          font-size: 0.90rem;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.3s ease;
        }
        .footer-links-col a span {
          color: #3b82f6;
          font-size: 1.2rem;
          font-weight: bold;
          line-height: 1;
        }
        .footer-links-col a:hover {
          color: #0d6efd;
        }

        /* Col 5 Contact */
        .contact-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }
        .contact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #cce0ff;
          color: #0d6efd;
          flex-shrink: 0;
        }
        .contact-text p {
          color: #4b5563;
          font-size: 0.90rem;
          margin: 0;
          line-height: 1.5;
        }

        /* --- BOTTOM DARK BAR --- */
        .footer-bottom-bar {
          background-color: #011438;
          color: #94a3b8;
          padding: 1.5rem 0;
        }
        .bottom-bar-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }
        .bottom-left .text-primary-blue {
          color: #3b82f6;
        }
        .bottom-right {
          display: flex;
          align-items: center;
        }

        /* Responsive adjustments */
        @media (max-width: 1200px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr 1fr;
          }
          .footer-contact-col {
            grid-column: span 2;
            margin-top: 2rem;
          }
          .features-banner {
            flex-wrap: wrap;
            gap: 20px;
          }
          .feature-divider {
            display: none;
          }
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .footer-contact-col {
            grid-column: span 2;
          }
          .footer-features-wrapper {
            position: relative;
            top: 0;
            padding: 20px;
            background: #f4f7fc;
          }
          .footer-advanced {
            margin-top: 0;
          }
          .bottom-bar-flex {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-contact-col {
            grid-column: span 1;
          }
          .feature-item {
            width: 100%;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
