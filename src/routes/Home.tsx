import { useNavigate } from 'react-router-dom';
import { useQuotes } from '@/hooks/useQuotes';
import { bucketQuotes, todayISO } from '@/lib/dashboard';
import { FollowUpItem } from '@/components/FollowUpItem';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Button } from '@/components/Button';
import { PlusIcon, ChevronRight } from '@/components/Icon';

export function Home() {
  const { quotes, loading, error } = useQuotes();
  const navigate = useNavigate();
  const today = todayISO();
  const { followUp, openCount } = bucketQuotes(quotes, today);

  if (error && !loading) {
    return (
      <ErrorState
        title="Couldn't load quotes"
        message={error}
        action={<Button onClick={() => navigate(0)}>Retry</Button>}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Home</h1>
        <Button variant="primary" size="md" onClick={() => navigate('/app/quotes/new')}>
          <PlusIcon className="h-5 w-5" /> New Quote
        </Button>
      </div>

      {quotes.length === 0 ? (
        loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : (
          <EmptyState
            title="No quotes yet"
            description="Create your first quote to start tracking your follow-ups."
          />
        )
      ) : quotes.length > 0 && followUp.length > 0 ? (
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_320px] lg:gap-6">
          <section className="flex flex-col gap-6">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
              Needs Follow-up
            </h2>
            <div className="flex flex-col gap-2">
              {followUp.slice(0, 3).map((q) => (
                <FollowUpItem key={q.id} quote={q} />
              ))}
            </div>
          </section>

          <aside className="flex flex-col gap-4">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
              Open Quotes
            </h2>
            <button
              onClick={() => navigate('/app/quotes?filter=open')}
              className="flex w-full items-center gap-3 rounded-lg border border-line bg-ink p-4 text-left text-white transition-colors hover:bg-ink/90 active:bg-ink/80"
            >
              <div className="min-w-0 flex-1">
                <div className="text-2xl font-semibold">{openCount}</div>
                <div className="text-sm text-white/80">Open quotes</div>
                <div className="mt-1 text-xs text-white/70">
                  Quotes that don't need follow-up today
                </div>
              </div>
              <ChevronRight className="h-6 w-6 shrink-0 text-white/70" />
            </button>
          </aside>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {followUp.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Needs Follow-up
              </h2>
              <div className="flex flex-col gap-2">
                {followUp.slice(0, 3).map((q) => (
                  <FollowUpItem key={q.id} quote={q} />
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
              Open Quotes
            </h2>
            <button
              onClick={() => navigate('/app/quotes?filter=open')}
              className="flex w-full items-center gap-3 rounded-lg border border-line bg-ink p-4 text-left text-white transition-colors hover:bg-ink/90 active:bg-ink/80"
            >
              <div className="min-w-0 flex-1">
                <div className="text-2xl font-semibold">{openCount}</div>
                <div className="text-sm text-white/80">Open quotes</div>
                <div className="mt-1 text-xs text-white/70">
                  Quotes that don't need follow-up today
                </div>
              </div>
              <ChevronRight className="h-6 w-6 shrink-0 text-white/70" />
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
