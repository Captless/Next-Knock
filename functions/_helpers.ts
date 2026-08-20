import {
  COOKIE_NAME,
  sessionCookie,
  clearCookie,
  AuthError,
} from '../src/server/auth';

export function json(data: unknown, status = 200): Response {
  return Response.json(data, { status });
}

export function jsonError(e: unknown): Response {
  if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status });
  const message = e instanceof Error ? e.message : 'Server error';
  return Response.json({ error: message }, { status: 500 });
}

export function withCookie(response: Response, token: string | null, secure: boolean): Response {
  const value = token === null ? clearCookie() : sessionCookie(token, secure);
  response.headers.append('Set-Cookie', value);
  return response;
}

export function getSecret(env: Record<string, unknown>): string {
  const secret = env.JWT_SECRET;
  if (typeof secret !== 'string' || !secret) return 'dev-insecure-secret';
  return secret;
}

export { COOKIE_NAME };
