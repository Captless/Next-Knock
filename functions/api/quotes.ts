import { listQuotes, createQuote, validateQuoteInput, QuoteLimitError, FREE_QUOTE_LIMIT } from '../../src/server/quotes';
import { requireUserId } from '../../src/server/auth';
import { json, jsonError, getSecret } from '../_helpers';

export async function onRequestGet({ request, env }: any) {
  try {
    const userId = await requireUserId(request, getSecret(env), env.DB);
    const quotes = await listQuotes(env.DB, userId);
    const user = await env.DB.prepare('SELECT plan, quotes_created FROM users WHERE id = ?').bind(userId).first<{ plan: string; quotes_created: number }>();
    return json({
      quotes,
      usage: {
        plan: user?.plan ?? 'free',
        used: user?.quotes_created ?? 0,
        limit: FREE_QUOTE_LIMIT,
      },
    });
  } catch (e) {
    return jsonError(e);
  }
}

export async function onRequestPost({ request, env }: any) {
  try {
    const userId = await requireUserId(request, getSecret(env), env.DB);
    const body = await request.json().catch(() => null);
    const result = validateQuoteInput(body);
    if (!result.ok) return json({ errors: result.errors }, 422);
    const quote = await createQuote(env.DB, userId, result.data);
    const user = await env.DB.prepare('SELECT plan, quotes_created FROM users WHERE id = ?').bind(userId).first<{ plan: string; quotes_created: number }>();
    return json(
      {
        quote,
        usage: {
          plan: user?.plan ?? 'free',
          used: user?.quotes_created ?? 0,
          limit: FREE_QUOTE_LIMIT,
        },
      },
      201,
    );
  } catch (e) {
    if (e instanceof QuoteLimitError) {
      return json({ error: 'QUOTE_LIMIT_REACHED', code: 'quote_limit_reached' }, 403);
    }
    return jsonError(e);
  }
}
