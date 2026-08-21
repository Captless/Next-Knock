import type { QuoteStatus, ClosedOutcome } from '@/types';
import { LOST_REASONS } from '@/types';

export const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'closed', label: 'Closed' },
] as const;

export const outcomeOptions = [
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
  { value: 'archived', label: 'Archived' },
] as const;

export type QuoteFilter = 'all' | 'open' | 'needs_follow_up' | 'won' | 'lost';

export const quoteFilterOptions: Array<{ value: QuoteFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'needs_follow_up', label: 'Needs Follow-up' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
];

export const lostReasonOptions = LOST_REASONS;

export const isQuoteStatus = (v: string): v is QuoteStatus =>
  v === 'draft' || v === 'sent' || v === 'closed';

export const isClosedOutcome = (v: string): v is ClosedOutcome =>
  v === 'won' || v === 'lost' || v === 'archived';