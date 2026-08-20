import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { BottomNav } from '@/components/BottomNav';

export function AppShell({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const businessName = user?.businessName || 'My Cleaning Business';
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-bg">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur safe-top">
        <div className="px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-ink-subtle">
            Next Knock
          </p>
          <h1 className="truncate text-base font-semibold text-ink">{businessName}</h1>
        </div>
      </header>
      <main className="flex-1 px-4 pb-24 pt-4">{children}</main>
      <BottomNav />
    </div>
  );
}
