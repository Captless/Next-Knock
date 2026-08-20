import { changePassword } from '../../../src/server/auth';
import { requireUserId } from '../../../src/server/auth';
import { json, jsonError, getSecret } from '../../_helpers';

export async function onRequestPost({ request, env }: any) {
  try {
    const userId = await requireUserId(request, getSecret(env), env.DB);
    const body = await request.json().catch(() => null);
    const currentPassword = String(body?.currentPassword ?? '');
    const newPassword = String(body?.newPassword ?? '');
    await changePassword(env.DB, userId, currentPassword, newPassword);
    return json({ ok: true }, 200);
  } catch (e) {
    return jsonError(e);
  }
}
