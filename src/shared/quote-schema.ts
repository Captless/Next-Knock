import { z } from 'zod';
import type { Quote, QuoteStatus, ServiceType } from './types';

export const serviceTypeSchema = z.enum([
  'house',
  'office',
  'move_in_out',
  'post_construction',
  'other',
]);

export const quoteStatusSchema = z.enum(['draft', 'sent', 'closed']);
export const closedOutcomeSchema = z.enum(['won', 'lost', 'archived']);

export const quoteSchema = z.object({
  customerName: z.string().trim().min(1, 'Customer name required').max(80),
  phone: z.string().trim().min(3, 'Phone required').max(40),
  email: z
    .string()
    .trim()
    .email('Invalid email')
    .max(120)
    .optional()
    .or(z.literal('')),
  address: z.string().trim().max(160).optional().or(z.literal('')),
  serviceType: serviceTypeSchema,
  amountCents: z.number().int().nonnegative().max(100_000_000),
  status: quoteStatusSchema,
  closedOutcome: closedOutcomeSchema.optional(),
  lostReason: z.string().trim().max(40).optional(),
  followUpDate: z.string().optional(),
  notes: z.string().max(500).optional().or(z.literal('')),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const quoteInputFromQuote = (q: Quote): QuoteInput => ({
  customerName: q.customerName,
  phone: q.phone,
  email: q.email ?? '',
  address: q.address ?? '',
  serviceType: q.serviceType as ServiceType,
  amountCents: q.amountCents,
  status: q.status as QuoteStatus,
  closedOutcome: q.closedOutcome,
  followUpDate: q.followUpDate,
  notes: q.notes ?? '',
});

export const formatAmountCents = (cents: number): string => {
  const value = (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value;
};

export const parseAmountToCents = (raw: string): number => {
  const cleaned = raw.replace(/[^0-9.]/g, '');
  if (!cleaned) return 0;
  const num = Number(cleaned);
  if (!Number.isFinite(num)) return 0;
  return Math.round(num * 100);
};