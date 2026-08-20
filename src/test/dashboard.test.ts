import { describe, it, expect } from 'vitest';
import { bucketQuotes, defaultFollowUpDate, todayISO } from '@/lib/dashboard';
import { formatAmountCents, parseAmountToCents } from '@/lib/quote-schema';
import type { Quote } from '@/types';

const q = (over: Partial<Quote>): Quote => ({
  id: 'id',
  customerName: 'Test',
  phone: '555',
  serviceType: 'house',
  amountCents: 12500,
  status: 'sent',
  createdAt: '2026-08-19T00:00:00.000Z',
  updatedAt: '2026-08-19T00:00:00.000Z',
  ...over,
});

describe('bucketQuotes', () => {
  const today = '2026-08-19';

  it('separates due today, active, recent correctly', () => {
    const quotes: Quote[] = [
      q({ id: '1', status: 'sent', followUpDate: today }),
      q({ id: '2', status: 'follow_up', followUpDate: today }),
      q({ id: '3', status: 'sent', followUpDate: '2026-08-22' }),
      q({ id: '4', status: 'draft' }),
      q({ id: '5', status: 'closed', closedOutcome: 'won' }),
    ];
    const out = bucketQuotes(quotes, today);
    expect(out.dueToday.map((x) => x.id)).toEqual(['1', '2']);
    expect(out.active.map((x) => x.id)).toEqual(['3']);
    expect(out.recent.map((x) => x.id)).toEqual(['1', '2', '3', '4', '5']);
  });

  it('returns empty buckets when no quotes', () => {
    const out = bucketQuotes([], today);
    expect(out.dueToday).toEqual([]);
    expect(out.active).toEqual([]);
    expect(out.recent).toEqual([]);
  });
});

describe('defaultFollowUpDate', () => {
  it('returns +3 days', () => {
    expect(defaultFollowUpDate('2026-08-19')).toBe('2026-08-22');
  });
});

describe('money', () => {
  it('formats cents to USD', () => {
    expect(formatAmountCents(12500)).toBe('$125.00');
    expect(formatAmountCents(0)).toBe('$0.00');
  });

  it('parses dollars to cents', () => {
    expect(parseAmountToCents('125.00')).toBe(12500);
    expect(parseAmountToCents('$1,250.50')).toBe(125050);
    expect(parseAmountToCents('')).toBe(0);
    expect(parseAmountToCents('abc')).toBe(0);
  });
});

describe('todayISO', () => {
  it('returns YYYY-MM-DD', () => {
    expect(todayISO()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});