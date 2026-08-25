import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';

const navLinks = [
  { href: '#problem', label: 'Problem' },
  { href: '#how', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export function LandingNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-sm font-bold text-accentInk">
            N
          </span>
          <span className="text-base font-semibold tracking-tight text-ink">Next Knock</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-muted hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden text-sm font-medium text-ink-muted hover:text-ink sm:inline"
          >
            Log in
          </Link>
          <Button size="sm" onClick={() => (window.location.href = '/signup')}>
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}
