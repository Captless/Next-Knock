import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { Field, Input } from '@/components/Input';
import { EyeIcon, EyeOffIcon } from '@/components/Icon';
import { AuthLayout } from '@/routes/Login';

export function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signUp(email, password, businessName);
      navigate('/app', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Create your account">
      <form onSubmit={submit} className="flex flex-col gap-3">
        {error && (
          <p className="rounded border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}
        <Field label="Business name" hint="Shown in the app header">
          <Input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Bright Clean Co."
          />
        </Field>
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
        <Field label="Password" hint="At least 8 characters">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={8}
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
          {busy ? 'Creating…' : 'Create account'}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-ink-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-ink underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
