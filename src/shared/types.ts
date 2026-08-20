export type QuoteStatus = 'draft' | 'sent' | 'follow_up' | 'closed';
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
  followUpDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

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
  follow_up: 'Follow Up',
  closed: 'Closed',
};

export const CLOSED_OUTCOME_LABEL: Record<ClosedOutcome, string> = {
  won: 'Won',
  lost: 'Lost',
  archived: 'Archived',
};