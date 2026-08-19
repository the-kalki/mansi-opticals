'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Glasses } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';

interface HeroFrameCardProps {
  product: Product;
  onOpenBuilder: (product: Product) => void;
}

export const HeroFrameCard: React.FC<HeroFrameCardProps> = ({ product, onOpenBuilder }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate motion values normalized from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Emil Kowalski spring configuration: stiff & well-damped for responsive, non-sluggish physical feel
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Subtle 3D perspective rotation (max +/- 6 degrees to avoid extreme distortions)
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);

  // Dynamic optical glare highlight position
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="relative flex items-center justify-center w-full max-w-md"
    >
      {/* Ambient radiant background circle */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-teal-500/20 to-cyan-400/20 rounded-full blur-3xl -z-10 animate-pulse-slow pointer-events-none" />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="glass-card rounded-3xl p-6 sm:p-7 border border-white/60 dark:border-white/10 shadow-2xl relative w-full bg-white/90 dark:bg-slate-900/80 gpu-layer overflow-hidden group/hero-card cursor-pointer"
      >
        {/* Optical Prismatic Glare Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/hero-card:opacity-100 transition-opacity duration-300 -z-0"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(circle 280px at ${x} ${y}, rgba(20, 184, 166, 0.12), transparent 70%)`
            ),
          }}
        />

        {/* Top pill badge */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <Badge variant="gold" size="sm" className="transition-transform duration-200 group-hover/hero-card:scale-105">
            ★ Flagship Titanium Edition
          </Badge>
          <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500">
            9.2g Featherweight
          </span>
        </div>

        {/* Product Frame Showcase Image with Anti-Reflective Sheen */}
        <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-200/50 dark:border-white/5 relative z-10">
          <Image
            src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1000&q=80"
            alt="Mansi Aero Titanium Round"
            fill
            className="object-cover group-hover/hero-card:scale-105 transition-transform duration-500 ease-out"
            priority
          />

          {/* Anti-reflective lens sheen sweep */}
          <div className="absolute inset-0 -translate-x-full group-hover/hero-card:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-tr from-transparent via-teal-400/20 to-transparent pointer-events-none" />

          {/* Lens badge */}
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1.5 shadow-sm transition-transform duration-200 group-hover/hero-card:scale-105">
            <Sparkles className="w-3 h-3 text-teal-400 animate-twinkle" />
            <span>Blue-Shield Coated</span>
          </div>
        </div>

        {/* Frame Info & Quick Builder Action */}
        <div className="mt-5 space-y-3 relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white transition-colors group-hover/hero-card:text-teal-600 dark:group-hover/hero-card:text-teal-400">
                {product.name}
              </h3>
              <p className="text-xs text-slate-500">
                Japanese Beta-Titanium • Matte Obsidian
              </p>
            </div>
            <span className="text-lg font-bold font-display text-teal-600 dark:text-teal-400">
              {formatPrice(product.price)}
            </span>
          </div>

          <Button
            variant="primary"
            size="md"
            className="w-full shadow-md shadow-teal-600/20 group/btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpenBuilder(product);
            }}
            leftIcon={
              <Glasses className="w-4 h-4 transition-transform duration-200 group-hover/btn:rotate-[-8deg] group-hover/btn:scale-110" />
            }
          >
            Configure Custom Lenses
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
