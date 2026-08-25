import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function PageShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <Link to="/" className="text-sm text-ink-muted transition-colors hover:text-ink">
          &larr; Back to home
        </Link>
        <h1 className="font-display mt-6 text-3xl font-semibold tracking-tight text-ink">{title}</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-muted">{children}</div>
      </div>
    </div>
  );
}
