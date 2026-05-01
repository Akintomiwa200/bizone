import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className }) => {
  const variants = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-on-primary)]',
    secondary: 'bg-[var(--color-surface-strong)] text-[var(--color-ink)]',
    success: 'bg-[var(--color-semantic-success)] text-white',
    warning: 'bg-[var(--color-timeline-done)] text-[var(--color-ink)]',
    error: 'bg-[var(--color-semantic-error)] text-white'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-[10px] py-[4px] rounded-[var(--radius-pill)] text-[11px] font-[600] leading-[1.4] tracking-[0.88px] uppercase',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;