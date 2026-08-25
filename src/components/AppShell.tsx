import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { BottomNav } from '@/components/BottomNav';
import { SidebarNav } from '@/components/SidebarNav';

export function AppShell({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const businessName = user?.businessName || 'My Cleaning Business';
  return (
    <div className="min-h-screen bg-bg lg:flex">
      <SidebarNav businessName={businessName} />
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur safe-top lg:hidden">
          <div className="px-4 py-3">
            <div className="flex items-center gap-2">
              <img src="/logo-icon.svg" alt="" className="h-5 w-5" />
              <p className="text-[11px] font-medium uppercase tracking-wide text-ink-subtle">
                Next Knock
              </p>
            </div>
            <h1 className="truncate text-base font-semibold text-ink">{businessName}</h1>
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-4 lg:pb-8 lg:px-8">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
