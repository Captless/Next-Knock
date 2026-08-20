import { getQuote, updateQuote, deleteQuote, getActivity } from '../../../src/server/quotes';
import { requireUserId } from '../../../src/server/auth';
import { json, jsonError, getSecret } from '../../_helpers';

export async function onRequestGet({ request, env, params }: any) {
  try {
    const userId = await requireUserId(request, getSecret(env), env.DB);
    const quote = await getQuote(env.DB, userId, params.id);
    if (!quote) return json({ error: 'Not found' }, 404);
    const activity = await getActivity(env.DB, userId, params.id);
    return json({ quote, activity });
  } catch (e) {
    return jsonError(e);
  }
}

export async function onRequestPatch({ request, env, params }: any) {
  try {
    const userId = await requireUserId(request, getSecret(env), env.DB);
    const body = await request.json().catch(() => null);
    const quote = await updateQuote(env.DB, userId, params.id, body ?? {});
    if (!quote) return json({ error: 'Not found' }, 404);
    return json({ quote });
  } catch (e) {
    return jsonError(e);
  }
}

export async function onRequestDelete({ request, env, params }: any) {
  try {
    const userId = await requireUserId(request, getSecret(env), env.DB);
    const ok = await deleteQuote(env.DB, userId, params.id);
    if (!ok) return json({ error: 'Not found' }, 404);
    return new Response(null, { status: 204 });
  } catch (e) {
    return jsonError(e);
  }
}
