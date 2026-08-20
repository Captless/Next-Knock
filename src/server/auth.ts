import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import type { D1Database } from '@cloudflare/workers-types';

export const COOKIE_NAME = 'nk_session';
const MAX_AGE = 60 * 60 * 24 * 30;

export interface AuthUser {
  id: string;
  email: string;
  businessName: string;
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  business_name: string;
}

const enc = (s: string) => new TextEncoder().encode(s);

export function hashPassword(pw: string): Promise<string> {
  return bcrypt.hash(pw, 12);
}

export function verifyPassword(pw: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pw, hash);
}

export async function signup(
  db: D1Database,
  email: string,
  password: string,
  businessName: string,
): Promise<AuthUser> {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !normalized.includes('@')) {
    throw new AuthError('Valid email required', 422);
  }
  if (password.length < 8) {
    throw new AuthError('Password must be at least 8 characters', 422);
  }
  const existing = await db
    .prepare('SELECT id FROM users WHERE email = ?')
    .bind(normalized)
    .first();
  if (existing) throw new AuthError('Email already registered', 409);

  const hash = await hashPassword(password);
  const id = crypto.randomUUID();
  const ts = new Date().toISOString();
  await db
    .prepare(
      'INSERT INTO users (id, email, password_hash, business_name, created_at) VALUES (?, ?, ?, ?, ?)',
    )
    .bind(id, normalized, hash, businessName, ts)
    .run();
  return { id, email: normalized, businessName };
}

export async function login(
  db: D1Database,
  email: string,
  password: string,
): Promise<AuthUser> {
  const normalized = email.trim().toLowerCase();
  const row = await db
    .prepare('SELECT * FROM users WHERE email = ?')
    .bind(normalized)
    .first<UserRow>();
  if (!row) throw new AuthError('Invalid email or password', 401);
  const ok = await verifyPassword(password, row.password_hash);
  if (!ok) throw new AuthError('Invalid email or password', 401);
  return { id: row.id, email: row.email, businessName: row.business_name };
}

export async function updateBusinessName(
  db: D1Database,
  userId: string,
  name: string,
): Promise<void> {
  await db
    .prepare('UPDATE users SET business_name = ? WHERE id = ?')
    .bind(name, userId)
    .run();
}

export async function createSession(userId: string, secret: string): Promise<string> {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(enc(secret));
}

export async function verifySession(
  token: string | null,
  secret: string,
): Promise<string | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, enc(secret));
    return typeof payload.sub === 'string' ? payload.sub : null;
  } catch {
    return null;
  }
}

export function sessionCookie(token: string, secure: boolean): string {
  const parts = [
    `${COOKIE_NAME}=${token}`,
    'HttpOnly',
    'Path=/',
    'SameSite=Lax',
    `Max-Age=${MAX_AGE}`,
  ];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

export function clearCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`;
}

export function sessionTokenFromRequest(request: Request): string | null {
  const header = request.headers.get('Cookie');
  if (!header) return null;
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === COOKIE_NAME) return v.join('=');
  }
  return null;
}

export async function requireUserId(request: Request, secret: string): Promise<string> {
  const token = sessionTokenFromRequest(request);
  const userId = await verifySession(token, secret);
  if (!userId) throw new AuthError('Unauthorized', 401);
  return userId;
}

export function isSecureRequest(request: Request): boolean {
  const url = new URL(request.url);
  return url.protocol === 'https:';
}

export function authUserFromRow(row: { id: string; email: string; business_name: string }): AuthUser {
  return { id: row.id, email: row.email, businessName: row.business_name };
}
