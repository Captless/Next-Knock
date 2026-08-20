import { createContext, useContext } from 'react';
import type { Quote } from '@/types';
import type { QuoteInput } from '@/lib/quote-schema';
import type { QuotePatch } from '@/lib/quote-logic';

export interface QuotesState {
  quotes: Quote[];
  loading: boolean;
  error: string | null;
  addQuote: (input: QuoteInput) => Promise<Quote>;
  updateQuote: (id: string, patch: QuotePatch) => Promise<void>;
  removeQuote: (id: string) => Promise<void>;
}

export const QuotesContext = createContext<QuotesState | null>(null);

export function useQuotes(): QuotesState {
  const ctx = useContext(QuotesContext);
  if (!ctx) throw new Error('useQuotes must be used inside QuotesProvider');
  return ctx;
}
