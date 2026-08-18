import React from 'react';
import { cn } from '@/lib/utils';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  glow?: boolean;
  glowColor?: 'teal' | 'cyan' | 'gold';
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      interactive = false,
      glow = false,
      glowColor = 'teal',
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
          'glass-card rounded-2xl p-6 transition-all duration-300',
          interactive && 'hover:-translate-y-1 cursor-pointer',
          glow && glowClasses[glowColor],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
