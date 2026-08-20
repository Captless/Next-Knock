import type { QuoteStatus, ClosedOutcome } from '@/types';

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

export const isQuoteStatus = (v: string): v is QuoteStatus =>
  v === 'draft' || v === 'sent' || v === 'follow_up' || v === 'closed';

export const isClosedOutcome = (v: string): v is ClosedOutcome =>
  v === 'won' || v === 'lost' || v === 'archived';