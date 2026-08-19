'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Glasses, Sparkles } from 'lucide-react';

export const CinematicIntro: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scroll during the intro animation
    document.body.style.overflow = 'hidden';

    // Auto-dismiss after 2.8 seconds
    const timer = setTimeout(() => {
      handleDismiss();
    }, 2800);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cinematic-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(6px)',
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          onClick={handleDismiss}
          className="fixed inset-0 z-[2147483647] flex flex-col items-center justify-center bg-[#05080F] text-white select-none cursor-pointer overflow-hidden"
          role="dialog"
          aria-label="Welcome to Mansi Optical"
          aria-hidden={!isVisible}
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-teal-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute w-[350px] h-[350px] bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          {/* 1. Cinematic Logo Mark Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-slate-900/90 border border-white/20 shadow-2xl flex items-center justify-center mb-5 overflow-hidden group"
          >
            {/* Prismatic reflection sheen sweep */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-teal-400/25 to-transparent pointer-events-none" />
            <Glasses className="w-9 h-9 sm:w-10 sm:h-10 text-teal-400 drop-shadow-[0_0_12px_rgba(20,184,166,0.6)]" />
          </motion.div>

          {/* 2. Brand Name with Luxury Tracking */}
          <motion.h1
            initial={{ opacity: 0, y: 12, letterSpacing: '0.22em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.14em' }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-widest text-center px-4"
          >
            <span className="text-white">MANSI</span>{' '}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              OPTICAL
            </span>
          </motion.h1>

          {/* 3. Glowing Expanding Precision Divider Line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="h-[1.5px] w-[180px] sm:w-[240px] bg-gradient-to-r from-transparent via-teal-400/80 to-transparent my-4 shadow-[0_0_10px_rgba(20,184,166,0.8)]"
          />

          {/* 4. Brand Tagline with Crisp Typography */}
          <motion.p
            initial={{ opacity: 0, y: 8, letterSpacing: '0.24em' }}
            animate={{ opacity: 0.85, y: 0, letterSpacing: '0.18em' }}
            transition={{ duration: 0.75, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="text-[9px] sm:text-xs font-semibold text-slate-300 tracking-widest uppercase text-center px-4"
          >
            Professional Eye Care • Quality Eyewear
          </motion.p>

          {/* Bottom Branding & Skip Hint */}
          <div className="absolute bottom-6 inset-x-0 px-6 flex items-center justify-between text-[10px] tracking-wider text-slate-400 font-mono">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              Crafted by{' '}
              <a
                href="https://www.shunya-labs.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-teal-400 font-semibold hover:underline cursor-pointer"
              >
                Shunya Labs
              </a>
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              Tap anywhere to skip
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
