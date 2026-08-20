import { useNavigate } from 'react-router-dom';
import type { Quote } from '@/types';
import { Badge } from '@/components/Badge';
import { statusTone } from '@/lib/tones';
import { SERVICE_TYPE_LABEL, STATUS_LABEL, CLOSED_OUTCOME_LABEL } from '@/types';
import { formatAmountCents } from '@/lib/quote-schema';
import { formatDate } from '@/lib/dashboard';
import { ChevronRight } from '@/components/Icon';
import { cn } from '@/lib/cn';

export function QuoteRow({ quote, due }: { quote: Quote; due?: boolean }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/app/quotes/${quote.id}`)}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg border border-line bg-surface p-3 text-left',
        'tap active:bg-bg transition-colors',
        due && 'border-warning/40',
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium text-ink">{quote.customerName}</span>
          <Badge tone={statusTone(quote.status)}>
            {quote.status === 'closed' && quote.closedOutcome
              ? CLOSED_OUTCOME_LABEL[quote.closedOutcome]
              : STATUS_LABEL[quote.status]}
          </Badge>
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-sm text-ink-muted">
          <span className="truncate">{SERVICE_TYPE_LABEL[quote.serviceType]}</span>
          <span>·</span>
          <span className="font-medium text-ink">{formatAmountCents(quote.amountCents)}</span>
        </div>
        {quote.followUpDate && quote.status !== 'closed' && (
          <div className={cn('mt-0.5 text-xs', due ? 'text-warning' : 'text-ink-subtle')}>
            Follow-up {formatDate(quote.followUpDate)}
            {due && ' · due'}
          </div>
        )}
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-ink-subtle" />
    </button>
  );
}
