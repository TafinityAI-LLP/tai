import React, { useState, useEffect } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Prevent background scrolling while loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const duration = 1650; // Total smooth duration in ms

    let animationFrameId;

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);
      
      // Easing curve for a fast start and smooth decelerating finish
      const easedProgress = Math.floor(
        (1 - Math.pow(1 - progressFraction, 2.5)) * 100
      );

      setProgress(easedProgress);

      if (progressFraction < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Hold for a moment at 100% before initiating smooth dissolve
        setTimeout(() => {
          setIsClosing(true);
          // Allow fade-out animation to finish before unmounting
          setTimeout(() => {
            document.body.style.overflow = originalOverflow;
            if (onComplete) onComplete();
          }, 650);
        }, 180);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  // Dynamic status text based on progress
  const getStatusText = () => {
    if (progress < 30) return 'Initializing Neural Architecture...';
    if (progress < 65) return 'Syncing AI & Automation Workflows...';
    if (progress < 95) return 'Optimizing High-Performance Systems...';
    return 'Ready to Launch • Welcome to TafinityAI';
  };

  return (
    <div
      id="tafinity-preloader"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050811] text-white overflow-hidden select-none"
      style={{
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? 'scale(1.05)' : 'scale(1)',
        filter: isClosing ? 'blur(10px)' : 'blur(0px)',
        pointerEvents: isClosing ? 'none' : 'auto',
        transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), filter 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Tech Grid Background Overlay */}
      <div className="absolute inset-0 preloader-grid opacity-25 pointer-events-none" />

      {/* Ambient Radial Glowing Orbs */}
      <div 
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-[90px] preloader-glow-green pointer-events-none" 
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sky-500/15 blur-[100px] preloader-glow-blue pointer-events-none" 
      />
      <div 
        className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-rose-500/15 blur-[90px] preloader-glow-red pointer-events-none" 
      />

      {/* Central Content Card */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
        
        {/* Brand Logo with Ambient Pulse Ring */}
        <div className="relative mb-5 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-500/30 via-sky-500/30 to-rose-500/30 blur-xl animate-pulse" />
          <div className="relative p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-md">
            <img
              src="/logo.png"
              alt="TafinityAI Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-[0_0_20px_rgba(14,165,233,0.6)]"
            />
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <h1 className="text-xl sm:text-2xl font-black tracking-[0.25em] bg-gradient-to-r from-emerald-400 via-sky-300 to-rose-400 bg-clip-text text-transparent uppercase">
          TafinityAI
        </h1>
        <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] text-slate-400 mt-1 uppercase">
          Build Smarter • Automate Better
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* The 3-Dot Interactive Stage: Green, Blue, Red Sequential Jumping */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-8 mb-6 px-8 py-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl w-full flex flex-col items-center">
          
          {/* Jumping Dots Arena (height accommodates the 46px jump) */}
          <div className="relative flex items-end justify-center gap-7 sm:gap-9 h-20 pt-10">
            
            {/* Green Dot + Floor Shadow */}
            <div className="flex flex-col items-center">
              <div className="preloader-dot preloader-dot-green" />
              <div className="preloader-shadow preloader-shadow-green mt-2" />
            </div>

            {/* Blue Dot + Floor Shadow */}
            <div className="flex flex-col items-center">
              <div className="preloader-dot preloader-dot-blue" />
              <div className="preloader-shadow preloader-shadow-blue mt-2" />
            </div>

            {/* Red Dot + Floor Shadow */}
            <div className="flex flex-col items-center">
              <div className="preloader-dot preloader-dot-red" />
              <div className="preloader-shadow preloader-shadow-red mt-2" />
            </div>

          </div>

          {/* Subtitle indicators */}
          <div className="flex items-center justify-center gap-6 mt-3 text-[9px] font-semibold tracking-wider text-slate-400 uppercase">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#10b981]" />
              AI
            </span>
            <span className="text-sky-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block shadow-[0_0_6px_#0ea5e9]" />
              Cloud
            </span>
            <span className="text-rose-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block shadow-[0_0_6px_#ef4444]" />
              Scale
            </span>
          </div>

        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Progress Bar & Percentage Counter */}
        {/* ------------------------------------------------------------------ */}
        <div className="w-full">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[11px] text-slate-400 font-medium tracking-wide truncate max-w-[220px]">
              {getStatusText()}
            </span>
            <span className="text-xs font-mono font-bold text-sky-400 tracking-wider">
              {progress}%
            </span>
          </div>

          {/* Glowing Track */}
          <div className="w-full h-1.5 bg-slate-800/90 rounded-full overflow-hidden p-[1px] shadow-inner border border-slate-700/40">
            <div
              className="h-full rounded-full preloader-bar-gradient transition-all duration-75 shadow-[0_0_12px_rgba(14,165,233,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>

      {/* Bottom Footer Accent */}
      <div className="absolute bottom-6 flex items-center gap-2 text-[10px] text-slate-600 tracking-widest uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
        <span>Enterprise Intelligence Platform</span>
      </div>

    </div>
  );
};

export default Preloader;
