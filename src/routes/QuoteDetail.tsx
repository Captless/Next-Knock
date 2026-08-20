import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuotes } from '@/hooks/useQuotes';
import { Badge } from '@/components/Badge';
import { statusTone, outcomeTone } from '@/lib/tones';
import {
  SERVICE_TYPE_LABEL,
  STATUS_LABEL,
  CLOSED_OUTCOME_LABEL,
} from '@/types';
import { formatAmountCents } from '@/lib/quote-schema';
import { formatDate } from '@/lib/dashboard';
import { statusOptions, outcomeOptions, isClosedOutcome } from '@/lib/select-options';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { ErrorState } from '@/components/ErrorState';
import { useToast } from '@/components/Toast';
import { PhoneIcon, MessageIcon, EditIcon, TrashIcon, BackIcon } from '@/components/Icon';

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
  const [confirm, setConfirm] = useState(false);

  const quote = quotes.find((q) => q.id === id);

  if (!quote) {
    return (
      <div>
        <button onClick={() => navigate('/app/quotes')} className="mb-4 inline-flex items-center gap-1 text-sm text-ink-muted">
          <BackIcon className="h-5 w-5" /> Back
        </button>
        <ErrorState title="Quote not found" message="This quote may have been deleted." />
      </div>
    );
  }

  const tel = `tel:${quote.phone.replace(/[^0-9+]/g, '')}`;
  const sms = `sms:${quote.phone.replace(/[^0-9+]/g, '')}`;

  const onStatusChange = async (value: string) => {
    try {
      if (value === 'closed') {
        await updateQuote(quote.id, { status: 'closed', closedOutcome: 'won' });
        notify('Marked closed — won', 'success');
      } else {
        await updateQuote(quote.id, {
          status: value as typeof quote.status,
          closedOutcome: undefined,
        });
        notify(`Status: ${STATUS_LABEL[value as keyof typeof STATUS_LABEL]}`, 'success');
      }
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Update failed', 'error');
    }
  };

  const onOutcomeChange = async (value: string) => {
    if (!isClosedOutcome(value)) return;
    try {
      await updateQuote(quote.id, { closedOutcome: value });
      notify(`Outcome: ${CLOSED_OUTCOME_LABEL[value]}`, 'success');
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
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{quote.customerName}</h1>
        <Badge tone={statusTone(quote.status)}>{STATUS_LABEL[quote.status]}</Badge>
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

      <div className="rounded-lg border border-line bg-surface p-4 shadow-card">
        <Row label="Service" value={SERVICE_TYPE_LABEL[quote.serviceType]} />
        <Row label="Quote amount" value={formatAmountCents(quote.amountCents)} />
        <Row label="Phone" value={quote.phone} />
        {quote.email && <Row label="Email" value={quote.email} />}
        {quote.address && <Row label="Address" value={quote.address} />}
        <Row
          label="Follow-up"
          value={quote.followUpDate ? formatDate(quote.followUpDate) : '—'}
        />
        {quote.notes && <Row label="Notes" value={quote.notes} />}
        <Row label="Created" value={formatDate(quote.createdAt)} />
      </div>

      <div className="mt-4 rounded-lg border border-line bg-surface p-4 shadow-card">
        <p className="mb-2 text-sm font-medium text-ink">Update status</p>
        <Select
          ariaLabel="Status"
          value={quote.status}
          onChange={onStatusChange}
          options={statusOptions as unknown as Array<{ value: string; label: string }>}
        />
        {quote.status === 'closed' && (
          <div className="mt-3">
            <p className="mb-2 text-sm font-medium text-ink">Outcome</p>
            <Select
              ariaLabel="Outcome"
              value={quote.closedOutcome ?? 'won'}
              onChange={onOutcomeChange}
              options={outcomeOptions as unknown as Array<{ value: string; label: string }>}
            />
            {quote.closedOutcome && (
              <Badge tone={outcomeTone(quote.closedOutcome)} className="mt-2">
                {CLOSED_OUTCOME_LABEL[quote.closedOutcome]}
              </Badge>
            )}
          </div>
        )}
      </div>

      <Button
        variant="ghost"
        full
        className="mt-4 text-danger"
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
    </div>
  );
}
