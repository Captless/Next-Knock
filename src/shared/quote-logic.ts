import type { Quote, QuoteStatus } from './types';
import type { QuoteInput } from './quote-schema';
import { defaultFollowUpDate, todayISO } from './dashboard';

export type QuotePatch = Partial<Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>>;

const needsFollowUp = (s: QuoteStatus): boolean => s === 'sent' || s === 'follow_up';

export function normalizeNewQuote(input: QuoteInput): QuoteInput {
  let out: QuoteInput = { ...input };
  if (out.status === 'closed' && !out.closedOutcome) {
    out = { ...out, closedOutcome: 'won' };
  }
  if (needsFollowUp(out.status) && !out.followUpDate) {
    out = { ...out, followUpDate: defaultFollowUpDate(todayISO()) };
  }
  return out;
}

export function normalizePatch(patch: QuotePatch): QuotePatch {
  const out: QuotePatch = { ...patch };
  if (out.status !== undefined) {
    if (out.status === 'closed' && !out.closedOutcome) {
      out.closedOutcome = 'won';
    }
    if (out.status !== 'closed') {
      out.closedOutcome = undefined;
    }
  }
  if (needsFollowUp(out.status ?? 'sent') && out.status && !out.followUpDate) {
    out.followUpDate = defaultFollowUpDate(todayISO());
  }
  return out;
}