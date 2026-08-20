import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AuthContext, type AuthState } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import type { AuthUser } from '@/server/auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const u = await api.get<AuthUser>('/api/auth/me');
      setUser(u);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      await api.post<{ user: AuthUser }>('/api/auth/login', { email, password });
      const u = await api.get<AuthUser>('/api/auth/me');
      setUser(u);
    },
    [],
  );

  const signUp = useCallback(
    async (email: string, password: string, businessName: string) => {
      await api.post<{ user: AuthUser }>('/api/auth/signup', {
        email,
        password,
        businessName,
      });
      const u = await api.get<AuthUser>('/api/auth/me');
      setUser(u);
    },
    [],
  );

  const signOut = useCallback(async () => {
    await api.post('/api/auth/logout');
    setUser(null);
  }, []);

  const value = useMemo<AuthState>(
    () => ({ user, loading, signIn, signUp, signOut, refresh }),
    [user, loading, signIn, signUp, signOut, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
