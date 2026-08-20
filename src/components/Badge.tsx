import { cn } from '@/lib/cn';

export type BadgeTone = 'neutral' | 'info' | 'warn' | 'success' | 'danger' | 'muted';

interface BadgeProps {
  tone?: BadgeTone;
  children: React.ReactNode;
  className?: string;
}

const toneStyles: Record<BadgeTone, string> = {
  neutral: 'bg-ink text-accentInk',
  info: 'bg-ink/10 text-ink',
  warn: 'bg-[#FEF3C7] text-warning',
  success: 'bg-[#DCFCE7] text-success',
  danger: 'bg-[#FEE2E2] text-danger',
  muted: 'bg-line/40 text-ink-muted',
};

export function Badge({ tone = 'muted', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium',
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}