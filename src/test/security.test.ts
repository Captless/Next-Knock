// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { SignJWT } from 'jose';
import {
  verifySession,
  requireUserId,
  createSession,
  sessionCookie,
  AuthError,
} from '@/server/auth';
import {
  getQuote,
  updateQuote,
  deleteQuote,
  createQuote,
  validateQuoteInput,
} from '@/server/quotes';

const SECRET = 'test-secret';
const enc = (s: string) => new TextEncoder().encode(s);

class FakeStmt {
  sql = '';
  binds: unknown[] = [];
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
    const s = new FakeStmt();
    const orig = s.bind.bind(s);
    s.bind = (...b: unknown[]) => {
      this.calls.push({ sql, binds: b });
      return orig(...b);
    };
    s.sql = sql;
    return s;
  }
}

describe('authentication bypass', () => {
  it('rejects missing token', async () => {
    const req = new Request('https://x.test/api/quotes');
    await expect(requireUserId(req, SECRET)).rejects.toBeInstanceOf(AuthError);
  });

  it('rejects forged/tampered token', async () => {
    const forged = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYWNrIn0.xxxx';
    expect(await verifySession(forged, SECRET)).toBeNull();
  });

  it('rejects token signed with wrong secret', async () => {
    const token = await createSession('u1', 'other-secret');
    expect(await verifySession(token, SECRET)).toBeNull();
  });

  it('rejects expired token', async () => {
    const token = await new SignJWT({ sub: 'u1' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(new Date(Date.now() - 1000))
      .sign(enc(SECRET));
    expect(await verifySession(token, SECRET)).toBeNull();
  });

  it('requireUserId resolves only with valid signature', async () => {
    const token = await createSession('u9', SECRET);
    const req = new Request('https://x.test/api/quotes', {
      headers: { Cookie: `nk_session=${token}` },
    });
    expect(await requireUserId(req, SECRET)).toBe('u9');
  });
});

describe('cross-user data isolation', () => {
  it('getQuote always scopes by user_id', async () => {
    const db = new FakeDB();
    await getQuote(db as any, 'victim', 'quote-1');
    const c = db.calls[0]!;
    expect(c.sql).toContain('id = ?');
    expect(c.sql).toContain('user_id = ?');
    expect(c.binds).toEqual(['quote-1', 'victim']);
  });

  it('deleteQuote always scopes by user_id', async () => {
    const db = new FakeDB();
    await deleteQuote(db as any, 'victim', 'quote-1');
    const c = db.calls[0]!;
    expect(c.sql).toContain('DELETE FROM quotes');
    expect(c.binds).toEqual(['quote-1', 'victim']);
  });

  it('updateQuote ignores ownership fields from request body', async () => {
    const db = new FakeDB();
    await updateQuote(db as any, 'attacker', 'real-id', {
      id: 'hack',
      userId: 'victim',
      status: 'sent',
    } as any);
    const upd = db.calls.find((c) => c.sql.includes('UPDATE quotes SET'))!;
    // WHERE always uses the server-provided id + userId, never the body
    expect(upd.sql).toContain('WHERE id = ? AND user_id = ?');
    expect(upd.binds.slice(-2)).toEqual(['real-id', 'attacker']);
    expect(upd.binds).not.toContain('hack');
    expect(upd.binds).not.toContain('victim');
  });
});

describe('SQL injection parameterization', () => {
  it('user input is bound, not interpolated', async () => {
    const db = new FakeDB();
    const malicious = "x'; DROP TABLE quotes; --";
    await createQuote(db as any, 'u1', {
      customerName: malicious,
      phone: malicious,
      email: '',
      address: '',
      serviceType: 'house',
      amountCents: 100,
      status: 'draft',
      followUpDate: '',
      notes: '',
    });
    const ins = db.calls.find((c) => c.sql.includes('INSERT INTO quotes'))!;
    // SQL structure is constant — never contains the injection string
    expect(ins.sql).not.toContain(malicious);
    expect(ins.binds).toContain(malicious);
  });
});

describe('malicious / invalid input', () => {
  const good = {
    customerName: 'A',
    phone: '1',
    email: '',
    address: '',
    serviceType: 'house' as const,
    amountCents: 100,
    status: 'draft' as const,
    followUpDate: '',
    notes: '',
  };

  it('rejects oversized notes', () => {
    const r = validateQuoteInput({ ...good, notes: 'x'.repeat(501) });
    expect(r.ok).toBe(false);
  });

  it('rejects invalid service type', () => {
    const r = validateQuoteInput({ ...good, serviceType: 'rocket' });
    expect(r.ok).toBe(false);
  });

  it('rejects invalid status', () => {
    const r = validateQuoteInput({ ...good, status: 'deleted' });
    expect(r.ok).toBe(false);
  });

  it('rejects negative amount', () => {
    const r = validateQuoteInput({ ...good, amountCents: -5 });
    expect(r.ok).toBe(false);
  });

  it('rejects malformed email', () => {
    const r = validateQuoteInput({ ...good, email: 'not-an-email' });
    expect(r.ok).toBe(false);
  });

  it('rejects empty customer name', () => {
    const r = validateQuoteInput({ ...good, customerName: '   ' });
    expect(r.ok).toBe(false);
  });
});

describe('CSRF / session cookie hygiene', () => {
  it('cookie is HttpOnly + SameSite=Lax', () => {
    const c = sessionCookie('tok', true);
    expect(c).toContain('HttpOnly');
    expect(c).toContain('SameSite=Lax');
  });

  it('cookie is Secure only over https', () => {
    expect(sessionCookie('tok', true)).toContain('Secure');
    expect(sessionCookie('tok', false)).not.toContain('Secure');
  });
});

describe('secret exposure', () => {
  it('session token is not the raw secret', async () => {
    const token = await createSession('u1', SECRET);
    expect(token).not.toBe(SECRET);
  });
});
