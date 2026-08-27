import {
  requireUserId,
  authUserFromRow,
  updateBusinessName,
} from '../../../src/server/auth';
import { json, jsonError, getSecret } from '../../_helpers';

export async function onRequestGet({ request, env }: any) {
  try {
    const userId = await requireUserId(request, getSecret(env), env.DB);
    const row = await env.DB.prepare(
      'SELECT id, email, business_name, plan, quotes_created FROM users WHERE id = ?',
    )
      .bind(userId)
      .first();
    if (!row) return json({ error: 'Not found' }, 404);
    const user = authUserFromRow(row as any);
    return json({
      ...user,
      plan: (row as any).plan ?? 'free',
      usage: {
        plan: (row as any).plan ?? 'free',
        used: (row as any).quotes_created ?? 0,
        limit: 5,
      },
    });
  } catch (e) {
    return jsonError(e);
  }
}

export async function onRequestPatch({ request, env }: any) {
  try {
    const userId = await requireUserId(request, getSecret(env), env.DB);
    const body = await request.json().catch(() => null);
    const name = String(body?.businessName ?? '').trim();
    if (!name) return json({ error: 'Business name required' }, 422);
    await updateBusinessName(env.DB, userId, name);
    const row = await env.DB.prepare(
      'SELECT id, email, business_name FROM users WHERE id = ?',
    )
      .bind(userId)
      .first();
    return json(authUserFromRow(row as any));
  } catch (e) {
    return jsonError(e);
  }
}
