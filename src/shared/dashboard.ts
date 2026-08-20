import type { Quote } from './types';

export const formatDate = (iso: string | undefined): string => {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const todayISO = (): string => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
};

export const defaultFollowUpDate = (fromISO: string): string => {
  const d = new Date(fromISO);
  d.setDate(d.getDate() + 3);
  return d.toISOString().slice(0, 10);
};

/** A quote is terminal when closed as Won or Lost. */
export const isTerminal = (q: Quote): boolean =>
  q.status === 'closed' && (q.closedOutcome === 'won' || q.closedOutcome === 'lost');

/** Active = not in a terminal (Won/Lost) outcome. */
export const isActive = (q: Quote): boolean => !isTerminal(q);

/** Actionable overdue follow-up: past date, still requires follow-up. */
export const isOverdue = (q: Quote, today: string): boolean =>
  !!q.followUpDate && !isTerminal(q) && q.followUpDate < today;

/** Actionable due-today follow-up. */
export const isDueToday = (q: Quote, today: string): boolean =>
  !!q.followUpDate && !isTerminal(q) && q.followUpDate === today;

/** Has a follow-up requiring action (scheduled, due, or overdue). */
export const isFollowUp = (q: Quote, today: string): boolean =>
  !!q.followUpDate && !isTerminal(q) && (isOverdue(q, today) || isDueToday(q, today));

export interface DashboardBuckets {
  overdue: Quote[];
  dueToday: Quote[];
  /** Actionable follow-ups: overdue (oldest first) then due today. */
  followUp: Quote[];
  /** Quotes not in a terminal outcome. */
  active: Quote[];
  attention: { overdue: number; dueToday: number };
  activeSummary: { count: number; value: number };
  recent: Quote[];
}

export const bucketQuotes = (quotes: Quote[], today: string): DashboardBuckets => {
  const overdue: Quote[] = [];
  const dueToday: Quote[] = [];
  const active: Quote[] = [];

  for (const q of quotes) {
    if (isOverdue(q, today)) overdue.push(q);
    else if (isDueToday(q, today)) dueToday.push(q);
    if (isActive(q)) active.push(q);
  }

  const byDateAsc = (a: Quote, b: Quote) =>
    (a.followUpDate ?? '').localeCompare(b.followUpDate ?? '');
  overdue.sort(byDateAsc);
  dueToday.sort(byDateAsc);

  const followUp = [...overdue, ...dueToday];

  const value = active.reduce((sum, q) => sum + (q.amountCents ?? 0), 0);

  const sorted = [...quotes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const recent: Quote[] = [];
  for (const q of sorted) {
    if (recent.length >= 5) break;
    recent.push(q);
  }

  return {
    overdue,
    dueToday,
    followUp,
    active,
    attention: { overdue: overdue.length, dueToday: dueToday.length },
    activeSummary: { count: active.length, value },
    recent,
  };
};
