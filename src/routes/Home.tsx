import { useNavigate } from 'react-router-dom';
import { useQuotes } from '@/hooks/useQuotes';
import { bucketQuotes, todayISO } from '@/lib/dashboard';
import { formatAmountCents } from '@/lib/quote-schema';
import { FollowUpItem } from '@/components/FollowUpItem';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Button } from '@/components/Button';
import { PlusIcon } from '@/components/Icon';

function SummaryCard({
  label,
  count,
  detail,
  to,
}: {
  label: string;
  count: number;
  detail?: string;
  to: string;
}) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="flex flex-col rounded-lg border border-line bg-surface p-4 text-left shadow-card transition-colors hover:bg-bg active:bg-line/40"
    >
      <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</span>
      <span className="mt-1 text-3xl font-semibold tracking-tight text-ink">{count}</span>
      {detail && <span className="mt-1 text-sm text-ink-muted">{detail}</span>}
    </button>
  );
}

export function Home() {
  const { quotes, loading, error } = useQuotes();
  const navigate = useNavigate();
  const today = todayISO();
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
      ) : (
        <>
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SummaryCard
              label="Needs Follow-up"
              count={followUp.length}
              to="/app/quotes?filter=needs_follow_up"
            />
            <SummaryCard
              label="Won"
              count={wonCount}
              detail={`${formatAmountCents(wonValue)} estimated value`}
              to="/app/quotes?filter=won"
            />
            <SummaryCard
              label="Lost"
              count={lostCount}
              detail={`${formatAmountCents(lostValue)} potential value lost`}
              to="/app/quotes?filter=lost"
            />
          </section>

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
