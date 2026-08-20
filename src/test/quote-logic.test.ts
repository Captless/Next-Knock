import { describe, it, expect } from 'vitest';
import { normalizeNewQuote, normalizePatch } from '@/lib/quote-logic';
import { quoteSchema } from '@/lib/quote-schema';
import type { QuoteInput } from '@/lib/quote-schema';

const base: QuoteInput = {
  customerName: 'Test',
  phone: '555',
  email: '',
  address: '',
  serviceType: 'house',
  amountCents: 10000,
  status: 'draft',
  followUpDate: '',
  notes: '',
};

describe('normalizeNewQuote', () => {
  it('sets won outcome when closing without outcome', () => {
    const out = normalizeNewQuote({ ...base, status: 'closed' });
    expect(out.closedOutcome).toBe('won');
  });

  it('sets default follow-up when sent without date', () => {
    const out = normalizeNewQuote({ ...base, status: 'sent', followUpDate: '' });
    expect(out.followUpDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('keeps provided follow-up when sent', () => {
    const out = normalizeNewQuote({ ...base, status: 'sent', followUpDate: '2026-09-01' });
    expect(out.followUpDate).toBe('2026-09-01');
  });
});

describe('normalizePatch', () => {
  it('clears outcome when leaving closed', () => {
    const out = normalizePatch({ status: 'sent', closedOutcome: 'won' });
    expect(out.closedOutcome).toBeUndefined();
  });

  it('defaults outcome when moving to closed', () => {
    const out = normalizePatch({ status: 'closed' });
    expect(out.closedOutcome).toBe('won');
  });
});

describe('quote validation', () => {
  it('rejects empty customer name', () => {
    const r = quoteSchema.safeParse({ ...base, customerName: '   ' });
    expect(r.success).toBe(false);
  });

  it('accepts valid quote', () => {
    const r = quoteSchema.safeParse(base);
    expect(r.success).toBe(true);
  });
});
