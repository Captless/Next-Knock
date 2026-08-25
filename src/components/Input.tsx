import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, error, hint, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && !error && <span className="text-xs text-ink-muted">{hint}</span>}
      {error && <span className="text-xs text-danger">{error}</span>}
    </label>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded border border-line bg-surface px-3 text-base text-ink',
        'placeholder:text-ink-subtle',
        'focus:border-ink focus:outline-none',
        className,
      )}
      {...rest}
    />
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...rest }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'min-h-[88px] rounded border border-line bg-surface px-3 py-2 text-base text-ink',
        'placeholder:text-ink-subtle',
        'focus:border-ink focus:outline-none',
        className,
      )}
      {...rest}
    />
  );
}