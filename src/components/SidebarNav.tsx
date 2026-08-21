import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { HomeIcon, ListIcon, SettingsIcon } from '@/components/Icon';

const items = [
  { to: '/app', label: 'Home', Icon: HomeIcon, end: true },
  { to: '/app/quotes', label: 'Quotes', Icon: ListIcon, end: false },
  { to: '/app/settings', label: 'Settings', Icon: SettingsIcon, end: false },
];

export function SidebarNav({ businessName }: { businessName: string }) {
  return (
    <nav className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-surface lg:flex">
      <div className="border-b border-line px-4 py-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-ink-subtle">
          Next Knock
        </p>
        <h1 className="truncate text-base font-semibold text-ink">{businessName}</h1>
      </div>
      <div className="flex flex-col gap-1 p-4">
        {items.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
                isActive
                  ? 'bg-ink text-accentInk'
                  : 'text-ink-muted hover:bg-line/40 hover:text-ink',
              )
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
