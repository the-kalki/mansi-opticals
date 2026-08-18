import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface StepItem {
  id: number;
  title: string;
  subtitle?: string;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className,
}) => {
  return (
    <div className={cn('w-full py-2', className)}>
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-teal-500 transition-all duration-500 -z-0"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div
              key={step.id}
              onClick={() => isCompleted && onStepClick && onStepClick(step.id)}
              className={cn(
                'flex flex-col items-center group relative z-10 select-none',
                isCompleted && onStepClick && 'cursor-pointer'
              )}
            >
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 border-2',
                  isCompleted &&
                    'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-600/30',
                  isCurrent &&
                    'bg-white dark:bg-slate-900 border-teal-500 text-teal-600 dark:text-teal-400 ring-4 ring-teal-500/20 shadow-lg',
                  !isCompleted &&
                    !isCurrent &&
                    'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <div className="mt-2 text-center hidden sm:block">
                <span
                  className={cn(
                    'text-xs font-semibold block transition-colors',
                    isCurrent
                      ? 'text-teal-600 dark:text-teal-400'
                      : isCompleted
                      ? 'text-slate-800 dark:text-slate-200'
                      : 'text-slate-400 dark:text-slate-500'
                  )}
                >
                  {step.title}
                </span>
                {step.subtitle && (
                  <span className="text-[11px] text-slate-400 block">
                    {step.subtitle}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
