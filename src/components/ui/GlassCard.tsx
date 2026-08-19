import React from 'react';
import { cn } from '@/lib/utils';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  glow?: boolean;
  glowColor?: 'teal' | 'cyan' | 'gold';
  sheen?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      interactive = false,
      glow = false,
      glowColor = 'teal',
      sheen = false,
      children,
      ...props
    },
    ref
  ) => {
    const glowClasses = {
      teal: 'hover:shadow-glass-glow hover:border-teal-500/40',
      cyan: 'hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.3)] hover:border-cyan-500/40',
      gold: 'hover:shadow-glass-glow-gold hover:border-amber-500/40',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'glass-card rounded-2xl p-6 transition-all duration-300 relative group/card',
          interactive && 'hover:-translate-y-1 active:scale-[0.99] cursor-pointer',
          glow && glowClasses[glowColor],
          sheen && 'overflow-hidden',
          className
        )}
        {...props}
      >
        {sheen && (
          <span
            className="absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        )}
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
