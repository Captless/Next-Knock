import type { QuoteActivity } from '@/types';
import { QUOTE_ACTIVITY_LABEL } from '@/types';
import { formatDate } from '@/lib/dashboard';

export function ActivityHistory({ activity }: { activity: QuoteActivity[] }) {
  if (activity.length === 0) return null;
  return (
    <div className="rounded-lg border border-line bg-surface p-4 shadow-card">
      <p className="mb-2 text-sm font-medium text-ink">Activity</p>
      <ul className="flex flex-col gap-2">
        {activity.map((a) => (
          <li key={a.id} className="flex items-baseline justify-between gap-3 text-sm">
            <span className="text-ink">{QUOTE_ACTIVITY_LABEL[a.type]}</span>
            <span className="shrink-0 text-ink-subtle">{formatDate(a.createdAt)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
