import { listQuotes, createQuote, validateQuoteInput } from '../../src/server/quotes';
import { requireUserId } from '../../src/server/auth';
import { json, jsonError, getSecret } from '../_helpers';

export async function onRequestGet({ request, env }: any) {
  try {
    const userId = await requireUserId(request, getSecret(env));
    const quotes = await listQuotes(env.DB, userId);
    return json({ quotes });
  } catch (e) {
    return jsonError(e);
  }
}

export async function onRequestPost({ request, env }: any) {
  try {
    const userId = await requireUserId(request, getSecret(env));
    const body = await request.json().catch(() => null);
    const result = validateQuoteInput(body);
    if (!result.ok) return json({ errors: result.errors }, 422);
    const quote = await createQuote(env.DB, userId, result.data);
    return json({ quote }, 201);
  } catch (e) {
    return jsonError(e);
  }
}
