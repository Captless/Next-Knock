import { login, createSession } from '../../../src/server/auth';
import { json, jsonError, withCookie, getSecret } from '../../_helpers';

export async function onRequestPost({ request, env }: any) {
  try {
    const body = await request.json().catch(() => null);
    const email = String(body?.email ?? '');
    const password = String(body?.password ?? '');
    const user = await login(env.DB, email, password);
    const token = await createSession(user.id, getSecret(env));
    return withCookie(json({ user }), token, isSecure(request));
  } catch (e) {
    return jsonError(e);
  }
}

function isSecure(request: Request): boolean {
  return new URL(request.url).protocol === 'https:';
}
