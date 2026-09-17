import React from 'react';
import './HeroGraphic.css';

const HeroGraphic = () => {
  return (
    <div className="hero-component-wrapper">
      <div className="compact-hero-container">
        {/* Vector SVG: Globe, Orbits & Pedestal */}
        <svg className="globe-svg" viewBox="-40 -40 580 580" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
          <defs>
            <radialGradient id="globeInnerGlow" cx="42%" cy="38%" r="58%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
              <stop offset="45%" stopColor="#f0f8ff" stopOpacity="0.9" />
              <stop offset="85%" stopColor="#e0f2fe" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.9" />
            </radialGradient>

            <linearGradient id="skyBlueLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#1ea0f2" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
            </linearGradient>

            <linearGradient id="skyBlueOrbitGrad1" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#1ea0f2" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.55" />
            </linearGradient>

            <linearGradient id="skyBlueOrbitGrad2" x1="100%" y1="20%" x2="0%" y2="80%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#1ea0f2" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
            </linearGradient>

            <linearGradient id="pedestalMetal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="30%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            <linearGradient id="pedestalBlueRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="25%" stopColor="#1ea0f2" />
              <stop offset="50%" stopColor="#7dd3fc" />
              <stop offset="75%" stopColor="#1ea0f2" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <filter id="baseShadow" x="-20%" y="-20%" width="140%" height="150%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0284c7" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Background Floating Dots */}
          <g opacity="0.65">
            <circle cx="95" cy="70" r="1.3" fill="#1ea0f2" />
            <circle cx="120" cy="45" r="1" fill="#38bdf8" />
            <circle cx="340" cy="50" r="1.4" fill="#0284c7" />
            <circle cx="440" cy="160" r="1.2" fill="#1ea0f2" />
            <circle cx="70" cy="290" r="1.3" fill="#38bdf8" />
            <circle cx="415" cy="360" r="1.4" fill="#0284c7" />
            <circle cx="150" cy="440" r="1.1" fill="#1ea0f2" />
          </g>

          {/* Pedestal Base */}
          <g filter="url(#baseShadow)">
            <ellipse cx="215" cy="436" rx="146" ry="26" fill="url(#pedestalMetal)" stroke="url(#pedestalBlueRim)" strokeWidth="2.2" />
            <ellipse cx="215" cy="416" rx="138" ry="24" fill="url(#pedestalMetal)" stroke="url(#pedestalBlueRim)" strokeWidth="2.2" />
            <path d="M 100 375 C 100 362, 330 362, 330 375 L 353 416 C 353 435, 77 435, 77 416 Z" fill="url(#pedestalMetal)" />

            <g stroke="url(#pedestalBlueRim)" strokeWidth="2.4" strokeLinecap="butt" opacity="0.95">
              <line x1="135" y1="389" x2="135" y2="434" />
              <line x1="160" y1="392" x2="160" y2="437" />
              <line x1="188" y1="394" x2="188" y2="438" />
              <line x1="215" y1="395" x2="215" y2="439" />
              <line x1="242" y1="394" x2="242" y2="438" />
              <line x1="270" y1="392" x2="270" y2="437" />
              <line x1="295" y1="389" x2="295" y2="434" />
            </g>
            <ellipse cx="215" cy="375" rx="115" ry="20" fill="none" stroke="url(#pedestalBlueRim)" strokeWidth="2.4" />
            <ellipse cx="215" cy="350" rx="88" ry="17" fill="url(#pedestalMetal)" stroke="url(#pedestalBlueRim)" strokeWidth="2.5" />
          </g>

          {/* Globe Sphere Core */}
          <circle cx="215" cy="205" r="145" fill="url(#globeInnerGlow)" />

          {/* Rotating Geodesic Wireframe Network */}
          <g className="globe-wireframe" stroke="url(#skyBlueLineGrad)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
            <g opacity="0.35" stroke="#38bdf8" strokeDasharray="2 1.5">
              <ellipse cx="215" cy="115" rx="116" ry="27" fill="none" />
              <ellipse cx="215" cy="160" rx="139" ry="33" fill="none" />
              <ellipse cx="215" cy="205" rx="145" ry="35" fill="none" />
              <ellipse cx="215" cy="250" rx="139" ry="33" fill="none" />
              <ellipse cx="215" cy="295" rx="116" ry="27" fill="none" />
            </g>
            <g opacity="0.5" stroke="#0284c7">
              <path d="M 215 60 C 145 60, 100 130, 100 205 C 100 280, 145 350, 215 350" fill="none" />
              <path d="M 215 60 C 175 60, 150 130, 150 205 C 150 280, 175 350, 215 350" fill="none" />
              <path d="M 215 60 C 215 60, 215 130, 215 205 C 215 280, 215 350, 215 350" fill="none" />
              <path d="M 215 60 C 255 60, 280 130, 280 205 C 280 280, 255 350, 215 350" fill="none" />
              <path d="M 215 60 C 285 60, 330 130, 330 205 C 330 280, 285 350, 215 350" fill="none" />
            </g>
            <g opacity="0.82" stroke="url(#skyBlueLineGrad)" strokeWidth="1.05">
              <line x1="215" y1="60" x2="160" y2="105" />
              <line x1="215" y1="60" x2="215" y2="115" />
              <line x1="215" y1="60" x2="270" y2="105" />
              <line x1="160" y1="105" x2="215" y2="115" />
              <line x1="215" y1="115" x2="270" y2="105" />
              <line x1="110" y1="155" x2="160" y2="105" />
              <line x1="160" y1="105" x2="175" y2="160" />
              <line x1="175" y1="160" x2="215" y2="115" />
              <line x1="215" y1="115" x2="255" y2="160" />
              <line x1="255" y1="160" x2="270" y2="105" />
              <line x1="270" y1="105" x2="320" y2="155" />
              <line x1="75" y1="190" x2="110" y2="155" />
              <line x1="110" y1="155" x2="125" y2="205" />
              <line x1="125" y1="205" x2="175" y2="160" />
              <line x1="175" y1="160" x2="190" y2="210" />
              <line x1="190" y1="210" x2="255" y2="160" />
              <line x1="255" y1="160" x2="275" y2="210" />
              <line x1="275" y1="210" x2="320" y2="155" />
              <line x1="320" y1="155" x2="345" y2="200" />
              <line x1="75" y1="190" x2="85" y2="235" />
              <line x1="85" y1="235" x2="125" y2="205" />
              <line x1="125" y1="205" x2="145" y2="255" />
              <line x1="145" y1="255" x2="190" y2="210" />
              <line x1="190" y1="210" x2="225" y2="260" />
              <line x1="225" y1="260" x2="275" y2="210" />
              <line x1="275" y1="210" x2="305" y2="255" />
              <line x1="305" y1="255" x2="345" y2="200" />
              <line x1="345" y1="200" x2="355" y2="230" />
              <line x1="85" y1="235" x2="110" y2="295" />
              <line x1="110" y1="295" x2="145" y2="255" />
              <line x1="145" y1="255" x2="175" y2="305" />
              <line x1="175" y1="305" x2="225" y2="260" />
              <line x1="225" y1="260" x2="255" y2="305" />
              <line x1="255" y1="305" x2="305" y2="255" />
              <line x1="305" y1="255" x2="330" y2="290" />
              <line x1="110" y1="295" x2="165" y2="335" />
              <line x1="165" y1="335" x2="175" y2="305" />
              <line x1="175" y1="305" x2="215" y2="350" />
              <line x1="215" y1="350" x2="255" y2="305" />
              <line x1="255" y1="305" x2="265" y2="335" />
              <line x1="265" y1="335" x2="330" y2="290" />
            </g>
            <circle cx="215" cy="205" r="145" fill="none" stroke="url(#skyBlueLineGrad)" strokeWidth="1.3" opacity="0.9" />

            {/* Constellation Nodes */}
            <g fill="#0284c7" opacity="0.95">
              <circle cx="215" cy="60" r="2.2" /><circle cx="160" cy="105" r="1.8" />
              <circle cx="215" cy="115" r="2.2" /><circle cx="270" cy="105" r="1.8" />
              <circle cx="110" cy="155" r="1.6" /><circle cx="175" cy="160" r="2.0" />
              <circle cx="255" cy="160" r="2.0" /><circle cx="320" cy="155" r="1.8" />
              <circle cx="125" cy="205" r="2.2" /><circle cx="190" cy="210" r="2.4" />
              <circle cx="275" cy="210" r="2.2" /><circle cx="345" cy="200" r="1.8" />
              <circle cx="145" cy="255" r="2.0" /><circle cx="225" cy="260" r="2.4" />
              <circle cx="305" cy="255" r="2.0" /><circle cx="175" cy="305" r="1.8" />
              <circle cx="255" cy="305" r="2.0" /><circle cx="215" cy="350" r="2.2" />
            </g>
          </g>

          {/* Sweeping 3D Orbital Trajectory Curves */}
          <g className="orbital-curves" fill="none">
            <ellipse cx="215" cy="205" rx="195" ry="92" transform="rotate(-26 215 205)" stroke="url(#skyBlueOrbitGrad1)" strokeWidth="1.45" opacity="0.88" />
            <ellipse cx="215" cy="205" rx="215" ry="82" transform="rotate(34 215 205)" stroke="url(#skyBlueOrbitGrad2)" strokeWidth="1.5" opacity="0.85" />
            <ellipse cx="215" cy="205" rx="198" ry="105" transform="rotate(-64 215 205)" stroke="url(#skyBlueOrbitGrad1)" strokeWidth="1.35" opacity="0.78" />
            <ellipse cx="215" cy="205" rx="222" ry="72" transform="rotate(6 215 205)" stroke="url(#skyBlueOrbitGrad2)" strokeWidth="1.25" opacity="0.72" />
            <ellipse cx="215" cy="205" rx="230" ry="90" transform="rotate(-45 215 205)" stroke="url(#skyBlueOrbitGrad1)" strokeWidth="1.15" opacity="0.65" />

            {/* Traveling Energy Light Beads */}
            <circle cx="365" cy="85" r="3.2" fill="#0284c7" />
            <circle cx="365" cy="85" r="6" fill="#38bdf8" opacity="0.4" />
            <circle cx="430" cy="255" r="3" fill="#0369a1" />
            <circle cx="430" cy="255" r="5.5" fill="#1ea0f2" opacity="0.35" />
            <circle cx="270" cy="385" r="2.8" fill="#0284c7" />
          </g>
        </svg>

        {/* Floating Feature Cards */}
        <div className="cards-overlay">
          {/* Card 1: AI Strategy & Consultancy */}
          <div className="hero-card card-ai-strategy">
            <div className="card-icon-badge">
              <svg className="badge-icon" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5c0 .77.2 1.49.54 2.12A5 5 0 0 0 4 13.5a5 5 0 0 0 3.2 4.65A4.5 4.5 0 0 0 11.5 22h1a4.5 4.5 0 0 0 4.3-3.85A5 5 0 0 0 20 13.5a5 5 0 0 0-4.04-4.88c.34-.63.54-1.35.54-2.12A4.5 4.5 0 0 0 12 2Z"/>
                <path d="M12 2v20"/><path d="M7 8.5a3.5 3.5 0 0 1 5-1"/><path d="M7 13.5a3.5 3.5 0 0 1 5-1"/><path d="M7 18.5a3.5 3.5 0 0 1 5-1"/>
                <path d="M17 8.5a3.5 3.5 0 0 0-5-1"/><path d="M17 13.5a3.5 3.5 0 0 0-5-1"/><path d="M17 18.5a3.5 3.5 0 0 0-5-1"/>
              </svg>
            </div>
            <div className="card-content">
              <span className="card-title">AI Strategy</span>
              <span className="card-subtitle">&amp; Consultancy</span>
            </div>
          </div>

          {/* Card 2: Enterprise Solutions */}
          <div className="hero-card card-enterprise">
            <div className="card-icon-badge">
              <svg className="badge-icon" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                <path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/>
                <path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
              </svg>
            </div>
            <div className="card-content">
              <span className="card-title">Enterprise</span>
              <span className="card-subtitle">Solutions</span>
            </div>
          </div>

          {/* Card 3: Process Automation */}
          <div className="hero-card card-process">
            <div className="card-icon-badge">
              <svg className="badge-icon" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <div className="card-content">
              <span className="card-title">Process</span>
              <span className="card-subtitle">Automation</span>
            </div>
          </div>

          {/* Card 4: Training & Leadership */}
          <div className="hero-card card-training">
            <div className="card-icon-badge">
              <svg className="badge-icon" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div className="card-content">
              <span className="card-title">Training &amp;</span>
              <span className="card-subtitle">Leadership</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroGraphic;
