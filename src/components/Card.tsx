import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function Card({ children, className, padded = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-line bg-surface shadow-card',
        padded && 'p-4',
        className,
      )}
    >
      {children}
    </div>
  );
}