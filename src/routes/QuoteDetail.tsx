import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuotes } from '@/hooks/useQuotes';
import type { QuoteActivity } from '@/types';
import { LOST_REASONS } from '@/types';
import { Badge } from '@/components/Badge';
import { statusTone, outcomeTone } from '@/lib/tones';
import {
  SERVICE_TYPE_LABEL,
  STATUS_LABEL,
  CLOSED_OUTCOME_LABEL,
} from '@/types';
import { formatAmountCents } from '@/lib/quote-schema';
import { formatDate } from '@/lib/dashboard';
import { Button } from '@/components/Button';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { ErrorState } from '@/components/ErrorState';
import { FollowUpControl } from '@/components/FollowUpControl';
import { ActivityHistory } from '@/components/ActivityHistory';
import { useToast } from '@/components/Toast';
import {
  PhoneIcon,
  MessageIcon,
  EditIcon,
  TrashIcon,
  BackIcon,
  CheckIcon,
  SendIcon,
} from '@/components/Icon';

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <span className="text-sm text-ink-muted">{label}</span>
      <span className="text-right text-sm font-medium text-ink">{value}</span>
    </div>
  );
}

export function QuoteDetail() {
  const { id } = useParams();
  const { quotes, updateQuote, removeQuote } = useQuotes();
  const navigate = useNavigate();
  const { notify } = useToast();
  const [activity, setActivity] = useState<QuoteActivity[]>([]);
  const [confirm, setConfirm] = useState(false);
  const [lostOpen, setLostOpen] = useState(false);
  const [lostReason, setLostReason] = useState('');

  const quote = quotes.find((q) => q.id === id);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    fetch(`/api/quotes/${id}`, { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && Array.isArray(d.activity)) setActivity(d.activity);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [id, quote?.updatedAt]);

  if (!quote) {
    return (
      <div>
        <button
          onClick={() => navigate('/app/quotes')}
          className="mb-4 inline-flex items-center gap-1 text-sm text-ink-muted"
        >
          <BackIcon className="h-5 w-5" /> Back
        </button>
        <ErrorState title="Quote not found" message="This quote may have been deleted." />
      </div>
    );
  }

  const tel = `tel:${quote.phone.replace(/[^0-9+]/g, '')}`;
  const sms = `sms:${quote.phone.replace(/[^0-9+]/g, '')}`;

  const sendQuote = async () => {
    try {
      await updateQuote(quote.id, { status: 'sent' });
      notify('Quote sent', 'success');
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Update failed', 'error');
    }
  };

  const onFollowUp = async (date: string) => {
    try {
      await updateQuote(quote.id, { followUpDate: date });
      notify('Follow-up updated', 'success');
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Update failed', 'error');
    }
  };

  const markWon = async () => {
    try {
      await updateQuote(quote.id, { status: 'closed', closedOutcome: 'won' });
      notify('Marked won', 'success');
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Update failed', 'error');
    }
  };

  const markLost = async () => {
    try {
      await updateQuote(quote.id, {
        status: 'closed',
        closedOutcome: 'lost',
        lostReason: lostReason || undefined,
      });
      notify('Marked lost', 'success');
      setLostOpen(false);
      setLostReason('');
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Update failed', 'error');
    }
  };

  const onDelete = async () => {
    try {
      await removeQuote(quote.id);
      notify('Quote deleted', 'info');
      navigate('/app/quotes', { replace: true });
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Delete failed', 'error');
    }
  };

  const terminal = quote.status === 'closed' && quote.closedOutcome === 'won';
  const isLost = quote.status === 'closed' && quote.closedOutcome === 'lost';

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/app/quotes')}
          className="inline-flex items-center gap-1 text-sm text-ink-muted"
        >
          <BackIcon className="h-5 w-5" /> Quotes
        </button>
        <button
          onClick={() => navigate(`/app/quotes/${quote.id}/edit`)}
          className="inline-flex items-center gap-1 text-sm font-medium text-ink"
        >
          <EditIcon className="h-4 w-4" /> Edit
        </button>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          {quote.customerName}
        </h1>
        {quote.status === 'closed' && quote.closedOutcome ? (
          <Badge tone={outcomeTone(quote.closedOutcome)}>
            {CLOSED_OUTCOME_LABEL[quote.closedOutcome]}
          </Badge>
        ) : (
          <Badge tone={statusTone(quote.status)}>{STATUS_LABEL[quote.status]}</Badge>
        )}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <a href={tel} className="tap">
          <Button variant="primary" full>
            <PhoneIcon className="h-5 w-5" /> Call
          </Button>
        </a>
        <a href={sms} className="tap">
          <Button variant="secondary" full>
            <MessageIcon className="h-5 w-5" /> Message
          </Button>
        </a>
      </div>

      <div className="mb-4 rounded-lg border border-line bg-surface p-4 shadow-card">
        <Row label="Service" value={SERVICE_TYPE_LABEL[quote.serviceType]} />
        <Row label="Quote amount" value={formatAmountCents(quote.amountCents)} />
        <Row label="Phone" value={quote.phone} />
        {quote.email && <Row label="Email" value={quote.email} />}
        {quote.address && <Row label="Address" value={quote.address} />}
        {quote.lostReason && <Row label="Lost reason" value={quote.lostReason} />}
        <Row
          label="Follow-up"
          value={quote.followUpDate ? formatDate(quote.followUpDate) : '—'}
        />
        {quote.notes && <Row label="Notes" value={quote.notes} />}
        <Row label="Created" value={formatDate(quote.createdAt)} />
      </div>

      {!terminal && !isLost && (
        <>
          {quote.status === 'draft' && (
            <div className="mb-4">
              <Button full onClick={sendQuote}>
                <SendIcon className="h-5 w-5" /> Send quote
              </Button>
            </div>
          )}

          <div className="mb-4">
            <FollowUpControl quote={quote} onSet={onFollowUp} />
          </div>

          <div className="mb-4 flex gap-2">
            <Button variant="secondary" full onClick={markWon}>
              <CheckIcon className="h-5 w-5" /> Mark Won
            </Button>
            <Button variant="secondary" full onClick={() => setLostOpen(true)}>
              Mark Lost
            </Button>
          </div>
        </>
      )}

      {terminal || isLost ? (
        <div className="mb-4 rounded-lg border border-line bg-surface p-4 text-center shadow-card">
          <p className="text-sm text-ink-muted">
            This quote is {isLost ? 'lost' : 'won'} and no longer needs follow-up.
          </p>
        </div>
      ) : null}

      <div className="mb-4">
        <ActivityHistory activity={activity} />
      </div>

      <Button
        variant="ghost"
        full
        className="mt-2 text-danger"
        onClick={() => setConfirm(true)}
      >
        <TrashIcon className="h-5 w-5" /> Delete quote
      </Button>

      <ConfirmDialog
        open={confirm}
        title="Delete quote?"
        message={`This removes ${quote.customerName}'s quote. This cannot be undone.`}
        onConfirm={onDelete}
        onCancel={() => setConfirm(false)}
      />

      {lostOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 px-4 pb-8">
          <div className="w-full max-w-sm rounded-xl border border-line bg-surface p-5 shadow-pop">
            <h2 className="text-lg font-semibold text-ink">Mark lost</h2>
            <p className="mt-1 text-sm text-ink-muted">Optional reason:</p>
            <div className="mt-3 flex flex-col gap-2">
              {LOST_REASONS.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setLostReason(r.value)}
                  className={
                    'rounded border px-3 py-2 text-left text-sm ' +
                    (lostReason === r.value
                      ? 'border-ink bg-line/30 text-ink'
                      : 'border-line bg-surface text-ink-muted')
                  }
                >
                  {r.label}
                </button>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="secondary" full onClick={() => setLostOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" full onClick={markLost}>
                Mark Lost
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
