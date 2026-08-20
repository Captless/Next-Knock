import { useNavigate } from 'react-router-dom';
import { useQuotes } from '@/hooks/useQuotes';
import { bucketQuotes, todayISO } from '@/lib/dashboard';
import { QuoteRow } from '@/components/QuoteRow';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Button } from '@/components/Button';
import { PlusIcon } from '@/components/Icon';

function Section({ title, count, children }: { title: string; count?: number; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">{title}</h2>
        {count !== undefined && <span className="text-xs text-ink-subtle">{count}</span>}
      </div>
      {children}
    </section>
  );
}

export function Home() {
  const { quotes, loading, error } = useQuotes();
  const navigate = useNavigate();
  const today = todayISO();
  const { dueToday, active, recent } = bucketQuotes(quotes, today);

  if (error) {
    return (
      <ErrorState
        title="Couldn't load quotes"
        message={error}
        action={
          <Button onClick={() => navigate(0)}>Retry</Button>
        }
      />
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Follow up next</h1>
        <p className="mt-0.5 text-sm text-ink-muted">
          {dueToday.length > 0
            ? `${dueToday.length} need attention today`
            : active.length > 0
              ? `${active.length} active quotes`
              : 'No follow-ups due'}
        </p>
      </div>

      {quotes.length === 0 ? (
        loading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : (
          <EmptyState
            title="No quotes yet"
            description="Add your first quote to start tracking follow-ups."
            action={
              <Button onClick={() => navigate('/app/quotes/new')}>
                <PlusIcon className="h-5 w-5" /> New quote
              </Button>
            }
          />
        )
      ) : (
        <>
          {dueToday.length > 0 && (
            <Section title="Due today" count={dueToday.length}>
              <div className="flex flex-col gap-2">
                {dueToday.map((q) => (
                  <QuoteRow key={q.id} quote={q} due />
                ))}
              </div>
            </Section>
          )}

          {active.length > 0 && (
            <Section title="Active quotes" count={active.length}>
              <div className="flex flex-col gap-2">
                {active.map((q) => (
                  <QuoteRow key={q.id} quote={q} />
                ))}
              </div>
            </Section>
          )}

          {recent.length > 0 && (
            <Section title="Recent" count={recent.length}>
              <div className="flex flex-col gap-2">
                {recent.map((q) => (
                  <QuoteRow key={q.id} quote={q} />
                ))}
              </div>
            </Section>
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
