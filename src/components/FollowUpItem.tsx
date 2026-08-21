import { useNavigate } from 'react-router-dom';
import type { Quote } from '@/types';
import { SERVICE_TYPE_LABEL } from '@/types';
import { formatAmountCents } from '@/lib/quote-schema';
import { todayISO, isOverdue } from '@/lib/dashboard';
import { Button } from '@/components/Button';
import { PhoneIcon, MessageIcon } from '@/components/Icon';
import { cn } from '@/lib/cn';

function daysOverdue(followUpDate: string, today: string): number {
  const a = new Date(followUpDate).getTime();
  const b = new Date(today).getTime();
  return Math.round((b - a) / 86_400_000);
}

export function FollowUpItem({ quote }: { quote: Quote }) {
  const navigate = useNavigate();
  const today = todayISO();
  const overdue = isOverdue(quote, today);
  const state = overdue
    ? daysOverdue(quote.followUpDate!, today) <= 1
      ? '1 day overdue'
      : `${daysOverdue(quote.followUpDate!, today)} days overdue`
    : 'Due today';

  const tel = `tel:${quote.phone.replace(/[^0-9+]/g, '')}`;
  const sms = `sms:${quote.phone.replace(/[^0-9+]/g, '')}`;

  return (
    <div className="rounded-lg border border-line bg-surface p-3 shadow-card lg:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <button
          onClick={() => navigate(`/app/quotes/${quote.id}`)}
          className="block w-full text-left"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="truncate font-medium text-ink">{quote.customerName}</span>
            <span className="shrink-0 font-medium text-ink">
              {formatAmountCents(quote.amountCents)}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-sm text-ink-muted">
            <span className="truncate">{SERVICE_TYPE_LABEL[quote.serviceType]}</span>
          </div>
          <div className={cn('mt-1 text-xs font-medium', overdue ? 'text-danger' : 'text-warning')}>
            {state}
          </div>
        </button>
        <div className="flex shrink-0 gap-2">
          <a href={tel} className="flex-1 lg:flex-none">
            <Button variant="secondary" size="sm" full>
              <PhoneIcon className="h-4 w-4" /> Call
            </Button>
          </a>
          <a href={sms} className="flex-1 lg:flex-none">
            <Button variant="secondary" size="sm" full>
              <MessageIcon className="h-4 w-4" /> Message
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
