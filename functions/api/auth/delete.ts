import { deleteAccount } from '../../../src/server/auth';
import { requireUserId } from '../../../src/server/auth';
import { jsonError, getSecret } from '../../_helpers';

export async function onRequestPost({ request, env }: any) {
  try {
    const userId = await requireUserId(request, getSecret(env), env.DB);
    await deleteAccount(env.DB, userId);
    return new Response(null, { status: 204 });
  } catch (e) {
    return jsonError(e);
  }
}
