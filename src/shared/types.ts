export type QuoteStatus = 'draft' | 'sent' | 'closed';
export type ClosedOutcome = 'won' | 'lost' | 'archived';
export type ServiceType =
  | 'house'
  | 'office'
  | 'move_in_out'
  | 'post_construction'
  | 'other';

export interface Quote {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address?: string;
  serviceType: ServiceType;
  amountCents: number;
  status: QuoteStatus;
  closedOutcome?: ClosedOutcome;
  lostReason?: string;
  followUpDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type QuoteActivityType =
  | 'created'
  | 'edited'
  | 'status_changed'
  | 'follow_up_scheduled'
  | 'follow_up_rescheduled'
  | 'marked_won'
  | 'marked_lost';

export interface QuoteActivity {
  id: string;
  quoteId: string;
  userId: string;
  type: QuoteActivityType;
  createdAt: string;
}

export const QUOTE_ACTIVITY_LABEL: Record<QuoteActivityType, string> = {
  created: 'Quote created',
  edited: 'Quote edited',
  status_changed: 'Status changed',
  follow_up_scheduled: 'Follow-up scheduled',
  follow_up_rescheduled: 'Follow-up rescheduled',
  marked_won: 'Marked won',
  marked_lost: 'Marked lost',
};

export const LOST_REASON_LABEL: Record<string, string> = {
  too_expensive: 'Too expensive',
  chose_another: 'Chose another cleaner',
  no_response: 'No response',
  cancelled: 'Cancelled',
  other: 'Other',
};

export const LOST_REASONS = [
  { value: 'too_expensive', label: 'Too expensive' },
  { value: 'chose_another', label: 'Chose another cleaner' },
  { value: 'no_response', label: 'No response' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'other', label: 'Other' },
] as const;

export interface User {
  id: string;
  email: string;
  businessName: string;
}

export const SERVICE_TYPE_LABEL: Record<ServiceType, string> = {
  house: 'House',
  office: 'Office',
  move_in_out: 'Move-in/out',
  post_construction: 'Post-construction',
  other: 'Other',
};

export const STATUS_LABEL: Record<QuoteStatus, string> = {
  draft: 'Draft',
  sent: 'Sent',
  closed: 'Closed',
};

export const CLOSED_OUTCOME_LABEL: Record<ClosedOutcome, string> = {
  won: 'Won',
  lost: 'Lost',
  archived: 'Archived',
};