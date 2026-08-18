import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'teal' | 'cyan' | 'gold' | 'slate' | 'outline' | 'glass';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'teal',
  size = 'md',
  children,
  ...props
}) => {
  const variants = {
    teal: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20',
    gold: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30 font-medium',
    slate: 'bg-slate-200/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-300/60 dark:border-slate-700',
    outline: 'bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
    glass: 'bg-white/60 dark:bg-white/10 backdrop-blur-md text-slate-800 dark:text-slate-200 border-white/40 dark:border-white/15 shadow-sm',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded-full',
    md: 'text-xs px-2.5 py-1 rounded-full',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium border transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
