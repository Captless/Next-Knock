import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AuthProvider } from '@/hooks/AuthProvider';
import { useAuth } from '@/hooks/useAuth';
import { QuotesProvider } from '@/hooks/QuotesProvider';
import { ToastProvider } from '@/components/Toast';
import { AppShell } from '@/components/AppShell';
import { Login } from '@/routes/Login';
import { Signup } from '@/routes/Signup';
import { Home } from '@/routes/Home';
import { Quotes } from '@/routes/Quotes';
import { QuoteDetail } from '@/routes/QuoteDetail';
import { QuoteForm } from '@/routes/QuoteForm';
import { Settings } from '@/routes/Settings';

function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-bg" />;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/app"
        element={
          <RequireAuth>
            <AppShell>
              <Home />
            </AppShell>
          </RequireAuth>
        }
      />
      <Route
        path="/app/quotes"
        element={
          <RequireAuth>
            <AppShell>
              <Quotes />
            </AppShell>
          </RequireAuth>
        }
      />
      <Route
        path="/app/quotes/new"
        element={
          <RequireAuth>
            <AppShell>
              <QuoteForm />
            </AppShell>
          </RequireAuth>
        }
      />
      <Route
        path="/app/quotes/:id"
        element={
          <RequireAuth>
            <AppShell>
              <QuoteDetail />
            </AppShell>
          </RequireAuth>
        }
      />
      <Route
        path="/app/quotes/:id/edit"
        element={
          <RequireAuth>
            <AppShell>
              <QuoteForm />
            </AppShell>
          </RequireAuth>
        }
      />
      <Route
        path="/app/settings"
        element={
          <RequireAuth>
            <AppShell>
              <Settings />
            </AppShell>
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QuotesProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </QuotesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
