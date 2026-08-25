import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { Field, Input } from '@/components/Input';
import { EyeIcon, EyeOffIcon } from '@/components/Icon';

export function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signIn(email, password);
      navigate('/app', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Log in">
      <form onSubmit={submit} className="flex flex-col gap-3">
        {error && (
          <p className="rounded border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}
        <Field label="Email">
          <Input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@business.com"
            required
          />
        </Field>
        <Field label="Password">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink"
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        </Field>
        <Button type="submit" full disabled={busy}>
          {busy ? 'Signing in…' : 'Log in'}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-ink-muted">
        No account?{' '}
        <Link to="/signup" className="font-medium text-ink underline">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}

export function AuthLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center bg-bg px-6 safe-top safe-bottom">
      <Link to="/" className="absolute left-6 top-6 inline-flex items-center gap-1 text-sm text-ink-muted transition-colors hover:text-ink">
        &larr; Back to home
      </Link>
      <div className="mb-8">
        <img src="/logo-icon.svg" alt="Next Knock" className="h-10 w-10" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink">Next Knock</h1>
      </div>
      <h2 className="mb-4 text-lg font-semibold text-ink">{title}</h2>
      {children}
    </div>
  );
}
