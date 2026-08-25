import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-ink text-accentInk hover:bg-ink/90 active:bg-ink/80',
  secondary: 'bg-surface text-ink border border-line hover:bg-bg active:bg-line/40',
  ghost: 'bg-transparent text-ink hover:bg-line/40',
  danger: 'bg-danger text-white hover:bg-danger/90',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-base',
  lg: 'h-12 px-5 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  full = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded font-medium',
        'transition-[colors,transform] disabled:opacity-50 disabled:cursor-not-allowed',
        'active:scale-[0.98] tap select-none',
        variantStyles[variant],
        sizeStyles[size],
        full && 'w-full',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}