import type { QuoteStatus, ClosedOutcome } from '@/types';
import { LOST_REASONS } from '@/types';

export const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'follow_up', label: 'Follow Up' },
  { value: 'closed', label: 'Closed' },
] as const;

export const outcomeOptions = [
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
  { value: 'archived', label: 'Archived' },
] as const;

export type QuoteFilter = 'all' | 'active' | 'follow_up' | 'won' | 'lost' | 'overdue';

export const quoteFilterOptions: Array<{ value: QuoteFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'follow_up', label: 'Follow Up' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
  { value: 'overdue', label: 'Overdue' },
];

export const lostReasonOptions = LOST_REASONS;

export const isQuoteStatus = (v: string): v is QuoteStatus =>
  v === 'draft' || v === 'sent' || v === 'follow_up' || v === 'closed';

export const isClosedOutcome = (v: string): v is ClosedOutcome =>
  v === 'won' || v === 'lost' || v === 'archived';