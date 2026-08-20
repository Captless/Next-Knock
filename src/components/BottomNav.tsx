import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { HomeIcon, ListIcon, SettingsIcon } from '@/components/Icon';

const items = [
  { to: '/app', label: 'Home', Icon: HomeIcon, end: true },
  { to: '/app/quotes', label: 'Quotes', Icon: ListIcon, end: false },
  { to: '/app/settings', label: 'Settings', Icon: SettingsIcon, end: false },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur safe-bottom">
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {items.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium',
                isActive ? 'text-ink' : 'text-ink-subtle',
              )
            }
          >
            <Icon className="h-6 w-6" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
