// @vitest-environment node
import { describe, it, expect } from 'vitest';
import {
  hashPassword,
  verifyPassword,
  signup,
  login,
  createSession,
  verifySession,
  requireUserId,
  sessionCookie,
  sessionTokenFromRequest,
  AuthError,
} from '@/server/auth';

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
    return null;
  }
  async all<T>(): Promise<{ results: T[] }> {
    return { results: [] };
  }
}

class FakeDB {
  calls: Array<{ sql: string; binds: unknown[] }> = [];
  prepare(sql: string) {
    const stmt = new FakeStmt(sql);
    const orig = stmt.bind.bind(stmt);
    stmt.bind = (...b: unknown[]) => {
      this.calls.push({ sql, binds: b });
      return orig(...b);
    };
    return stmt;
  }
}

const SECRET = 'test-secret';

describe('password hashing', () => {
  it('hash verifies', async () => {
    const h = await hashPassword('password123');
    expect(await verifyPassword('password123', h)).toBe(true);
    expect(await verifyPassword('wrong', h)).toBe(false);
  });
});

describe('signup', () => {
  it('rejects short password', async () => {
    await expect(signup(new FakeDB() as any, 'a@b.com', 'short', '')).rejects.toBeInstanceOf(
      AuthError,
    );
  });

  it('rejects invalid email', async () => {
    await expect(signup(new FakeDB() as any, 'notanemail', 'password1', '')).rejects.toBeInstanceOf(
      AuthError,
    );
  });
});

describe('session', () => {
  it('create + verify roundtrip', async () => {
    const token = await createSession('user-1', SECRET);
    expect(await verifySession(token, SECRET)).toBe('user-1');
  });

  it('verify rejects wrong secret', async () => {
    const token = await createSession('user-1', SECRET);
    expect(await verifySession(token, 'other')).toBeNull();
  });

  it('verify rejects null', async () => {
    expect(await verifySession(null, SECRET)).toBeNull();
  });

  it('requireUserId throws on missing token', async () => {
    const req = new Request('https://x.test/api/quotes');
    await expect(requireUserId(req, SECRET)).rejects.toBeInstanceOf(AuthError);
  });

  it('requireUserId resolves from cookie', async () => {
    const token = await createSession('user-9', SECRET);
    const req = new Request('https://x.test/api/quotes', {
      headers: { Cookie: `nk_session=${token}` },
    });
    expect(await requireUserId(req, SECRET)).toBe('user-9');
  });
});

describe('cookie helpers', () => {
  it('sessionCookie is HttpOnly and Secure when https', () => {
    const c = sessionCookie('tok', true);
    expect(c).toContain('HttpOnly');
    expect(c).toContain('Secure');
    expect(c).toContain('nk_session=tok');
  });

  it('sessionCookie omits Secure on http', () => {
    expect(sessionCookie('tok', false)).not.toContain('Secure');
  });

  it('sessionTokenFromRequest parses', () => {
    const req = new Request('https://x.test', {
      headers: { Cookie: 'a=1; nk_session=abc; b=2' },
    });
    expect(sessionTokenFromRequest(req)).toBe('abc');
  });
});

describe('login', () => {
  it('rejects unknown user', async () => {
    await expect(login(new FakeDB() as any, 'x@y.com', 'password1')).rejects.toBeInstanceOf(
      AuthError,
    );
  });
});
