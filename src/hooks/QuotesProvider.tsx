import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Quote } from '@/types';
import type { QuoteInput } from '@/lib/quote-schema';
import type { QuotePatch } from '@/lib/quote-logic';
import { QuotesContext, type QuotesState } from '@/hooks/useQuotes';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';

export function QuotesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setQuotes([]);
      setError(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .get<{ quotes: Quote[] }>('/api/quotes')
      .then((data) => {
        if (!cancelled) setQuotes(data?.quotes ?? []);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load quotes');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const addQuote = useCallback(async (input: QuoteInput): Promise<Quote> => {
    const data = await api.post<{ quote: Quote }>('/api/quotes', input);
    const quote = data!.quote;
    setQuotes((prev) => [quote, ...prev]);
    return quote;
  }, []);

  const updateQuote = useCallback(async (id: string, patch: QuotePatch): Promise<void> => {
    const data = await api.patch<{ quote: Quote }>(`/api/quotes/${id}`, patch);
    const quote = data!.quote;
    setQuotes((prev) => prev.map((q) => (q.id === id ? quote : q)));
  }, []);

  const removeQuote = useCallback(async (id: string): Promise<void> => {
    await api.del(`/api/quotes/${id}`);
    setQuotes((prev) => prev.filter((q) => q.id !== id));
  }, []);

  const value = useMemo<QuotesState>(
    () => ({ quotes, loading, error, addQuote, updateQuote, removeQuote }),
    [quotes, loading, error, addQuote, updateQuote, removeQuote],
  );

  return <QuotesContext.Provider value={value}>{children}</QuotesContext.Provider>;
}
