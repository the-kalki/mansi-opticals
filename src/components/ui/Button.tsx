import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'ghost' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  sheen?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      sheen,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const showSheen = sheen !== undefined ? sheen : (variant === 'primary' || variant === 'gold');

    const baseStyles =
      'group relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.96] active:translate-y-[1px] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 select-none cursor-pointer overflow-hidden';

    const variants = {
      primary:
        'bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20 hover:shadow-lg hover:shadow-teal-600/30 focus:ring-teal-500 border border-teal-500/30',
      secondary:
        'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white shadow-sm focus:ring-slate-400',
      glass:
        'bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 hover:border-teal-500/40 text-slate-800 dark:text-white backdrop-blur-md border border-slate-200/90 dark:border-white/15 shadow-sm hover:shadow-md focus:ring-teal-500',
      outline:
        'border-2 border-slate-300 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 bg-transparent focus:ring-teal-500',
      ghost:
        'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:ring-slate-400',
      gold:
        'bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 focus:ring-amber-400 border border-amber-400/40',
      danger:
        'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-500',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-6 py-3.5 gap-2.5 rounded-2xl',
      icon: 'p-2.5 rounded-xl',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {/* Specular sheen light sweep */}
        {showSheen && (
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        )}

        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon && (
            <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:scale-105">
              {leftIcon}
            </span>
          )
        )}
        <span className="relative z-10">{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-1">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
