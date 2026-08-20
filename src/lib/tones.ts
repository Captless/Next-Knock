import type { ClosedOutcome, QuoteStatus } from '@/types';
import type { BadgeTone } from '@/components/Badge';

export const statusTone = (status: QuoteStatus): BadgeTone => {
  switch (status) {
    case 'draft':
      return 'muted';
    case 'sent':
      return 'info';
    case 'follow_up':
      return 'warn';
    case 'closed':
      return 'muted';
  }
};

export const outcomeTone = (outcome: ClosedOutcome): BadgeTone => {
  switch (outcome) {
    case 'won':
      return 'success';
    case 'lost':
      return 'danger';
    case 'archived':
      return 'muted';
  }
};