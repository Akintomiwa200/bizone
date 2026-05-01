import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[14px] font-[400] text-[var(--color-body)] mb-[var(--spacing-xs)]">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-[44px] w-full rounded-[var(--radius-md)] bg-[var(--color-surface-card)] px-[16px] py-[12px] text-[16px] text-[var(--color-ink)] placeholder:text-[var(--color-muted-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ink)] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 border border-[var(--color-hairline)]',
            error && 'border-[var(--color-semantic-error)] focus:ring-[var(--color-semantic-error)]',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-[var(--spacing-xs)] text-[14px] text-[var(--color-semantic-error)]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;