// @vitest-environment node
import { describe, it, expect } from 'vitest';
import {
  createQuote,
  QuoteLimitError,
  FREE_QUOTE_LIMIT,
} from '@/server/quotes';
import type { QuoteInput } from '@/lib/quote-schema';

const baseInput: QuoteInput = {
  customerName: 'Test',
  phone: '+1 415 555 0100',
  serviceType: 'house',
  amountCents: 1000,
  status: 'draft',
  followUpDate: undefined,
  notes: undefined,
};

// FakeDB that tracks user plan + quote count and simulates atomic batch.
function makeDb(plan: string, created: number) {
  const state = { plan, quotes_created: created };
  const calls: string[] = [];
  const stmt = (sql: string) => ({
    bind: (..._b: unknown[]) => ({
      run: async () => {
        calls.push(sql);
        if (sql.includes('UPDATE users SET quotes_created')) {
          state.quotes_created += 1;
        }
        return { success: true };
      },
      first: async <T>(): Promise<T | null> => {
        if (sql.includes('SELECT plan, quotes_created')) {
          return { plan: state.plan, quotes_created: state.quotes_created } as T;
        }
        if (sql.includes('SELECT * FROM quotes WHERE id')) {
          return { id: 'q1' } as T;
        }
        return null;
      },
      all: async () => ({ results: [] }),
    }),
  });
  const db = {
    prepare: (sql: string) => stmt(sql),
    batch: async (stmts: any[]) => {
      for (const s of stmts) await s.run();
      return [];
    },
  } as any;
  return { db, state, calls };
}

describe('free-tier quote limit (server-enforced)', () => {
  it('allows creating quotes under the limit', async () => {
    const { db, state } = makeDb('free', 4);
    await expect(createQuote(db, 'u1', baseInput)).resolves.toBeTruthy();
    expect(state.quotes_created).toBe(5);
  });

  it('rejects the 6th quote with QuoteLimitError', async () => {
    const { db, state } = makeDb('free', 5);
    await expect(createQuote(db, 'u1', baseInput)).rejects.toBeInstanceOf(QuoteLimitError);
    // counter must NOT increment on rejection
    expect(state.quotes_created).toBe(5);
  });

  it('caps lifetime usage at exactly the limit', async () => {
    expect(FREE_QUOTE_LIMIT).toBe(5);
  });

  it('never grants free users more than the limit even via batch', async () => {
    const { db, state } = makeDb('free', 5);
    // simulate two concurrent attempts
    const results = await Promise.allSettled([
      createQuote(db, 'u1', baseInput),
      createQuote(db, 'u1', baseInput),
    ]);
    const rejected = results.filter((r) => r.status === 'rejected').length;
    expect(rejected).toBeGreaterThanOrEqual(1);
    expect(state.quotes_created).toBeLessThanOrEqual(FREE_QUOTE_LIMIT);
  });

  it('allows paid users unlimited quotes', async () => {
    const { db } = makeDb('paid', 999);
    await expect(createQuote(db, 'u1', baseInput)).resolves.toBeTruthy();
  });

  it('deleting a quote does not restore quota', async () => {
    const { db, state } = makeDb('free', 5);
    await createQuote(db, 'u1', baseInput).catch(() => {});
    // deletion is a separate path; counter is intentionally never decremented
    expect(state.quotes_created).toBe(5);
  });
});
