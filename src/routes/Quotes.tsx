import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuotes } from '@/hooks/useQuotes';
import type { Quote } from '@/types';
import { isActive, isFollowUp, todayISO } from '@/lib/dashboard';
import { quoteFilterOptions, type QuoteFilter } from '@/lib/select-options';
import { QuoteRow } from '@/components/QuoteRow';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Button } from '@/components/Button';
import { PlusIcon } from '@/components/Icon';
import { cn } from '@/lib/cn';

const matchesFilter = (q: Quote, filter: QuoteFilter, today: string): boolean => {
  switch (filter) {
    case 'all':
      return true;
    case 'open':
      return isActive(q);
    case 'needs_follow_up':
      return isFollowUp(q, today);
    case 'won':
      return q.status === 'closed' && q.closedOutcome === 'won';
    case 'lost':
      return q.status === 'closed' && q.closedOutcome === 'lost';
  }
};

const matchesSearch = (q: Quote, term: string): boolean => {
  if (!term) return true;
  const t = term.toLowerCase();
  return (
    q.customerName.toLowerCase().includes(t) ||
    q.phone.toLowerCase().includes(t) ||
    (q.email?.toLowerCase().includes(t) ?? false)
  );
};

export function Quotes() {
  const { quotes, loading, error } = useQuotes();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const today = todayISO();

  const initialFilter = (params.get('filter') as QuoteFilter) || 'all';
  const [filter, setFilter] = useState<QuoteFilter>(initialFilter);
  const [search, setSearch] = useState(params.get('search') ?? '');

  const changeFilter = (f: QuoteFilter) => {
    setFilter(f);
    const next = new URLSearchParams(params);
    if (f === 'all') next.delete('filter');
    else next.set('filter', f);
    setParams(next, { replace: true });
  };

  const list = useMemo(
    () => quotes.filter((q) => matchesFilter(q, filter, today) && matchesSearch(q, search)),
    [quotes, filter, search, today],
  );

  const sorted = useMemo(
    () =>
      [...list].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      ),
    [list],
  );

  return (
    <div>
      <h1 className="mb-3 text-2xl font-semibold tracking-tight text-ink">Quotes</h1>

      {error && !loading ? (
        <ErrorState title="Couldn't load quotes" message={error} />
      ) : (
        <>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search quotes…"
            aria-label="Search quotes"
            className="mb-3 h-11 w-full rounded border border-line bg-surface px-3 text-base text-ink placeholder:text-ink-subtle focus:border-ink focus:outline-none"
          />

          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {quoteFilterOptions.map((t) => (
              <button
                key={t.value}
                onClick={() => changeFilter(t.value)}
                className={cn(
                  'tap shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium',
                  filter === t.value
                    ? 'border-ink bg-ink text-accentInk'
                    : 'border-line bg-surface text-ink-muted',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {sorted.length === 0 ? (
            loading ? (
              <p className="text-sm text-ink-muted">Loading…</p>
            ) : search ? (
              <EmptyState
                title="No quotes found"
                description="Try a different name or phone number."
              />
            ) : quotes.length === 0 ? (
              <EmptyState
                title="No quotes yet"
                description="Create your first quote to start tracking your follow-ups."
                action={
                  <Button onClick={() => navigate('/app/quotes/new')}>
                    <PlusIcon className="h-5 w-5" /> New quote
                  </Button>
                }
              />
            ) : (
              <EmptyState title="No quotes here" description="No quotes match this filter." />
            )
          ) : (
            <div className="flex flex-col gap-2">
              {sorted.map((q) => (
                <QuoteRow key={q.id} quote={q} />
              ))}
            </div>
          )}
        </>
      )}

      <Button
        full
        className="fixed inset-x-0 bottom-20 z-30 mx-auto max-w-md"
        onClick={() => navigate('/app/quotes/new')}
      >
        <PlusIcon className="h-5 w-5" /> New quote
      </Button>
    </div>
  );
}
