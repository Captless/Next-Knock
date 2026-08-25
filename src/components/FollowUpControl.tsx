import { useState } from 'react';
import { addDays, format } from 'date-fns';
import type { Quote } from '@/types';
import { todayISO, isOverdue, isDueToday } from '@/lib/dashboard';
import { formatDate } from '@/lib/dashboard';
import { Button } from '@/components/Button';
import { cn } from '@/lib/cn';

function addDaysToISO(fromISO: string, days: number): string {
  return format(addDays(new Date(fromISO), days), 'yyyy-MM-dd');
}

const quickOptions = [
  { label: 'Tomorrow', days: 1 },
  { label: 'In 3 days', days: 3 },
  { label: 'Next week', days: 7 },
];

export function FollowUpControl({
  quote,
  onSet,
}: {
  quote: Quote;
  onSet: (date: string) => void;
}) {
  const today = todayISO();
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState('');

  const hasFollowUp = !!quote.followUpDate;
  let stateLabel = 'No follow-up scheduled';
  let stateTone = 'text-ink-muted';
  if (hasFollowUp) {
    if (isOverdue(quote, today)) {
      stateLabel = `Overdue · ${formatDate(quote.followUpDate)}`;
      stateTone = 'text-danger';
    } else if (isDueToday(quote, today)) {
      stateLabel = `Due today · ${formatDate(quote.followUpDate)}`;
      stateTone = 'text-warning';
    } else {
      stateLabel = `Scheduled · ${formatDate(quote.followUpDate)}`;
      stateTone = 'text-ink';
    }
  }

  return (
    <div className="rounded-lg border border-line bg-surface p-4 shadow-card">
      <p className="mb-1 text-sm font-medium text-ink">Follow-up</p>
      <p className={cn('text-sm', stateTone)}>{stateLabel}</p>

      {!open && (
        <Button
          variant="secondary"
          size="sm"
          className="mt-3"
          full
          onClick={() => setOpen(true)}
        >
          {hasFollowUp ? 'Reschedule follow-up' : 'Schedule follow-up'}
        </Button>
      )}

      {open && (
        <div className="mt-3 flex flex-col gap-2">
          {quickOptions.map((o) => (
            <Button
              key={o.days}
              variant="secondary"
              size="sm"
              full
              onClick={() => {
                onSet(addDaysToISO(today, o.days));
                setOpen(false);
              }}
            >
              {o.label}
            </Button>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={custom}
              min={today}
              onChange={(e) => setCustom(e.target.value)}
              className="h-10 flex-1 rounded border border-line bg-surface px-2 text-sm text-ink"
              aria-label="Custom follow-up date"
            />
            <Button
              size="sm"
              disabled={!custom}
              onClick={() => {
                if (custom) {
                  onSet(custom);
                  setOpen(false);
                }
              }}
            >
              Set
            </Button>
          </div>
          <Button variant="ghost" size="sm" full onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
