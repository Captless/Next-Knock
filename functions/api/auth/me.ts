import {
  requireUserId,
  authUserFromRow,
  updateBusinessName,
} from '../../../src/server/auth';
import { json, jsonError, getSecret } from '../../_helpers';

export async function onRequestGet({ request, env }: any) {
  try {
    const userId = await requireUserId(request, getSecret(env));
    const row = await env.DB.prepare(
      'SELECT id, email, business_name FROM users WHERE id = ?',
    )
      .bind(userId)
      .first();
    if (!row) return json({ error: 'Not found' }, 404);
    return json(authUserFromRow(row as any));
  } catch (e) {
    return jsonError(e);
  }
}

export async function onRequestPatch({ request, env }: any) {
  try {
    const userId = await requireUserId(request, getSecret(env));
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
