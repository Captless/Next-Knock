import type { ReactNode } from 'react';

export function ErrorState({
  title = 'Something went wrong',
  message,
  action,
}: {
  title?: string;
  message?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-line bg-surface p-8 text-center">
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      {message && <p className="max-w-xs text-sm text-ink-muted">{message}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
