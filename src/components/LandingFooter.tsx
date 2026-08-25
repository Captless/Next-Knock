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
        </div>
      </div>
    </footer>
  );
}
