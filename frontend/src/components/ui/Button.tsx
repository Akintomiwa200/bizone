import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'download';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
      primary: 'bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-active)] focus:ring-[var(--color-primary)] rounded-[var(--radius-md)] px-[18px] py-[10px] h-[40px] text-[14px] leading-[1.0] font-[500]',
      secondary: 'bg-[var(--color-surface-card)] text-[var(--color-ink)] hover:bg-[var(--color-canvas-soft)] focus:ring-[var(--color-ink)] rounded-[var(--radius-md)] px-[17px] py-[9px] h-[40px] text-[14px] leading-[1.0] font-[500] border border-[var(--color-hairline-strong)]',
      outline: 'border border-[var(--color-hairline-strong)] bg-transparent hover:bg-[var(--color-canvas-soft)] focus:ring-[var(--color-ink)] rounded-[var(--radius-md)] text-[14px] leading-[1.0] font-[500]',
      ghost: 'bg-transparent hover:bg-[var(--color-canvas-soft)] focus:ring-[var(--color-ink)] text-[14px] leading-[1.0] font-[500]',
      download: 'bg-[var(--color-ink)] text-[var(--color-canvas)] hover:bg-[var(--color-body)] focus:ring-[var(--color-ink)] rounded-[var(--radius-md)] px-[20px] py-[12px] h-[44px] text-[14px] leading-[1.0] font-[500]'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;