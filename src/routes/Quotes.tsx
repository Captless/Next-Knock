import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuotes } from '@/hooks/useQuotes';
import type { QuoteStatus } from '@/types';
import { QuoteRow } from '@/components/QuoteRow';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Button } from '@/components/Button';
import { PlusIcon } from '@/components/Icon';
import { cn } from '@/lib/cn';

type Filter = 'all' | QuoteStatus;

const tabs: Array<{ key: Filter; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'draft', label: 'Draft' },
  { key: 'sent', label: 'Sent' },
  { key: 'follow_up', label: 'Follow up' },
  { key: 'closed', label: 'Closed' },
];

export function Quotes() {
  const { quotes, loading, error } = useQuotes();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>('all');

  const list =
    filter === 'all' ? quotes : quotes.filter((q) => q.status === filter);

  const sorted = [...list].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <div>
      <h1 className="mb-3 text-2xl font-semibold tracking-tight text-ink">Quotes</h1>

      {error ? (
        <ErrorState title="Couldn't load quotes" message={error} />
      ) : (
        <>
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setFilter(t.key)}
                className={cn(
                  'tap shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium',
                  filter === t.key
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
            ) : (
              <EmptyState
                title="No quotes here"
                description="Create a quote to start tracking follow-ups."
                action={
                  <Button onClick={() => navigate('/app/quotes/new')}>
                    <PlusIcon className="h-5 w-5" /> New quote
                  </Button>
                }
              />
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
    </div>
  );
}
