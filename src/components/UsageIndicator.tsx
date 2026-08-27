import { useQuotes } from '@/hooks/useQuotes';

export function UsageIndicator() {
  const { usage } = useQuotes();
  if (usage.plan === 'paid') {
    return (
      <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-muted">
        Unlimited quotes
      </span>
    );
  }
  const remaining = Math.max(0, usage.limit - usage.used);
  const atLimit = usage.used >= usage.limit;
  return (
    <span
      className={
        atLimit
          ? 'rounded-full border border-danger/40 bg-danger/5 px-3 py-1 text-xs font-medium text-danger'
          : remaining === 1
            ? 'rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink'
            : 'rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-muted'
      }
    >
      {usage.used}/{usage.limit} free quotes
      {remaining === 1 && !atLimit ? ' · 1 left' : ''}
    </span>
  );
}
