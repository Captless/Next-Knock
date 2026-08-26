import { Link } from 'react-router-dom';

const links = [
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'About', to: '/about' },
  { label: 'Log in', to: '/login' },
  { label: 'Sign up', to: '/signup', primary: true },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
];

export function LandingFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-wordmark.svg" alt="Next Knock" className="h-5 w-auto" />
            <span className="text-xs text-ink-subtle">© {year} Next Knock</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm sm:justify-end" aria-label="Footer">
            {links.map((l, i) => (
              <span key={l.label} className="flex items-center gap-x-1.5">
                {i > 0 && <span className="text-ink-subtle" aria-hidden>·</span>}
                {l.to ? (
                  <Link
                    to={l.to}
                    className={l.primary ? 'font-medium text-ink hover:text-ink/80' : 'text-ink-muted transition-colors hover:text-ink'}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    className="text-ink-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
