export function LandingFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-ink-muted sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-ink text-xs font-bold text-accentInk">
            N
          </span>
          <span className="font-medium text-ink">Next Knock</span>
        </div>
        <p className="text-center text-xs text-ink-subtle sm:text-right">
          &copy; {year} Next Knock. Know who to follow up with next.
        </p>
      </div>
    </footer>
  );
}
