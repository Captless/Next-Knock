import { describe, it, expect } from 'vitest';
import {
  listQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
  validateQuoteInput,
} from '@/server/quotes';
import type { D1Database } from '@cloudflare/workers-types';
import type { QuoteInput } from '@/lib/quote-schema';

class FakeStmt {
  sql: string;
  binds: unknown[] = [];
  constructor(sql: string) {
    this.sql = sql;
  }
  bind(...b: unknown[]) {
    this.binds = b;
    return this;
  }
  async run() {
    return { success: true };
  }
  async first<T>(): Promise<T | null> {
    return { id: 'x' } as T;
  }
  async all<T>(): Promise<{ results: T[] }> {
    return { results: [] };
  }
}

class FakeDB {
  calls: Array<{ sql: string; binds: unknown[] }> = [];
  prepare(sql: string) {
    const stmt = new FakeStmt(sql);
    const origBind = stmt.bind.bind(stmt);
    stmt.bind = (...b: unknown[]) => {
      this.calls.push({ sql, binds: b });
      return origBind(...b);
    };
    return stmt;
  }
  async batch(stmts: any[]): Promise<any[]> {
    const out = [];
    for (const s of stmts) out.push(await s.run());
    return out;
  }
}

const input: QuoteInput = {
  customerName: 'Maria',
  phone: '555',
  email: '',
  address: '',
  serviceType: 'house',
  amountCents: 10000,
  status: 'sent',
  followUpDate: '',
  notes: '',
};

describe('D1 ownership + queries', () => {
  it('listQuotes filters by user_id', async () => {
    const db = new FakeDB();
    await listQuotes(db as unknown as D1Database, 'user-1');
    const call = db.calls[0]!;
    expect(call.sql).toContain('user_id = ?');
    expect(call.binds).toContain('user-1');
  });

  it('getQuote binds id and user_id (cross-user isolation)', async () => {
    const db = new FakeDB();
    await getQuote(db as unknown as D1Database, 'user-1', 'q-9');
    const call = db.calls[0]!;
    expect(call.sql).toContain('id = ?');
    expect(call.sql).toContain('user_id = ?');
    expect(call.binds).toEqual(['q-9', 'user-1']);
  });

  it('createQuote inserts ownership + normalized fields', async () => {
    const db = new FakeDB();
    await createQuote(db as unknown as D1Database, 'user-1', input);
    const insert = db.calls.find((c) => c.sql.includes('INSERT INTO quotes'))!;
    expect(insert.sql).toContain('INSERT INTO quotes');
    expect(insert.binds[1]).toBe('user-1');
    expect(insert.binds).toContain('sent');
    expect(insert.binds).toContain('house');
  });

  it('updateQuote enforces WHERE id + user_id', async () => {
    const db = new FakeDB();
    await updateQuote(db as unknown as D1Database, 'user-1', 'q-9', { status: 'closed' });
    const update = db.calls.find((c) => c.sql.includes('UPDATE quotes SET'))!;
    expect(update.sql).toContain('id = ? AND user_id = ?');
    expect(update.binds.slice(-2)).toEqual(['q-9', 'user-1']);
  });

  it('deleteQuote enforces WHERE id + user_id', async () => {
    const db = new FakeDB();
    await deleteQuote(db as unknown as D1Database, 'user-1', 'q-9');
    const call = db.calls[0]!;
    expect(call.sql).toContain('DELETE FROM quotes');
    expect(call.binds).toEqual(['q-9', 'user-1']);
  });
});

describe('validateQuoteInput', () => {
  it('rejects bad data', () => {
    const r = validateQuoteInput({ customerName: '', phone: '' });
    expect(r.ok).toBe(false);
  });
  it('accepts valid input', () => {
    const r = validateQuoteInput(input);
    expect(r.ok).toBe(true);
  });
});
