import { useNavigate } from 'react-router-dom';
import { useQuotes } from '@/hooks/useQuotes';
import { bucketQuotes, todayISO } from '@/lib/dashboard';
import { formatAmountCents } from '@/lib/quote-schema';
import { FollowUpItem } from '@/components/FollowUpItem';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Button } from '@/components/Button';
import { PlusIcon } from '@/components/Icon';
import { UpgradeModal } from '@/components/UpgradeModal';
import { useState } from 'react';

export function Home() {
  const { quotes, loading, error, usage } = useQuotes();
  const navigate = useNavigate();
  const today = todayISO();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { followUp } = bucketQuotes(quotes, today);

  const won = quotes.filter((q) => q.status === 'closed' && q.closedOutcome === 'won');
  const lost = quotes.filter((q) => q.status === 'closed' && q.closedOutcome === 'lost');
  const wonCount = won.length;
  const wonValue = won.reduce((sum, q) => sum + q.amountCents, 0);
  const lostCount = lost.length;
  const lostValue = lost.reduce((sum, q) => sum + q.amountCents, 0);

  if (error && !loading) {
    return (
      <ErrorState
        title="Couldn't load quotes"
        message={error}
        action={<Button onClick={() => navigate(0)}>Retry</Button>}
      />
    );
  }

  const onNew = () => {
    if (usage.plan === 'free' && usage.used >= usage.limit) {
      setShowUpgrade(true);
      return;
    }
    navigate('/app/quotes/new');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Home</h1>
        <Button variant="primary" size="md" onClick={onNew}>
          <PlusIcon className="h-5 w-5" /> New Quote
        </Button>
      </div>

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />

      {quotes.length === 0 ? (
        loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : (
          <EmptyState
            title="No quotes yet"
            description="Create your first quote to start tracking your follow-ups."
          />
        )
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
            <button
              onClick={() => navigate('/app/quotes?filter=needs_follow_up')}
              className="font-medium text-ink transition-colors hover:text-ink-muted"
            >
              Follow-up <span className="font-semibold">{followUp.length}</span>
            </button>
            <button
              onClick={() => navigate('/app/quotes?filter=won')}
              className="font-medium text-ink transition-colors hover:text-ink-muted"
            >
              Won <span className="font-semibold text-success">{wonCount}</span>
              {wonCount > 0 && (
                <span className="ml-1 text-ink-muted">{formatAmountCents(wonValue)}</span>
              )}
            </button>
            <button
              onClick={() => navigate('/app/quotes?filter=lost')}
              className="font-medium text-ink transition-colors hover:text-ink-muted"
            >
              Lost <span className="font-semibold text-danger">{lostCount}</span>
              {lostCount > 0 && (
                <span className="ml-1 text-ink-muted">{formatAmountCents(lostValue)}</span>
              )}
            </button>
          </div>

          <section className="flex flex-col gap-2">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
              Needs Follow-up
            </h2>
            {followUp.length > 0 ? (
              <div className="flex flex-col gap-2">
                {followUp.slice(0, 3).map((q) => (
                  <FollowUpItem key={q.id} quote={q} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-ink-muted">
                Nothing needs follow-up right now.
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
