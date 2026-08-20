import type { D1Database } from '@cloudflare/workers-types';
import type { Quote, QuoteActivity } from '../shared/types';
import { quoteSchema, type QuoteInput } from '../shared/quote-schema';
import { normalizeNewQuote, normalizePatch, type QuotePatch } from '../shared/quote-logic';
import { isTerminal } from '../shared/dashboard';

interface QuoteRow {
  id: string;
  user_id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  address: string | null;
  service_type: string;
  amount_cents: number;
  status: string;
  closed_outcome: string | null;
  closed_reason: string | null;
  follow_up_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const rowToQuote = (r: QuoteRow): Quote => ({
  id: r.id,
  customerName: r.customer_name,
  phone: r.phone,
  email: r.email ?? undefined,
  address: r.address ?? undefined,
  serviceType: r.service_type as Quote['serviceType'],
  amountCents: r.amount_cents,
  status: r.status as Quote['status'],
  closedOutcome: (r.closed_outcome as Quote['closedOutcome']) ?? undefined,
  lostReason: r.closed_reason ?? undefined,
  followUpDate: r.follow_up_date ?? undefined,
  notes: r.notes ?? undefined,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

export interface QuoteActivityRow {
  id: string;
  quote_id: string;
  user_id: string;
  type: string;
  created_at: string;
}

const rowToActivity = (r: QuoteActivityRow): QuoteActivity => ({
  id: r.id,
  quoteId: r.quote_id,
  userId: r.user_id,
  type: r.type as QuoteActivity['type'],
  createdAt: r.created_at,
});

export async function recordActivity(
  db: D1Database,
  userId: string,
  quoteId: string,
  type: QuoteActivity['type'],
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO quote_activity (id, quote_id, user_id, type, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .bind(crypto.randomUUID(), quoteId, userId, type, new Date().toISOString())
    .run();
}

export function listQuotes(db: D1Database, userId: string): Promise<Quote[]> {
  return db
    .prepare(
      `SELECT * FROM quotes WHERE user_id = ? ORDER BY datetime(updated_at) DESC`,
    )
    .bind(userId)
    .all<QuoteRow>()
    .then((res) => res.results.map(rowToQuote));
}

export async function getQuote(
  db: D1Database,
  userId: string,
  id: string,
): Promise<Quote | null> {
  const row = await db
    .prepare(`SELECT * FROM quotes WHERE id = ? AND user_id = ?`)
    .bind(id, userId)
    .first<QuoteRow>();
  return row ? rowToQuote(row) : null;
}

export async function getActivity(
  db: D1Database,
  userId: string,
  quoteId: string,
): Promise<QuoteActivity[]> {
  const rows = await db
    .prepare(
      `SELECT * FROM quote_activity WHERE quote_id = ? AND user_id = ? ORDER BY datetime(created_at) ASC`,
    )
    .bind(quoteId, userId)
    .all<QuoteActivityRow>();
  return (rows.results ?? []).map(rowToActivity);
}

export async function createQuote(
  db: D1Database,
  userId: string,
  input: QuoteInput,
): Promise<Quote> {
  const clean = normalizeNewQuote(input);
  const ts = new Date().toISOString();
  const id = crypto.randomUUID();
  await db
    .prepare(
      `INSERT INTO quotes
        (id, user_id, customer_name, phone, email, address, service_type, amount_cents, status, closed_outcome, closed_reason, follow_up_date, notes, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      userId,
      clean.customerName,
      clean.phone,
      clean.email || null,
      clean.address || null,
      clean.serviceType,
      clean.amountCents,
      clean.status,
      clean.closedOutcome ?? null,
      clean.lostReason || null,
      clean.followUpDate || null,
      clean.notes || null,
      ts,
      ts,
    )
    .run();
  await recordActivity(db, userId, id, 'created');
  const created = await getQuote(db, userId, id);
  if (!created) throw new Error('Failed to create quote');
  return created;
}

export async function updateQuote(
  db: D1Database,
  userId: string,
  id: string,
  patch: QuotePatch,
): Promise<Quote | null> {
  const existing = await getQuote(db, userId, id);
  if (!existing) return null;
  const clean = normalizePatch(patch);
  const sets: string[] = [];
  const binds: unknown[] = [];
  const set = (col: string, val: unknown) => {
    sets.push(`${col} = ?`);
    binds.push(val);
  };
  if (clean.customerName !== undefined) set('customer_name', clean.customerName);
  if (clean.phone !== undefined) set('phone', clean.phone);
  if ('email' in clean) set('email', clean.email ?? null);
  if ('address' in clean) set('address', clean.address ?? null);
  if (clean.serviceType !== undefined) set('service_type', clean.serviceType);
  if (clean.amountCents !== undefined) set('amount_cents', clean.amountCents);
  if (clean.status !== undefined) set('status', clean.status);
  if ('closedOutcome' in clean) set('closed_outcome', clean.closedOutcome ?? null);
  if ((clean as Record<string, unknown>).lostReason !== undefined)
    set('closed_reason', ((clean as Record<string, unknown>).lostReason as string) ?? null);
  if ('followUpDate' in clean) set('follow_up_date', clean.followUpDate ?? null);
  if ('notes' in clean) set('notes', clean.notes ?? null);
  if (sets.length === 0) return getQuote(db, userId, id);
  set('updated_at', new Date().toISOString());
  binds.push(id, userId);
  await db
    .prepare(
      `UPDATE quotes SET ${sets.join(', ')} WHERE id = ? AND user_id = ?`,
    )
    .bind(...binds)
    .run();

  await recordActivityEvents(db, userId, id, existing, clean);

  return getQuote(db, userId, id);
}

async function recordActivityEvents(
  db: D1Database,
  userId: string,
  quoteId: string,
  before: Quote,
  patch: QuotePatch,
): Promise<void> {
  const events: QuoteActivity['type'][] = [];

  const beforeTerminal = isTerminal(before);
  const afterTerminal = isTerminal({ ...before, ...patch } as Quote);
  if (!beforeTerminal && afterTerminal) {
    events.push((patch.closedOutcome as string) === 'won' ? 'marked_won' : 'marked_lost');
  }

  if (patch.status !== undefined && patch.status !== before.status && !afterTerminal) {
    events.push('status_changed');
  }

  if ('followUpDate' in patch) {
    const hadFollowUp = !!before.followUpDate;
    const hasFollowUp = !!patch.followUpDate;
    if (hasFollowUp && !hadFollowUp) events.push('follow_up_scheduled');
    else if (hasFollowUp && hadFollowUp && patch.followUpDate !== before.followUpDate)
      events.push('follow_up_rescheduled');
  }

  const editedFields = ['customerName', 'phone', 'email', 'address', 'serviceType', 'amountCents', 'notes'];
  if (editedFields.some((f) => (patch as Record<string, unknown>)[f] !== undefined) && events.length === 0) {
    events.push('edited');
  }

  for (const type of events) await recordActivity(db, userId, quoteId, type);
}

export async function deleteQuote(
  db: D1Database,
  userId: string,
  id: string,
): Promise<boolean> {
  const res = await db
    .prepare(`DELETE FROM quotes WHERE id = ? AND user_id = ?`)
    .bind(id, userId)
    .run();
  return res.success;
}

export function validateQuoteInput(data: unknown):
  | { ok: true; data: QuoteInput }
  | { ok: false; errors: Record<string, string> } {
  const parsed = quoteSchema.safeParse(data);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? '');
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, errors };
  }
  return { ok: true, data: parsed.data };
}
