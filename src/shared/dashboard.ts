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

export const isDueToday = (followUpDate: string | undefined, today: string): boolean => {
  if (!followUpDate) return false;
  return followUpDate <= today;
};

export const defaultFollowUpDate = (fromISO: string): string => {
  const d = new Date(fromISO);
  d.setDate(d.getDate() + 3);
  return d.toISOString().slice(0, 10);
};

export interface DashboardBuckets {
  dueToday: Quote[];
  active: Quote[];
  recent: Quote[];
}

export const bucketQuotes = (quotes: Quote[], today: string): DashboardBuckets => {
  const dueToday: Quote[] = [];
  const active: Quote[] = [];
  const recent: Quote[] = [];

  for (const q of quotes) {
    if (q.status === 'closed') continue;
    if (q.followUpDate && q.followUpDate <= today && (q.status === 'sent' || q.status === 'follow_up')) {
      dueToday.push(q);
    }
  }

  for (const q of quotes) {
    if (q.status === 'closed') continue;
    if (q.status !== 'sent' && q.status !== 'follow_up') continue;
    if (q.followUpDate && q.followUpDate <= today) continue;
    active.push(q);
  }

  active.sort((a, b) => {
    const af = a.followUpDate ?? '9999-12-31';
    const bf = b.followUpDate ?? '9999-12-31';
    return af.localeCompare(bf);
  });

  const sorted = [...quotes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  for (const q of sorted) {
    if (recent.length >= 5) break;
    recent.push(q);
  }

  dueToday.sort((a, b) => (a.followUpDate ?? '').localeCompare(b.followUpDate ?? ''));

  return { dueToday, active, recent };
};