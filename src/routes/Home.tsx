import { useNavigate } from 'react-router-dom';
import { useQuotes } from '@/hooks/useQuotes';
import { bucketQuotes, todayISO } from '@/lib/dashboard';
import { FollowUpItem } from '@/components/FollowUpItem';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Button } from '@/components/Button';
import { PlusIcon } from '@/components/Icon';

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
    <div>
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-subtle">
          Next Knock
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Quotes
        </h1>
      </div>

      {quotes.length === 0 ? (
        loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : (
          <EmptyState
            title="No quotes yet"
            description="Create your first quote to start tracking your follow-ups."
            action={
              <Button onClick={() => navigate('/app/quotes/new')}>
                <PlusIcon className="h-5 w-5" /> New quote
              </Button>
            }
          />
        )
      ) : (
        <>
          {followUp.length > 0 && (
            <section className="mb-6">
              <div className="mb-2 flex items-baseline justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                  Needs Follow-up
                </h2>
                {followUp.length > 3 && (
                  <button
                    onClick={() => navigate('/app/quotes?filter=needs_follow_up')}
                    className="text-xs font-medium text-ink-muted underline"
                  >
                    View all
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {followUp.slice(0, 3).map((q) => (
                  <FollowUpItem key={q.id} quote={q} />
                ))}
              </div>
            </section>
          )}

          <section className="mb-6">
            <div className="mb-2 flex items-baseline justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Open Quotes
              </h2>
              <button
                onClick={() => navigate('/app/quotes?filter=open')}
                className="text-xs font-medium text-ink-muted underline"
              >
                View all
              </button>
            </div>
            <div className="rounded-lg border border-line bg-surface p-4 shadow-card">
              <div className="text-2xl font-semibold text-ink">{openCount}</div>
              <div className="text-sm text-ink-muted">
                open quotes
              </div>
            </div>
          </section>
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
