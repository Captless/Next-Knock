import { Link } from 'react-router-dom';

const productLinks = [
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Log in', to: '/login' },
  { label: 'Sign up', to: '/signup' },
];

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
];

export function LandingFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink text-sm font-bold text-accentInk">
                N
              </span>
              <span className="font-display text-base font-semibold text-ink">Next Knock</span>
            </div>
            <p className="mt-3 text-sm text-ink-muted">
              Know who to follow up with next.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-subtle">
                Product
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {productLinks.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link to={l.to} className="text-sm text-ink-muted transition-colors hover:text-ink">
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-subtle">
                Company
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {companyLinks.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-ink-muted transition-colors hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-line pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-ink-subtle">© {year} Next Knock. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Next Knock on X"
              className="text-ink-subtle transition-colors hover:text-ink"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Next Knock on LinkedIn"
              className="text-ink-subtle transition-colors hover:text-ink"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
