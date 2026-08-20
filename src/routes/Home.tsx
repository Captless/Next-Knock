import { useNavigate } from 'react-router-dom';
import { useQuotes } from '@/hooks/useQuotes';
import { useAuth } from '@/hooks/useAuth';
import { bucketQuotes, todayISO } from '@/lib/dashboard';
import { formatAmountCents } from '@/lib/quote-schema';
import { FollowUpItem } from '@/components/FollowUpItem';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Button } from '@/components/Button';
import { PlusIcon } from '@/components/Icon';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex-1 rounded-lg border border-line bg-surface p-3 text-center shadow-card">
      <div className="text-2xl font-semibold text-ink">{value}</div>
      <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-ink-muted">
        {label}
      </div>
    </div>
  );
}

export function Home() {
  const { quotes, loading, error } = useQuotes();
  const { user } = useAuth();
  const navigate = useNavigate();
  const today = todayISO();
  const { followUp, attention, activeSummary } = bucketQuotes(quotes, today);

  if (error && !loading) {
    return (
      <ErrorState
        title="Couldn't load quotes"
        message={error}
        action={<Button onClick={() => navigate(0)}>Retry</Button>}
      />
    );
  }

  const name = user?.businessName?.trim() || 'there';

  return (
    <div>
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-subtle">
          Next Knock
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          {greeting()}, {name}
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
          <section className="mb-6">
            <div className="mb-2 flex items-baseline justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Attention
              </h2>
            </div>
            {attention.overdue === 0 && attention.dueToday === 0 ? (
              <div className="rounded-lg border border-line bg-surface p-4 text-center shadow-card">
                <p className="font-medium text-ink">You're all caught up.</p>
                <p className="text-sm text-ink-muted">No follow-ups need your attention.</p>
              </div>
            ) : (
              <div className="flex gap-3">
                <Metric label="Overdue" value={attention.overdue} />
                <Metric label="Due today" value={attention.dueToday} />
              </div>
            )}
          </section>

          {followUp.length > 0 && (
            <section className="mb-6">
              <div className="mb-2 flex items-baseline justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                  Follow up now
                </h2>
                {followUp.length > 3 && (
                  <button
                    onClick={() => navigate('/app/quotes?filter=follow_up')}
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
                Active quotes
              </h2>
              <button
                onClick={() => navigate('/app/quotes?filter=active')}
                className="text-xs font-medium text-ink-muted underline"
              >
                View active
              </button>
            </div>
            <div className="rounded-lg border border-line bg-surface p-4 shadow-card">
              <div className="text-2xl font-semibold text-ink">{activeSummary.count}</div>
              <div className="text-sm text-ink-muted">
                active quotes · {formatAmountCents(activeSummary.value)} potential value
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
